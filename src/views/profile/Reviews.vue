<template>
    <div class="">
        <data-table v-bind="bindings" />
    </div>
</template>

<script>
export default {
    components: {},
    computed: {
        bindings() {
            return {
                columns: ["name", "age", "date"],
                data: ["one", "two", "three"],
            };
        },
    },
};
</script>

<style>
</style>