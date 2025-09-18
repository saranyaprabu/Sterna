import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaMapMarkerAlt,
  FaKey,
  FaUsers,
  FaCar,
  FaLock,
  FaRoute,
  FaServer,
  FaLayerGroup,
} from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
    { path: "/location", label: "Locations", icon: <FaMapMarkerAlt /> },
    { path: "/access", label: "Access", icon: <FaLock /> },
    { path: "/trips", label: "Trips", icon: <FaRoute /> },
    { path: "/gateways", label: "Gateways", icon: <FaServer /> },
    { path: "/vehicles", label: "Vehicles", icon: <FaCar /> },
    { path: "/users", label: "Users", icon: <FaUsers /> },
  ];

  return (
    <aside className="h-screen w-20 bg-sky-500 text-white flex flex-col items-center py-4">
      <div className="mb-6 text-center">
        <h1 className="font-bold text-xs">SELYEK</h1>
      </div>

      <nav className="flex-1 space-y-4 text-xs flex flex-col items-center">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center p-2 rounded transition text-center ${
              location.pathname === item.path
                ? "bg-sky-600"
                : "hover:bg-sky-600"
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="mt-1">{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
