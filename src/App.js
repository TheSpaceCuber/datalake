import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet';
import React, { useState } from 'react';
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [currCoords, setCurrCoords] = useState([1.363649, 103.806181]); 
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const mapStyle = {
    height: `${height}px`, 
    width: `${width}`,
    display: `flex`,
    justifyContent: `center`,
    margin: `auto`,
  }
  return (
      <MapContainer center={currCoords} zoom={13} scrollWheelZoom={false} style={mapStyle}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
  );
}

export default App;
