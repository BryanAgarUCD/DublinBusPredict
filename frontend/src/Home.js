
import React, { useState, useEffect, useRef } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import "./App.css";
import Map from "./Components/Map";
import Navbar from "./Components/Navbar";
import Modal from "./Components/Modals/Modal";
import ReactLoading from "react-loading";

// Places lib for maps
const libraries = ["places","geometry"];

const Home = () => {

  const [resultsReady, setResultsReady] = useState(false);

  const [mapLoaded, setMapLoaded] = useState(null);


  // Backend API data
  const [stops, setStops] = useState([]);
  const [nameHeadsign, setNameHeadsign] = useState([]);
  const [shapes, setShapes] = useState([]);

  // Modal setting
  const [modalType, setModalType] = useState("CLOSED");

  // Options for different routes to destination
  const [routeOptions, setRouteOptions] = useState();

  // Route index chosen
  const [chosenIndex, setChosenIndex] = useState();

  // References for origin and destination input
  const originRef = useRef("");
  const destinationRef = useRef("");

  // Time for journey
  const [timeValue, setTimeValue] = useState(new Date());

  // Directions object from request to google maps
  const [directionsOutput, setDirectionsOutput] = useState(null);

  // Variable to check if map api has loaded
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  
  // Function to get data from backend API
  const fetchAPIData = async () => {
    const stopResponse = await fetch("http://localhost:8000/api/stops/");
    const stopData = await stopResponse.json();

    const nameHeadsignResponse = await fetch(
      "http://localhost:8000/api/namesandheadsigns/"
    );
    const nameHeadsignData = await nameHeadsignResponse.json();

    // Set relevant data
    setStops(stopData);
    setNameHeadsign(nameHeadsignData);
  };
  // Get API data
  useEffect(() => {
    fetchAPIData();
  }, []);
  // Error loading Map
  if (loadError) {
    return (
      <div className="h-full w-full bg-zinc-900 absolute text-base font-light	tracking-wider text-slate-100 font-medium py-3 px-7">
        Google Maps cannot be loaded right now.
        <br />
        Please try again later or contact Google and maybe they can solve the
        issue! :)
      </div>
    );
  } else if (!isLoaded) {
    // If map has not loaded display loading..
    return (
      <div className="h-full w-full bg-zinc-900 absolute">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <ReactLoading type={"spin"} color="#475569" />
        </div>
        <div className="text-center absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <p c role='loading-message' className="text-slate-500">
            Loading..
          </p>
        </div>
      </div>
    );
  }

  // Function to take chosen route and set index
  const selectRoute = (selection) => {
    setChosenIndex(selection);
  };

  // Function to get predicted journey time for bus leg
  async function getPrediction(id, dist) {
    // Either returns a predicted value or a null result on failure
    let base = "http://localhost:8000/api/prediction/";
    let api_url = base + id + "/" + dist + "/";
    const response = await fetch(api_url);
    if (response.ok) {
      const data = await response.json();
      const prediction = await data.journey_time;
      return prediction;
    } else {
      return null;
    }
  }

  // Function to convert duration (in seconds) to human readable text
  const secondsToText = (sec) => {
    let hr = Math.floor(sec / 3600);
    let min = Math.floor((sec % 3600) / 60);
    let seconds = Math.floor((sec % 3600) % 60);
    if (seconds >= 30) {
      min += 1;
    }
    if (hr > 0) {
      return hr + " hr " + min + " min";
    } else {
      return min + " min";
    }
  };

  // View for route options, will decide how button looks
  const prepareRouteOptions = async (option) => {
    setResultsReady(false);
    let options;
    options = option.map(async (route, index) => {
      // Arrays for instructions and bus numbers
      let instructionsArray = [];
      let busesArray = [];
      let originalStepDurations = 0; // (total route duration) - sum(original step durations) = (wait time)
      let predictedStepDurations = 0; // for walking, add duration directly, for transit get predicted duration

      // Loop through each step and fill the arrays with instruction and bus info
      const promises = route.legs[0].steps.map(async (step) => {
        let predictedStepDurations = 0;
        instructionsArray.push(step.instructions);
        let stepTravelMode = step.travel_mode;
        originalStepDurations += step.duration.value; // summing original setp durations
        // predictedStepDurations += step.duration.value;

        // If the step involves taking the bus
        if (stepTravelMode === "TRANSIT") {
          let line = step.transit.line;
          let bus_type = line.agencies[0].name;
          let lineID = line.short_name;
          let stepDistance = step.distance.value;

          // Prepare the result if it is a bus we use
          if (bus_type === "Go-Ahead" || bus_type === "Dublin Bus") {
            busesArray.push(line.short_name);
          }

          // Getting prediction for step
          let predictedStepDuration = await getPrediction(lineID, stepDistance);
          if (predictedStepDuration != null) {
            // if value is returned, use value
            predictedStepDurations += predictedStepDuration;
          } else {
            // if no value is returned, use original step duration
            predictedStepDurations += step.duration.value;
          }
        } else {
          predictedStepDurations += step.duration.value; // take non-transit values directly

        }
        return predictedStepDurations;
      });

      const promiseFixer = await Promise.all(promises);
      console.log("promise fixer", promiseFixer);
      let predictedJourneyTime = 0;
      for (let i = 0; i < promiseFixer.length; i++) {
        predictedJourneyTime += promiseFixer[i];
      }
      let waitTime = route.legs[0].duration.value - originalStepDurations; // janky solution, could be improved
      // let predictedJourneyTime = predictedStepDurations + waitTime;
      let durationText = secondsToText(predictedJourneyTime);
      console.log("predicted: " + durationText);
      console.log("original: " + route.legs[0].duration.text);

      return {
        id: index,
        remove: route.contains_non_dublin_bus,
        instructions: instructionsArray,
        buses: busesArray,
        distance: route.legs[0].distance.text,
        duration: durationText,
        steps: route.legs[0].steps.length,
      };
      // });
    });
    const results = await Promise.all(options);
    setRouteOptions(results);
    setResultsReady(true);
  };

  // Async function to get route based off origin and destination
  const getRoutes = async () => {
    if (originRef.current.value === "" || destinationRef.current.value === "") {
      return;
    }

    // Create google maps js directions service object
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();

    // Declare request format
    const directionsRequest = {
      // Set origin and destination
      origin: originRef.current.value,
      destination: destinationRef.current.value,

      // Specify transit mode and bus as mode of transport
      travelMode: "TRANSIT",
      transitOptions: {
        modes: ["BUS"],
        departureTime: timeValue,
      },
      provideRouteAlternatives: true,
      // eslint-disable-next-line no-undef
      unitSystem: google.maps.UnitSystem.METRIC,
    };

    let directionsAvailable = false;
    // Call route function, passing it a directions request object
    try {
      const results = await directionsService.route(
        directionsRequest,
        function (result, status) {
          if (status === "OK") {
            directionsAvailable = true;
            return;
          }
        }
      );
      if (directionsAvailable) {
        // Clean results for non Dublin bus responses
        console.log(results);
        cleanObject(results);
        prepareRouteOptions(results.routes);
        setDirectionsOutput(results);
        setChosenIndex(0);
      }
    } catch {
      console.log("No results for that journey error");
    }
  };

  // Function to clean directions object for non Dublin Bus results
  const cleanObject = (response) => {
    response.routes.forEach((route, index) => {
      // Route index
      let routeIndex = index;

      let legs = route.legs[0];
      let steps = legs.steps;

      steps.forEach((step) => {
        let stepTravelMode = step.travel_mode;

        // If the step involves taking the bus
        if (stepTravelMode === "TRANSIT") {
          let line = step.transit.line;
          let bus_type = line.agencies[0].name;

          // Prepare the result if it is a bus we use
          if (bus_type === "Go-Ahead" || bus_type === "Dublin Bus") {
            response.routes[routeIndex].contains_non_dublin_bus = "NO";
          } else {
            response.routes[routeIndex].contains_non_dublin_bus = "YES";
          }
        }
      });
    });
  };

  return (
    <div>
      <div id="mapCanvas">
        {modalType !== "CLOSED" && (
          <Modal
            resultsReady={resultsReady}
            modalType={modalType}
            setModalType={setModalType}
            originRef={originRef}
            destinationRef={destinationRef}
            getRoutes={getRoutes}
            routeOptions={routeOptions}
            selectRoute={selectRoute}
            chosenIndex={chosenIndex}
            directionsOutput={directionsOutput}
            nameHeadsign={nameHeadsign}
            setShapes={setShapes}
            setDirectionsOutput={setDirectionsOutput}
            mapLoaded={mapLoaded}
            timeValue={timeValue}
            setTimeValue={setTimeValue}
          />
        )}
        <Map
          role='map'
          setModalType={setModalType}
          chosenIndex={chosenIndex}
          directionsOutput={directionsOutput}
          isLoaded={isLoaded}
          loadError={loadError}
          shapes={shapes}
          mapLoaded={mapLoaded}
          setMapLoaded={setMapLoaded}
          stops={stops}
          modalType={modalType}
        />
      </div>
      <div id="navbar">
        <Navbar modalType={modalType} setModalType={setModalType} role='navbar' />
      </div>
    </div>
  );
};

export default Home;