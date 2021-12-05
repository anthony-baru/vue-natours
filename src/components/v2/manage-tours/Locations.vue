<template>
        <span>
        <v-autocomplete
                @input.native="(event)=>changeEvent(event)"
                v-model="locations"
                :items="locationsList"
                label="Locations"
                item-value="description"
                item-text="description"
                :loading="loading"
                clearable
                chips
                deletable-chips
                small-chips
                multiple
                return-object
        >

        </v-autocomplete>
    </span>
</template>

<script>
    import axios from "axios";

    export default {
        name: "Locations.vue",
        data() {
            return {
                loading: false,
                // locations:this.$store.state.manageTour.editedItem.locations,
                locationsList:  [],
                access_token: process.env.VUE_APP_MAPBOX_TOKEN,
            }
        },
        computed:{
            locations:{
                get:function () {
                    const locationsArray=this.$store.getters["manageTour/getLocations"]
                    if(locationsArray.length!==0){
                       this.addLocationsList(locationsArray)
                    }
                    return locationsArray
                },
                set:function (newVal) {
                    console.log(newVal)
                    return this.$store.commit("manageTour/setLocations",newVal)
                }
            }
        },
        methods:{
            addLocationsList(locations){
                this.locationsList=[this.locationsList,...locations]
            },
            async changeEvent(event) {
                const searchText = event.target._value
                console.log(searchText)
                this.loading = true
                const locations = await this.forwardGeocode(searchText)
                if(locations){
                    locations.forEach(el=>{
                        if(this.locationsList.indexOf(el.description)==-1) {
                            this.locationsList.push(el)
                        }
                    })
                }

                this.loading = false
            },
            async forwardGeocode(searchText) {
                if (searchText.length < 2) {
                    return
                }
                const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
                    + encodeURIComponent(searchText) + '.json?access_token='
                    + this.access_token + '&limit=4';
                const features = (await axios.get(url)).data.features

                return features.map(el => {
                    return {
                        type: "Point",
                        coordinates: el.center,
                        description: el.place_name,
                        address: el.text
                    }
                })
            }
        },
    }
</script>

<style scoped>

</style>