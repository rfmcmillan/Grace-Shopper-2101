import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { API_KEY } from '../secret';

const DisplayMap = () => {
  const center = { lat: 28.65643220817304, lng: 77.2411275855953 };

  return (
    <LoadScript googleMapsApiKey={API_KEY}>
      <GoogleMap
        zoom={4}
        center={center}
        mapContainerStyle={{ height: '500px', width: '1000px' }}
      >
        <Marker
          position={{ lat: 17.422635674938114, lng: 78.46911411149898 }}
        ></Marker>
      </GoogleMap>
    </LoadScript>
  );
};

export default React.memo(DisplayMap);
// // Initialize and add the map
// function initMap() {
//   map = new google.maps.Map(document.getElementById('map'), {
//     center: { lat: 28.65643220817304, lng: 77.2411275855953 },
//     zoom: 4,
//     mapId: '4deaa8c67ed436b3',
//   });
//   const India = new google.maps.Marker({
//     position: { lat: 17.422635674938114, lng: 78.46911411149898 },
//     map,
//     title: 'India',
//     icon: {
//       url: 'snacks.svg',
//       scaledSize: new google.maps.Size(40, 40),
//     },
//     animation: google.maps.Animation.DROP,
//   });

//   const IndiaInfo = new google.maps.InfoWindow({ content: 'India' });
//   India.addListener('click', () => {
//     IndiaInfo.open(map, India);
//   });

//   const Taiwan = new google.maps.Marker({
//     position: { lat: 23.84406215203008, lng: 120.9230499363364 },
//     map,
//     title: 'Taiwan',
//     icon: {
//       url: 'snacks.svg',
//       scaledSize: new google.maps.Size(40, 40),
//     },
//     animation: google.maps.Animation.DROP,
//   });
//   const TaiwanInfo = new google.maps.InfoWindow({ content: 'Taiwan' });
//   Taiwan.addListener('hover', () => {
//     TaiwanInfo.open(map, Taiwan);
//   });

//   const French = new google.maps.Marker({
//     position: { lat: 48.8611546464059, lng: 2.3358046534193906 },
//     map,
//     title: 'French',
//     icon: { url: 'snacks.svg', scaledSize: new google.maps.Size(40, 40) },
//     animation: google.maps.Animation.DROP,
//   });
//   const FrenchInfo = new google.maps.InfoWindow({ content: 'French' });
//   French.addListener('click', () => {
//     FrenchInfo.open(map, French);
//   });
//   const Spain = new google.maps.Marker({
//     position: { lat: 40.42950704004299, lng: -3.7022071210846486 },
//     map,
//     title: 'Spain',
//     icon: {
//       url: 'snacks.svg',
//       scaledSize: new google.maps.Size(40, 40),
//     },
//     animation: google.maps.Animation.DROP,
//   });
//   const SpainInfo = new google.maps.InfoWindow({ content: 'Spain' });
//   Spain.addListener('click', () => {
//     SpainInfo.open(map, Spain);
//   });
//   const Australia = new google.maps.Marker({
//     position: { lat: -20.617881888101394, lng: 135.09110442991363 },
//     map,
//     title: 'Australia',
//     icon: {
//       url: 'snacks.svg',
//       scaledSize: new google.maps.Size(40, 40),
//     },
//     animation: google.maps.Animation.DROP,
//   });
//   const AustraliaInfo = new google.maps.InfoWindow({ content: 'Australia' });
//   Australia.addListener('click', () => {
//     AustraliaInfo.open(map, Australia);
//   });
//   const China = new google.maps.Marker({
//     position: { lat: 34.35094695144762, lng: 108.84219110307014 },
//     map,
//     title: 'China',
//     icon: {
//       url: 'snacks.svg',
//       scaledSize: new google.maps.Size(40, 40),
//     },
//     animation: google.maps.Animation.DROP,
//   });
//   const ChinaInfo = new google.maps.InfoWindow({ content: 'China' });
//   China.addListener('click', () => {
//     ChinaInfo.open(map, China);
//   });
//   const Singapore = new google.maps.Marker({
//     position: { lat: 1.3676500002443548, lng: 103.8517041624466 },
//     map,
//     title: 'Singapore',
//     icon: {
//       url: 'snacks.svg',
//       scaledSize: new google.maps.Size(40, 40),
//     },
//     animation: google.maps.Animation.DROP,
//   });
//   const SingaporeInfo = new google.maps.InfoWindow({ content: 'Singapore' });
//   Singapore.addListener('click', () => {
//     SingaporeInfo.open(map, Singapore);
//   });
//   const Korea = new google.maps.Marker({
//     position: { lat: 37.57978703298325, lng: 126.97703026833248 },
//     map,
//     title: 'South Korea',
//     icon: {
//       url: 'snacks.svg',
//       scaledSize: new google.maps.Size(40, 40),
//     },
//     animation: google.maps.Animation.DROP,
//   });
//   const KoreaInfo = new google.maps.InfoWindow({ content: 'South Korea' });
//   Korea.addListener('click', () => {
//     KoreaInfo.open(map, Korea);
//   });
//   const Japan = new google.maps.Marker({
//     position: { lat: 35.72392626089728, lng: 139.79853405592576 },
//     map,
//     title: 'Japan',
//     icon: {
//       url: 'snacks.svg',
//       scaledSize: new google.maps.Size(40, 40),
//     },
//     animation: google.maps.Animation.DROP,
//   });
//   const JapanInfo = new google.maps.InfoWindow({ content: 'Japan' });
//   Japan.addListener('click', () => {
//     JapanInfo.open(map, Japan);
//   });
//   const Thailand = new google.maps.Marker({
//     position: { lat: 13.770136520329599, lng: 100.49857517316434 },
//     map,
//     title: 'Thailand',
//     icon: {
//       url: 'snacks.svg',
//       scaledSize: new google.maps.Size(40, 40),
//     },
//     animation: google.maps.Animation.DROP,
//   });
//   const ThailandInfo = new google.maps.InfoWindow({ content: 'Thailand' });
//   Thailand.addListener('click', () => {
//     ThailandInfo.open(map, Thailand);
//   });
// }

// initMap();
