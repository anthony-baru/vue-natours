export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiYW50aG9ueS1iIiwiYSI6ImNrc2ltbDNpczB0bTkzMW1icmx0amFvdXUifQ.eb_P9T8qkYC33gjWnHa7gQ';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/anthony-b/cksj1nkw30bla17pj339mqek9',
    scrollZoom: false,
    center: [-118.348602, 34.063403],
    zoom: 10,
  });

  const bounds = new mapboxgl.LngLatBounds();
  locations.forEach(function (loc) {
    //create marker
    const el = document.createElement('div');
    el.className = 'marker';

    //add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
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
};
