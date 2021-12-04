<template>
    <span>
        <v-autocomplete
                @input.native="(event)=>changeEvent(event)"
                v-model="startLocation"
                :items="locations"
                label="Start Location"
                item-value="description"
                item-text="description"
                :loading="loading"
                clearable
                chips
                deletable-chips
                small-chips
        >

        </v-autocomplete>
    </span>
</template>

<script>
    import axios from "axios";

    export default {
        data() {
            return {
                loading: false,
                access_token: process.env.VUE_APP_MAPBOX_TOKEN,
                locations: [],
            };
        },
        computed: {
            startLocation: {
                get: function () {
                    const startLocationObj = (this.$store.getters["manageTour/getStartLocation"])
                    if (Object.keys(startLocationObj).length !== 0) {
                        this.addLocation(startLocationObj)
                    }
                    const startLocationId = startLocationObj.description || null

                    return startLocationId;
                },
                set: function (val) {
                    let startLocation
                    if (!val) {
                        startLocation = {}
                    } else {
                        startLocation = this.locations.filter(el => {
                            return el.description === val
                        })[0]
                    }
                    return this.$store.commit("manageTour/setStartLocation", startLocation);
                },
            },
        },

        methods: {
            addLocation(location) {
                return this.locations.push(location)
            },
            async changeEvent(event) {
                const searchText = event.target._value
                this.loading = true
                const locations = await this.forwardGeocode(searchText)
                this.locations = locations
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
        }
    };
</script>
