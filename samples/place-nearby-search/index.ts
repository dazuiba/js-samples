/**
 * @license
 * Copyright 2024 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// [START maps_place_nearby_search]
let map;
let markers: google.maps.marker.AdvancedMarkerElement[] = [];
let circles: google.maps.Circle[] = [];
let currentInfoWindow: google.maps.InfoWindow | null = null;

async function initMap() {
    const { Map } = await google.maps.importLibrary('maps') as google.maps.MapsLibrary;

    let center = new google.maps.LatLng(30.263302,120.14336);

    map = new Map(document.getElementById('map') as HTMLElement, {
        center: center,
        zoom: 11,
        mapId: 'DEMO_MAP_ID',
    });

    // Create search button control
    const searchButton = document.createElement('button');
    searchButton.textContent = 'Search Here';
    searchButton.style.cssText = `
        background-color: #fff;
        border: 2px solid #fff;
        border-radius: 3px;
        box-shadow: 0 2px 6px rgba(0,0,0,.3);
        color: rgb(25,25,25);
        cursor: pointer;
        font-family: Roboto,Arial,sans-serif;
        font-size: 14px;
        font-weight: 500;
        margin: 10px;
        padding: 8px 16px;
        text-align: center;
        line-height: 20px;
    `;
    
    // Add hover effect
    searchButton.addEventListener('mouseover', () => {
        searchButton.style.backgroundColor = '#f5f5f5';
    });
    searchButton.addEventListener('mouseout', () => {
        searchButton.style.backgroundColor = '#fff';
    });
    
    // Add click handler
    searchButton.addEventListener('click', () => {
        const currentCenter = map.getCenter();
        if (currentCenter) {
            nearbySearch(currentCenter);
        }
    });
    
    // Add button to map
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(searchButton);
    
    nearbySearch();
}

function clearMapMarkers() {
    // Clear all markers
    markers.forEach(marker => {
        marker.map = null;
    });
    markers = [];
    
    // Clear all circles
    circles.forEach(circle => {
        circle.setMap(null);
    });
    circles = [];
    
    // Close current InfoWindow if it exists
    if (currentInfoWindow) {
        currentInfoWindow.close();
        currentInfoWindow = null;
    }
}

async function nearbySearch(searchCenter?: google.maps.LatLng) {
    // Clear existing markers and circles
    clearMapMarkers();
    const { InfoWindow } = await google.maps.importLibrary('maps') as google.maps.MapsLibrary;
    //@ts-ignore
    const { Place, SearchNearbyRankPreference } = await google.maps.importLibrary('places') as google.maps.PlacesLibrary;
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
    // [START maps_place_nearby_search_request]

    // Use provided center or default center
    let center = searchCenter || new google.maps.LatLng(30.263302,120.14336);
    
    // Extract radius as local variable
    const searchRadius = 25000;

    const request = {
        // required parameters
        fields: ['displayName', 'location', 'businessStatus'],
        locationRestriction: {
            center: center,
            radius: searchRadius, 
        },
        // optional parameters
        includedPrimaryTypes: ['park','hiking_area','historical_landmark','tourist_attraction','campground'],
        maxResultCount: 20,
        rankPreference: SearchNearbyRankPreference.POPULARITY,
        language: 'en-US',
        region: 'us',
    };

    //@ts-ignore
    const { places } = await Place.searchNearby(request);
    // [END maps_place_nearby_search_request]

    // Draw a circle to visualize the search radius
    const circle = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.1,
        map: map,
        center: center,
        radius: searchRadius,
    });
    
    // Store circle for later cleanup
    circles.push(circle);

    if (places.length) {
        console.log(places);

        const { LatLngBounds } = await google.maps.importLibrary("core") as google.maps.CoreLibrary;
        const bounds = new LatLngBounds();

        // Loop through and get all the results.
        places.forEach((place) => {
            const contentString = `
                <div>
                    <h3>${place.displayName}</h3>
                    <p><strong>Business Status:</strong> ${place.businessStatus || 'Unknown'}</p>
                    <p><strong>Location:</strong> ${place.location?.lat}, ${place.location?.lng}</p>
                </div>
            `;

            const infowindow = new InfoWindow({
                content: contentString,
                maxWidth: 200,
            });

            const markerView = new AdvancedMarkerElement({
                map,
                position: place.location,
                title: place.displayName,
            });

            markerView.addListener("click", () => {
                // Close previous InfoWindow if it exists
                if (currentInfoWindow) {
                    currentInfoWindow.close();
                }
                
                // Open new InfoWindow and store reference
                infowindow.open({
                    anchor: markerView,
                    map,
                });
                currentInfoWindow = infowindow;
            });

            // Store marker for later cleanup
            markers.push(markerView);

            bounds.extend(place.location as google.maps.LatLng);
            console.log(place);
        });
    
        map.fitBounds(bounds);

    } else {
        console.log("No results");
    }
}

initMap();
// [END maps_place_nearby_search]

export { };
