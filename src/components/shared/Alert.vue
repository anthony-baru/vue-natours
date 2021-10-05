<template>
<v-snackbar v-model="$store.state.alert.show" timeout="5000" top right :color="$store.state.alert.type=='error'? 'red' : '#55c57a' ">
    {{ $store.state.alert.message }}

    <template v-slot:action="{ attrs }">
        <v-btn color="#f7f7f7" text v-bind="attrs" @click="$store.state.alert.show = false">
            Close
        </v-btn>
    </template>
</v-snackbar>
</template>

<script>
export default {
  
};
</script>

<style scoped>

</style>
