/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// [START maps_map_id_style]
function initMap(): void {
  new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      mapId: "8e0a97af9386fef",
      center: { lat: 30.2658, lng: 120.1347 }, zoom: 16,
    } as google.maps.MapOptions
  );
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
// [END maps_map_id_style]
export {};
