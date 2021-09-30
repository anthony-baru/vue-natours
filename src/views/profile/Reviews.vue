<template>
    <v-container grid-list-xs style="font-size: 6rem">
        <v-data-table
            :headers="headers"
            :items="reviews"
            sort-by="id"
            class="elevation-1 data-table"
            :search="search"
            :item-key="reviews.id"
        >
            <!-- templates -->
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title class="text-h3">Reviews</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>

                    <v-card-title>
                        <v-text-field
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="Search"
                            single-line
                            hide-details
                        ></v-text-field>
                    </v-card-title>
                    <v-spacer></v-spacer>

                    <v-dialog v-model="dialog" max-width="500px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                color="primary"
                                dark
                                class="mb-2 text-h6"
                                v-bind="attrs"
                                v-on="on"
                            >
                                New Item
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="text-h3">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col>
                                            <v-text-field
                                                v-model="editedItem.review"
                                                label="Review"
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" sm="6" md="4">
                                            <!-- <v-text-field
                                                min="1"
                                                max="5"
                                                v-model="editedItem.rating"
                                                label="Rating"
                                            ></v-text-field> -->
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <v-select
                                                :items="['1', '2', '3', '4', '5']"
                                                :value="editedItem.rating"
                                                v-model="editedItem.rating"
                                                label="Rating"
                                            ></v-select>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1 " text @click="close">
                                    <span class="text-h5">Cancel</span>
                                </v-btn>
                                <v-btn color="blue darken-1" text @click="save(editedItem)">
                                    <span class="text-h5">Save</span>
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialogDelete" max-width="500px">
                        <v-card>
                            <v-card-title class="text-h5"
                                >Are you sure you want to delete this item?</v-card-title
                            >
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="closeDelete"
                                    ><span class="text-h5">Cancel</span>
                                </v-btn>
                                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                                    ><span class="text-h5">Ok</span></v-btn
                                >
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
                <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
            </template>
            <template v-slot:no-data>
                <v-btn color="primary" @click="initialize"> Reset </v-btn>
            </template>
        </v-data-table>
    </v-container>
</template>

<script>
import reviewService from "../../services/review.service";
import { format } from "date-fns";
export default {
    name: "Reviews",
    data: () => ({
        reviews: [],
        dialog: false,
        dialogDelete: false,
        search: "",
        headers: [
            {
                text: "Id",
                align: "start",
                sortable: false,
                value: "id",
            },
            { text: "Review", value: "review" },
            { text: "Rating", value: "rating" },
            { text: "Date created", value: "createdAt" },
            // { text: "Protein (g)", value: "protein" },
            { text: "Actions", value: "actions", sortable: false },
        ],
        desserts: [],
        editedIndex: -1,
        editedItem: {
            id: "",
            rating: 0,
            review: 0,
            // carbs: 0,
            // protein: 0,
        },
        defaultItem: {
            id: "",
            rating: 0,
            review: 0,
            // carbs: 0,
            // protein: 0,
        },
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? "New Review" : "Edit Review";
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

    created() {
        this.initialize();
        this.getReviews();
    },

    methods: {
        async getReviews() {
            this.reviews = await reviewService.getReviews();
            this.reviews.filter((el) => {
                el.createdAt = format(new Date(el.createdAt), "dd-MMM-YYY, HH:mm");
                el.rating = el.rating.toString();
            });
            console.log("myreviews", this.reviews);
        },
        initialize() {
            this.desserts = [
                {
                    name: "Frozen Yogurt",
                    calories: 159,
                    fat: 6.0,
                    carbs: 24,
                    protein: 4.0,
                },
                {
                    name: "Ice cream sandwich",
                    calories: 237,
                    fat: 9.0,
                    carbs: 37,
                    protein: 4.3,
                },
                {
                    name: "Eclair",
                    calories: 262,
                    fat: 16.0,
                    carbs: 23,
                    protein: 6.0,
                },
                {
                    name: "Cupcake",
                    calories: 305,
                    fat: 3.7,
                    carbs: 67,
                    protein: 4.3,
                },
                {
                    name: "Gingerbread",
                    calories: 356,
                    fat: 16.0,
                    carbs: 49,
                    protein: 3.9,
                },
                {
                    name: "Jelly bean",
                    calories: 375,
                    fat: 0.0,
                    carbs: 94,
                    protein: 0.0,
                },
                {
                    name: "Lollipop",
                    calories: 392,
                    fat: 0.2,
                    carbs: 98,
                    protein: 0,
                },
                {
                    name: "Honeycomb",
                    calories: 408,
                    fat: 3.2,
                    carbs: 87,
                    protein: 6.5,
                },
                {
                    name: "Donut",
                    calories: 452,
                    fat: 25.0,
                    carbs: 51,
                    protein: 4.9,
                },
                {
                    name: "KitKat",
                    calories: 518,
                    fat: 26.0,
                    carbs: 65,
                    protein: 7,
                },
            ];
        },

        editItem(item) {
            this.editedIndex = this.reviews.indexOf(item);
            this.editedItem = Object.assign(
                {},
                { id: item.id, rating: item.rating, review: item.review }
            );
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

        async save(payload) {
            if (this.editedIndex > -1) {
                const updateOp = await reviewService.updateReview(payload);
                const updatedReview = updateOp.data.document;

                Object.assign(this.reviews[this.editedIndex], {
                    rating: updatedReview.rating.toString(),
                    review: updatedReview.review,
                });
            } else {
                this.reviews.push(this.editedItem);
            }
            this.close();
        },
    },
};
</script>

<style>
.v-data-table-header tr th {
    font-size: 1.4rem !important;
}
.v-data-table__wrapper table tbody tr td {
    font-size: 1.2rem !important;
}
</style>