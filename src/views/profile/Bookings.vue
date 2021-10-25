<template>
    <div class="card-container">
        <app-tour-card v-for="tour in tours" :tour="tour" :key="tour.id" />
    </div>
</template>

<script>
import AppTourCard from "../../components/tour/TourCard.vue";
import tourservice from "../../services/tour.service";
export default {
    name: "MyBookings",
    components: { AppTourCard },
    data() {
        return {
            tours: null,
        };
    },
    async created() {
        try {     this.tours = await tourservice.getTours();
        } catch (error) {
            console.log("Booking error",error)
            this.$toast.error(error.response.data.message)
        }
    },
};
</script>

<style>
</style>