/* Display the Map Rick */
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
// var origMapCenter;
//dead//var origZoom = 16;

var POS_SCHOOL_NAME = new google.maps.LatLng( 41.333570, -72.943050 );

  /////////////
 // Markers //
/////////////

// marker layers
var SINGLETON_LAYER = 0;
var PARKING_LAYER   = 1;
var BUS_LAYER       = 2;
var COMPLAB_LAYER   = 3;

// marker[0] indicies
var BUILDING_INDEX = 0;
var PERSON_INDEX   = 1;
var CAR_INDEX      = 2;
//var MARKER_COUNT   = 3;               <!-- rph 2017-10-21 -->
//var FIRST_PARKING_LOT = MARKER_COUNT; <!-- rph 2017-10-27 -->
//  marker[ 3 ... n ] list of paring lots of a specfic class

// holds the three singleton markers that can be placed on the map
// additional markers are added by extending the array,
//   parking lot classes, bus stops

var marker      = []; // was = new Array( MARKER_COUNT ); <!-- Rick 2017-10-21 -->
var PLotMarker  = []; // Parking Lot and Bus Stop bulk markers need their own
var BStopMarker = []; // arrays
var CLabMarker  = []; // <- future


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
/*  Google gave this position { 41.3326° N, 72.9475° W } */
/* using { center: { lat: 41.3326, lng: 72.9475 }, showed Europe, so make it -72.9475, 'West' is negative */

function initMap() {
  map = new google.maps.Map( document.getElementById( 'map' ),
//  { center: { lat: 41.334450, lng: -72.948200 },
    { center: mapZoom[ currentZoom ].centerLatLng, // Rick 2017-11-11 { lat: 41.333800, lng: -72.945350 },
      zoom:   currentZoom,                         // Rick 2017-11-11  origZoom
      styles: [ { "featureType": "poi", "stylers": [ { "visibility": "off" } ] } ]
    }
  ); // new google.maps.Map()
  //origMapCenter = map.getCenter();

 AddOverlaysToMap(); // David's code refactored and put into Vector.js

  // Google Direction Service // Stephen 2017-10-15
  var directionsService = new google.maps.DirectionsService();

  // needs to be global
      directionsDisplay = new google.maps.DirectionsRenderer();

  // Directions - Shortest Path
  directionsDisplay.setMap( map );
  var onChangeHandler = function() {
        calculateAndDisplayRoute( directionsService, directionsDisplay );
        // application specific function, see below
  };
  document.getElementById( 'start' ).addEventListener( 'change', onChangeHandler );
  document.getElementById( 'end'   ).addEventListener( 'change', onChangeHandler );

  // Multi-Zoom, map xooms to Full Camopus or just Acedemic Core
  document.getElementById( 'ZoomButton' ).addEventListener( "click", newMapZoom );

  // Custom Labels
  // Add SCSU's name
  // from https://stackoverflow.com/questions/3953922/is-it-possible-to-write-custom-text-on-google-maps-api-v3
  // comment 1
  var mapLabel = new MapLabel( {
             text: 'Southern Connecticut\nState University',
             position: POS_SCHOOL_NAME,
             map: map,
             fontSize: 20,
             align: 'center'
  } );

} /* function initMap() */

function reSetMap() {
// restore the map to its initial state, do not touch existing markers
// 2017-11-13 Rick, modified to support multi-zoom
  reCenterMap();
  reZoomMap();
} // reSetMap())
//   (should not be called except by the routine above)
    function reCenterMap() {
      // map.setCenter({ lat: yourLat, lng: yourLng })
      // map.setCenter( origMapCenter );
      map.setCenter( mapZoom[ currentZoom ].centerLatLng );
    } // reCenterMap()
    function reZoomMap() {
    //  map.setZoom( origZoom );
      map.setZoom( currentZoom );
    } //reZoomMap()

/*****************************************************************************/
/****************************
 * Google Direction Service *
 * CALLBACK FUNCTION        *
 ****************************/

