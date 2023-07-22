import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import mqtt from "precompiled-mqtt";
import NavBar from "./components/NavBar";
import Device from "./pages/Device";
import DashBoard from "./pages/DashBoard";
import ErrorPage from "./pages/ErrorPage";

const DEVICE_TOPIC = "/device/6f9ea7c7-6297-4283-b72d-7d673d3473fd";
const TEMPERATURE_TOPIC = DEVICE_TOPIC + "/Temperature";

export default function App() {
  const [mqttClient, setMqttClient] = useState<mqtt.MqttClient | null>(null);

  useEffect(() => {
    const host = "broker.emqx.io";
    const port = 8083;
    const url = `ws://${host}:${port}/mqtt`;
    const options = {
      clean: true,
      connectTimeout: 5 * 1000,
      reconnectPeriod: 1000,
    };

    const client = mqtt.connect(url, options);
    setMqttClient(client);
  }, []);

  useEffect(() => {
    if (mqttClient) {
      mqttClient.on("connect", () => {
        console.log("Mqtt connected");
      });

      mqttClient.on("message", (topic, message) => {
        if (topic === DEVICE_TOPIC) {
          // console.log(JSON.parse(message.toString()))
        } else if (topic === TEMPERATURE_TOPIC) {
          // console.log(JSON.parse(message.toString()))
        }
      });

      mqttClient.subscribe(DEVICE_TOPIC, { qos: 0 }, (err) => {
        if (err) {
          console.log("Subscribe Device topic error ", err);
        }
      });

      mqttClient.subscribe(TEMPERATURE_TOPIC, { qos: 0 }, (err) => {
        if (err) {
          console.log("Subscribe Temperature topic error ", err);
        }
      });
    }
  }, [mqttClient]);

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate replace to="/device" />}></Route>
        <Route path="/device" element={<Device />}></Route>
        <Route path="/dashboard" element={<DashBoard />}></Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
