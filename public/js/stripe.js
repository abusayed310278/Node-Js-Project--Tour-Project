import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51QNt47A8K24sxTOeIEEcHL8YnP6HQmGSS6fNoP1lhFmRMDC6tJiqkRwd7vJB94y1AnHwKFbpJiiS1k0slkczN7YO00zgwcCSiB'
);

export const bookTour = async tourId => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    // console.log(session);

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
