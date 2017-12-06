
/*******************************
 *     Vector layers           *  // David 2017-10-21
 *******************************/
// ImageBounds constructor
function ImageBounds( north_a, south_a, east_a, west_a, vectorPath_a ) {
  this.north      = north_a;
  this.south      = south_a;
  this.east       = east_a;
  this.west       = west_a;
}

// data arrays
var imageBounds = []
    vectorPath  = [];

// array index values, count
var
  v_SOFTBALL_FIELD = 0,
  v_BASEBALL_FIELD = 1,
  v_RUGBY_FIELD    = 2,

  VECTOR_COUNT   = 3;
//TENNIS_COURT   = 4

/******************************/
/* initialize the data arrays */
/******************************/
  imageBounds[ v_SOFTBALL_FIELD ] = new ImageBounds( 41.334548, 41.333839, -72.942688, -72.943868 );
  imageBounds[ v_BASEBALL_FIELD ] = new ImageBounds( 41.333190, 41.331982, -72.942434, -72.943957 );
  imageBounds[ v_RUGBY_FIELD    ] = new ImageBounds( 41.331763, 41.330530, -72.942269, -72.943578 );

  vectorPath[ v_SOFTBALL_FIELD ] = 'vectorimages/softballfield.svg';
  vectorPath[ v_BASEBALL_FIELD ] = 'vectorimages/baseballfield.svg';
  vectorPath[ v_RUGBY_FIELD    ] = 'vectorimages/rugbyfield.svg';

// when the map is initialized this routine is called
function AddOverlaysToMap() {
  var index = 0;
  var vectorOverlay;

  for ( ; index < VECTOR_COUNT; index = index + 1 ) {
    vectorOverlay = new google.maps.GroundOverlay( vectorPath[ index ], imageBounds[ index ] );
    vectorOverlay.setMap( map );
  }
} // function AddOverlaysToMap()
