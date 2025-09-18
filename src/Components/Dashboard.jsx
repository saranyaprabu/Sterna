import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
const Dashboard = () => {
  const [data, setData] = useState(null);
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    axios
      .get("http://localhost:5000/dashboard")
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!data) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-blue-50">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen flex bg-blue-50">
      {/* Main content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-700">Dashboard</h2>
          <div className="text-sm text-gray-500">
            Good morning,{" "}
            <span className="font-medium">{user?.name || "Guest"}</span>
            <div>{new Date().toLocaleString()}</div>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-6 gap-4 mb-6">
          <StatBox
            label="TOTAL ASSETS"
            value={data.totalAssets}
            color="bg-sky-500"
          />
          <StatBox
            label="TOTAL LOCATIONS"
            value={data.totalLocations}
            color="bg-green-500"
          />
          <StatBox
            label="TOTAL ACCESS"
            value={data.totalAccess}
            color="bg-orange-400"
          />
          <StatBox
            label="TOTAL USERS"
            value={data.totalUsers}
            color="bg-pink-500"
          />
          <StatBox
            label="TOTAL LOCK GROUPS"
            value={data.totalLockGroups}
            color="bg-gray-600"
          />
          <StatBox
            label="TOTAL USER GROUPS"
            value={data.totalUserGroups}
            color="bg-purple-500"
          />
        </div>

        {/* Three panels */}
        <div className="grid grid-cols-3 gap-4">
          <Panel title="ASSETS IN STOCK">
            {data.assetsInStock.length === 0 ? (
              <p className="text-center text-gray-400 py-6">No Assets</p>
            ) : (
              <ul className="text-sm">
                {data.assetsInStock.map((a, idx) => (
                  <li key={idx}>{a}</li>
                ))}
              </ul>
            )}
          </Panel>

          <Panel title="HIGHEST LOCK OPENINGS (LAST 7 DAYS)">
            {data.highestLockOpenings.length === 0 ? (
              <p className="text-center text-gray-400 py-6">No data</p>
            ) : (
              <ul className="text-sm">
                {data.highestLockOpenings.map((o, idx) => (
                  <li key={idx}>{o}</li>
                ))}
              </ul>
            )}
          </Panel>

          <Panel title="LOCK STATUS COUNT">
            {data.lockStatusCount.length === 0 ? (
              <p className="text-center text-gray-400 py-6">No data</p>
            ) : (
              <ul className="text-sm">
                {data.lockStatusCount.map((c, idx) => (
                  <li key={idx}>{c}</li>
                ))}
              </ul>
            )}
          </Panel>
        </div>
      </div>
    </div>
  );
};

const StatBox = ({ label, value, color }) => (
  <div className={`rounded-lg text-white p-4 shadow ${color}`}>
    <div className="text-sm">{label}</div>
    <div className="text-2xl font-semibold">{value}</div>
  </div>
);

const Panel = ({ title, children }) => (
  <div className="bg-white rounded-md shadow p-4 h-full">
    <h3 className="text-sm font-semibold mb-2">{title}</h3>
    <div className="border-t border-gray-200 pt-4">{children}</div>
  </div>
);

export default Dashboard;
