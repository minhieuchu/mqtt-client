import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import mqtt from "precompiled-mqtt";
import NavBar from "./components/NavBar";
import Device from "./pages/Device";
import DashBoard from "./pages/DashBoard";
import ErrorPage from "./pages/ErrorPage";
import { DataPointModel, DeviceModel, Nullable } from "./common/types";

const DEVICE_TOPIC = "/device/6f9ea7c7-6297-4283-b72d-7d673d3473fd";
const TEMPERATURE_TOPIC = DEVICE_TOPIC + "/Temperature";

export default function App() {
  const [mqttClient, setMqttClient] = useState<Nullable<mqtt.MqttClient>>(null);
  const [deviceModel, setDeviceModel] = useState<Nullable<DeviceModel>>(null);
  const [dataPointModel, setDataPointModel] =
    useState<Nullable<DataPointModel>>(null);

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
        mqttClient.subscribe(
          [DEVICE_TOPIC, TEMPERATURE_TOPIC],
          { qos: 0 },
          (err) => {
            if (err) {
              console.log("Subscribe error:", err);
            }
          }
        );
      });

      mqttClient.on("message", (topic, message) => {
        if (topic === DEVICE_TOPIC) {
          const deviceData = JSON.parse(message.toString()) as DeviceModel;
          setDeviceModel(deviceData);
          console.log("Receiving Device model:", deviceData);
        } else if (topic === TEMPERATURE_TOPIC) {
          const dataPoint = JSON.parse(message.toString()) as DataPointModel;
          setDataPointModel(dataPoint);
          console.log("Receiving DataPoint model:", dataPoint);
        }
      });

      mqttClient.on("error", (err) => {
        console.error("Connection error ", err);
        mqttClient.end();
      });
    }
  }, [mqttClient]);

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate replace to="/device" />}></Route>
        <Route
          path="/device"
          element={<Device deviceModel={deviceModel} />}
        ></Route>
        <Route
          path="/dashboard"
          element={<DashBoard dataPointModel={dataPointModel} />}
        ></Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
