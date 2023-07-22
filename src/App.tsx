import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Device from "./pages/Device";
import DashBoard from "./pages/DashBoard";
import ErrorPage from "./pages/ErrorPage";

export default function App() {
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
