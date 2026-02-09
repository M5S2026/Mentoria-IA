/**
 * PAYMENTS - Stripe Checkout + PayPal
 */

// Stripe Checkout
async function handleStripeCheckout() {
  const btn = document.getElementById('stripe-btn');
  if (btn) {
    btn.disabled = true;
    btn.textContent = 'Processando...';
  }

  try {
    const identity = window.netlifyIdentity;
    const email = identity?.currentUser()?.email || null;

    const response = await fetch('/.netlify/functions/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const { sessionId, error } = await response.json();

    if (error) {
      alert('Erro ao iniciar pagamento: ' + error);
      return;
    }

    // Redirect to Stripe Checkout
    const stripe = Stripe(document.querySelector('[data-stripe-key]')?.dataset.stripeKey);
    const { error: redirectError } = await stripe.redirectToCheckout({ sessionId });

    if (redirectError) {
      alert('Erro ao redirecionar para pagamento: ' + redirectError.message);
    }
  } catch (err) {
    alert('Erro ao processar pagamento. Tente novamente.');
    console.error('Stripe error:', err);
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.textContent = 'Pagar com Cartao';
    }
  }
}

// PayPal - Initialize buttons if container exists
function initPayPal() {
  const container = document.getElementById('paypal-button-container');
  if (!container || typeof paypal === 'undefined') return;

  paypal.Buttons({
    style: {
      layout: 'horizontal',
      color: 'black',
      shape: 'pill',
      label: 'pay',
      height: 48
    },
    createOrder: function(data, actions) {
      return actions.order.create({
        purchase_units: [{
          amount: { value: '497.00', currency_code: 'BRL' },
          description: 'Claude Code na Pratica - Curso Completo'
        }]
      });
    },
    onApprove: function(data, actions) {
      return actions.order.capture().then(function(details) {
        window.location.href = '/pages/login.html?payment=paypal-success&email=' +
          encodeURIComponent(details.payer.email_address);
      });
    },
    onError: function(err) {
      console.error('PayPal Error:', err);
      alert('Erro no pagamento PayPal. Tente novamente.');
    }
  }).render('#paypal-button-container');
}

// Init on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  const stripeBtn = document.getElementById('stripe-btn');
  if (stripeBtn) {
    stripeBtn.addEventListener('click', handleStripeCheckout);
  }
  initPayPal();
});
