import React, { useState, useEffect } from "react";
import { 
  GoogleMap, 
  DirectionsRenderer, 
  Geometry, 
  Marker,
  InfoWindow,
  MarkerClusterer
} from "@react-google-maps/api";
import MapStyles from "./MapStyles";
import ReactLoading from "react-loading";
import Switch from "react-switch";
import { getOptionGroupUnstyledUtilityClass } from "@mui/base";
import location_icon from "../Assets/locationIcon.gif";
import WeatherIcon from "./weatherIcon";


// import { MarkerClusterer } from "@googlemaps/markerclusterer";


<script src="https://maps.googleapis.com/maps/api/js?v=3&sensor=false&libraries=geometry"></script>

const center = { lat: 53.3434634, lng: -6.2749724 };
const mapContainerStyle = { width: "100%", height: "100%" };
const options = {
  styles: MapStyles,
  disableDefaultUI: true,
  clickableIcons: false,
};

const Map = ({
  setModalType,
  chosenIndex,
  directionsOutput,
  isLoaded,
  loadError,
  stops,
}) => {
  const google = window.google

  var markers = [];

  const [map, setMap] = useState(null);  

  // Marker InfoWindow
  const [activeMarker, setActiveMarker] = useState(null);
  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  // console.log("STOPS1:", stops)

  // Dictionary for markers

  const stops2 = stops.map(({ stop_id, stop_name, stop_lat, stop_long }) => (
    { id: stop_id, 
      name: stop_name, 
      lat: stop_lat,
      lng: stop_long,
      position: {lat: stop_lat, lng: stop_long}}
  ))
  // console.log("STOPS1/2:", stops2)
    
  for (var key in stops2) {
    var location = {lat: parseFloat(stops2[key].lat), lng: parseFloat(stops2[key].lng)}
    stops2[key].position = new google.maps.LatLng(location)
  }
  // console.log("STOPS2:", stops2)

  // Marker Clusterer toggle
  const [clusterer, setClusterer] = useState(false);

  const clusterToggler = () => {
    clusterer ? setClusterer(false): setClusterer(true);
  }
  
  // Geolocation Toggle
  const [geolocatorToggle, setGeolocator] = useState(false);

  const geolocatorToggler = () => {
    geolocatorToggle ? setGeolocator(false): setGeolocator(true);
  }

  

  const mapRef = React.useRef();
  // const onMapLoad = React.useCallback((map) => {
  mapRef.current = map;
  
  // Error loading Map
  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  // If map has not loaded display loading..
  if (!isLoaded) {
    return (
      <div className="h-full w-full bg-zinc-900 ">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <ReactLoading type={"spin"} color="#475569" />
        </div>
        <div className="text-center absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <p className="text-slate-500">Loading..</p>
        </div>
      </div>
    );
  }

  // Map Bounds
  // const bounds = new google.maps.LatLngBounds();
  // stops2.forEach(({ position }) => bounds.extend(position));
  // map.fitBounds(bounds);

  // Function to select route index
  const selectRouteIndex = () => {
    // Choose 0 unless another index specified
    if (chosenIndex) {
      return parseInt(chosenIndex);
    }
    return 0;
  };


const panTo2 = (lat, lng) => {

    mapRef.current.panTo2({ lat, lng });
    mapRef.current.setZoom(14);
    var circle = new google.maps.Circle({
      strokeColor: 'Blue',
      strokeOpacity: '0.6',
      strokeWeight: 0,
      fillColor: 'Blue',
      fillOpacity: 0.55,
      map,
      radius: 175,
      clickable: true,
      center: {
          lat: lat,
          lng: lng
      },
  })
  var point = new google.maps.LatLng(lat,lng);
  
  var marker = new google.maps.Marker({
    position: point,
    map: map
      });

  var html = 'CURRENT LOCATION';
  var infoWindow = new google.maps.InfoWindow();
  google.maps.event.addListener(marker, 'click', function() {
    infoWindow.setContent(html);
    infoWindow.open(map, marker);
  })

      var
  searchArea,
  searchAreaMarker,
  searchAreaRadius = 500, // metres
  startLat = 40.782827,
  startLng = -73.966167;

      searchArea = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.5,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.2,
        map: map,
        center: point,
        radius: searchAreaRadius
      });
      for (var i = 0; i < stops.length; i++) {

        var distance
        var c = 0;
        while (c < stops.length){
          var location = stops[c];
          var locationlatlng = new google.maps.LatLng(location.stop_lat,location.stop_long);

          var _kCord = new google.maps.LatLng(-36.874694, 174.735292);
          var _pCord = new google.maps.LatLng(-36.858317, 174.782284);
          distance = google.maps.geometry.spherical.computeDistanceBetween(point, locationlatlng)
          
          if (distance <= searchAreaRadius) {
            html = location.stop_name;
            var new_marker = new google.maps.Marker({
              position: locationlatlng,
              map: map,
              
            });
            var infoWindow = new google.maps.InfoWindow();
            google.maps.event.addListener(new_marker, 'click', function() {
            infoWindow.setContent(html);
            infoWindow.open(map, marker);
      })
          }
          c++;
      }
  };
}
  
  /* ************* VERSION 1 - START **************** */
  var state = true;

  function setMapOnAll() {
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }

  }
  const PanTo1 = () => {
    //// Unset all markers
      // stuff for 'stop' action
      if (state == false) {
        // stuff for 'playnow' action
        setMapOnAll();
        var myBoolean = true;
        state = true;
        return;
    }

    else {

    var stops1 = stops
    
    const google = window.google

    for (var key in stops1) {
      if (stops1.hasOwnProperty(key)) {
        
        var stop = stops1[key].stop_name
        var lat = stops1[key].stop_lat;
        var log = stops1[key].stop_long;
        var displayInfo = "<h3>" + stops1[key].stop_name + "</br>" + "</h3>Bikes Available : ";
       
        // Generate infoWindow
        
        // console.log(lat)
        var location_place = {lat:parseFloat(lat), lng:parseFloat(log)};
        var infoWindow = new google.maps.InfoWindow();
        // console.log('Inside the maps')
      }

      var marker = new google.maps.Marker({
        position: location_place,
        map: map,
          });

      markers.push(marker);
      
          var html = stop;
      google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent(html);
        map.panTo(this.getPosition());
        
      })
      }

    var markerCluster = new MarkerClusterer({ markers, map });

    state = false;
      return;
    }

    }

  /* ************* VERSION 1 - END **************** */

