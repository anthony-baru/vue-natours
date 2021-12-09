<template>
<v-dialog v-model="dialog" persistent retain-focus>
    <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on"> New Item </v-btn>
    </template>
    <v-form ref="form" v-model="valid">
        <v-card>
            <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
                <v-container>
                    <v-row>
                        <!-- name -->
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.name" label="Name" :rules="[required(`name`)]"></v-text-field>
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
                        <!-- summary-->
                        <v-col cols="12" >
                            <v-text-field v-model="editedItem.summary" label="Summary"></v-text-field>
                        </v-col>
                        <!-- description-->
                        <v-col cols="12">
                            <v-textarea v-model="editedItem.description" label="Description" ></v-textarea>
                        </v-col>
                        <!--startDates-->
                        <v-col cols="12" sm="12" md="12">
                        <StartDatesSelect v-if="dialog" :startDates="editedItem.startDates"/>
                        </v-col>
                        <!-- start location -->
                        <v-col cols="12" sm="6" md="6">
                            <StartLocation v-if="dialog" :startLocationEdit="editedItem.startLocation"/>
                        </v-col>
                        <!-- locationsMap -->
                        <v-col cols="12" sm="6" md="6">
                            <Locations v-if="dialog"/>
                        </v-col>
                        <!-- image cover -->
                        <v-col cols="12" md="4" v-if="dialog">
                            <ImageCover :existingImageName="editedItem.imageCover" v-if="dialog"/>
                        </v-col>
                        <!--images-->
                        <v-col cols="12" md="8" v-if="dialog" >
                            <Images :existingImages="editedItem.images"/>
                        </v-col>
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
import Locations from "./Locations"
import ImageCover from "./ImageCover";
import Images from "./Images";
import Validations from "../../../utils/Validations";

export default {
    name: "ManageTour",
    components: {
        Images,
        ImageCover,
        Locations,
        StartLocation,
        GuidesSelect,
        StartDatesSelect,
    },

    data(){
       return  {
            valid:true
        }
    },

    props: {
        formTitle: {
            type: String,
        },
        dialogProp: {
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
        dialog:{
            get:function() {
                return this.dialogProp
            },
            set: function(newVal){
                return this.$emit("change-dialog",newVal)
            }
        }
    },

    methods: {
        ...Validations,
        save() {
            console.log("finalEditedItem",this.item)
            this.$refs.form.validate()
            if(this.valid) return this.$emit("save", this.item);
        },
        close() {
            this.$emit("close");
        },
    },
};
</script>

<style></style>
