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
} from 'react-leaflet'
import React, { useState, useEffect } from "react";
import "./App.css";
import Graph from "./Graph";
import { IoMdArrowDropdown } from "react-icons/io";

function App() {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [data, setData] = useState(undefined);
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

  useEffect(() => {
    if (data !== undefined) {
      setLoading(false);
    }
  }, [data]);

  useEffect(() => {
    handleJson();
  }, []);

  const handleJson = () => {
    fetch("./sample.json")
      .then((res) => res.json())
      .then((data) => setData(data));
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
          <LayersControl.Overlay name="Marker with popup">
            <Marker position={currCoords}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </LayersControl.Overlay>

          <LayersControl.Overlay checked name="Layer group with circles">
            <LayerGroup>
              <Circle
                center={currCoords}
                pathOptions={{ fillColor: 'blue' }}
                radius={200}
              />
              <Circle
                center={currCoords}
                pathOptions={{ fillColor: 'red' }}
                radius={100}
                stroke={false}
              />
              <LayerGroup>
                <Circle
                  center={[51.51, -0.08]}
                  pathOptions={{ color: 'green', fillColor: 'green' }}
                  radius={100}
                />
                {!loading &&
                  data.features.map((f) => {
                    return (
                      <GeoJSON
                        data={f}
                        // style={{ color: COLORS[f.properties.Level] }}
                        style={{ color: COLORS[Math.floor(Math.random() * 4) + 1] }}
                      />
                    );
                  })}
              </LayerGroup>
            </LayerGroup>
          </LayersControl.Overlay>

          <LayersControl.Overlay name="Feature group">
            <FeatureGroup pathOptions={{ color: 'purple' }}>
              <Popup>Popup in FeatureGroup</Popup>
              <Circle center={[51.51, -0.06]} radius={200} />
              {/* <Rectangle bounds={rectangle} /> */}
            </FeatureGroup>
          </LayersControl.Overlay>

        </LayersControl>

        <ZoomControl position="topleft" />


        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
}

export default App;
