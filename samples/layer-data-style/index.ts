/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// [START maps_layer_data_style]
let map: google.maps.Map;

function initMap(): void {
  map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    zoom: 16,
    center: { lat: 30.2658, lng: 120.1347 },
  });

  // [START maps_layer_data_style_script_snippet_load]
  // Load GeoJSON.
  map.data.loadGeoJson(
    "https://storage.googleapis.com/mapsdevsite/json/google.json"
  );
  // [END maps_layer_data_style_script_snippet_load]

  // [START maps_layer_data_style_script_snippet_style]
  // Set the stroke width, and fill color for each polygon
  map.data.setStyle({
    fillColor: "green",
    strokeWeight: 1,
  });
  // [END maps_layer_data_style_script_snippet_style]
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
// [END maps_layer_data_style]
export {};
