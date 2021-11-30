<template>
    <v-container grid-list-xs>
        <v-data-table
            :headers="headers"
            :items="tours"
            :loading="dtLoading"
            loading-text="Loading tours. Please wait."
            sort-by="calories"
            class="elevation-1"
        >
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
                        <v-form
                            ref="crud-form"
                            @submit.prevent="save"
                            v-model="valid"
                            enctype="mulipart/form-data"
                            >encType="multipart/form-data"
                            <v-card>
                                <v-card-title>
                                    <span class="text-h5">{{ formTitle }}</span>
                                </v-card-title>

                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <!-- group size -->
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field
                                                    name="maxGroupSize"
                                                    v-model="editedItem.maxGroupSize"
                                                    label="Group Size"
                                                    type="number"
                                                    :rules="[required('Group Size')]"
                                                >
                                                </v-text-field>
                                                {{ editedItem.maxGroupSize + "hi" }}
                                                <!-- :rules="[required('Group Size')]" -->
                                            </v-col>
                                            <!-- name -->
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field
                                                    name="name"
                                                    v-model="editedItem.name"
                                                    label="Name"
                                                    :rules="[required('Name')]"
                                                ></v-text-field>
                                            </v-col>
                                            <!-- duration -->
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field
                                                    name="duration"
                                                    v-model="editedItem.duration"
                                                    label="Duration"
                                                ></v-text-field>
                                                <!-- :rules="[required('Duration')]" -->
                                            </v-col>
                                            <!-- difficulty -->
                                            <v-col cols="12" sm="6" md="4">
                                                <v-select
                                                    name="difficulty"
                                                    :items="['easy', 'difficult', 'medium', 'hard']"
                                                    label="Difficulty"
                                                    v-model="editedItem.difficulty"
                                                ></v-select>
                                            </v-col>
                                            <!-- secret tour -->
                                            <v-col cols="12" sm="6" md="4">
                                                <v-select
                                                    name="secretTour"
                                                    :items="[true, false]"
                                                    label="Secret Tour"
                                                    v-model="editedItem.secretTour"
                                                ></v-select>
                                            </v-col>

                                            <!-- price -->
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field
                                                    name="price"
                                                    v-model="editedItem.price"
                                                    label="Price"
                                                >
                                                </v-text-field>
                                                <!-- :rules="[required('Price'), floatFormat()]" -->
                                            </v-col>
                                            <!-- guides -->
                                            <v-col cols="12">
                                                <v-autocomplete
                                                    name="guides"
                                                    deletable-chips
                                                    v-model="selectedGuides"
                                                    :items="guides"
                                                    filled
                                                    chips
                                                    color="blue-grey lighten-2"
                                                    label="Select"
                                                    item-text="name"
                                                    item-value="_id"
                                                    multiple
                                                >
                                                    <template v-slot:selection="data">
                                                        <v-chip
                                                            v-bind="data.attrs"
                                                            :input-value="data.selected"
                                                            close
                                                            @click="data.select"
                                                            @click:close="remove(data.item)"
                                                        >
                                                            <v-avatar left>
                                                                <v-img
                                                                    :src="data.item.avatar"
                                                                ></v-img>
                                                            </v-avatar>
                                                            {{ data.item.name }}
                                                        </v-chip>
                                                    </template>
                                                    <template v-slot:item="data">
                                                        <template
                                                            v-if="typeof data.item !== 'object'"
                                                        >
                                                            <v-list-item-content v-text="data.item">
                                                            </v-list-item-content>
                                                        </template>
                                                        <template v-else>
                                                            <v-list-item-avatar>
                                                                <img :src="data.item.avatar" />
                                                            </v-list-item-avatar>
                                                            <v-list-item-content>
                                                                <v-list-item-title
                                                                    v-html="data.item.name"
                                                                >
                                                                </v-list-item-title>
                                                                <!-- <v-list-item-subtitle v-html="data.item.group">
                                                            </v-list-item-subtitle> -->
                                                            </v-list-item-content>
                                                        </template>
                                                    </template>
                                                </v-autocomplete>
                                            </v-col>
                                            <!-- start dates -->
                                            <v-col cols="12">
                                                <v-row>
                                                    <v-col cols="12" sm="6">
                                                        <v-date-picker
                                                            v-model="startDates"
                                                            multiple
                                                        ></v-date-picker>
                                                    </v-col>
                                                    <v-col cols="12" sm="6">
                                                        <v-menu
                                                            ref="menu"
                                                            v-model="menu"
                                                            :close-on-content-click="false"
                                                            :return-value.sync="startDates"
                                                            transition="scale-transition"
                                                            offset-y
                                                            min-width="auto"
                                                        >
                                                            <template
                                                                v-slot:activator="{ on, attrs }"
                                                            >
                                                                <v-combobox
                                                                    name="startDates"
                                                                    v-model="startDates"
                                                                    multiple
                                                                    chips
                                                                    small-chips
                                                                    label="Start Dates"
                                                                    prepend-icon="mdi-calendar"
                                                                    readonly
                                                                    v-bind="attrs"
                                                                    v-on="on"
                                                                ></v-combobox>
                                                            </template>
                                                            <v-date-picker
                                                                v-model="startDates"
                                                                multiple
                                                                no-title
                                                                scrollable
                                                            >
                                                                <v-spacer></v-spacer>
                                                                <v-btn
                                                                    text
                                                                    color="primary"
                                                                    @click="menu = false"
                                                                >
                                                                    Cancel
                                                                </v-btn>
                                                                <v-btn
                                                                    text
                                                                    color="primary"
                                                                    @click="
                                                                        $refs.menu.save(startDates)
                                                                    "
                                                                >
                                                                    OK
                                                                </v-btn>
                                                            </v-date-picker>
                                                        </v-menu>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                            <!-- image cover -->
                                            <v-col>
                                                <v-row>
                                                    <v-col cols="12" md="4">
                                                        <v-file-input
                                                            name="imageCover"
                                                            counter
                                                            multiple
                                                            show-size
                                                            small-chips
                                                            truncate-length="47"
                                                            label="Image Cover"
                                                            hint="Only one image allowed"
                                                        ></v-file-input>
                                                    </v-col>
                                                    <v-col cols="12" md="8">
                                                        <v-file-input
                                                            name="images"
                                                            counter
                                                            multiple
                                                            show-size
                                                            small-chips
                                                            truncate-length="47"
                                                            label="Tour Images"
                                                            hint="Only three images allowed"
                                                        ></v-file-input>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                            <!-- summary -->
                                            <v-col cols="12">
                                                <v-text-field
                                                    name="summary"
                                                    v-model="editedItem.summary"
                                                    label="Summary"
                                                    :rules="[required('Summary')]"
                                                ></v-text-field>
                                            </v-col>
                                            <!-- description -->
                                            <v-col cols="12">
                                                <v-textarea
                                                    name="description"
                                                    label="Description"
                                                    v-model="editedItem.description"
                                                    :rules="[required('Description')]"
                                                    hint="Tour description"
                                                ></v-textarea>
                                            </v-col>
                                            <!-- start location -->

                                            <StartLocationMap
                                                :startLocationEdit="
                                                    editedItem ? editedItem.startLocation : ''
                                                "
                                            />

                                            <!-- locationsMap -->
                                            <AppLocationsMap />
                                        </v-row>
                                    </v-container>
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn type="button" color="primary" @click="close">
                                        Cancel
                                    </v-btn>
                                    <v-btn
                                        color="primary"
                                        type="submit"
                                        :disabled="!valid"
                                        :loading="loading"
                                    >
                                        Save
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-form>
                    </v-dialog>
                    <v-dialog v-model="dialogDelete" max-width="500px">
                        <v-card>
                            <v-card-title class="text-h5"
                                >Are you sure you want to delete this item?</v-card-title
                            >
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
                <router-link :to="{ name: 'Tour', params: { id: item.id } }">
                    <v-icon small class="mr-2"> mdi-eye </v-icon>
                </router-link>
                <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
                <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
            </template>
        </v-data-table>
    </v-container>
