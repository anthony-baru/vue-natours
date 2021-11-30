<template>
    <v-data-table :loading="loading" :headers="headers" :items="desserts" sort-by="calories" class="elevation-1">
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>Tours</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>

                <ManageTourDialog
                        :formTitle="formTitle"
                        :dialog="dialog"
                        :item="editedItem"
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
            tour: {
                _id: "5c88fa8cf4afda39709c2970",
                id: "5c88fa8cf4afda39709c2970",
                name: "The Star Gazer",
                difficulty: "medium",
                price: 2997,
                duration: 9,
                maxGroupSize: 8,
                ratingsQuantity: 6,
                summary: "The most remote and stunningly beautiful places for seeing the night sky",
                description:
                    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\nLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                imageCover: "tour-8-cover.jpg",
                locations: [
                    {
                        type: "Point",
                        coordinates: [-109.99953, 37.629017],
                        _id: "5c88fa8cf4afda39709c2973",
                        description: "Natural Bridges National Monument",
                        day: 1,
                    },
                    {
                        type: "Point",
                        coordinates: [-111.50954, 36.883269],
                        _id: "5c88fa8cf4afda39709c2972",
                        description: "Horseshoe Bend",
                        day: 3,
                    },
                    {
                        type: "Point",
                        coordinates: [-117.07399, 36.501435],
                        _id: "5c88fa8cf4afda39709c2971",
                        description: "Death Valley National Park",
                        day: 6,
                    },
                ],
                slug: "the-star-gazer",
                durationWeeks: 1.2857142857142858,

                startLocation: {
                    type: "Point",
                    description: "Utah, USA",
                    coordinates: [-109.55099, 37.283469],
                    address: "Bluff, UT 84512, USA",
                },
                rating: 4.5,
                ratingsAverage: 4.8,
                images: ["tour-8-1.jpg", "tour-8-2.jpg", "tour-8-3.jpg"],
                startDates: [
                    "2021-03-23T10:00:00.000Z",
                    "2021-10-25T09:00:00.000Z",
                    "2022-01-30T10:00:00.000Z",
                ],
                secretTour: false,
                guides: [
                    {
                        photo: "user-10.jpg",
                        role: "lead-guide",
                        _id: "5c8a21d02f8fb814b56fa189",
                        name: "Steve T. Scaife",
                        email: "steve@example.com",
                    },
                    {
                        photo: "user-5.jpg",
                        role: "guide",
                        _id: "5c8a1f292f8fb814b56fa184",
                        name: "Leo Gillespie",
                        email: "leo@example.com",
                    },
                ],

            },
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
            desserts: [],
            editedIndex: -1,
        }),

        computed: {
            formTitle() {
                return this.editedIndex === -1 ? "New Item" : "Edit Item";
            },
           editedItem:{
                set: function(newVal){
                    return this.$store.commit("manageTour/setEditedItem",newVal)
               },
               get:function () {
                    return this.$store.getters["manageTour/getEditedItem"]
               }
           },
            defaultItem:{
                set: function(newVal){
                    return this.$store.commit("manageTour/setDefaultItem",newVal)
               },
               get:function () {
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
            async initialize() {

                const tours = await tourService.getTours();
                this.desserts = tours
                console.log(tours);
            },

            editItem(item) {
                this.editedIndex = this.desserts.indexOf(item);
                this.editedItem = Object.assign({}, item);
                this.dialog = true;
            },

            deleteItem(item) {
                this.editedIndex = this.desserts.indexOf(item);
                this.editedItem = Object.assign({}, item);
                this.dialogDelete = true;
            },

            deleteItemConfirm() {
                this.desserts.splice(this.editedIndex, 1);
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

            save() {
                if (this.editedIndex > -1) {
                    Object.assign(this.desserts[this.editedIndex], this.editedItem);
                } else {
                    this.desserts.push(this.editedItem);
                }
                this.close();
            },
        },
    };
</script>

<style></style>
