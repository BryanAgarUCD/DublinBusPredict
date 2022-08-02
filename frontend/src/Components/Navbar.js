import React from "react";
import "./Navbar.css";
import dublin_bus_logo from "../Assets/dublin_bus_logo.png";


const Navbar = ({ modalType, setModalType }) => {
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
          Routes
          
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
          Routes
        </button>
        <button className="bg-zinc-900 text-md font-light hover:bg-amber-800 text-slate-100 font-medium py-2 px-6 rounded-r-2xl">
          Sign In
        </button>
      </div>
      <button className="webbutton font-light	tracking-wider text-left text-base webbutton-bottom bg-zinc-900 hover:bg-amber-800 text-slate-100 font-medium py-4 px-7 mb-4">
        Sign In
      </button>
    </div>
  );
};

export default Navbar;
