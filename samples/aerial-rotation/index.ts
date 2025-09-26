/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// [START maps_aerial_rotation]
let map: google.maps.Map;

function initMap(): void {
  map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    center: { lat: 30.2658, lng: 120.1347 }, zoom: 16,
    mapTypeId: "satellite",
    heading: 90,
    tilt: 45,
  });

  // add listener to button
  document.getElementById("rotate")!.addEventListener("click", autoRotate);
}

function rotate90(): void {
  const heading = map.getHeading() || 0;

  map.setHeading(heading + 90);
}

function autoRotate(): void {
  // Determine if we're showing aerial imagery.
  if (map.getTilt() !== 0) {
    window.setInterval(rotate90, 3000);
  }
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
// [END maps_aerial_rotation]
export {};