// 2017-10-15 Stephen: created
// 2017-10-19 Rick: logic to not call directionsService in certain situations
// 2017-11-03 Rick: web page sends array index as text, e.g.. "EARL_HALL",
//                  eval() turns it into a number and the data is pulled out of
//                  the faclity array via that number
function calculateAndDisplayRoute( directionsService, directionsDisplay ) {
  // web page returns a Facility[] index as text {"EARL_HALL"}, eval() turns
  // that into a number {42}, {lat, lng} is pulled out of Facility[]

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
/**********************
 * Markers            *
 **********************/
// marker loading
  /*
     Layer 0, individual markers
       marker[ 0, buildingLoc ] = new Object();
       marker[ 0, personLoc ]   = new Object();
       marker[ 0, carLoc ]      = new Object();

     Layer 1, markers for parking lots by class
       marker[ 1, first-lot ] = new Object();
       marker[ 1, second-lot ] = new Object();
         ...
       marker[ 1, last-lot ] = new Object();

     Layer 2, markers for bus stop by class
       marker[ 2, first-stop ] = new Object();
       marker[ 2, second-stop ] = new Object();
         ...
       marker[ 2, last-stop ] = new Object();

    Possible other Markers

       Layer 3, markers for computer labs
         marker[ 2, first-lab ] = new Object();
         marker[ 2, second-lab ] = new Object();
           ...
         marker[ 2, last-lab ] = new Object();
  */


// ASSUMED: 1 Building marker, 1 Person marker, 1 Car marker
// highest level routine, makes a particular building
// written to use in the demonstration, a more general routine is called for
/*
 *  // sample location
 *  var Morril_Hall = { lat: 41.333704, lng: -72.945826 };
 *  function display_MorrilHall() {
 *    // specifically display Morril Hall
 *    hideBuilding();                 // hide the displayed Building related marker
 *    createBuilding( Morril_Hall );  // create the Building related marker of Morril Hall
 *    showBuilding();                 // show the displayed Building related marker
 *  }
 */


/******************************
 * INDIVIDUAL MARKER ROUTINES *************************************************
 ******************************/
function displayBuildingMarker(  facilityIndex_in ) {
//  displayFacilityMarker( facilityIndex_in, buildingIndex );
}

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
   /******* DISPLAY FACILITY MARKERS ********************************************/
   /*****************************************************************************/
// 2017-10-20 Rick, new routine for the Direction Service lists
// 2017-10-20+ Stephen, add infowindow for marker
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

  hideMarker( marker, typeIndex );       // hide the displayed marker for that
                                         // facility type

  createMarkerIW( location, typeIndex, infowindow );  // create the marker at
                                        // location of typeIndex

  showMarker( marker, typeIndex );              // show the marker at of type typeIndex
} // function displayFacilityMarker(

/*****************************************************************************/


/***********************
 * Parking Lot Markers ********************************************************
 ***********************/
function _hideRemoveParkingMarkers() {
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

/************************
 * Bulk Marker Routines *******************************************************
 ************************/
function _displayParkingMarkersByClass( parkingSubClass_in ) {
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
      createMarker( facilityPosition( facilityIndex ), markerIndex );
      showMarker( markerIndex ); // show the marker at index markerIndex
      // ready for next marker
      markerIndex = markerIndex + 1;
    } // if ( facility[ facilityIndex ].class ...
  } // for( ; facilityIndex < FACILITY_COUNT; ...

} // function displayParkingMarkersByClass( ...)

/** Manipulate Markers By Class **********************************************/
/*
var SINGLETON_LAYER = 0;
var PARKING_LAYER   = 1;
var BUS_LAYER       = 2;
var COMPLAB_LAYER   = 3;

var marker      = [];
var PLotMarker  = [];
var BStopMarker = [];
var CLabMarker  = [];
*/


//   (should not be called except by the 3 routines above
//      and displayParkingMarkersByClass)
// 2017-10-20+ Sephen, add infowindow for marker
function createMarker( location_in, markerArray_in, index_in ) {
/*
  var mark = new google.maps.Marker( { position: location_in, map: map, label: {
          color: 'black',
          fontWeight: 'bold',
          fontSize: '32px',
          text: '12B'
        } } );
 */
  var mark = new google.maps.Marker( { position: location_in, map: map } );
  markerArray_in[ index_in ] = mark;
} // createMarker()

function removeMarker( markerArray_in ) {
  // remove markers from the array
  var i;

  if ( markerArray_in == marker ) { return; } // do not strip "marker"

  i = markerArray_in.length;
  for( ; i > 0; i = i - 1 ) {
    markerArray_in.pop();
  } // for( i ..)
} // removeMarker()

