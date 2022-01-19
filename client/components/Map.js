/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { loadCountries } from '../store/countries';

class DisplayMap extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getCountries();
  }

  handleClick(name) {
    window.location.hash = `/products/c/${name}`;
  }

  render() {
    return (
      <LoadScript googleMapsApiKey={process.env.API_KEY}>
        <GoogleMap
          zoom={3}
          center={{ lat: 28.65643220817304, lng: 77.2411275855953 }}
          mapContainerStyle={{ height: '100vh', width: '50vw' }}
        >
          {this.props.countries.map((e) => {
            return (
              <Marker
                onClick={() => {
                  return this.handleClick(e.name);
                }}
                position={{
                  lat: parseInt(e.latitude),
                  lng: parseInt(e.longitude),
                }}
                key={e.id}
              />
            );
          })}
        </GoogleMap>
      </LoadScript>
    );
  }
}

const mapStateToProps = (state) => {
  const { countries } = state;
  return {
    countries,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCountries: () => {
      dispatch(loadCountries());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayMap);
