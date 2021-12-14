<template>
    <v-data-table :loading="loading" :headers="headers" :items="tours" sort-by="calories" class="elevation-1">
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>Tours</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>

                <ManageTourDialog
                        :formTitle="formTitle"
                        :dialogProp="dialog"
                        :item="editedItem"
                        @change-dialog="changeDialogValue"
                        @save="save"
                        @close="close"
                />
                <ManageTourDialogDelete
                        :dialogDelete="dialogDelete"
                        @app-close-delete="closeDelete"
                        @app-delete-item-confirm="deleteItemConfirm"
                />
            </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil</v-icon>
            <v-icon small @click="deleteItem(item)"> mdi-delete</v-icon>
        </template>
        <template v-slot:no-data>
            <v-btn color="primary" @click="initialize"> Reset</v-btn>
        </template>
    </v-data-table>
</template>

<script>
    import ManageTourDialog from "@/components/v2/manage-tours/ManageTourDialog";
    import ManageTourDialogDelete from "@/components/v2/manage-tours/ManageTourDialogDelete";
    import tourService from "../../services/tour.service";
    // import {mapGetters} from "vuex"
    // import validations from "@/utils/Validations";

    export default {
        name: "HomeTest",
        components: {ManageTourDialog, ManageTourDialogDelete},

        data: () => ({
            loading: false,
            dialog: false,
            dialogDelete: false,
            headers: [
                {
                    text: "Name",
                    align: "start",
                    sortable: false,
                    value: "name",
                },
                {text: "Difficulty", value: "difficulty"},
                {text: "Price", value: "price"},
                {text: "Duration", value: "duration"},
                {text: "Group size", value: "maxGroupSize"},
                {text: "Actions", value: "actions", sortable: false},
            ],
            tours: [],
            editedIndex: -1,
        }),

        computed: {
            formTitle() {
                return this.editedIndex === -1 ? "New Item" : "Edit Item";
            },
            editedItem: {
                set: function (newVal) {
                    return this.$store.commit("manageTour/setEditedItem", newVal)
                },
                get: function () {
                    return this.$store.getters["manageTour/getEditedItem"]
                }
            },
            defaultItem: {
                set: function (newVal) {
                    return this.$store.commit("manageTour/setDefaultItem", newVal)
                },
                get: function () {
                    return this.$store.getters["manageTour/getDefaultItem"]
                }
            },
        },

        watch: {
            dialog(val) {
                val || this.close();
            },
            dialogDelete(val) {
                val || this.closeDelete();
            },
        },

        async created() {
            this.loading = true
            await this.initialize();
            this.loading = false

        },

        methods: {
            changeDialogValue(newVal) {
                return this.dialog = newVal
            },
            async initialize() {

                const tours = await tourService.getTours();
                this.tours = tours
                console.log(tours);
            },

            editItem(item) {
                this.editedIndex = this.tours.indexOf(item);
                this.editedItem = Object.assign({}, item);
                this.dialog = true;
            },

            deleteItem(item) {
                this.editedIndex = this.tours.indexOf(item);
                this.editedItem = Object.assign({}, item);
                this.dialogDelete = true;
            },

            deleteItemConfirm() {
                this.tours.splice(this.editedIndex, 1);
                this.closeDelete();
            },

            close() {
                this.dialog = false;
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem);
                    this.editedIndex = -1;
                });
            },

            closeDelete() {
                this.dialogDelete = false;
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem);
                    this.editedIndex = -1;
                });
            },

            async save(formData) {
                try {
                    if (this.editedIndex > -1) {
                        //edit tour
                        Object.assign(this.tours[this.editedIndex], this.editedItem);

                    } else {
                        //add tour
                        const tour = await tourService.addTour(formData)
                        console.log("added tour", tour)
                        if (tour.status === "success") {
                            this.$toast.success("Tour added successfully.")
                            this.tours.push(this.editedItem);
                        } else {
                            this.$toast.error("An error occurred.")
                        }
                    }
                    this.close();
                }catch (e) {
                    console.log("Error Occurred!!",e)
                    this.$toast.error("An error occurred:"+e.message)
                }

            },
        },
    };
</script>

<style></style>
