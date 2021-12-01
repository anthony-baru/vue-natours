<template>
    <v-container >
        <v-row>
            <v-col cols="12" sm="12" md="6">
                <div id="startLocationMap"></div>
            </v-col>
            <v-col cols="12" sm="12" md="6">

                    <v-combobox name="startLocation" v-model="location" label="Start Location" deletable-chips readonly
                                chips :loading="loading"></v-combobox>

            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import axios from "axios";
    import mapboxgl from "mapbox-gl";
    // import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";


    export default {
        data() {
            return {
                loading: false,
                location: "",
                access_token: process.env.VUE_APP_MAPBOX_TOKEN,
                center: [36.81667, -1.28333],
                map: {},
            };
        },
        mounted() {
            this.createStartLocationMap();

        },
        props: {
            startLocationEdit: {
                type: Object
            },
        },
        computed: {
            startLocation: {
                get: function () {
                    return this.$store.state.profile.startLocation;
                },
                set: function (val) {
                    return this.$store.commit("profile/setStartLocation", val);
                },
            },
        },

        methods: {
            async createStartLocationMap() {
                console.log("createStartLocationMap")
                try {
                    mapboxgl.accessToken = this.access_token;
                    this.map = new mapboxgl.Map({
                        container: "startLocationMap",
                        style: "mapbox://styles/mapbox/streets-v11",
                        center: this.center,
                        zoom: 11,
                    });

                    if (this.startLocationEdit) {
                        console.log('creating init startLocation')
                        this.center = this.startLocationEdit.coordinates
                        this.addLocationToMap();
                        this.getLocation();
                    } else {
                        this.createMarker()
                    }

                    // let geocoder = new MapboxGeocoder({
                    //     accessToken: this.access_token,
                    //     mapboxgl: mapboxgl,
                    //     marker: true,
                    // });

                    // this.map.addControl(geocoder);

                    // geocoder.on("result", (e) => {
                    //     defaultMarker.setLngLat(e.result.center).addTo(this.map);
                    // });
                } catch (err) {
                    console.log("map error", err);
                }
            },
            async getLocation() {
                try {
                    this.loading = true;
                    const response = await axios.get(
                        `https://api.mapbox.com/geocoding/v5/mapbox.places/${this.center[0]},${this.center[1]}.json?access_token=${this.access_token}`
                    );
                    this.loading = false;
                    this.location = response.data.features[0].place_name;
                    const features = response.data.features[0];
                    this.startLocation = {
                        description: features.place_name,
                        type: "Point",
                        address: features.place_name,
                        coordinates: this.center,
                    };
                } catch (err) {
                    this.loading = false;
                    console.log(err);
                }
            },
            addLocationToMap() {
                this.createMarker()
                this.map.flyTo({
                    center: this.center
                })
            },
            createMarker() {
                // const bounds = new mapboxgl.LngLatBounds();

                //create marker
                const el = document.createElement("div");
                el.className = "marker";

                const defaultMarker = new mapboxgl.Marker({
                    element: el,
                    anchor: "bottom",
                    draggable: true,
                })
                    .setLngLat(this.center)
                    .addTo(this.map);

                //add pop up
                // new mapboxgl.Popup({
                //         offset: 30,
                //     })
                //     .setLngLat(this.center)
                //     .setHTML(`${'test'}</p>`)
                //     .addTo(this.map);

                //extends map bounds to include current location
                // bounds.extend(this.center);

                // this.map.fitBounds(bounds, {
                //     padding: {
                //         top: 200,
                //         bottom: 150,
                //         left: 100,
                //         right: 100,
                //     },
                // });

                defaultMarker.on("dragend", async (e) => {
                    this.center = Object.values(e.target.getLngLat());
                    await this.getLocation();
                });

                defaultMarker.on("dragend", async (e) => {
                    this.center = Object.values(e.target.getLngLat());
                    await this.getLocation();
                });
            },
            searchMap() {

            }
        },
        deforeDestroy() {
            console.log('beforeDestroy')
        }
    };
</script>

<style scoped>
    #startLocationMap {
        min-height: 30rem;
    }
</style>
