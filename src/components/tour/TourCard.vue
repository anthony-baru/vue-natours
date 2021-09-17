<template>
  <div class="card">
    <div class="card__header">
      <div class="card__picture">
        <div class="card__picture-overlay">&nbsp;</div>
        <img
          class="card__picture-img"
          :src="baseUrl + '/img/tours/' + tour.imageCover"
          alt="Tour 1"
        />
      </div>
      <h3 class="heading-tertirary">
        <span>{{ tour.name }}</span>
      </h3>
    </div>
    <div class="card__details">
      <h4 class="card__sub-heading">
        {{ tour.difficulty }} {{ tour.duration }}-day tour
      </h4>
      <p class="card__text">
        {{ tour.summary }}
      </p>
      <div class="card__data">
        <svg class="card__icon">
          <use xlink:href="img/icons.svg#icon-map-pin"></use></svg
        ><span>{{ tour.startLocation.address }}</span>
      </div>
      <div class="card__data">
        <svg class="card__icon">
          <use xlink:href="img/icons.svg#icon-calendar"></use></svg
        ><span>{{ startDate }}</span>
      </div>
      <div class="card__data">
        <svg class="card__icon">
          <use xlink:href="img/icons.svg#icon-flag"></use></svg
        ><span>{{ tour.locations.length }} stops</span>
      </div>
      <div class="card__data">
        <svg class="card__icon">
          <use xlink:href="img/icons.svg#icon-user"></use></svg
        ><span>{{ tour.maxGroupSize }} people</span>
      </div>
    </div>
    <div class="card__footer">
      <p>
        <span class="card__footer-value">${{ tour.price }}</span
        ><span class="card__footer-text">per person</span>
      </p>
      <p class="card__ratings">
        <span class="card__footer-value">{{ tour.ratingsAverage }}</span
        ><span class="card__footer-text"
          >rating ({{ tour.ratingsQuantity }})</span
        >
      </p>
      <router-link class="btn btn--green btn--small" :to="tourUrl"
        >Details</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  // name: "tour-card",
  data() {
    return {
      baseUrl: process.env.VUE_APP_API_BASE_URL,
    };
  },
  computed: {
    tourUrl() {
      return `tour/${this.tour.id}`;
    },
    startDate() {
      return new Date(this.tour.startDates[0]).toLocaleString("en-us", {
        month: "long",
        year: "numeric",
      });
    },
  },
  props: {
    tour: {
      type: Object,
      required: true,
    },
  },
  name: "TourCard",
};
</script>

<style></style>
