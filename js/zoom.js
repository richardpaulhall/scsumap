/*******************************
 * zoom.js                     *
 *******************************
 * Zoom Level Selection Button *
 *******************************
 * Routines:                   *
 -------------------------------
 * reZoom()                    *
 * redisplay the map at a new  *
 * zoom level                  *
 *******************************/

 /****************
  *  Multi-Zoom  *
  ****************/
function MapZoom( buttonText_a, NextZoomLevel_a, lat_a, lng_a ) {
  this.nextButtonText = buttonText_a;
  this.nextZoomLevel  = NextZoomLevel_a;
  this.centerLatLng   = new google.maps.LatLng( lat_a, lng_a );
}

// store of all zoom levels and their propeties
var mapZoom = [];

// Multi-Zoom indicies
var MAPZOOM_FULL_CAMPUS   = 16,
    MAPZOOM_ACADEMIC_CORE = 17;
var currentZoom = MAPZOOM_FULL_CAMPUS;

// fields:                                          nectButtonText        nextZoomLevel          centerLatLng[ lat, lng ];
    mapZoom[ MAPZOOM_FULL_CAMPUS   ] = new MapZoom( "Zoom OUT: Full Campus",  MAPZOOM_ACADEMIC_CORE, 41.334500, -72.947750 );
    mapZoom[ MAPZOOM_ACADEMIC_CORE ] = new MapZoom( "Zoom IN: Academic Core", MAPZOOM_FULL_CAMPUS,   41.334250, -72.945700 );
/* 'currentZoom' holds the current zoom level, the data structure holds the *
 * information for the >next< zoom display and a new value for currentZoom. *
 * currentZoom <= MAPZOOM_ACADEMIC_CORE so when the map loads initially it  *
 * will use the >next< zoom level, MAPZOOM_FULL_CAMPUS                      */

/** METHODS *****************************/
function newMapZoom() {
  // 1 get Button
  // 2 reset label wr2 zoom change
  // 3 change zoom related variables
  // 4 refresh map
 /******************************/
  // 1 get Button
  var zoomButton = document.getElementById( 'ZoomButton' );
  // 2 reset label wr2 zoom change
  zoomButton.innerText = mapZoom[ currentZoom ].nextButtonText;
  // 3 change zoom related variables
  currentZoom = mapZoom[ currentZoom ].nextZoomLevel;
  // 4 refresh map
  reSetMap();
}

////////////////////////////////////////////////////
