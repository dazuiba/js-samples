/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// @ts-nocheck TODO remove when fixed

// [START maps_geocoding_place_id]
// Initialize the map.
function initMap(): void {
  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      zoom: 16,
      center: { lat: 30.2658, lng: 120.1347 },
    }
  );
  const geocoder = new google.maps.Geocoder();
  const infowindow = new google.maps.InfoWindow();

  (document.getElementById("submit") as HTMLElement).addEventListener(
    "click",
    () => {
      geocodePlaceId(geocoder, map, infowindow);
    }
  );
}

// This function is called when the user clicks the UI button requesting
// a geocode of a place ID.
function geocodePlaceId(
  geocoder: google.maps.Geocoder,
  map: google.maps.Map,
  infowindow: google.maps.InfoWindow
) {
  const placeId = (document.getElementById("place-id") as HTMLInputElement)
    .value;

  geocoder
    .geocode({ placeId: placeId })
    .then(({ results }) => {
      if (results[0]) {
        map.setZoom(11);
        map.setCenter(results[0].geometry.location);

        const marker = new google.maps.Marker({
          map,
          position: results[0].geometry.location,
        });

        infowindow.setContent(results[0].formatted_address);
        infowindow.open(map, marker);
      } else {
        window.alert("No results found");
      }
    })
    .catch((e) => window.alert("Geocoder failed due to: " + e));
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
// [END maps_geocoding_place_id]
export {};
