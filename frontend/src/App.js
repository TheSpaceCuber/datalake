import { MapContainer, TileLayer, Polyline, GeoJSON } from "react-leaflet";
import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [currCoords, setCurrCoords] = useState([1.363649, 103.806181]);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [data, setData] = useState(undefined); 
  const [loading, setLoading] = useState(true); 
  const COLORS = ["#0800ff", "#02f00a", "#ff9900", "#ff1900", "#660a00"]; 

  const mapStyle = {
    height: `${height}px`,
    width: `${width}`,
    display: `flex`,
    justifyContent: `center`,
    margin: `auto`,
  };

  const handleJson = () => {
    fetch("./sample.json")
      .then((res) => res.json())
      .then((data) => setData(data));
  };

  useEffect(() => {
    if (data !== undefined) {
      setLoading(false); 
    }
  }, [data])

  useEffect(() => {
    handleJson();
  });

  return (
    <MapContainer
      center={currCoords}
      zoom={13}
      scrollWheelZoom={false}
      style={mapStyle}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {!loading &&
        data.features.map((f) => {
          return (
            <GeoJSON
              data={f}
              style={{ color: COLORS[f.properties.Level] }}
            />
          );
        })}
    </MapContainer>
  );
}

export default App;