// geolocator


function isMarkerInArea(circle, latLngPos){
  return (circle.getBounds().contains(latLngPos))
}

function getLocation(){
  navigator.geolocation.getCurrentPosition(success);

  function success(pos) {
    return pos.coords;
  }
}

function Geolocatorr({stops2}) {
  
  location = getLocation()

  

  // for (var i = 0; i < stops2.length; i++){
  //   if (isMarkerInArea(circle, marker)) {
  //     return (
  //       a
  //     )
  //   }
  // }
  
}

const panTo = (lat, lng) => {

  mapRef.current.panTo({ lat, lng });
  mapRef.current.setZoom(16);

  var stopsInArea = [];
  var searchAreaRadius = 500; // metres
  
  var location = new google.maps.LatLng(lat,lng);

  var test = {lat: lat, lng: lng};

  const circle_icon = {
    url: location_icon, // url
    scaledSize: new google.maps.Size(50, 50), // scaled size
    origin: new google.maps.Point(0,0), // origin
};
  
  var circleArea = new google.maps.Circle({
        strokeOpacity: 0,
        strokeWeight: 0,
        fillOpacity: 0,
        map: map,
        center: location,
        radius: searchAreaRadius
      }); // if overlapping, remove options to make the circle blank

  // Add markers that are in circle area to stopsInArea
  for (var key in stops2) {
    if (isMarkerInArea(circleArea, stops2[key].position)) {
      stopsInArea.push({
        id: stops2[key].id,
        name: stops2[key].name,
        position: stops2[key].position,
      })
    }
  }

  const loc = new google.maps.Marker({
    position: location,
    map,
    icon: circle_icon,
  });

  // Iterate through stops to create markers & infowindows
  for (var key in stopsInArea) {

    const contentString = '<div>' + stopsInArea[key].name + '</div>'

    const infoWindow = new google.maps.InfoWindow({
      content: contentString
    })

    const marker = new google.maps.Marker({
      position: stopsInArea[key].position,
      map,
      // icon: red_icon,
    });

    marker.addListener("click", () => {
      infoWindow.open({
        anchor: marker,
        map,
        shouldFocus: false,
      });
    });

  }
  

}

// function getPosition() {
//   // Simple wrapper
//   return new Promise((res, rej) => {
//       navigator.geolocation.getCurrentPosition(res, rej);
//   });
// }

