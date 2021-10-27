<template>
    <div>
        <stripe-checkout
            ref="checkoutRef"
            :session-id="sessionId"
            mode="payment"
            :pk="publishableKey"
            @loading="(v) => (loading = v)"
        />
        <!-- <button @click="submit">Pay now!</button> -->
    </div>
</template>

<script>
import { StripeCheckout } from "@vue-stripe/vue-stripe";
import bookingService from "../../services/booking.service";
export default {
    components: {
        StripeCheckout,
    },
    data() {
        this.publishableKey = process.env.VUE_APP_STRIPE_KEY;
        return {
            loading: false,
            lineItems: [],
            successURL: process.env.VUE_APP_BASE_URL,
            cancelURL: process.env.VUE_APP_BASE_URL,
            sessionId: null,
        };
    },
    props: {
        tour: {
            type: Object,
            required: true,
        },
    },
    created() {
        this.$parent.$on("check-out", this.checkout);
        console.log(this.$route);
        if (this.$route.query.paymentSuccess === "true") {
            this.$toast.success("Payment successful. Thank you for purchasing this tour.");
        }
    },
    methods: {
        async checkout() {
            console.log("check-out event omitted");
            try {
                const successUrl = `${process.env.VUE_APP_BASE_URL}/tour/${this.tour._id}?paymentSuccess=true`;
                const cancelUrl = `${process.env.VUE_APP_BASE_URL}/tour/${this.tour._id}?paymentSuccess=false&cancel=true`;
                const createSession = await this.checkoutSession(successUrl, cancelUrl);
                if (createSession) {
                    const buyTour = await this.$refs.checkoutRef.redirectToCheckout();
                    console.log("buyTour",buyTour)
                }
            } catch (error) {
                console.log(error, "errrorStripe");
                this.$toast.error(error.message);
            }
        },

        async checkoutSession(successUrl, cancelUrl) {
            try {
                const session = await bookingService.getCheckoutSession(
                    this.$route.params.id,
                    successUrl,
                    cancelUrl
                );
                this.sessionId = session.id;
                return this.sessionId;
            } catch (error) {
                this.$toast.error(error.message);
            }
        },
    },
};
</script>

<style></style>
