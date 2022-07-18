import React, { useState } from "react";
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
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

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
  const [clusterer, setClusterer] = useState(true);

  const clusterToggler = () => {
    clusterer ? setClusterer(false): setClusterer(true);
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
const panTo = (lat, lng) => {
    // find_closest_marker(lat,lng)
     
    lat = 53.339665308
    lng = -6.23749905
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
    var circle = new google.maps.Circle({
      strokeColor: 'Blue',
      strokeOpacity: '0.8',
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
  // var point = { lat, lng }
  var point = new google.maps.LatLng(lat,lng);
  
  var marker = new google.maps.Marker({
    position: point,
    map: map
      });
      setMapOnAll()
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
      // console.log(markers)
      for (var i = 0; i < stops.length; i++) {
        // console.log('Marker: , position: ' + stops[i].getPosition());
        // console.log("marker["+i+"] posn="+stops[i].markers.getPosition().toUrlValue(6));
        // console.log(markers[i].getPosition())
        // console.log(searchArea.getCenter())
        
        var distance
        var c = 0;
        while (c < stops.length){
          var location = stops[c];
          // console.log(location)
          var locationlatlng = new google.maps.LatLng(location.stop_lat,location.stop_long);
          // console.log(location.stop_lat,location.stop_long)

          var _kCord = new google.maps.LatLng(-36.874694, 174.735292);
          var _pCord = new google.maps.LatLng(-36.858317, 174.782284);
          // distance = new google.maps.geometry.spherical.computeDistanceBetween(point, locationlatlng);
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

          // console.log(distance);  // popup box says "[object, Object]"
          c++;
      }

        // if (google.maps.geometry.spherical.computeDistanceBetween(markers[i].getPosition(), point) <= searchAreaRadius) {
        //   console.log('=> is in searchArea');
        // }
        // else{
        //   console.log('Not in')
        // }

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


  return (
    <div id='GoogleMap'>
    <Locate panTo={panTo} />
    <div>
    <button onClick={PanTo1} className='search'>Show stop locations</button>
    </div>

    <div>
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
              clusterer= {clusterer}
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
    <button
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          
          (position) => {
            var lat = position.coords.latitude;
            var lng =  position.coords.longitude
            panTo(lat,lng);
            setLat(position.coords.latitude);
            setLng(position.coords.longitude);
          },
          () => null
        );
      }}
    >
      <img src="/compass.svg" alt="compass" />
    </button>
  );
}

export default Map;
