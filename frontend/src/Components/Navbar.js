import React from "react";
import "./Navbar.css";
import dublin_bus_logo from "../Assets/dublin_bus_logo.png";
import { BrowserRouter, Route, Link, useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import WeatherCard from "./Weather";

const Navbar = ({ modalType, setModalType },props) => {
  // function HomeButton() {
  let navigate = useNavigate();

  function handleClick() {
    navigate("/signin");
  }
  
  return (
    <div>
      <div className="header text-white pt-4 pl-7">
        <div className="mb-4 mt-4 ml-3">
          <img
            src={dublin_bus_logo}
            className="w-8 mr-4 pb-2 inline-block"
            alt="Dublin Bus Logo"
          />

          <h1 className="font-sans inline-block text-3xl mr-3">Dublin Bus</h1>
        </div>
        <h2 className="text-xl text-left font-light font-sans tracking-wider">
          Journey Planner App
        </h2>
      </div>

      {/* Web Buttons */}
      <div className="webbuttons">
        <button
          onClick={() => {
            if (modalType === "CLOSED") {
              setModalType("journeyPlanner");
            } else if (
              modalType !== "CLOSED" &&
              modalType !== "journeyPlanner"
            ) {
              setModalType("journeyPlanner");
            } else {
              setModalType("CLOSED");
            }
          }}
          className="text-left text-base font-light	tracking-wider webbutton bg-zinc-900 hover:bg-amber-800 text-slate-100 font-medium py-3 px-7 mt-6"
        >
          Journey Planner
        </button>
        <button
          onClick={() => {
            if (modalType === "CLOSED") {
              setModalType("routes");
            } else if (modalType !== "CLOSED" && modalType !== "routes") {
              setModalType("routes");
            } else {
              setModalType("CLOSED");
            }
          }}
          className="text-left text-base font-light	tracking-wider webbutton bg-zinc-900 hover:bg-amber-800 text-slate-100 font-medium py-3 px-7"
        >
          Route Information
        </button>
        
      </div>

      {/* Phone buttons */}
      <div className="phonebuttons inline-flex">
        <button
          onClick={() => {
            if (modalType === "CLOSED") {
              setModalType("journeyPlanner");
            } else if (
              modalType !== "CLOSED" &&
              modalType !== "journeyPlanner"
            ) {
              setModalType("journeyPlanner");
            } else {
              setModalType("CLOSED");
            }
          }}
          className="text-md font-light bg-zinc-900 hover:bg-amber-800 text-slate-100 font-medium py-2 px-6 rounded-l-2xl"
        >
          Journey <br />
          Planner
        </button>
        <button
          onClick={() => {
            if (modalType === "CLOSED") {
              setModalType("routes");
            } else if (modalType !== "CLOSED" && modalType !== "routes") {
              setModalType("routes");
            } else {
              setModalType("CLOSED");
            }
          }}
          className="bg-zinc-900 text-md font-light hover:bg-amber-800 text-slate-100 font-medium py-2 px-6 border-l border-r border-zinc-500"
        >
          Route Information
        </button>
        {/* <h3 class="text-4xl font-normal leading-normal mt-0 mb-2 text-pink-800">
          {this.state.logged_in
            ? `Hello, ${this.state.username}`
            : 'Please Log In'}
        </h3> */}
        <button className="bg-zinc-900 text-md font-light hover:bg-amber-800 text-slate-100 font-medium py-2 px-6 rounded-r-2xl" onClick={handleClick}>
          Sign In
        </button>
        
      </div>
      <button className="webbutton font-light	tracking-wider text-left text-base webbutton-bottom bg-zinc-900 hover:bg-amber-800 text-slate-100 font-medium py-4 px-7 mb-4" onClick={handleClick}>
        Sign In
      </button>
      {/* <h3>
      {this.state.logged_in
            ? `Hello, ${this.state.username}`
            : '' }
      </h3> */}
    </div>
  );
};

export default Navbar;
