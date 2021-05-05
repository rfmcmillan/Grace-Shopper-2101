import React, { useEffect, useImperativeHandle, useState } from 'react';
import axios from 'axios';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { API_KEY } from '../secret';

const DisplayMap = () => {
  const center = { lat: 28.65643220817304, lng: 77.2411275855953 };

  const handleClick = () => {
    console.log('you click here');
  };

  return (
    <LoadScript googleMapsApiKey={API_KEY}>
      <GoogleMap
        zoom={4}
        center={center}
        mapContainerStyle={{ height: '500px', width: '1000px' }}
      >
        <Marker
          onClick={() => { return handleClick(); }}
          position={{ lat: 17.422635674938114, lng: 78.46911411149898 }}
        />
      </GoogleMap>
    </LoadScript>
  );
};

export default React.memo(DisplayMap);
