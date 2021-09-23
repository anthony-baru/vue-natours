<template>
  <transition name="fade">
    <div
      v-if="$store.state.alert.show"
      class="alert"
      :class="`alert--${$store.state.alert.type}`"
    >
      {{ $store.state.alert.message }}
    </div></transition
  >
</template>

<script>
export default {};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>