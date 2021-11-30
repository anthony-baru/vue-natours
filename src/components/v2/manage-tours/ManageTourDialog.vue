<template>
<v-dialog v-model="dialog" persistent retain-focus>
    <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on"> New Item </v-btn>
    </template>
    <v-form>
        <v-card>
            <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
                <v-container>
                    <v-row>
                        <!-- name -->
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
                        </v-col>
                        <!-- difficulty -->
                        <v-col cols="12" sm="6" md="4">
                            <v-select name="difficulty" :items="['easy','medium', 'difficult','hard']" label="Difficulty" v-model="editedItem.difficulty"></v-select>
                        </v-col>
                        <!-- price -->
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.price" label="Price"></v-text-field>
                        </v-col>
                        <!-- duration -->
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.duration" label="Duration"></v-text-field>
                        </v-col>
                        <!-- max group size -->
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.maxGroupSize" label="Group size"></v-text-field>
                        </v-col>

                        <!-- guides -->
                         <GuidesSelect v-if="dialog" :tourGuides="editedItem.guides"/>
                        <!--startDates-->
                        <StartDatesSelect v-if="dialog" :startDates="editedItem.startDates"/>
                        <!-- image cover -->
                        <!-- summary -->
                        <!-- start location -->
                        <StartLocation v-if="dialog"/>
                        <!-- locationsMap -->
                    </v-row>
                </v-container>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
            </v-card-actions>
        </v-card>
       
    </v-form>
</v-dialog>
</template>

<script>
import GuidesSelect from '@/components/v2/manage-tours/GuidesSelect'
import StartDatesSelect from '@/components/v2/manage-tours/StartDatesSelect'
import StartLocation from "./StartLocation";

export default {
    name: "ManageTour",
    components: {
        StartLocation,
        GuidesSelect,
        StartDatesSelect
    },
    
    props: {
        formTitle: {
            type: String,
        },
        dialog: {
            type: Boolean,
        },
        item: {
            type: Object,
        },
    },
    computed: {
        editedItem() {
            return this.item;
        },
    },

    methods: {
        save() {
            this.$emit("save", this.item);
        },
        close() {
            this.$emit("close");
        },
    },
};
</script>

<style></style>
