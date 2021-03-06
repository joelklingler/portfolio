$( document ).ready(function() {
    initMap();
});

function initMap() {

    // Create a map object and specify the DOM element for display.
    var map = new google.maps.Map(document.getElementById('map'), {
        scrollwheel: false,
        zoom: 6,
        disableDefaultUI: true,
        gestureHandling: 'cooperative'
    });


    var styles = [
        {
            featureType: "road",
            elementType: "labels",
            stylers: [
                { visibility: "off" }
            ]
        },
        {
            featureType: "poi",
            elementType: "labels",
            stylers: [
                { visibility: "off" }
            ]
        },
        {
            featureType: "poi",
            elementType: "geometry",
            stylers: [
                { visibility: "off" }
            ]
        },
        {
            featureType: "water",
            elementType: "labels",
            stylers: [
                { visibility: "off" }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
                { "saturation": -100 },
                {
                    elementType: 'labels',
                    stylers: [{visibility: 'off'}]
                },
                { "lightness": -8 },
                { "gamma": 1.18 }]
        }
    ];

    map.setOptions({styles: styles});

    var locations = [
        ['Tomorrowland @ Belgium', 51.091421, 4.385463, 1],
        ['Electric Love @ Austria', 47.823452, 13.175016, 2],
        ['Openair @ St. Gallen', 47.424482, 9.376717, 3],
        ['Sonic @ Wolfwil', 47.269424, 7.823795],
        ['Summerdays @ Arbon', 47.519659, 9.434226],
        ['Holi Gaudy @ Horgen', 47.260742, 8.596363]
    ];

    var infowindow = new google.maps.InfoWindow();
    var bounds = new google.maps.LatLngBounds();

    var pinIcon = new google.maps.MarkerImage(
        'assets/icons/pin.png',
        null,
        null,
        null,
        new google.maps.Size(40, 40)
    );

    var marker, i;

    for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            icon: 'assets/icons/pin.png',
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map
        });

        bounds.extend(marker.position);

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infowindow.setContent(locations[i][0]);
                infowindow.open(map, marker);
            };
        })(marker, i));
    }

    map.fitBounds(bounds);
}