function hideMarker( markerArray_in, index_in ) {
  // hide a marker on the map by setting the map parameter to null
  if ( markerArray_in[ index_in ] != null ) {
    markerArray_in[ index_in ].setMap( null );
  }
} // hideMarker



/*
var SINGLETON_LAYER = 0;
var PARKING_LAYER   = 1;
var BUS_LAYER       = 2;
var COMPLAB_LAYER   = 3;

var marker      = [];
var PLotMarker  = [];
var BStopMarker = [];
var CLabMarker  = [];
 */

function classToMarkerArray( class_in ) {
  var markerArray_out;

       if ( class_in === FACILITY_CLASS_PARKING ) { markerArray_out = PLotMarker; }
  else if ( class_in === FACILITY_CLASS_BUSSTOP ) { markerArray_out = BStopMarker; }
  else if ( class_in === FACILITY_CLASS_COMPLAB ) { markerArray_out = CLabMarker; }
  else                                            { markerArray_out = marker; }

  return markerArray_out;
} // classToMarkerArray

function hideRemoveMarkersByClass( class_in ) {
  /**************************************************
   * hide any bulk marked parking lots or bus stops *
   * remove thoose markers from the array           *
  ***************************************************/
  var markerArray;

  function hideRemove( markerArray_in ) {
    var i = 0; // first added parking lot
    var len = markerArray_in.length; // number of markers, # of bulk parking lots

    if ( markerArray_in !== undefined ) {
      if ( markerArray_in.length > 0 ) { // lots or Stops have been
                                                // PUSHed onto array
        // hide all markers from the map
        for( ; i < len; i = i + 1 ) {
          hideMarker( markerArray_in, i );
        }

        // remove the parking lot markers from the array
        removeMarker( markerArray_in );
      } // if ( marker.length > ...
    } // ( markerArray_in
  } // hideRemove(

  if ( ( class_in === FACILITY_CLASS_PARKING ) ||
       ( class_in === FACILITY_CLASS_BUSSTOP ) ||
       ( class_in === FACILITY_CLASS_COMPLAB ) ) {
    markerArray = classToMarkerArray( class_in );
    hideRemove( markerArray );
  } // if ( Class_in IN [ Parking_Lot, Bus_Stop, Cmputer_lab, ... ]
} // hideRemoveMarkersByClass()

//       displayParkingMarkersByClass
function displayParkingMarkersByClass( subClass_in ) {
  displayMarkersByClass( FACILITY_CLASS_PARKING, subClass_in );
}

function displayBusStopMarkersByClass( subClass_in ) {
  displayMarkersByClass( FACILITY_CLASS_BUSSTOP, subClass_in );
}

function displayCompLabMarkersByClass( subClass_in ) {
  displayMarkersByClass( FACILITY_CLASS_COMPLAB, subClass_in );
}

function displayMarkersByClass( class_in, subClass_in ) {
// displays Building and Parking Lots
// ----------------------------------
// facilityIndex_in is the index for facility[] for Facility to display
// ----------------------------------

  hideRemoveMarkersByClass( class_in ); // remove any displayed set of parking lots or bus stops

  // create markers & PUSH them on the array, display markers
  var facilityIndex = 0; // Facility loop index [0..FACILITY_COUNT]
  var markerIndex = 0;
  var markerArray;

  for( ; facilityIndex < FACILITY_COUNT; facilityIndex++ ){
    if ( facility[ facilityIndex ].class === class_in &&
         facility[ facilityIndex ].subClass.indexOf( subClass_in ) > -1 ) {

      markerArray = classToMarkerArray( class_in );

      createMarker( facilityPosition( facilityIndex ), markerArray, markerIndex );
      showMarker( markerArray, markerIndex ); // show the marker at index markerIndex
      // ready for next marker
      markerIndex = markerIndex + 1;
    } // if ( facility[ facilityIndex ].class ...
  } // for( ; facilityIndex < FACILITY_COUNT; ...

} // function displayMarkersByClass( ...)

/*****************************************************************************/

