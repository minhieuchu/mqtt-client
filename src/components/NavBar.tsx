import { memo } from "react";
import { Link, useLocation } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  const location = useLocation();
  const isDevicePage = location.pathname.match(/\bdevice\b/);
  const isDashboardPage = location.pathname.match(/\bdashboard\b/);

  return (
    <div className="navbar-container">
      <Link to={"device"} className={isDevicePage ? "active" : ""}>
        Device
      </Link>
      <Link to={"dashboard"} className={isDashboardPage ? "active" : ""}>
        DashBoard
      </Link>
    </div>
  );
}

export default memo(NavBar);
