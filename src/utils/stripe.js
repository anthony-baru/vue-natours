// const stripe = require("stripe")(process.env.VUE_APP_STRIPE_KEY);
import Stripe from 'stripe'
const stripe=new Stripe(process.env.VUE_APP_STRIPE_KEY)
const createCheckoutSession = async (tour, userEmail) => {
    console.log("creating session",tour)
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],

        success_url: `${process.env.VUE_APP_BASE_URL}/tour/${tour._id}?paymentSuccess=true`,

        cancel_url: `${process.env.VUE_APP_BASE_URL}/tour/${tour._id}?paymentSuccess=false&cancel=true`,

        customer_email: userEmail,
        client_reference_id: tour._id,
        line_items: [
            {
                name: `${tour.name} Tour`,
                description: `${tour.description}`,
                images: [`https://www.natours.dev/img/tours/${tour.imageCover}`],
                amount: tour.price * 100,
                currency: "usd",
                quantity: 1,
            },
        ],
    });
    
    return session
};

export default {
    createCheckoutSession
}