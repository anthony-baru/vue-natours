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
        this.tours = await tourservice.getTours();
    },
};
</script>

<style>
</style>