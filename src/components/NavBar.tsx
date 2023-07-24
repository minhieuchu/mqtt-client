import classnames from "classnames";
import { memo } from "react";
import { Link, useLocation } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  const location = useLocation();
  const isDevicePage = location.pathname.match(/^\/device$/);
  const isDashboardPage = location.pathname.match(/^\/dashboard$/);

  return (
    <div className="navbar-container">
      <Link to={"device"} className={classnames({ active: isDevicePage })}>
        Device
      </Link>
      <Link
        to={"dashboard"}
        className={classnames({ active: isDashboardPage })}
      >
        DashBoard
      </Link>
    </div>
  );
}

export default memo(NavBar);
