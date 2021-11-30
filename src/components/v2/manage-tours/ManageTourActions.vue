<template v-slot:[`item.actions`]="{ item }">
    <div>
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </div>
</template>

<script>
export default {
    name: "ManageTourActions",
    methods: {
        editItem(item) {
            this.$emit("edit-item", item);
        },
        deleteItem(item) {
            this.$emit("delete-item", item);
        },
    },
};
</script>

<style lang="sass" scoped></style>
