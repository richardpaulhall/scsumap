/******************
 * facility.js
 *   declarations of the data structures that describe the campus facilities *
 *****************************************************************************
 * Author  * Ricard Hall        *
 * Created * 2017-10-10         *
 * Version * 1.1                *
 * Updated * 2017-10-25 2:02 PM *
 ** Notes *********************************************************************
 * Version 1.0: created
 * Version 1.1: Facility Constructor supports class & subClass
 *              Facility CLASS constants defined
 *              Facility Parking SUBCLASS constants defined
 *              Facility constants cleaned up
 *              facility[] initialization cleaned up
 *                         class & subClass initialized
 *              file header created
 *****************************************************************************/

/*******************************
 * Facilities of SCSU *
 *******************************
 * +----------------------+
 * |       Facility       |
 * +----------------------+
 * | Name        : string |
 * | Abbreviaion : string | (generally 2 or 3 characters)
 * | Latitude    : float  |
 * | Longitude   : float  |
 * | Class       : string |
 * | SubClass    : string |
 * | Infowindow  : string |
 * +----------------------+
 * |     (no methods)     |
 * +----------------------+
 * For the sake of simplicity, the application uses standalone functions.
 * The Facility object is used like a C structure or Pascal record.
 * The Facility objects are stored in an array. The array index for each
 * Facilty object is named 'constant'.
 *
 * var Earl_Hall = 42;
 * var facility = []; // empty array
 *     facility[ Earl_Hall ] = new Facility( "Earl Hall", "EH", 41, -72 ... );
 ******************************************************************************
 * possible future fields                                                     *
 ******************************************************************************
 * [(index) {name, abbreviation, lat, long, ?class?, ?sub_class?)]
 * class = [C(lassroom, P(arking, R(esidence, D(ining, A(thletic, B(us Stop],
 * O(ther, Computer L(ab
 * class = {C, P, R, A, O, B}
 *
 * subClass_Parking = [F(aculty, S(taff, C(ommuter, G(raduate Student, V(isitor,
*                      R(esidence Hall, N(orth Campus, L(ot 10/11,
 *                     O)Senior Citizen };
 * subClass_Parking = {F, S, C, G, V, R, N, L, O };
 * subClass_Residence = {Hall, Complex};
 ******************************************************************************/

function Facility( name_a, abbreviation_a, latitude_a, longitude_a,
                   class_a, subClass_a, icon_a, infowindow_a ) {
    this.name         = name_a;
    this.abbreviation = abbreviation_a;
    this.latitude     = latitude_a;
    this.longitude    = longitude_a;
    this.class        = class_a;
    this.subClass     = subClass_a;
    this.icon         = icon_a;
    this.infowindow   = infowindow_a;
}

// store of all campus Faciities and their ropeties
var facility = [];

// Classes of campus Faciities
var FACILITY_CLASS_CLASSROOM = "C",
    FACILITY_CLASS_PARKING   = "P",
    FACILITY_CLASS_RESIDENCE = "R",
    FACILITY_CLASS_DINING    = "D",
    FACILITY_CLASS_ATHLETIC  = "A",
    FACILITY_CLASS_BUSSTOP   = "B",
    FACILITY_CLASS_OTHER     = "O",
    FACILITY_CLASS_COMPLAB   = "L";

// Sub-Classes of Parking Lots
var FACILITY_PARKING_SUBCLASS_FACULTY      = "F",
    FACILITY_PARKING_SUBCLASS_STAFF        = "S",
    FACILITY_PARKING_SUBCLASS_COMMUTER     = "C",
    FACILITY_PARKING_SUBCLASS_GRADUATE     = "G",
    FACILITY_PARKING_SUBCLASS_VISITOR      = "V",
    FACILITY_PARKING_SUBCLASS_RESIDENCE    = "R",
    FACILITY_PARKING_SUBCLASS_NORTH_CAMPUS = "N",
    FACILITY_PARKING_SUBCLASS_LOT_10_11    = "L",
    FACILITY_PARKING_SUBCLASS_SENIOR       = "S";

    // Sub-Classes of Bus Stops
var FACILITY_BUSSTOP_SUBCLASS_SHUTTLE      = "S",
    FACILITY_BUSSTOP_SUBCLASS_TRANSIT      = "T";

