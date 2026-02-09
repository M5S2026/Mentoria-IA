const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  const sig = event.headers['stripe-signature'];
  let stripeEvent;

  try {
    stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return { statusCode: 400, body: `Webhook Error: ${err.message}` };
  }

  if (stripeEvent.type === 'checkout.session.completed') {
    const session = stripeEvent.data.object;
    const customerEmail = session.customer_email || session.customer_details?.email;

    if (customerEmail) {
      try {
        // Use Netlify Identity Admin API to find and update user
        const siteUrl = process.env.URL;
        const identityToken = process.env.NETLIFY_IDENTITY_TOKEN;

        // List users to find by email
        const listRes = await fetch(`${siteUrl}/.netlify/identity/admin/users`, {
          headers: { Authorization: `Bearer ${identityToken}` },
        });

        if (listRes.ok) {
          const data = await listRes.json();
          const user = data.users?.find(u => u.email === customerEmail);

          if (user) {
            // Update user with paid-user role
            await fetch(`${siteUrl}/.netlify/identity/admin/users/${user.id}`, {
              method: 'PUT',
              headers: {
                Authorization: `Bearer ${identityToken}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                app_metadata: { roles: ['paid-user'] },
              }),
            });
          }
        }
      } catch (adminErr) {
        console.error('Error updating user role:', adminErr);
      }
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ received: true }),
  };
};
