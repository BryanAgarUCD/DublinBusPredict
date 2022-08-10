import React from 'react';
import PropTypes from 'prop-types';
import "./Navbar.css";
import { BrowserRouter, Route, Link, useNavigate } from "react-router-dom";


function Nav1(props) {



    let navigate = useNavigate();
    function handleClick() {
        navigate("/");
      }
  const logged_out_nav = (

<ul class="flex">
  <li class="bg-zinc-900 text-md font-light hover:bg-amber-800 text-slate-100 font-medium py-2 px-6" onClick={() => props.display_form('login')}>login</li>
  <li class="bg-zinc-900 text-md font-light hover:bg-amber-800 text-slate-100 font-medium py-2 px-6" onClick={() => props.display_form('signup')}>signup</li>
  <button className="bg-zinc-900 text-md font-light hover:bg-amber-800 text-slate-100 font-medium py-2 px-6" onClick={handleClick}>
          Home
    </button>
</ul>
  );

  const logged_in_nav = (
    <ul>
      <li class ='bg-zinc-900 text-md font-light hover:bg-amber-800 text-slate-100 font-medium py-2 px-6' onClick={props.handle_logout}>logout</li>
      <button className="bg-zinc-900 text-md font-light hover:bg-amber-800 text-slate-100 font-medium py-2 px-6" onClick={handleClick}>
          Home
    </button>
    </ul>
  );
  return <div>{props.logged_in ? logged_in_nav : logged_out_nav}</div>;
}

export default Nav1;

Nav1.propTypes = {
  logged_in: PropTypes.bool.isRequired,
  display_form: PropTypes.func.isRequired,
  handle_logout: PropTypes.func.isRequired
};
