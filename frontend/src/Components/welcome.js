import React, { Component } from 'react';
import Nav from './Nav1';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
// import '/App.css';
import Navbar from "./Navbar";
import "./Navbar.css";
// import Home from '../Home';
import Home from "../Home";
import WeatherCard from './Weather';
import ReactWeather from 'react-open-weather';
import Todo from './welcome1';
import { TwitterTweetEmbed, TwitterTimelineEmbed } from 'react-twitter-embed'


class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayed_form: '',
      logged_in: localStorage.getItem('token') ? true : false,
      username: ''
      // favorites: '',

    };
  }
  

  componentDidMount() {
    if (this.state.logged_in) {
      fetch('http://localhost:8000/core/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(json => {
          this.setState({ username: json.username });
        });
    }
  }

  handle_login = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        this.setState({
          logged_in: true,
          displayed_form: '',
          username: json.user.username
          // favorites: json.user.favorites
        });
      });
  };

  handle_logout = () => {
    localStorage.removeItem('token');
    this.setState({ logged_in: false, username: '' });
  };
  
  handle_signup = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/core/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        console.log(json)
        localStorage.setItem('token', json.token);
        this.setState({
          logged_in: true,
          displayed_form: '',
          username: json.username
          // favorites : json.favorites
        });
      });
  };

  display_form = form => {
    this.setState({
      displayed_form: form
    });
  };

  render() {
    let form;
    const isLoggedIn = this.state.logged_in;
    switch (this.state.displayed_form) {
      case 'login':
        form = <LoginForm handle_login={this.handle_login} />;
        break;
      case 'signup':
        form = <SignupForm handle_signup={this.handle_signup} />;
        break;
      default:
        form = null;
    }

    return (
      <div className="welcome" style = {{display:'block'}}>
        
        <Nav
          logged_in={this.state.logged_in}
          display_form={this.display_form}
          handle_logout={this.handle_logout}
          
        />
        
        {form}
        <h4 class="text-4xl font-normal leading-normal mt-0 mb-2 text-pink-800 text-center">
          {this.state.logged_in
            ? `Hello, ${this.state.username}`
            : '' }
           <br></br>
        The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.

        </h4>
        {this.state.logged_in
            ? <div class="static ...">
            {/* <Home></Home> */}
            <div class="absolute bottom-0 left-0 ...">
            </div>
          </div>
            
            : '' }
        <div>
      {isLoggedIn ? (
        <UserGreeting/>
      ) : (
        ''
      )}
    </div>

      </div>
    );
  }
}
function UserGreeting(props) {
    return (
        <div className="md:flex">
        <div className='flex-1'>

        
        
        
        
        <Todo/>

        </div>
        <div className='flex-1 pr-1'>
        <h1 className='text-3xl font-bold content-center text-center pb-5'>Twitter feed - Dublin Bus</h1>
        <div   style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        
        <TwitterTimelineEmbed
          sourceType="profile"
          // The preferred screen name goes next: 
          screenName="dublinbusnews"
          // Style options goes here:
          options={{ height: 800, width: 800 }}/>

        </div>
        </div>


      
      </div>
      
    )
  }
export default Welcome;
