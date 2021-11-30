<template>
    <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: "ManageTourDialogDelete",
    props: {
        dialogDelete: { type: Boolean },
    },
    methods: {
        closeDelete() {
            this.$emit("app-close-delete");
        },

        deleteItemConfirm() {
            this.$emit("app-delete-item-confirm");
        },
    },
};
</script>

<style lang="sass" scoped></style>