// Create Marker Routines
//   Create and Initialize Marker objects
//   Marker objects show the position of Facilities, People, or Cars
// higher level routines to make specifickinds of markers
/* depricated
 *    function createBuilding( location_in ) {
 *      createMarker( location_in, buildingIndex );
 *    }
 *    function createPerson( location_in ) {
 *      // locationIn = Get_Actual_Location();
 *      createMarker( location_in, personIndex );
 *    }
 *    function createCar( location_in ) {
 *      // locationIn = Get_Actual_Location();
 *      createMarker( location_in, carIndex );
 *    }
 */
//   (should not be called except by the 3 routines above
//      and displayParkingMarkersByClass)
// 2017-10-20+ Sephen, add infowindow for marker
function _createMarker( location_in, index_in ) {
/*
  var mark = new google.maps.Marker( { position: location_in, map: map, label: {
          color: 'black',
          fontWeight: 'bold',
          fontSize: '32px',
          text: '12B'
        } } );
 */
  var mark = new google.maps.Marker( { position: location_in, map: map } );
  marker[ index_in ] = mark;
}

function createMarkerIW( location_in, index_in, infowindow_in ) {
  /*
  var mark = new google.maps.Marker( { position: location_in, map: map, label: {
          color: 'black',
          fontWeight: 'bold',
          fontSize: '10px',
          text: '12B'
        } } );
        */
  var mark = new google.maps.Marker( { position: location_in, map: map } );
  marker[ index_in ] = mark;

  //  adding click function to marker to open infowindow
  google.maps.event.addListener( mark, 'click',
                                function() { infowindow_in.open( map, this ); }
  );
}

// Show Marker Routines
//   Display a Marker on the map
function showBuilding() {
  showMarker( marker, buildingIndex );
}
function showPerson() {
  showMarker( marker, personIndex );
}
function showCar() {
  showMarker( marker, carIndex );
}
//   (should not be called except by the 3 routines above)
function _showMarker( index_in ) {
  marker[ index_in ].setMap( map );
}
function showMarker( markerArray_in, index_in ) {
  markerArray_in[ index_in ].setMap( map );
}

// Hide Facility Routines
//   Remove Facilites on the map
function hideBuilding() {
  hideMarker( marker, BUILDING_INDEX ); // array and which one to hide
}
function hidePerson() {
  hideMarker( marker, PERSON_INDEX );
}
function hideCar() {
  hideMarker( marker, CAR_INDEX );
}
//   (should not be called except by the 3 routines above)
  function _hideMarker( index_in ) {
    if ( marker[ index_in ] != null ) {
      marker[ index_in ].setMap( null );
    }
  }

  function hideAllMarkers() {
    hideBuilding(); // hide Building Marker
    hidePerson();   // hide Persan Marker
    hideCar();      // hide Car Marker

    // hideRemoveParkingMarkers(); // hide all bulk markers
    hideRemoveMarkersByClass( FACILITY_CLASS_PARKING );
    hideRemoveMarkersByClass( FACILITY_CLASS_BUSSTOP );
    hideRemoveMarkersByClass( FACILITY_CLASS_COMPLAB );

    // 2017-11-05 Rick, clear off any route on the map
    removeRoute();
}

  function _removeMarker( ) {
    // remove excess markers from the array
    var i = marker.length;
    // MARKER_COUNT; // first added parking lot
    for( ; i > MARKER_COUNT; i = i - 1 ) {
      marker.pop();
    }
  }



/*****************************************************************************/
/**********************
 * Geolocation        *
 **********************/
// Try HTML5 geolocation.
var Geoloc_Failed       = 0;
var Geoloc_NotSupported = 1;
var Geoloc_NotOnMap     = 2; // future functionality, person off screen

function doGeolocation() {
  var infoWindow = new google.maps.InfoWindow( { content: 'empty' } );
  if ( navigator.geolocation ) {
      navigator.geolocation.getCurrentPosition( function( position ) {
        var pos = { lat: position.coords.latitude, lng: position.coords.longitude };

        // if the user is not ON the SCSU map, tell hir
        // check if on campus
        initInfoWindow( infoWindow, pos, 'Your Location' );
        showInfoWindow( infoWindow );
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

/*****************************************************************************/
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

/*
run getBounds() to getlimits of map
get user's location
*/
/*****************************************************************************/
////////////////////////
// html Menu Routines //
////////////////////////

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
function IllegalArgumentException( message_in ) {
    this.message = message_in;
}
/*****************************************************************************/
