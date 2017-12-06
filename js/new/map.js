<!-- Display the Map Rick -->
// function parameter names end in "_in" to differentiate them from function
// variables

/*
 * Facility Object
 * ---------------
 * Display Name: string
 * Location:{ lat: real, lng: real }
 *
 * Icons pass to the marker, car-dealer is good car to use as a Parking Icon
 * DO: find icon or bus or bus stops
 * https://stackoverflow.com/questions/3440137/google-maps-api-adding-letters-to-my-markers-on-my-google-map
 */

 /*****************************************************************************/
 /*************
  * UTILITIES *
  *************/

function equalLatLng( LatLng_1_a, LatLng_2_a ) {
   return ( LatLng_1_a.lat === LatLng_2_a.lat &&
            LatLng_1_a.lng === LatLng_2_a.lng );
}
/*****************************************************************************/

  /////////
 // Map //
/////////
// Google Map API map
var map; // initialized and put on the html page by function initMap()
var directionsDisplay;

// These are the parameters for the initial display of the map.
// Declaring them separately makes it easy to re-center the map.
//  var origMapCenter = new google.maps.LatLng( {lat: 41.3326, lng: -72.9475} );
var origMapCenter;
var origZoom = 16;

var POS_SCHOOL_NAME = new google.maps.LatLng( 41.333500, -72.943050 );

/****************
 *  Multi-Zoom  *
 ****************/
// Multi-Zoom indicies
var FULL_CAMPUS   = 0;
var ACADEMIC_CORE = 1;

function ZoomLevel( zoom_a, lat_a, lng_a ) {
  this.zoom = zoom_a;
  this.center = { lat: lat_a, lng: lng_a };
}
function otherZoom() {
  currentZoom = ( currentZoom + 1 ) % 2;
}

var zoomLevel = [];
var currentZoom = ACADEMIC_CORE;

zoomLevel[ FULL_CAMPUS   ] = new ZoomLevel( 16, 41.334450, -72.948200 );
zoomLevel[ ACADEMIC_CORE ] = new ZoomLevel( 17, 41.333800, -72.945750 );


  /////////////
 // Markers //
/////////////

// marker indicies
var BUILDING_INDEX = 0;
var PERSON_INDEX   = 1;
var CAR_INDEX      = 2;
var LOT_INDEX      = 3;
var MARKER_COUNT   = 4;               <!-- rph 2017-10-21 -->
var FIRST_PARKING_LOT = MARKER_COUNT; <!-- rph 2017-10-27 -->
var BUS_STOPS      = MARKER_COUNT;
//  marker[ 3 ... n ] list of paring lots of a specfic class

// holds the three singleton markers that can be placed on the map
// additional markers are added by extending the array,
//   parking lot classes, bus stops
var marker = new Array( MARKER_COUNT ); <!-- rph 2017-10-21 -->
/*  var marker = []; // initialdesign */

  /////////////////
 // Geolocation //
/////////////////

  /////////////
 // Compass //
/////////////
/*
 * has to be hosted online
 * lots of free hosting
 * get a compass heading [0..359]
 * Compass icon to display::  (heading +1) div 3
 * https://www.google.com/intl/en_ALL/mapfiles/dir_0.png
 */

/*****************************************************************************/
/*****************************************************************************/

/**********************
 * Map                *
 **********************/
// runs once after the html page loads
//   initializes the map
//   puts the map in the DOM, ref. "document.getElementById( 'map' )"
// includes the directions javascript and functions


/* google.maps.Map can also take as a 4th parameter:
     mapTypeId: 'roadmap' | 'satellite' | 'hybrid' | 'terrain' */
