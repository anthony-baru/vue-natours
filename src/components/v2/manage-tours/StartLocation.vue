<template>
    <v-col
            cols="12"
            class="mapboxgl-map-height"

    >
        <MglMap
                :accessToken="mapboxAccessToken"
                :mapStyle.sync="mapStyle"
                :center="coordinates"
        >
            <MglMarker :coordinates="coordinates" color="blue"/>
        </MglMap>
    </v-col>
</template>

<script>
    import {MglMap, MglMarker} from "vue-mapbox";
    import Mapbox from "mapbox-gl";
    export default {
        name: "StartLocation",
        components: {
            MglMap,
            MglMarker
        },
        data() {
            return {
                mapStyle: "mapbox://styles/mapbox/streets-v11",
                coordinates: [-111.549668, 39.014],
                mapboxAccessToken: process.env.VUE_APP_MAPBOX_TOKEN,
                mapbox:''
            };
        },
        created() {
            // We need to set mapbox-gl library here in order to use it in template
            this.mapbox = Mapbox;
        }
    }
</script>

<style scoped>
.mapboxgl-map-height{
    height: 30rem;

}
    .mapboxgl-canvas-container{
        width: 50%;
    }
</style>