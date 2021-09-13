import axios from 'axios';
import { showAlert } from './alert';

const stripe = Stripe(
  'pk_test_51JSgNVAWSpZmKltnhewMsYZhLZpwl4VmadZ6rtrX2oKced8JqDPOnd8wfBw3hG6BL2BBkMEqCSYrifsvDBdlMzkx00A5s9mC8J'
);

export const bookTour = async (tourId) => {
  try {
    //get checkout session from server
    const session = await axios(
      `http://localhost:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);
    //create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (error) {
    console.log(error);
    showAlert('error', err);
  }
};
