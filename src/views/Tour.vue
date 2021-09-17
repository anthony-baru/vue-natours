<template>
  <div v-if="tour">
    <section class="section-header">
      <div class="header__hero">
        <div class="header__hero-overlay">&nbsp;</div>
        <img
          class="header__hero-img"
          :src="baseUrl + '/img/tours/' + tour.imageCover"
          :alt="tour.imageCover"
        />
      </div>
      <div class="heading-box">
        <h1 class="heading-primary">
          <span>{{ tour.name }}</span>
        </h1>
        <div class="heading-box__group">
          <div class="heading-box__detail">
            <svg class="heading-box__icon">
              <use xlink:href="/img/icons.svg#icon-clock"></use></svg
            ><span class="heading-box__text">{{ tour.duration }} days</span>
          </div>
          <div class="heading-box__detail">
            <svg class="heading-box__icon">
              <use xlink:href="/img/icons.svg#icon-map-pin"></use></svg
            ><span class="heading-box__text">{{
              tour.startLocation.address
            }}</span>
          </div>
        </div>
      </div>
    </section>
    <section class="section-description">
      <div class="overview-box">
        <div>
          <div class="overview-box__group">
            <h2 class="heading-secondary ma-bt-lg">Quick facts</h2>
            <div class="overview-box__detail">
              <svg class="overview-box__icon">
                <use xlink:href="/img/icons.svg#icon-calendar"></use></svg
              ><span class="overview-box__label">Next date</span
              ><span class="overview-box__text">August 2021</span>
            </div>
            <div class="overview-box__detail">
              <svg class="overview-box__icon">
                <use xlink:href="/img/icons.svg#icon-trending-up"></use></svg
              ><span class="overview-box__label">Difficulty</span
              ><span class="overview-box__text">{{ tour.difficulty }}</span>
            </div>
            <div class="overview-box__detail">
              <svg class="overview-box__icon">
                <use xlink:href="/img/icons.svg#icon-user"></use></svg
              ><span class="overview-box__label">Participants</span
              ><span class="overview-box__text"
                >{{ tour.maxGroupSize }} people</span
              >
            </div>
            <div class="overview-box__detail">
              <svg class="overview-box__icon">
                <use xlink:href="/img/icons.svg#icon-star"></use></svg
              ><span class="overview-box__label">Rating</span
              ><span class="overview-box__text"
                >{{ tour.ratingsAverage }} / 5</span
              >
            </div>
          </div>
          <div class="overview-box__group">
            <h2 class="heading-secondary ma-bt-lg">Your tour guides</h2>
            <div
              class="overview-box__detail"
              v-for="guide in tour.guides"
              :key="guide.id"
            >
              <img
                class="overview-box__img"
                :src="baseUrl + '/img/users/' + guide.photo"
                alt="guide.photo"
              /><span class="overview-box__label">{{ guide.role }}</span
              ><span class="overview-box__text">{{ guide.name }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="description-box">
        <h2 class="heading-secondary ma-bt-lg">About the {{ tour.name }}</h2>
        <p class="description__text">{{ tour.description }}</p>
        <!-- <p class="description__text">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </p>
        <p class="description__text">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum!
        </p> -->
      </div>
    </section>
    <section class="section-pictures">
      <div class="picture-box" v-for="image in tour.images" :key="image">
        <img
          class="picture-box__img picture-box__img--1"
          :src="baseUrl + '/img/tours/' + image"
          :alt="image.photo"
        />
      </div>
    </section>
    <section class="section-map">
      <div id="map"></div>
    </section>
    <section class="section-reviews">
      <div class="reviews">
        <div
          class="reviews__card"
          v-for="review in tour.reviews"
          :key="review.id"
        >
          <div class="reviews__avatar">
            <img
              class="reviews__avatar-img"
              :src="baseUrl + '/img/users/' + review.user.photo"
              alt="Jim Brown"
            />
            <h6 class="reviews__user">{{ review.user.name }}</h6>
          </div>
          <p class="reviews__text">
            {{ review.review }}
          </p>
          <div class="reviews__rating">
            <svg
              class="reviews__star reviews__star--active"
              v-for="(rating, i) in review.rating"
              :key="i"
            >
              <use xlink:href="/img/icons.svg#icon-star"></use>
            </svg>
          </div>
        </div>
      </div>
    </section>
    <section class="section-cta">
      <div class="cta">
        <div class="cta__img cta__img--logo">
          <img src="/img/logo-white.png" alt="Natours logo" />
        </div>
        <img
          class="cta__img cta__img--1"
          src="/img/tours/tour-5-2.jpg"
          alt=""
        /><img
          class="cta__img cta__img--2"
          src="/img/tours/tour-5-1.jpg"
          alt=""
        />
        <div class="cta__content">
          <h2 class="heading-secondary">What are you waiting for?</h2>
          <p class="cta__text">
            {{ tour.duration }} days. 1 adventure. Infinite memories. Make it
            yours today!
          </p>
          <button class="btn btn--green span-all-rows">Book tour now!</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import tourService from "../services/tour.service";
export default {
  name: "tour",
  data() {
    return {
      baseUrl: process.env.VUE_APP_API_BASE_URL,
      tour: null,
    };
  },
  computed: {
    startDate() {
      return new Date(this.tour.startDates[0]).toLocaleString("en-us", {
        month: "long",
        year: "numeric",
      });
    },
  },
  async created() {
    const tourId = this.$route.params.id;

    const tour = await tourService.getTour(tourId);

    this.tour = tour;
  },
};
</script>

<style></style>
