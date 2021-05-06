/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { API_KEY } from '../secret';
import { loadCountries } from '../store/countries';

class DisplayMap extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getCountries();
  }

  handleClick(id) {
    window.location.hash = `/products/${id}`;
  }

  render() {
    return (
      <LoadScript googleMapsApiKey={API_KEY}>
        <GoogleMap
          zoom={4}
          center={{ lat: 28.65643220817304, lng: 77.2411275855953 }}
          mapContainerStyle={{ height: '500px', width: '1000px' }}
        >
          {this.props.countries.map((e) => {
            return (
              <Marker
                onClick={() => { return this.handleClick(e.id); }}
                position={{ lat: parseInt(e.latitude), lng: parseInt(e.longitude) }}
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