</template>

<script>
import tourService from "../../services/tour.service";
import userService from "../../services/user.service";
import validations from "@/utils/Validations";
import { format } from "date-fns";

import StartLocationMap from "../../components/profile/StartLocationMap.vue";
import AppLocationsMap from "../../components/profile/LocationsMap.vue";

export default {
    name: "ManageTours",
    components: {
        StartLocationMap,
        AppLocationsMap,
    },
    data: () => ({
        dtLoading: false,
        chosenGuides: [],

        guides: [],

        menu: false,
        dates: ["2021-10-5"],
        loading: false,
        valid: true,

        tours: [],
        dialog: false,
        dialogDelete: false,
        headers: [
            {
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
                    return this.datePickerStartDates;
                }
            },
            set: function (newValue) {
                if (this.editedItem.startDates) {
                    this.editedItem.startDates = newValue;
                } else {
                    this.datePickerStartDates = newValue;
                }
            },
        },
        selectedGuides: {
            get: function () {
                if (this.editedItem.guides) {
                    let guides = this.editedItem.guides.map((el) => {
                        return el._id;
                    });
                    this.chosenGuides = guides; // eslint-disable-line
                    return guides;
                } else {
                    return this.chosenGuides;
                }
            },
            set: function (newValue) {
                if (this.editedItem.guides) {
                    return (this.chosenGuides = newValue);
                } else {
                    return this.chosenGuides;
                }
            },
        },
    },

    watch: {
        dialog(val) {
            val || this.close();
            this.resetChosenGuides();
        },
        dialogDelete(val) {
            val || this.closeDelete();
        },
    },

    created() {
        this.getTours();
        this.getGuides();
    },

    methods: {
        async getTours() {
            this.dtLoading = true;
            let tours = await tourService.getTours();
            this.tours = tours;
            this.dtLoading = false;
        },
        async getGuides() {
            const users = await userService.getUsers();

            if (users) {
                const guides = await users.filter((el) => {
                    return el.role == "guide" || el.role == "lead-guide";
                });

                guides.map((el) => {
                    return (el.avatar =
                        process.env.VUE_APP_API_BASE_URL + "/img/users/" + el.photo);
                });
                console.log(guides, "avatarCheck");
                this.guides = guides;
            }
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

        resetChosenGuides() {
            this.chosenGuides = [];
        },

        remove(item) {
            const index = this.selectedGuides.indexOf(item._id);
            if (index >= 0) this.selectedGuides.splice(index, 1);
        },

        async save(submitEvent) {
            const formData = new FormData(submitEvent.target);
            const value = Object.fromEntries(formData);
            if (value.secretTour == "true") {
                value.secretTour = true;
            } else {
                value.secretTour = false;
            }

            if (this.datePickerStartDates) {
                value.startDates = value.startDates.split(",");
            }

            if (this.chosenGuides) {
                value.guides = value.guides.split(",");
            }
            value.startLocation = this.$store.state.profile.startLocation;

            value.locations = this.$store.state.profile.locations;
            console.log(value, "finalFormValue");
            if (this.editedIndex > -1) {
                Object.assign(this.tours[this.editedIndex], this.editedItem);
            } else {
                try {
                    const createdTour = await tourService.addTour(value);
                    this.tours.push(createdTour);
                    this.$toast.success("Tour added successfully");
                } catch (error) {
                    this.$toast.error(error.response.data.message);
                }
            }
            this.datePickerStartDates = [];
            this.$store.state.profile.locations = [];
            this.resetChosenGuides;
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

<style></style>
