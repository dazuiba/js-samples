/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// [START maps_event_arguments]
async function initMap() {
  // Request needed libraries.
  const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
  const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      zoom: 16,
      center: { lat: 30.2658, lng: 120.1347 },
      mapId: "DEMO_MAP_ID",
    }
  );

  map.addListener("click", (e) => {
    placeMarkerAndPanTo(e.latLng, map);
  });
}

function placeMarkerAndPanTo(latLng: google.maps.LatLng, map: google.maps.Map) {
  new google.maps.marker.AdvancedMarkerElement({
    position: latLng,
    map: map,
  });
  map.panTo(latLng);
}

initMap();
// [END maps_event_arguments]
export { };