// async function getPos() {
//   var position = await getPosition();

//   console.log(position)

// }

let getLocationPromise = () => {
  return new Promise(function (resolve, reject) {

      // Promisifying the geolocation API
      navigator.geolocation.getCurrentPosition(
          (position) => resolve(position),
          (error) => reject(error)
      );
  });
};

function getLocation() {
  getLocationPromise()
  .then((res) => {
    // If promise get resolved,
    const {coords} = res;
    var lat = coords.latitude;
    var lng = coords.longitude;

    console.log("HLELLOOO", lat, lng)

    var position2 = {lat, lng}
    
    var location = {lat: parseFloat(stops2[key].lat), lng: parseFloat(stops2[key].lng)}
    var position = new google.maps.LatLng(location)


    return (
      console.log("idkman")
    )
    
  })
}


// console.log("YEYEYE", test123)


// async function main() {
//   var position = await getPosition();  // wait for getPosition to complete
//   var lat = position.coords.latitude;
//   var lng = position.coords.longitude;
  
//   console.log("LATLNG", lat, lng)
// }

// console.log("TESTING", main())
// console.log("TET:", main())

// console.log("TEST:", Geolocator(stops2, 53.3659865, -6.2975434))

// var test = new google.maps.Circle({
//   strokeColor: 'Blue',
//   strokeOpacity: '0.6',
//   strokeWeight: 0,
//   fillColor: 'Blue',
//   fillOpacity: 0.1,
//   map,
//   radius: 175,
//   clickable: true,
//   center: {
//       lat: 53.3659865,
//       lng: -6.2975434
//   },
// })

var testmarker = new google.maps.LatLng(57.3659865, -6.2975434)

// console.log("TEST:", test.getBounds().contains(testmarker))

console.log("STOPS2:", stops2)

  return (
    <div id='GoogleMap'>
      
    <WeatherIcon/>
    
    <div className="geolocator">
        <div className="stopsLabel">Geo</div>
        <Switch
          checked={geolocatorToggle}
          onChange={geolocatorToggler}
          onColor="#86d3ff"
          onHandleColor="#2693e6"
          handleDiameter={30}
          uncheckedIcon={false}
          checkedIcon={false}
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          height={20}
          width={48}
          className="react-switch"
          id="material-switch"
        />
    </div>

    
    
    <div className="showStops">
        <div className="stopsLabel">Stops</div>
        <Switch
          checked={clusterer}
          onChange={clusterToggler}
          onColor="#86d3ff"
          onHandleColor="#2693e6"
          handleDiameter={30}
          uncheckedIcon={false}
          checkedIcon={false}
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          height={20}
          width={48}
          className="react-switch"
          id="material-switch"
        />
    </div>

    <GoogleMap
      center={center}
      zoom={14}
      mapContainerStyle={mapContainerStyle}
      options={options}
      onLoad={(map) => {
        setMap(map);
      }}
      
      onClick={() => {
        setModalType("CLOSED");
      }}
    >
      {clusterer && (
        <MarkerClusterer>
        {(clusterer) =>
          stops2.map(({ id, name, position }) => (
            <Marker
              key={id}
              position={position}
              onClick={() => handleActiveMarker(id)}
              clusterer={clusterer}
            >
              {activeMarker === id ? (
                <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                  <div>{name}</div>
                </InfoWindow>
              ) : null}
            </Marker>
            
          ))}
        
      </MarkerClusterer>
      )}

      {geolocatorToggle && (  
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // console.log(position.coords)
            var lat = position.coords.latitude;
            var lng =  position.coords.longitude;
            
            panTo(lat,lng)

            /*console.log("TEST:", markers)*/

            

          }
        )
        
      )}


      {directionsOutput && (
        <DirectionsRenderer
          options={{
            suppressMarkers: true,
            suppressInfoWindows: true,
            polylineOptions: { strokeColor: "#d97706" },
          }}
          directions={directionsOutput}
          routeIndex={selectRouteIndex()}
        />
      )}


    </GoogleMap>
    </div>
  );
};


function Locate({ panTo }) {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  //    
  return (
    navigator.geolocation.getCurrentPosition(
  
      (position) => {
        console.log(position.coords)
        var lat = position.coords.latitude;
        var lng =  position.coords.longitude
        panTo(lat,lng);
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      }
    )
  )
  
}

export default Map;
