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

// PayPal - via PayPal.me link (no SDK needed)
// Link direto: https://paypal.me/silviaassay899/497BRL

// Init on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  const stripeBtn = document.getElementById('stripe-btn');
  if (stripeBtn) {
    stripeBtn.addEventListener('click', handleStripeCheckout);
  }
  // PayPal uses direct PayPal.me link (no JS init needed)
});