<!-- Google gave this position {41.3326° N, 72.9475° W} -->
<!-- using { center: {lat: 41.3326, lng: 72.9475}, showed Europe, so make it -72.9475, 'West' is negative -->

function initMap() {
  map = new google.maps.Map( document.getElementById( 'map' ),
//  { center: { lat: 41.334450, lng: -72.948200 },
//    zoom: origZoom,
    { center: { lat: 41.333800, lng: -72.945350 },
      zoom: 16,
      styles: [ { "featureType": "poi", "stylers": [ { "visibility": "off" } ] } ]
    }
  ); // new google.maps.Map()
  origMapCenter = map.getCenter();

 AddOverlaysToMap(); // David's code refactored and put into Vector.js

  // Google Direction Service // Stephen 2017-10-15
  var directionsService = new google.maps.DirectionsService;
      directionsDisplay = new google.maps.DirectionsRenderer;
  directionsDisplay.setMap( map );
  var onChangeHandler = function() {
        calculateAndDisplayRoute( directionsService, directionsDisplay );
        // application specific function, see below
      };
  document.getElementById( 'start' ).addEventListener( 'change', onChangeHandler );
  document.getElementById( 'end'   ).addEventListener( 'change', onChangeHandler );

  // Custom Label
  // from https://stackoverflow.com/questions/3953922/is-it-possible-to-write-custom-text-on-google-maps-api-v3
  // comment 1
  var mapLabel = new MapLabel( {
             text: 'Southern Connecticut\nState University',
             position: POS_SCHOOL_NAME,
             map: map,
             fontSize: 20,
             align: 'right'
           } );


} /* function initMap() */




/*****************************************************************************/
/******* GOOGLE DIRECTION SERVICE ********************************************/
/*****************************************************************************/

// 2017-10-15 Stephen: created
// 2017-10-19 Rick: logic to not call directionsService in certain situations
// 2017-11-03 Rick: web page sends array index as text, e.g.. "EARL_HALL",
//                  eval() turns it into a number and the data is pulled out of
//                  the faclity array via that number
function calculateAndDisplayRoute( directionsService, directionsDisplay ) {
  // web page returns a Facility[] index as text {"EARL_HALL"}, eval() turns
  // that into a number {42}, {lat, lng} is pulled out of Facility[]

  /// initialize geolocation
  getGeolocation()

  var startText = document.getElementById( 'start' ).value;
  var endText   = document.getElementById( 'end' ).value;

  if ( startText === '' || endText === '' ) {
    removeRoute(); // ? should we do this?
  } else {
    var startValue = facilityPosition( eval( startText ) );
    var endValue   = facilityPosition( eval( endText ) );

  // do not trigger if either box is empty, or both are the same
  if ( startValue !== '' && endValue !== '' && !equalLatLng( startValue, endValue ) ) {
//  if ( startValue !== '' && endValue !== '' && startValue !== endValue ) {
    directionsService.route(
      {
        origin: startValue,    // document.getElementById('start').value,
        destination: endValue, // document.getElementById('end').value,
        travelMode: 'WALKING'
      },
      function( response, status ) {
        if ( status === 'OK' ) { directionsDisplay.setDirections( response ); }
                          else { window.alert( 'Directions request failed due to ' + status ); }
      }
    ); // directionsService.route()
  } // if ( startName and endName ...
  else {
    removeRoute(); // ? should we do this?
 // directionsDisplay.setDirections( { routes: [ ] } );
  }
  } // if ( startText !== '' &&
} /*end of function calculateAndDisplayRoute */

function removeRoute() {
  directionsDisplay.setDirections( { routes: [ ] } );
}

/*****************************************************************************/
/*****************************************************************************/



 /*****************************************************************************/
 /******* DISPLAY USER LOCATION MARKER ****************************************/
 /*****************************************************************************/
 // used to store user locations as a marker
   // called in Geolocation function
   // marker will not interfere with other marker types

function displayPersonMarker( facilityIndex_in ) {

  // adding info window and setting content
    var infowindow = new google.maps.InfoWindow();
    infowindow.setContent( facility[ facilityIndex_in ].infowindow );

  // get the map coordinates for the facility
    var location = { lat: facility[ facilityIndex_in ].latitude,
                     lng: facility[ facilityIndex_in ].longitude };

    var typeIndex = PERSON_INDEX;

  // sets custom icon
    var icon = facility[ facilityIndex_in ].icon

  // // hide the displayed marker for that facility type
    hideMarker( typeIndex );

    createMarker( location, typeIndex, infowindow, icon );

    showMarker( typeIndex );
  }

/*****************************************************************************/
/*****************************************************************************/


/*****************************************************************************/
/******* DISPLAY PARKED CAR MARKER *******************************************/
/*****************************************************************************/
// used to create a draggable marker to store parked car location
  // marker will not interfere with other marker types

  function displayParkedCarMarker( facilityIndex_in ) {

  //   adding info window and setting content
    var infowindow = new google.maps.InfoWindow();
    infowindow.setContent( facility[ facilityIndex_in ].infowindow );

    // get the map coordinates for the facility
    var location = { lat: facility[ facilityIndex_in ].latitude,
                     lng: facility[ facilityIndex_in ].longitude };

    var typeIndex = CAR_INDEX;

    var icon = facility[ facilityIndex_in ].icon

    hideMarker( typeIndex );

    createCarMarker( location, typeIndex, infowindow, icon );

    showMarker( typeIndex );
  }

// creates the draggable marker
  function createCarMarker( location_in, index_in, infowindow_in, icon_in ) {

    var mark = new google.maps.Marker( { position: location_in, icon: icon_in, map: map, draggable:true } );
    marker[ index_in ] = mark;

  //  adding click function to marker to open infowindow
    google.maps.event.addListener( mark, 'click',
                                  function() { infowindow_in.open( map, this ); }
    );
  }

/****************************************************************************/
/****************************************************************************/


/*****************************************************************************/
/******* DISPLAY FACILITY MARKERS ********************************************/
/*****************************************************************************/

// 2017-10-20 Rick, new routine for the Direction Service lists
// 2017-10-20+ Sephen, add infowindowfor arker
function displayFacilityMarker( facilityIndex_in /* , typeIndex_in */ ) {
// displays Buildings, Parked Car and Person locatins handled elsewhere
// ----------------------------------
// facilityIndex_in is the index for facility[] for Facility to display
// ----------------------------------

//   adding info window and setting content
  var infowindow = new google.maps.InfoWindow();
  infowindow.setContent( facility[ facilityIndex_in ].infowindow );

  // get the map coordinates for the facility
// var location = { lat: 41.333704, lng: -72.945826 };
  var location = { lat: facility[ facilityIndex_in ].latitude,
                   lng: facility[ facilityIndex_in ].longitude };

  // display a building or a parking lot?
  // No. Parking lots will be displayed by Class of Lot; Faculty, Commuter, etc.
  var typeIndex = BUILDING_INDEX; // assume it is a building
  //  if ( ( facilityIndex_in >= parkingIndexRange.min ) &&
  //       ( facilityIndex_in <= parkingIndexRange.max ) ) {
  //    // all the parking lots are contiguous
  //    typeIndex = carIndex;
  //  }

  var icon = facility[ facilityIndex_in ].icon

  hideMarker( typeIndex );       // hide the displayed marker for that facility type

  createMarker( location, typeIndex, infowindow, icon );  // create the marker at
                                        // location of typeIndex

  showMarker( typeIndex );              // show the marker at of type typeIndex
} // function displayFacilityMarker(

  /*****************************************************************************/
  /*****************************************************************************/



/*****************************************************************************/
/******* DISPLAY PARKING GARAGE MARKERS **************************************/
/*****************************************************************************/
  // Used to create the markers for the individual parking garages
    // Drops marker on the garages while erasing any exisiting parking markers
    // Does not affect other marker types

 function displayParkingMarker( facilityIndex_in ) {

 // remove any current parking lot markers
  hideRemoveParkingMarkers();

 // adding info window and setting content
   var infowindow = new google.maps.InfoWindow();
   infowindow.setContent( facility[ facilityIndex_in ].infowindow );

 // get the map coordinates for the parking garage
   var location = { lat: facility[ facilityIndex_in ].latitude,
                    lng: facility[ facilityIndex_in ].longitude };

   var typeIndex = LOT_INDEX;

 // setting custom marker icon for the
   var icon = facility[ facilityIndex_in ].icon

 // hide the displayed marker for that facility type
   hideMarker( typeIndex );

 // create marker
   createMarker( location, typeIndex, infowindow, icon );

// show the marker at of type typeIndex
   showMarker( typeIndex );
 }

 /*****************************************************************************/
 /*****************************************************************************/


/*****************************************************************************/
/******* DISPLAY PARKING LOT MARKERS BY CLASS ********************************/
/*****************************************************************************/

function hideRemoveParkingMarkers() {
  /*********************************************
   * hide any marked parking lots              *
   * remove parking lot markers from the array *
  **********************************************/
  if ( marker.length > MARKER_COUNT ) { // parking lots have been PUSHed
                                        // onto array

    // hide parking lot markers from the map
    var i = FIRST_PARKING_LOT; // first added parking lot
    var len = marker.length;   // number of markers, # of parking lots + 3
    for( ; i < len; i = i + 1 ) {
      hideMarker( i );
    }

    // remove the parking lot markers from the array
    removeMarker( );

  } // if ( marker.length > ...
} // hideRemoveParkingMarkers()

function displayParkingMarkersByClass( parkingSubClass_in ) {
// displays Building and Parking Lots
// ----------------------------------
// facilityIndex_in is the index for facility[] for Facility to display
// ----------------------------------

  hideRemoveParkingMarkers(); // remove any displayed set of parking lots

  // create markers & PUSH them on the array, display markers
  var facilityIndex = 0; // Facility loop index [0..FACILITY_COUNT]
  var markerIndex = FIRST_PARKING_LOT;
  for( ; facilityIndex < FACILITY_COUNT; facilityIndex++ ){
    if ( facility[ facilityIndex ].class === FACILITY_CLASS_PARKING &&
         facility[ facilityIndex ].subClass.indexOf( parkingSubClass_in ) > -1 ) {
           var infowindow = new google.maps.InfoWindow();
           infowindow.setContent( facilityInfowindow( facilityIndex ));
      createMarker( facilityPosition( facilityIndex ), markerIndex, infowindow, facilityIcon( facilityIndex ) );
      //showMarker( markerIndex ); // show the marker at index markerIndex
      // ready for next marker
      markerIndex = markerIndex + 1;
    } // if ( facility[ facilityIndex ].class ...
  } // for( ; facilityIndex < FACILITY_COUNT; ...

} // function displayParkingMarkersByClass( ...)

/*****************************************************************************/
/*****************************************************************************/


/*****************************************************************************/
/******* DISPLAY BUS STOP MARKERS BY CLASS ***********************************/
/*****************************************************************************/

function hideRemoveBusMarkers() {

  if ( marker.length > MARKER_COUNT ) {

    var i = BUS_STOPS;
    var len = marker.length;
    for( ; i < len; i = i + 1 ) {
      hideMarker( i );
    }

    removeMarker( );
  }
}

function displayBusMarkersByClass( busSubClass_in ) {

  hideRemoveBusMarkers();

  var facilityIndex = 0; // Facility loop index [0..FACILITY_COUNT]
  var markerIndex = BUS_STOPS;
  for( ; facilityIndex < FACILITY_COUNT; facilityIndex++ ){
    if ( facility[ facilityIndex ].class === FACILITY_CLASS_BUSSTOP &&
         facility[ facilityIndex ].subClass.indexOf( busSubClass_in ) > -1 ) {
           var infowindow = new google.maps.InfoWindow();
           infowindow.setContent( facilityInfowindow( facilityIndex ));
      createMarker( facilityPosition( facilityIndex ), markerIndex, infowindow, facilityIcon( facilityIndex ) );

      markerIndex = markerIndex + 1;
    }
  }
}

/*****************************************************************************/
/*****************************************************************************/


/*****************************************************************************/
/*******  OTHER FUNCTIONS ****************************************************/
/*****************************************************************************/

function createMarker( location_in, index_in, infowindow_in, icon_in ) {
  /*
  var mark = new google.maps.Marker( { position: location_in, map: map, label: {
          color: 'black',
          fontWeight: 'bold',
          fontSize: '10px',
          text: '12B'
        } } );
        */
  var mark = new google.maps.Marker( { position: location_in, icon: icon_in, map: map } );
  marker[ index_in ] = mark;

  //  adding click function to marker to open infowindow
  google.maps.event.addListener( mark, 'click',
                                function() { infowindow_in.open( map, this ); }
  );
}

// Show Marker Routines
//   Display a Marker on the map
function showBuilding() {
  showMarker( buildingIndex );
}
function showPerson() {
  showMarker( personIndex );
}
function showCar() {
  showMarker( carIndex );
}
//   (should not be called except by the 3 routines above)
function showMarker( index_in ) {
  marker[ index_in ].setMap( map );
}

// Hide Facility Routines
//   Remove Facilites on the map
function hideBuilding() {
  hideMarker( BUILDING_INDEX );
}
function hidePerson() {
  hideMarker( PERSON_INDEX );
}
function hideCar() {
  hideMarker( CAR_INDEX );
}
function hideLot() {
  hideMarker( LOT_INDEX );
}
//   (should not be called except by the 3 routines above)
  function hideMarker( index_in ) {
    if ( marker[ index_in ] != null ) {
      marker[ index_in ].setMap( null );
    }
  }

  function hideAllMarkers() {
    hideBuilding(); // hide Building Marker
    hidePerson();   // hide Persan Marker
    hideCar();      // hide Car Marker
    hideLot();
    hideRemoveParkingMarkers(); // hide all Parking Lot markers
    hideRemoveBusMarkers();

    // 2017-11-05 Rick, clear off any route on the map
    removeRoute();
}

  function removeMarker( ) {
    // remove excess markers from the array
    var i = marker.length;
    // MARKER_COUNT; // first added parking lot
    for( ; i > MARKER_COUNT; i = i - 1 ) {
      marker.pop();
    }
  }

  function reSetMap() {
  // restore the map to its initial state, do not touch existing markers
    reCenterMap();
    reZoomMap();
  } // reSetMap())
  //   (should not be called except by the routine above)
  function reCenterMap() {
        //  map.setCenter({ lat: yourLat, lng: yourLng })
    map.setCenter( origMapCenter );
  } // reCenterMap()
  function reZoomMap() {
    map.setZoom( origZoom );
  } //reZoomMap()

// used to initialize the geolocation and get the users location without doing anything
  // used for directions
  function getGeolocation() {
    if ( navigator.geolocation ) {
      navigator.geolocation.getCurrentPosition( function( position ) {
        facility[ GEO_LOC ].latitude = position.coords.latitude
        facility[ GEO_LOC ].longitude = position.coords.longitude
      })
    }
  }
  /*****************************************************************************/
  /*****************************************************************************/




/*****************************************************************************/
/******* Geolocation *********************************************************/
/*****************************************************************************/
// Try HTML5 geolocation.
var Geoloc_Failed       = 0;
var Geoloc_NotSupported = 1;
var Geoloc_NotOnMap     = 2; // future functionality, person off screen

function doGeolocation() {
  var infoWindow = new google.maps.InfoWindow( { content: 'empty' } );
  if ( navigator.geolocation ) {
      navigator.geolocation.getCurrentPosition( function( position ) {

      /* Updating coordinates to current location*/
        facility[ GEO_LOC ].latitude = position.coords.latitude
        facility[ GEO_LOC ].longitude = position.coords.longitude

        displayPersonMarker ( GEO_LOC )


        // if the user is not ON the SCSU map, tell hir
        // check if on campus
        //  infoWindow.setPosition( pos );
        //  infoWindow.setContent( 'Location found.' );
        //  infoWindow.open( map ); // opens infoWindow
        // if pos not on map {
        //   handleLocationError( Geoloc_NotOnMap, infoWindow, map.getCenter() );
        // }
        /* map.setCenter(pos);  // we do not want to center the map */
      },
      function() { // checkback function to handle error
        handleLocationError( Geoloc_Failed, infoWindow, map.getCenter() );
      },
      {timeout:10000}
    ); // navigator.geolocation.getCurrentPosition()
  } else {
      // Browser does not support Geolocation
      handleLocationError( Geoloc_NotSupported, infoWindow, map.getCenter() );
  } // if (navigator.geolocation)
} // function doGeolocation


  // Set routines apply a value to an object field
  // Get routines return the value in an object field
  // Init routines are higher level

// Display an error messagei in an infowindow
function handleLocationError( geoLocError_in, infoWindow_in, pos_in ) {
  var errorMessage = "";

  switch( geoLocError_in ) {
    case Geoloc_Failed:
      errorMessage = 'Error: The Geolocation service failed.';
      break;
    case Geoloc_NotSupported:
      errorMessage = 'Error: Your browser does not support geolocation.';
      break;
    case Geoloc_NotOnMap:
      errorMessage = 'Notice: You are curently off campus.';
      break;
    default:
      errorMessage = 'Error: Impossible Geolocation Error: >' + geoLocError_in + '<';
  }

  initInfoWindow( infoWindow_in, pos_in, errorMessage );
  showInfoWindow( infoWindow_in );
} // function handleLocationError(


/////////////////////////
// InfoWindow Routines //
/////////////////////////
function initInfoWindow( infoWindow_in, pos_in, message_in ){
  infoWindow_in.setPosition( pos_in );
  infoWindow_in.setContent( message_in );
}
function showInfoWindow( infoWindow_in ){
  infoWindow_in.open( map );
}


/*****************************************************************************/
/*****************************************************************************/



/*****************************************************************************/
/******* HTML Menu Routines **************************************************/
/*****************************************************************************/

//10-20-17 Stephen created dropdown toggle
/* When the user clicks on the button, toggle between hiding and showing the dropdown content */
function classrooms_Dropdown() {
    document.getElementById("classrooms_dropDownMenu").classList.toggle("show");
}

function buildings_Dropdown() {
    document.getElementById("buildings_dropDownMenu").classList.toggle("show");
}

function parking_lots_Dropdown() {
    document.getElementById("parking_lots_dropDownMenu").classList.toggle("show");
}

function other_Dropdown() {
    document.getElementById("other_dropDownMenu").classList.toggle("show");
}

/*****************************************************************************/
/*****************************************************************************/
