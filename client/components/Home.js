import React from 'react';
import { Link } from 'react-router-dom';
import Map from './Map';

const Home = () => {
  return (
    <div id="test">
      <div id="home">
        <h1>Welcome to the Global Snacker</h1>
        <Map></Map>
        {/* <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA0Czh5f_nGC5M_EHN4KYNnLVIok4mHvkE&map_ids=4deaa8c67ed436b3&callback=initMap" /> */}
        <div className="homeButtons">
          <div id="mainButtons">
            <Link to="/products">
              <button>All Snacks</button>
            </Link>
            <Link to="/countries">
              <button>All Countries</button>
            </Link>
          </div>
          <div id="homeLinks">
            <Link to="/login">Log In</Link>
            <Link to="/login">Not regesitered? Become a global snacker</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;