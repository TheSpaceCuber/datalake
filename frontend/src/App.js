import {
  Circle,
  FeatureGroup,
  LayerGroup,
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  GeoJSON,
  ZoomControl,
} from "react-leaflet";
import React, { useState, useEffect } from "react";
import "./App.css";
import Graph from "./Graph";
import { IoMdArrowDropdown } from "react-icons/io";
import { icon } from "leaflet";

function App() {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [taxiData, setTaxiData] = useState(undefined);
  const [roadData, setRoadData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [graphOpen, setGraphOpen] = useState(true);

  const currCoords = [1.363649, 103.806181];
  const COLORS = ["#0800ff", "#02f00a", "#ff9900", "#ff1900", "#660a00"];

  const mapStyle = {
    height: `${height}px`,
    width: `${width}`,
    display: `flex`,
    justifyContent: `center`,
    margin: `auto`,
    zIndex: "0",
  };

  const taxiIcon = icon({
    iconUrl: "taxi.png",
    iconSize: [32, 37],
    iconAnchor: [16, 37],
  });

  useEffect(() => {
    if (roadData !== undefined && taxiData !== undefined) {
      setLoading(false);
    }
  }, [taxiData, roadData]);

  useEffect(() => {
    handleTaxiJson();
    handleRoadJson();
  }, []);

  const handleTaxiJson = () => {
    fetch("./taxiavailablitylatest.json")
      .then((res) => res.json())
      .then((data) => setTaxiData(data));
  };

  const handleRoadJson = () => {
    fetch("./sample.json")
      .then((res) => res.json())
      .then((data) => setRoadData(data));
  };

  function handleClick() {
    setGraphOpen(!graphOpen);
  }

  return (
    <div>
      <button onClick={handleClick}>
        <IoMdArrowDropdown size={20} />
      </button>
      {graphOpen && <Graph />}

      <MapContainer
        center={currCoords}
        zoom={13}
        zoomControl={false}
        scrollWheelZoom={false}
        style={mapStyle}
      >
        <LayersControl position="topright">
          <LayersControl.Overlay name="Taxi Availability Layer">
            <LayerGroup>
              {!loading &&
                taxiData.features.map((res) => {
                  return (
                    <Marker
                      icon={taxiIcon}
                      position={res.coordinates}
                    />
                  );
                })}
            </LayerGroup>
          </LayersControl.Overlay>

          <LayersControl.Overlay checked name="Congestion Layer">
            <LayerGroup>
              {!loading &&
                roadData.features.map((f) => {
                  return (
                    <GeoJSON
                      data={f}
                      style={{ color: COLORS[f.properties.Level] }}
                    />
                  );
                })}
            </LayerGroup>
          </LayersControl.Overlay>

          <LayersControl.Overlay name="Feature group">
            <FeatureGroup pathOptions={{ color: "purple" }}>
              <Popup>Popup in FeatureGroup</Popup>
              <Circle center={[51.51, -0.06]} radius={200} />
            </FeatureGroup>
          </LayersControl.Overlay>
        </LayersControl>

        <ZoomControl position="bottomright" />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
}

export default App;
