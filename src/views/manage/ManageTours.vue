<template>
<v-container grid-list-xs>
    <v-data-table :headers="headers" :items="tours" sort-by="calories" class="elevation-1">
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>Tours</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                            New Tour
                        </v-btn>
                    </template>
                    <v-form ref="crud-form" @submit.prevent="save" v-model="valid">
                        <v-card>
                            <v-card-title>
                                <span class="text-h5">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <!-- group size -->
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field name="maxGroupSize" v-model="editedItem.maxGroupSize" label="Group Size" type="number" :rules="[required('Group Size')]"></v-text-field>
                                            {{ editedItem.maxGroupSize + "hi" }}
                                            <!-- :rules="[required('Group Size')]" -->
                                        </v-col>
                                        <!-- name -->
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field name="name" v-model="editedItem.name" label="Name" :rules="[required('Name')]"></v-text-field>
                                        </v-col>
                                        <!-- duration -->
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field name="duration" v-model="editedItem.duration" label="Duration"></v-text-field>
                                            <!-- :rules="[required('Duration')]" -->
                                        </v-col>
                                        <!-- difficulty -->
                                        <v-col cols="12" sm="6" md="4">
                                            <v-select name="difficulty" :items="['easy', 'medium', 'hard']" label="Difficulty" v-model="editedItem.difficulty"></v-select>
                                        </v-col>
                                        <!-- secret tour -->
                                        <v-col cols="12" sm="6" md="4">
                                            <v-select name="secretTour" :items="[true, false]" label="Secret Tour" v-model="editedItem.secretTour"></v-select>
                                        </v-col>

                                        <!-- price -->
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field name="price" v-model="editedItem.price" label="Price"></v-text-field>
                                            <!-- :rules="[required('Price'), floatFormat()]" -->
                                        </v-col>
                                        <!-- guides -->
                                        <v-col cols="12">
                                            <v-autocomplete name="guides" v-model="values" :items="items"  dense chips small-chips label="Guides" multiple></v-autocomplete>
                                        </v-col>
                                        <!-- start dates -->
                                        <v-col cols="12">
                                            <v-row>
                                                <v-col cols="12" sm="6">
                                                    <v-date-picker v-model="startDates" multiple></v-date-picker>
                                                </v-col>
                                                <v-col cols="12" sm="6">
                                                    <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="startDates" transition="scale-transition" offset-y min-width="auto">
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-combobox name="startDates" v-model="startDates" multiple chips small-chips label="Start Dates" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-combobox>
                                                        </template>
                                                        <v-date-picker v-model="startDates" multiple no-title scrollable>
                                                            <v-spacer></v-spacer>
                                                            <v-btn text color="primary" @click="menu = false">
                                                                Cancel
                                                            </v-btn>
                                                            <v-btn text color="primary" @click="
                                                                        $refs.menu.save(startDates)
                                                                    ">
                                                                OK
                                                            </v-btn>
                                                        </v-date-picker>
                                                    </v-menu>
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                        <!-- summary -->
                                        <v-col cols="12">
                                            <v-text-field name="summary" v-model="editedItem.summary" label="Summary" :rules="[required('Summary')]"></v-text-field>
                                        </v-col>
                                        <!-- description -->
                                        <v-col cols="12">
                                            <v-textarea name="description" label="Description" v-model="editedItem.description" :rules="[required('Description')]" hint="Tour description"></v-textarea>
                                        </v-col>
                                        <!-- imageCover -->
                                        <!-- <v-col cols="12" sm="6" md="4">
                                            <v-text-field
                                                v-model="editedItem.imageCover"
                                                label="Image Cover"
                                            ></v-text-field>
                                        </v-col> -->

                                        <!-- <v-col cols="12" sm="6" md="4">
                                                <v-text-field
                                                    v-model="editedItem.fat"
                                                    label="Fat (g)"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field
                                                    v-model="editedItem.carbs"
                                                    label="Carbs (g)"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field
                                                    v-model="editedItem.protein"
                                                    label="Protein (g)"
                                                ></v-text-field>
                                            </v-col> -->
                                    </v-row>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn type="button" color="primary" @click="close">
                                    Cancel
                                </v-btn>
                                <v-btn color="primary" type="submit" :disabled="!valid" :loading="loading">
                                    Save
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-form>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                        <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn @click="closeDelete">Cancel</v-btn>
                            <v-btn @click="deleteItemConfirm">OK</v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>
        <template v-slot:[`item.startDates`]="{ item }">
            <span v-for="startDate in item.startDates" :key="startDate">
                {{ startDate | formatDate }}<br />
            </span>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
            <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
    </v-data-table>
</v-container>
</template>

<script>
import tourService from "../../services/tour.service";
import validations from "@/utils/Validations";
import {
    format
} from "date-fns";

export default {
    name: "ManageTours",
    data: () => ({
        items: ['foo', 'bar', 'fizz', 'buzz'],
        values: ['foo', 'bar'],
        value: null,

        menu: false,
        dates: ["2021-10-5"],
        loading: false,
        valid: true,

        tours: [],
        dialog: false,
        dialogDelete: false,
        headers: [{
                text: "Name",
                align: "start",
                sortable: false,
                value: "name",
            },
            {
                text: "Duration",
                value: "duration",
            },
            {
                text: "Difficulty",
                value: "difficulty",
            },
            // { text: "Group Size", value: "maxGroupSize" },
            // { text: "Carbs (g)", value: "carbs" },
            // { text: "Protein (g)", value: "protein" },
            {
                text: "Start Dates",
                value: "startDates",
            },
            {
                text: "Actions",
                value: "actions",
                sortable: false,
            },
        ],
        editedIndex: -1,
        editedItem: {},
        defaultItem: {},
        ...validations,
        datePickerStartDates: [],
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? "New Tour" : "Edit Tour";
        },
        startDates: {
            get: function () {
                if (this.editedItem.startDates) {
                    return this.editedItem.startDates.map((el) => {
                        el = format(new Date(el), "YYY-MM-dd");
                        console.log(el, "startDates Formats");
                        return el;
                    });
                } else {
                    return this.datePickerStartDates
                }
            },
            set: function (newValue) {
                if (this.editedItem.startDates) {
                    this.editedItem.startDates = newValue
                } else {
                    this.datePickerStartDates = newValue;
                }
            },
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
        this.getTours();
    },

    methods: {
        async getTours() {
            this.tours = await tourService.getTours();
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

        save(submitEvent) {
            const value = Object.fromEntries(new FormData(submitEvent.target));
            if (value.secretTour == "true") {
                value.secretTour = true;
            } else {
                value.secretTour = false;
            }

            if (this.datePickerStartDates) {
                value.startDates = value.startDates.split(",");
            }

            console.log("formValues", value);
            if (this.editedIndex > -1) {
                Object.assign(this.tours[this.editedIndex], this.editedItem);
            } else {
                this.tours.push(value);
            }
            this.datePickerStartDates = [];
            this.close();
        },
    },
    filters: {
        formatDate: function (value) {
            if (!value) return "";

            value = value.toString();
            // return value.charAt(0).toUpperCase() + value.slice(1);

            return format(new Date(value), "do EEE , MMM, YYY");
        },
    },
};
</script>

<style>
</style>
