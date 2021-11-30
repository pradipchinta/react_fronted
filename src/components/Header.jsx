import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
const Header = () => {
  const [activeTab, setactiveTab] = useState("Home");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setactiveTab("Home");
    } else if (location.pathname === "/add") {
      setactiveTab("Adduser");
    } else if (location.pathname === "/about") {
      setactiveTab("About");
    }
  }, [location]);
  //   const [activeTab, setActiveTab] = "Home";
  return (
    <div className="header">
      <p className="logo">CRUD</p>
      <div className="header-right">
        <Link to="/">
          <p
            className={`${activeTab} === Home ? "active": ""`}
            onClick={() => setactiveTab("Home")}
          >
            Home
          </p>
        </Link>
        <Link to="/add">
          <p
            className={`${activeTab} === Adduser ? "active": ""`}
            onClick={() => setactiveTab("Adduser")}
          >
            Adduser
          </p>
        </Link>
        <Link to="/about">
          <p
            className={`${activeTab} === About ? "active": ""`}
            onClick={() => setactiveTab("About")}
          >
            about
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Header;
