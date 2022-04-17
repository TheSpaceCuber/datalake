import { MapContainer, TileLayer, GeoJSON, ZoomControl } from "react-leaflet";
import React, { useState, useEffect } from "react";
import "./App.css";
import Graph from "./Graph";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import { IoMdArrowDropdown } from 'react-icons/io';

function App() {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [data, setData] = useState(undefined); 
  const [loading, setLoading] = useState(true); 
  const [graphOpen, setGraphOpen] = useState(true); 

  const currCoords = [1.363649, 103.806181];
  const COLORS = ["#0800ff", "#02f00a", "#ff9900", "#ff1900", "#660a00"]; 
  const REGION = "ap-southeast-1";  

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

  const s3Client = new S3Client({
    region: REGION,
    credentials: fromCognitoIdentityPool({
      clientConfig: { region: REGION }, // Configure the underlying CognitoIdentityClient.
      identityPoolId: "ap-southeast-1:a5c852af-4476-4f3d-932d-01c6ac4ae398",
    }),
  });

  const bucketParams = {
    Bucket: "testgeojsonbuck",
    Key: "sample.json",
  };
  
  const run = async () => {
    try {
      // Create a helper function to convert a ReadableStream to a string.
      const streamToString = (stream) =>
        new Promise((resolve, reject) => {
          const chunks = [];
          stream.on("data", (chunk) => chunks.push(chunk));
          stream.on("error", reject);
          stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
        });
  
      // Get the object} from the Amazon S3 bucket. It is returned as a ReadableStream.
      const data = await s3Client.send(new GetObjectCommand(bucketParams));
      // Convert the ReadableStream to a string.
      const bodyContents = await streamToString(data.Body);
      console.log(bodyContents);
      return bodyContents;
    } catch (err) {
      console.log("Error", err);
    }
  };

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
        <IoMdArrowDropdown size={20}/>
      </button>
      {graphOpen && <Graph />}
      <MapContainer
        center={currCoords}
        zoom={13}
        zoomControl={false}
        scrollWheelZoom={false}
        style={mapStyle}
      >
        <ZoomControl position="topright" />
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
                // style={{ color: COLORS[Math.floor(Math.random() * 4) + 1] }}
              />
            );
          })}
      </MapContainer>
    </div>
  );
}

export default App;