// Constants, array index for every faclity on campus
var FACILITIES_OPERATIONS_AND_PLANNING        =  0,
    ADANTI_STUDENT_CENTER                     =  1,
    ETHNIC_HERITAGE_CENTER                    =  2,
    LANG_HOUSE                                =  3,
    ORLANDO_HOUSE                             =  4,
    UNIVERSITY_POLICE                         =  5,
    GRANOFF_STUDENT_HEALTH_CENTER             =  6,
    OFFICE_BUILDING_1                         =  7,
    TEMPORARY_BUILDING_6                      =  8,
    ENERGY_CENTER                             =  9,
    WINTERGREEN_BUILDING                      = 10,
    ALUMNI_HOUSE                              = 11,

    BASEBALL_FIELD                            = 12,
    JESS_DOW_FIELD                            = 13,
    MOORE_FIELD_HOUSE                         = 14,
    RUGBY_PRACTICE_FIELD                      = 15,
    SOFTBALL_FIELD                            = 16,
    TENNIS_COURTS                             = 17,
    // PELZ_GYMNASIUM                         = 29, classrooms as well as gyms and pool

    BAGEL_WAGON                               = 18,
    BULEY_LIBRARY_CAFE                        = 19,
    CONNECTICUT_HALL                          = 20,
    DAVIS_HALL_KIOSK                          = 21,
    NORTH_CAMPUS_MARKET                       = 22,
    STUDENT_CENTER_FOOD_COURT                 = 23,

    SCHWARTZ_HALL                             = 24,
    BROWNELL_HALL                             = 25,
    FARNHAM_HALL                              = 26,
    WILKINSON_HALL                            = 27,
    CHASE_HALL                                = 28,
    HICKERSON_HALL                            = 29,
    NEFF_HALL                                 = 30,
    WEST_CAMPUS_RESIDENCE_COMPLEX             = 31,
    NORTH_CAMPUS_RESIDENCE_COMPLEX            = 32,

    DAVIS_HALL                                = 33,
    PELZ_GYMNASIUM                            = 34,
    ACADEMIC_SCIENCE_AND_LABORATORY_BUILDING  = 35,
    JENNINGS_HALL                             = 36,
    MORRILL_HALL                              = 37,
    SCHOOL_OF_BUSINESS                        = 38,
    ENGLEMAN_HALL                             = 39,
    BULEY_LIBRARY                             = 40,
    LYMAN_CENTER                              = 41,
    EARL_HALL                                 = 42,
    NURSING_CLASSROOM_BUILDING                = 43,
    CLASSROOM_BUILDING_8                      = 44,

    FITCH_STREET_GARAGE                       = 45,
    WEST_CAMPUS_GARAGE                        = 46,
    WINTERGREEN_AVENUE_GARAGE                 = 47,
    NORTH_CAMPUS_PARKING                      = 48,
    P_2                                       = 49,
    P_5                                       = 50,
    P_12                                      = 51,
    P_12B                                     = 52,
    P_11                                      = 53,
    P_1                                       = 54,
    P_3                                       = 55,
    P_8                                       = 56,
    P_9                                       = 57,
    P_4                                       = 58,
    P_4A                                      = 59,
    P_6                                       = 60,
    P_10                                      = 61,

    BS_1                                      = 62,
    BS_2                                      = 63,
    BS_3                                      = 64,
    BS_4                                      = 65,
    BS_5                                      = 66,
    BS_6                                      = 67,
    BS_7                                      = 68,
    BS_8                                      = 69,
    BS_9                                      = 70,
    BS_10                                     = 71,
    BS_11                                     = 72,
    BS_12                                     = 73,
    BS_13                                     = 74,

    BT_1                                      = 74,
    BT_2                                      = 75,
    BT_3                                      = 76,
    BT_4                                      = 77,
    BT_5                                      = 78,
    BT_6                                      = 79,

    GEO_LOC                                   = 80,

    PARKED_CAR                                = 81,

    FACILITY_COUNT                            = 82;

    /*************************/
    // Other Buildings - "O" */
    /*************************/
    facility[ ADANTI_STUDENT_CENTER ]                     = new Facility( "Adanti Student Center",                    "ASC", 41.332068, -72.948806, "O", "?", "http://oi67.tinypic.com/2hwzo0.jpg", "<h4>Adanti Student Center</h4><br>Monday - Thursday &emsp;&emsp; 7:00 AM - 8:00 PM<br>Friday &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;7:00 AM - 4:30 AM<br>Saturday - Sunday&emsp;&emsp;&emsp;Closed" ); // , "O", "?" );
    facility[ ALUMNI_HOUSE ]                              = new Facility( "Alumni House",                             "AH",  41.331385, -72.951737, "O", "?", "http://oi67.tinypic.com/2hwzo0.jpg", "<h4>Alumni House</h4>" ); // , "O", "?" );
    facility[ ENERGY_CENTER ]                             = new Facility( "Energy Center",                            "EC",  41.336272, -72.953171, "O", "?", "http://oi67.tinypic.com/2hwzo0.jpg", "<h4>Energy Center</h4>" ); // , "O", "?" );
    facility[ ETHNIC_HERITAGE_CENTER ]                    = new Facility( "Ethnic Heritage Center",                   "ST",  41.330147, -72.950802, "O", "?", "http://oi67.tinypic.com/2hwzo0.jpg", "<h4>Ethnic Heritage Center</h4>" ); // , "O", "?" );
    facility[ FACILITIES_OPERATIONS_AND_PLANNING ]        = new Facility( "Facilities Operations and Planning",       "FO",  41.336554, -72.942012, "O", "?", "http://oi67.tinypic.com/2hwzo0.jpg", "<h4>Facilities Operations and Planning</h4>" ); // , "O", "?" );
    facility[ GRANOFF_STUDENT_HEALTH_CENTER ]             = new Facility( "Granoff Student Health Center",            "GR",  41.333821, -72.952046, "O", "?", "http://oi67.tinypic.com/2hwzo0.jpg", "<h4>Granoff Student Health Center</h4><br>Monday - Thursday &emsp;&emsp; 8:30 AM - 4:30 PM<br>Friday &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;9:30 AM - 4:30 AM<br>Saturday - Sunday&emsp;&emsp;&emsp;Closed" ); // , "O", "?" );
    facility[ LANG_HOUSE ]                                = new Facility( "Lang House",                               "LA",  41.330538, -72.952395, "O", "?", "http://oi67.tinypic.com/2hwzo0.jpg", "<h4>Lang House</h4>" ); // , "O", "?" ); "Department of Social Work"
    facility[ OFFICE_BUILDING_1 ]                         = new Facility( "Office Building 1",                        "OB1", 41.333597, -72.951508, "O", "?", "http://oi67.tinypic.com/2hwzo0.jpg", "<h4>Office Building 1</h4>" ); // , "O", "?" );
    facility[ ORLANDO_HOUSE ]                             = new Facility( "Orlando House",                            "OR",  41.331814, -72.952310, "O", "?", "http://oi67.tinypic.com/2hwzo0.jpg", "<h4>Orlando House</h4>" ); // , "O", "?" ); "Department of Public Health"
    facility[ TEMPORARY_BUILDING_6 ]                      = new Facility( "Temporary Building 6",                     "TE6", 41.333243, -72.951111, "O", "?", "http://oi67.tinypic.com/2hwzo0.jpg", "<h4>Temporary Building 6</h4>" ); // , "O", "?" );
    facility[ UNIVERSITY_POLICE ]                         = new Facility( "University Police",                        "UP",  41.333821, -72.952046, "O", "?", "http://oi67.tinypic.com/2hwzo0.jpg", "<h4>University Police Department</h4><br>Phone Number &emsp;&emsp; 203-392-5375" ); // , "O", "?" );
    facility[ WINTERGREEN_BUILDING ]                      = new Facility( "Wintergreen Building",                     "WT",  41.334532, -72.950960, "O", "?", "http://oi67.tinypic.com/2hwzo0.jpg", "<h4>Wintergreen Building</h4>" ); // , "O", "?" );

    /*****************************/
    /* Athletic Facilities - "A" */ // P3lz has Calsroms, as wll as Gyms and the Pool
    /*****************************/
    facility[ BASEBALL_FIELD ]                            = new Facility( "Baseball Field",                           "BF",  41.332543, -72.943304, "A", "?", "http://oi67.tinypic.com/2hwzo0.jpg", "<h4>Baseball Field</h4>" );
    facility[ JESS_DOW_FIELD ]                            = new Facility( "Jess Dow Field",                           "JDF", 41.336570, -72.949974, "A", "?", "http://oi67.tinypic.com/2hwzo0.jpg", "<h4>Jess Dow Field</h4>" );
    facility[ MOORE_FIELD_HOUSE ]                         = new Facility( "Moore Field House",                        "MFH", 41.335362, -72.951411, "A", "?", "http://oi67.tinypic.com/2hwzo0.jpg", "<h4>Moore Field House</h4>" );
    facility[ RUGBY_PRACTICE_FIELD ]                      = new Facility( "Rugby Practice Field",                     "RPF", 41.331125, -72.942886, "A", "?", "http://oi67.tinypic.com/2hwzo0.jpg", "<h4>Rugby Practice Field</h4>" );
    facility[ SOFTBALL_FIELD ]                            = new Facility( "Softball Field",                           "SF",  41.334160, -72.943317, "A", "?", "http://oi67.tinypic.com/2hwzo0.jpg", "<h4>Softball Field</h4>" );
    facility[ TENNIS_COURTS ]                             = new Facility( "Tennis Courts",                            "TC",  41.335987, -72.952155, "A", "?", "http://oi67.tinypic.com/2hwzo0.jpg", "<h4>Tennis Courts</h4>" );


    /**************************/
    /* Dining Locations - "D" */
    /**************************/
    facility[ BAGEL_WAGON ]                               = new Facility( "Bagel Wagon",                              "BW",   41.332567, -72.946712, "D", "?", "http://oi67.tinypic.com/2hwzo0.jpg", "<h4>Bagel Wagon</h4><br>Monday - Thursday &emsp;&emsp; 7:30 AM - 7:30 PM<br>Friday &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;7:30 AM - 2:30 AM<br>Saturday - Sunday&emsp;&emsp;&emsp;Closed" ); // , "D", "?" );
    facility[ BULEY_LIBRARY_CAFE ]                        = new Facility( "Buley Library Cafe",                       "BLC",  41.333193, -72.947982, "D", "?", "http://oi67.tinypic.com/2hwzo0.jpg", "<h4>Buley Library Cafe</h4><h5><br>Monday - Thursday &emsp;&emsp;	7:30 AM - 10:00 PM<br>Friday &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;7:30 AM to 2:30 PM<br>Saturday &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp; Closed<br>Sunday &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;&ensp;&ensp;4:00 PM - 7:30 PM</h5>" ); // , "D", "?" );
    facility[ CONNECTICUT_HALL ]                          = new Facility( "Connecticut Hall",                         "CO",   41.332588, -72.950222, "D", "?", "http://oi67.tinypic.com/2hwzo0.jpg", "<h4>Connecticut Hall</h4><h5><br>Monday - Friday &emsp;&emsp;&emsp; 7:00 AM - 9:00 PM<br>Saturday - Sunday &emsp;&emsp; 10:00 AM - 9:00 PM<br><br>"+"<a href='https://www.dineoncampus.com/scsu/whats-on-the-menu'>"+"https://www.dineoncampus.com/scsu/whats-on-the-menu</a></h5>" ); // , "D", "?" );
    facility[ DAVIS_HALL_KIOSK ]                          = new Facility( "Davis Hall Kiosk",                         "DHK",  41.335352, -72.941905, "D", "?", "http://oi67.tinypic.com/2hwzo0.jpg", "<h4>Davis Hall Kiosk</h4><br>Monday - Thursday &emsp;&emsp; 8:00 AM - 8:00 PM<br>Friday - Sunday &emsp;&emsp;&emsp;&emsp;Closed" ); // , "D", "?" );
    facility[ NORTH_CAMPUS_MARKET ]                       = new Facility( "North Campus Market",                      "NCM",  41.338026, -72.947288, "D", "?", "http://oi67.tinypic.com/2hwzo0.jpg", "<h4>North Campus Market</h4><br>Sunday - Thursday &emsp;&emsp;	3:00 PM - 10:00 PM<br>Friday - Saturday	&emsp;&emsp;&ensp;&ensp;Closed" ); // , "D", "?" );
    facility[ STUDENT_CENTER_FOOD_COURT ]                 = new Facility( "Student Center Food Court",                "SCFC", 41.331757, -72.948859, "D", "?", "http://oi67.tinypic.com/2hwzo0.jpg", "<h4>Student Center Food Court</h4><br><h4>Dunkin Donuts</h4><br>Monday - Thursday &emsp;&emsp; 7:00 AM - 8:00 PM<br>Friday &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;7:00 AM - 2:30 PM<br>Saturday &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp; 8:00 AM - 3:00 PM<br>Sunday &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;Closed<br><br><h4>Chicken Grill</h4><br>Monday - Thursday &emsp;&emsp; 7:00 AM - 8:00 PM<br>Friday &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;&ensp;10:30 AM - 2:30 PM<br>Saturday - Sunday &emsp;&emsp;&ensp; Closed<br><br><h4>Freshen's, Mondo's Subs, 2Mato</h4><br>Monday - Thursday &emsp;&emsp; 10:30 AM - 8:00 PM<br>Friday &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;&ensp;10:30 AM - 2:30 PM<br>Saturday - Sunday &emsp;&emsp;&ensp;&ensp;Closed" ); // , "D", "?" );


    ///facility[  ] = new Facility( "Connecticut Hall", "CO) - Food Service Office---------41.332588, -72.950222
    // -Other dining locations are inside of other buildings

    /*****************************/
    /* Residence Locations - "R" */
    /*****************************/
    facility[ BROWNELL_HALL ]                             = new Facility( "Brownell Hall",                            "BR", 41.331668, -72.953840, "R", "H", "http://oi67.tinypic.com/2hwzo0.jpg", "<h4>Brownell Hall</h4>" ); // , "R", "H" );
    facility[ CHASE_HALL ]                                = new Facility( "Chase Hall",                               "CH", 41.333158, -72.952671, "R", "H", "http://oi67.tinypic.com/2hwzo0.jpg", "<h4>Chase Hall</h4>" ); // , "R", "H" );
    facility[ FARNHAM_HALL ]                              = new Facility( "Farnham Hall",                             "FH", 41.332570, -72.951887, "R", "H", "http://oi67.tinypic.com/2hwzo0.jpg", "<h4>Farnham Hall</h4>" ); // , "R", "H" );
    facility[ HICKERSON_HALL ]                            = new Facility( "Hickerson Hall",                           "HI", 41.333915, -72.953100, "R", "H", "http://oi67.tinypic.com/2hwzo0.jpg", "<h4>Hickerson Hall</h4>" ); // , "R", "H" );
    facility[ NEFF_HALL ]                                 = new Facility( "Neff Hall",                                "NE", 41.333931, -72.953733, "R", "H", "http://oi67.tinypic.com/2hwzo0.jpg", "<h4>Neff Hall</h4>" ); // , "R", "H" );
    facility[ NORTH_CAMPUS_RESIDENCE_COMPLEX ]            = new Facility( "North Campus Residence Complex",           "NC", 41.338048, -72.947313, "R", "C", "http://oi67.tinypic.com/2hwzo0.jpg", "<h4>North Campus Residence Complex</h4>" ); // , "R", "C" );
    facility[ SCHWARTZ_HALL ]                             = new Facility( "Schwartz Hall",                            "SZ", 41.331464, -72.950174, "R", "H", "http://oi67.tinypic.com/2hwzo0.jpg", "<h4>Schwartz Hall</h4>" ); // , "R", "H" );
    facility[ WEST_CAMPUS_RESIDENCE_COMPLEX ]             = new Facility( "West Campus Residence Complex",            "WC", 41.334490, -72.953666, "R", "C", "http://oi67.tinypic.com/2hwzo0.jpg", "<h4>West Campus Residence Complex</h4>" ); // , "R", "C" );
    facility[ WILKINSON_HALL ]                            = new Facility( "Wilkinson Hall",                           "WI", 41.332707, -72.952692, "R", "H", "http://oi67.tinypic.com/2hwzo0.jpg", "<h4>Wilkinson Hall</h4>" ); // , "R", "H" );

    ///facility[  ] = new Facility( "Schwartz Hall","SZ) - Housing Office-------41.331464, -72.950174

    /****************************/
    /* Classroom Buildings -"C" */
    /****************************/  // jemmmgs 41.334095, -72.945164
    facility[ ACADEMIC_SCIENCE_AND_LABORATORY_BUILDING ]  = new Facility( "Academic Science and Laboratory Building", "ASL", 41.334780, -72.945652, "C", "", "http://oi67.tinypic.com/2hwzo0.jpg", "<h4>Academic Science and Laboratory Building</h4>" );
    facility[ BULEY_LIBRARY ]                             = new Facility( "Buley Library",                            "BU",  41.333051, -72.947873, "C", "", "http://oi67.tinypic.com/2hwzo0.jpg", "<h4>Buley Library</h4>" ); // , "C", "" );
    facility[ CLASSROOM_BUILDING_8 ]                      = new Facility( "Classroom Building 8",                     "TE8", 41.331754, -72.945057, "C", "", "http://oi67.tinypic.com/2hwzo0.jpg", "<h4>Classroom Building 8</h4>" );
    facility[ DAVIS_HALL ]                                = new Facility( "Davis Hall",                               "DA",  41.335344, -72.941972, "C", "", "http://oi67.tinypic.com/2hwzo0.jpg", "<h4>Davis Hall</h4>" );
    facility[ EARL_HALL ]                                 = new Facility( "Earl Hall",                                "EA",  41.331915, -72.947873, "C", "", "http://oi67.tinypic.com/2hwzo0.jpg", "<h4>Earl Hall</h4>" );
    facility[ ENGLEMAN_HALL ]                             = new Facility( "Engleman Hall",                            "EN",  41.332636, -72.946645, "C", "", "http://oi67.tinypic.com/2hwzo0.jpg", "<h4>Engleman Hall</h4>" );
    facility[ JENNINGS_HALL ]                             = new Facility( "Jennings Hall",                            "JE",  41.333962, -72.945471, "C", "", "http://oi67.tinypic.com/2hwzo0.jpg", "<h4>Jennings Hall</h4>" );

    facility[ LYMAN_CENTER ]                              = new Facility( "Lyman Center",                             "LY",  41.331484, -72.946736, "C", "", "http://oi67.tinypic.com/2hwzo0.jpg", "<h4>Lyman Center</h4>" );
    facility[ MORRILL_HALL ]                              = new Facility( "Morrill Hall",                             "MO",  41.333732, -72.945899, "C", "", "http://oi67.tinypic.com/2hwzo0.jpg", "<h4>Morrill Hall</h4>" );
    facility[ NURSING_CLASSROOM_BUILDING ]                = new Facility( "Nursing Classroom Building",               "NU",  41.335916, -72.941972, "C", "", "http://oi67.tinypic.com/2hwzo0.jpg", "<h4>Nursing Classroom Building</h4>" );
    facility[ PELZ_GYMNASIUM ]                            = new Facility( "Pelz Gymnasium",                           "PE",  41.335054, -72.943925, "C", "", "http://oi67.tinypic.com/2hwzo0.jpg", "<h4>Pelz Gymnasium</h4>" );
    facility[ SCHOOL_OF_BUSINESS ]                        = new Facility( "School of Business",                       "SB",  41.331690, -72.945438, "C", "", "http://oi67.tinypic.com/2hwzo0.jpg", "<h4>School of Business</h4>" );

    /***************************/
    /* Parking Locations - "P" */
    /***************************/
    // Parking Garaes
    facility[ FITCH_STREET_GARAGE ]                       = new Facility( "Fitch Street Garage",                      "FSG",   41.335739, -72.943029, "P", "FSCGV", "http://oi64.tinypic.com/2nrjwcn.jpg", "<h4>Fitch Street Garage</h4>" ); // , "P", "FSCGV" );
    facility[ NORTH_CAMPUS_PARKING ]                      = new Facility( "North Campus Parking",                     "NCP",   41.330000, -72.950000, "P",   "N", "http://oi64.tinypic.com/2nrjwcn.jpg", "<h4>North Campus Parking</h4>" ); // , "P", "FSRCGV" );
    facility[ WEST_CAMPUS_GARAGE ]                        = new Facility( "West Campus Garage",                       "WCG",   41.333158, -72.953722, "P", "FSCNLR", "http://oi64.tinypic.com/2nrjwcn.jpg", "<h4>West Campus Garage</h4>" ); // , "P", "CRG" );
    facility[ WINTERGREEN_AVENUE_GARAGE ]                 = new Facility( "Wintergreen Avenue Garage",                "WTG",   41.335601, -72.953033, "P", "FSCGVNLR", "http://oi64.tinypic.com/2nrjwcn.jpg", "<h4>Wintergreen Avenue Garage</h4>" ); // , "P", "FSRCGV" );



    // Faculty and Staff Parking
    facility[ P_1 ]                                       = new Facility( "P-1",                                      "P-1",   41.335240, -72.942781, "P", "FSGO", "http://oi64.tinypic.com/2nrjwcn.jpg", "<h4>P-1</h4>" ); // , "P", "G" );
    facility[ P_2 ]                                       = new Facility( "P-2",                                      "P-2",   41.334100, -72.946688, "P", "FS", "http://oi64.tinypic.com/2nrjwcn.jpg", "<h4>P-2</h4>" ); // , "P", "FS" );
    facility[ P_3 ]                                       = new Facility( "P-3",                                      "P-3",   41.331976, -72.951238, "P", "FSCG", "http://oi64.tinypic.com/2nrjwcn.jpg", "<h4>P-3</h4>" ); // , "P", "G" );
    facility[ P_4 ]                                       = new Facility( "P-4",                                      "P-4",   41.332156, -72.952993, "P", "FSR", "http://oi64.tinypic.com/2nrjwcn.jpg", "<h4>P-4</h4>" ); // , "P", "G" );
    facility[ P_4A ]                                      = new Facility( "P-4A",                                     "P-4A",  41.331672, -72.952651, "P", "FSR", "http://oi64.tinypic.com/2nrjwcn.jpg", "<h4>P-4A</h4>" ); // , "P", "G" );
    facility[ P_5 ]                                       = new Facility( "P-5",                                      "P-5",   41.331441, -72.948425, "P",   "G", "http://oi64.tinypic.com/2nrjwcn.jpg", "<h4>P-5</h4>" ); // , "P", "FS" );
    facility[ P_6 ]                                       = new Facility( "P-6",                                      "P-6",   41.334564, -72.954111, "P", "FSR", "http://oi64.tinypic.com/2nrjwcn.jpg", "<h4>P-6</h4>" ); // , "P", "G" );
    facility[ P_8 ]                                       = new Facility( "P-8",                                      "P-8",   41.329688, -72.952969, "P", "FSCG", "http://oi64.tinypic.com/2nrjwcn.jpg", "<h4>P-8</h4>" ); // , "P", "G" );
    facility[ P_9 ]                                       = new Facility( "P-9",                                      "P-9",   41.330643, -72.953992, "P", "FSCG", "http://oi64.tinypic.com/2nrjwcn.jpg", "<h4>P-9</h4>" ); // , "P", "G" );
    facility[ P_10 ]                                      = new Facility( "P-10",                                     "P-10",  41.330466, -72.950805, "P", "FSL", "http://oi64.tinypic.com/2nrjwcn.jpg", "<h4>P-10</h4>" ); // , "P", "G" );
    facility[ P_11 ]                                      = new Facility( "P-11",                                     "P-11",  41.331079, -72.950377, "P", "FSL", "http://oi64.tinypic.com/2nrjwcn.jpg", "<h4>P-11</h4>" ); // , "P", "FS" );
    facility[ P_12 ]                                      = new Facility( "P-12",                                     "P-12",  41.331139, -72.944793, "P", "FSGO", "http://oi64.tinypic.com/2nrjwcn.jpg", "<h4>P-12</h4>" ); // , "P", "FS" );
    facility[ P_12B ]                                     = new Facility( "P-12B",                                    "P-12B", 41.331643, -72.944562, "P", "FSCG", "http://oi64.tinypic.com/2nrjwcn.jpg", "<h4>P-12B</h4>" ); // , "P", "FS" );

    // Campus Police refer to Lot 13, North Campus Parking?

    //-Unable to find lot P-7 on school PDF map
    // P-7 was a surface lot where the Wintergreen Avenue Garage resides

    /**************************/
    /* Shuttle Bus Stops -"B" */
    /**************************/
    facility[ BS_1 ]                                      = new Facility( "BS-1",                                      "BS-1",  41.334028, -72.946377, "B",   "S", "http://oi65.tinypic.com/10nfi93.jpg", "<h4>Morrill Hall Shuttle Stop</h4>" ); // , "B", "" ); Morrill Hall
    facility[ BS_2 ]                                      = new Facility( "BS-2",                                      "BS-2",  41.335047, -72.944821, "B",   "S", "http://oi65.tinypic.com/10nfi93.jpg", "<h4>Pelz Gym Shuttle Stop</h4>" ); // , "B", "" ); Pelz Gym
    facility[ BS_3 ]                                      = new Facility( "BS-3",                                      "BS-3",  41.335173, -72.943257, "B",   "S", "http://oi65.tinypic.com/10nfi93.jpg", "<h4>Fitch Street Garage Shuttle Stop</h4>" ); // , "B", "" ); Fitch Street Garage
    facility[ BS_4 ]                                      = new Facility( "BS-4",                                      "BS-4",  41.335531, -72.942514, "B",   "S", "http://oi65.tinypic.com/10nfi93.jpg", "<h4>Davis Hall Shuttle Stop</h4>" ); // , "B", "" ); Davis Hall
    facility[ BS_5 ]                                      = new Facility( "BS-5",                                      "BS-5",  41.337294, -72.947167, "B",   "S", "http://oi65.tinypic.com/10nfi93.jpg", "<h4>North Campus Shuttle Stop</h4>" ); // , "B", "" ); North Campus
    facility[ BS_6 ]                                      = new Facility( "BS-6",                                      "BS-6",  41.332450, -72.952810, "B",   "S", "http://oi65.tinypic.com/10nfi93.jpg", "<h4>Lot 4 Shuttle Stop</h4>" ); // , "B", "" ); Lot 4
    facility[ BS_7 ]                                      = new Facility( "BS-7",                                      "BS-7",  41.331620, -72.954077, "B",   "S", "http://oi65.tinypic.com/10nfi93.jpg", "<h4>Lot 9 Shuttle Stop</h4>" ); // , "B", "" ); Lot 9
    facility[ BS_8 ]                                      = new Facility( "BS-8",                                      "BS-8",  41.329606, -72.953390, "B",   "S", "http://oi65.tinypic.com/10nfi93.jpg", "<h4>Lot 8 Shuttle Stop</h4>" ); // , "B", "" ); Lot 8
    facility[ BS_9 ]                                      = new Facility( "BS-9",                                      "BS-9",  41.332289, -72.951405, "B",   "S", "http://oi65.tinypic.com/10nfi93.jpg", "<h4>Lot 3 Shuttle Stop</h4>" ); // , "B", "" ); Lot 3
    facility[ BS_10 ]                                     = new Facility( "BS-10",                                     "BS-10", 41.331395, -72.945714, "B",   "S", "http://oi65.tinypic.com/10nfi93.jpg", "<h4>Engleman Hall Shuttle Stop</h4>" ); // , "B", "" ); Engleman Hall
    facility[ BS_11 ]                                     = new Facility( "BS-11",                                     "BS-11", 41.331445, -72.946422, "B",   "S", "http://oi65.tinypic.com/10nfi93.jpg", "<h4>Lyman Center Shuttle Stop</h4>" ); // , "B", "" ); Lyman Center
    facility[ BS_12 ]                                     = new Facility( "BS-12",                                     "BS-12", 41.331884, -72.949227, "B",   "S", "http://oi65.tinypic.com/10nfi93.jpg", "<h4>Student Center Shuttle Stop</h4>" ); // , "B", "" ); Student Center
    facility[ BS_13 ]                                     = new Facility( "BS-13",                                     "BS-13", 41.331884, -72.949227, "B",   "S", "http://oi65.tinypic.com/10nfi93.jpg", "<h4>Wintergreen Garage Shuttle Stop</h4>" ); // , "B", "" ); Student Center

    //Connecticut Transit Bus Stops -"T"

    facility[ BT_1 ]                                      = new Facility( "BS-1",                                      "BT-1",  41.331617, -72.949452, "B",   "T", "http://oi65.tinypic.com/10nfi93.jpg", "<h4>243 Bus Stop, Fitch & Crescent</h4>" ); // , "B", "" ); Student Center
    facility[ BT_2 ]                                      = new Facility( "BS-2",                                      "BT-2",  41.332633, -72.949480, "B",   "T", "http://oi65.tinypic.com/10nfi93.jpg", "<h4>243 Bus Stop, Fitch & Wintergreen</h4>" ); // , "B", "" ); Student Center
    facility[ BT_3 ]                                      = new Facility( "BS-3",                                      "BT-3",  41.333498, -72.950747, "B",   "T", "http://oi65.tinypic.com/10nfi93.jpg", "<h4>243 Bus Stop, Wintergreen & Farnham</h4>" ); // , "B", "" ); Student Center
    facility[ BT_4 ]                                      = new Facility( "BS-3",                                      "BT-3",  41.333690, -72.950686, "B",   "T", "http://oi65.tinypic.com/10nfi93.jpg", "<h4>243 Bus Stop, Wintergreen & Opp. Farnham</h4>" ); // , "B", "" ); Student Center
    facility[ BT_5 ]                                      = new Facility( "BS-4",                                      "BT-4",  41.334721, -72.952463, "B",   "T", "http://oi65.tinypic.com/10nfi93.jpg", "<h4>243 Bus Stop, Wintergreen & Moore Fieldhouse</h4>" ); // , "B", "" ); Student Center
    facility[ BT_6 ]                                      = new Facility( "BS-4",                                      "BT-4",  41.334685, -72.952785, "B",   "T", "http://oi65.tinypic.com/10nfi93.jpg", "<h4>243 Bus Stop, Wintergreen & Opp. Moore Fieldhouse</h4>" ); // , "B", "" ); Student Center

    facility[ GEO_LOC ]                                   = new Facility( "Geolocation",                                "GL",       null,       null, "O",   "?", "http://oi64.tinypic.com/jgmhyc.jpg", "<h4>You are here</h4>" ); // , "O", "?" );

    facility[ PARKED_CAR ]                                = new Facility( "Parked Car",                                 "PC",   41.335739, -72.943029, "O",  "?", "http://oi64.tinypic.com/jgmhyc.jpg", "<h4>Your car is here</h4>" ); // , "O", "?" );


    /** METHODS *****************************/

    // 2017-10-20 Rick, new routine for the Direction Service lists
    function facilityPosition( facilityIndex_in ) {
    // returns LatLng, { lat: 99.999, lng: 99.999 }
    // the Position of a Facility
    // ----------------------------------
    // facilityIndex_in is the index for facility[] for Facility to display
    // ----------------------------------

      // return the map coordinates for the facility
      return ( { lat: facility[ facilityIndex_in ].latitude,
                 lng: facility[ facilityIndex_in ].longitude } );
    }

      function facilityInfowindow( facilityIndex_in ) {
        return( facility[ facilityIndex_in ].infowindow );
      }

      function facilityIcon( facilityIndex_in ) {
        return( facility[ facilityIndex_in ].icon );
      }
