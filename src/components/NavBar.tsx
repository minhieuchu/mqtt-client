import { Link } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  return (
    <div className="navbar-container">
      <Link to={"device"}>Device</Link>
      <Link to={"dashboard"}>DashBoard</Link>
    </div>
  );
}
