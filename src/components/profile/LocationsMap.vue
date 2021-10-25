<template>
<v-col cols="12">
    <v-row>
        <v-col>
            <div id="locationsMap"></div>
        </v-col>
        <v-col>
            <v-row>
                <v-combobox name="locations" v-model="locations" item-text="description" item-value="id" return-object multiple label="Locations" deletable-chips readonly chips :loading="loading"></v-combobox>
            </v-row>
        </v-col>
    </v-row>
</v-col>
</template>

<script>
import axios from "axios";
import mapboxgl from "mapbox-gl";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import {
    mapGetters,
    mapMutations
} from "vuex";
export default {
    data() {
        return {
            markers: [],
            items: [],
            map: {},
            access_token: process.env.VUE_APP_MAPBOX_TOKEN,
            center: [36.81667, -1.28333],
            loading: false,
        };
    },
    mounted() {
        this.renderMap();
        console.log(this.getLocations, "");
    },
    computed: {
        ...mapGetters({
            locations: "profile/getLocations",
        }),
    },
    methods: {
        renderMap() {
            mapboxgl.accessToken = this.access_token;
            this.map = new mapboxgl.Map({
                container: "locationsMap",
                style: "mapbox://styles/mapbox/streets-v11",
                center: this.center,
                zoom: 11,
            });
            this.addLocationOnClick();
        },
        async addLocationOnClick() {
            this.map.on("click", (e) => {
                //create marker
                const el = document.createElement("div");
                el.className = `marker ${Object.values(e.lngLat)[0]}`;
                const marker = new mapboxgl.Marker({
                    element: el,
                    draggable: true,
                });

                el.addEventListener("click", (markerElementEvent) => {
                    markerElementEvent.stopPropagation();

                    this.removeMarker(marker, Object.values(e.lngLat));
                });

                marker.setLngLat(e.lngLat).addTo(this.map);

                // setTimeout(() => {
                //     marker.remove()
                // }, 3000);

                this.getLocation(Object.values(e.lngLat));
            });
        },
        async getLocation(coordinates) {
            try {
                console.log(coordinates);
                this.loading = true;
                const response = await axios.get(
                    `https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates[0]},${coordinates[1]}.json?access_token=${this.access_token}`
                );
                this.loading = false;

                const features = response.data.features[0];
                console.log("features", features);
                const location = {
                    id: coordinates.toString(),
                    description: features.place_name,
                    type: "Point",
                    coordinates: coordinates,
                    day: 2,
                };

                this.setLocations(location);
            } catch (err) {
                this.loading = false;
                console.log(err);
            }
        },
        removeMarker(marker, coordinates) {
            console.log("removing coordinates", coordinates);
            const coord = this.locations.filter((el) => {
                return el.coordinates.sort().toString() == coordinates.sort().toString();
            });
            this.locations.splice(this.locations.indexOf(coord[0].id), 1);
            //    const locationIndex = this.locations.indexOf(coordinates)
            //    console.log(locationIndex)
            //     if (locationIndex !== -1) {
            //         this.locations.splice(locationIndex, 1);
            //     }
            console.log("attempting removal");
            marker.remove();
        },
        ...mapMutations({
            setLocations: "profile/setLocations",
        }),
    },
    watch: {
        // locations(val, prev) {
        //     if (val.length === prev.length) return;
        //     this.model = val.map((v) => {
        //         if (typeof v === "string") {
        //             v = {
        //                 text: v,
        //             };
        //             this.items.push(v);
        //         }
        //         return v;
        //     });
        // },
    },
};
</script>

<style></style>
