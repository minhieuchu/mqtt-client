import React from "react";
import ReactDOM from "react-dom/client";
import mqtt from "precompiled-mqtt";
import App from "./App.tsx";
import "./index.css";

let mqttClient: mqtt.MqttClient;
const host = "broker.emqx.io";
const port = 8083;

function setupMqttClient(host: string, port: number) {
  const url = `ws://${host}:${port}/mqtt`;
  const options = {
    clean: true,
    connectTimeout: 5 * 1000,
    reconnectPeriod: 1000,
  };

  mqttClient = mqtt.connect(url, options);

  mqttClient.on("connect", () => {
    console.log("Mqtt connected");
  });

  mqttClient.on("message", (topic, message) => {
    const payload = { topic, message: message.toString() };
    console.log(payload);
  });

  mqttClient.subscribe("device/random-device-id", { qos: 0 }, (err) => {
    if (err) {
      console.log("Subscribe error ", err);
    }
  });
}

setupMqttClient(host, port);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
