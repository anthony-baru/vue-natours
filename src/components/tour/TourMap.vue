<template>
    <section class="section-map">
        <div id="map"></div>
    </section>
</template>

<script>
import mapboxgl from "mapbox-gl";
export default {
    name: "TourMap",
    props: ["locations"],
    mounted() {
        mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_TOKEN;
        var map = new mapboxgl.Map({
            container: "map",
            style: "mapbox://styles/anthony-b/cksj1nkw30bla17pj339mqek9",
            scrollZoom: false,
            center: [-118.348602, 34.063403],
            zoom: 10,
        });

        const bounds = new mapboxgl.LngLatBounds();
        this.locations.forEach(function (loc) {
            //create marker
            const el = document.createElement("div");
            el.className = "marker";

            //add marker
            new mapboxgl.Marker({
                element: el,
                anchor: "bottom",
            })
                .setLngLat(loc.coordinates)
                .addTo(map);

            //add pop up
            new mapboxgl.Popup({
                offset: 30,
            })
                .setLngLat(loc.coordinates)
                .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
                .addTo(map);

            //extends map bounds to include current location
            bounds.extend(loc.coordinates);
        });

        map.fitBounds(bounds, {
            padding: {
                top: 200,
                bottom: 150,
                left: 100,
                right: 100,
            },
        });
    },
};
</script>

<style>
</style>