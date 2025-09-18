// src/components/Location.jsx
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLocations, addLocationAsync } from "../redux/locationSlice";
import Modal from "react-modal";
import { FiPlus, FiSearch } from "react-icons/fi";

Modal.setAppElement("#root");

const Location = () => {
  const { items: locations, loading } = useSelector((state) => state.locations);
  const dispatch = useDispatch();

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ name: "", city: "" });
  const [locationSearch, setLocationSearch] = useState(""); // for sidebar search
  const [lockSearch, setLockSearch] = useState("");

  useEffect(() => {
    dispatch(fetchLocations());
  }, [dispatch]);

  useEffect(() => {
    if (!selectedLocation && locations.length > 0) {
      setSelectedLocation(locations[0]);
    }
  }, [locations, selectedLocation]);

  const filteredLocks =
    selectedLocation?.locks.filter((lock) =>
      lock.name.toLowerCase().includes(lockSearch.toLowerCase())
    ) || [];

  const handleAddLocation = () => {
    if (!form.name || !form.city) return;
    dispatch(addLocationAsync(form));
    setForm({ name: "", city: "" });
    setIsModalOpen(false);
  };

  return (
    <div className="flex h-screen w-full bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r flex flex-col">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-md font-semibold text-gray-800">Location</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-sky-500 hover:text-sky-700"
          >
            <FiPlus size={20} />
          </button>
        </div>
        <div className="p-4 border-b border-gray-200">
          <input
            type="text"
            placeholder="Enter search term"
            value={locationSearch}
            onChange={(e) => setLocationSearch(e.target.value)}
            className="border rounded px-2 py-1 w-full text-sm focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <p className="text-gray-400 text-sm p-4">Loading...</p>
          ) : (
            <ul>
              {locations
                .filter((loc) =>
                  loc.name.toLowerCase().includes(locationSearch.toLowerCase())
                )
                .map((loc) => (
                  <li
                    key={loc.id}
                    onClick={() => setSelectedLocation(loc)}
                    className={`cursor-pointer p-3 hover:bg-gray-100 flex items-center space-x-3 ${
                      selectedLocation?.id === loc.id ? "bg-sky-100" : ""
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-sky-200 text-sky-700 flex items-center justify-center font-semibold text-sm">
                      {loc.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">
                        {loc.name}
                      </div>
                      <div className="text-xs text-gray-500">{loc.city}</div>
                    </div>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-sky-50">
        {/* Top Navbar */}
        <div className="bg-white border-b border-gray-200 px-6 py-3">
          <h1 className="text-lg font-semibold text-gray-800">
            {selectedLocation?.name || "Select a location"}
          </h1>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-gray-100 border-b border-gray-200 px-6 py-2 flex space-x-6">
          <button className="text-sm font-medium text-sky-500 border-b-2 border-sky-500 pb-1">
            Lock Mapping
          </button>
          <button className="text-sm font-medium text-gray-700 hover:text-sky-500">
            Lock Group
          </button>
          <button className="text-sm font-medium text-gray-700 hover:text-sky-500">
            Geofence
          </button>
          <button className="text-sm font-medium text-gray-700 hover:text-sky-500">
            Gateway Mapping
          </button>
        </div>

        {/* Lock Mapping Section */}
        <div className="p-6 flex-1 overflow-y-auto">
          {selectedLocation ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-md font-semibold text-gray-700">
                  Lock Mapping
                </h2>
                <div className="flex items-center space-x-2">
                  <button className="flex items-center text-sky-500 bg-sky-100 hover:bg-sky-200 px-3 py-1 text-sm rounded">
                    <FiPlus className="mr-1" /> Lock Mapping
                  </button>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search"
                      value={lockSearch}
                      onChange={(e) => setLockSearch(e.target.value)}
                      className="border rounded px-8 py-1 text-sm w-48 focus:outline-none focus:ring-1 focus:ring-sky-500"
                    />
                    <FiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto bg-white rounded shadow-sm">
                <table className="min-w-full text-sm border border-gray-200">
                  <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                    <tr>
                      <th className="border px-3 py-2 text-left">S.NO</th>
                      <th className="border px-3 py-2 text-left">LOCK NAME</th>
                      <th className="border px-3 py-2 text-left">
                        ASSET MARKING
                      </th>
                      <th className="border px-3 py-2 text-left">LOCK TYPE</th>
                      <th className="border px-3 py-2 text-left">
                        BATTERY PERCENTAGE
                      </th>
                      <th className="border px-3 py-2 text-left">
                        LAST COMMUNICATED DATE & TIME
                      </th>
                      <th className="border px-3 py-2 text-left">CREATED BY</th>
                      <th className="border px-3 py-2 text-left">ACT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLocks.length === 0 ? (
                      <tr>
                        <td
                          colSpan="8"
                          className="text-center text-gray-400 py-4"
                        >
                          No results found
                        </td>
                      </tr>
                    ) : (
                      filteredLocks.map((lock, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                          <td className="border px-3 py-2">{idx + 1}</td>
                          <td className="border px-3 py-2">{lock.name}</td>
                          <td className="border px-3 py-2">
                            {lock.assetMarking}
                          </td>
                          <td className="border px-3 py-2">{lock.type}</td>
                          <td className="border px-3 py-2">
                            {lock.batteryPercentage}%
                          </td>
                          <td className="border px-3 py-2">
                            {lock.lastCommunication}
                          </td>
                          <td className="border px-3 py-2">{lock.createdBy}</td>
                          <td className="border px-3 py-2 text-center">-</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-sm">
              Select a location to view details
            </p>
          )}
        </div>
      </div>

      {/* Modal for Adding Location */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="bg-white p-6 rounded shadow-lg max-w-sm mx-auto mt-32"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start"
      >
        <h2 className="text-lg font-semibold mb-4">Add Location</h2>
        <input
          type="text"
          placeholder="Location Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border w-full px-2 py-1 rounded mb-3 text-sm"
        />
        <input
          type="text"
          placeholder="City"
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
          className="border w-full px-2 py-1 rounded mb-3 text-sm"
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => setIsModalOpen(false)}
            className="px-3 py-1 border rounded text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleAddLocation}
            className="px-3 py-1 bg-sky-500 text-white rounded text-sm"
          >
            Add
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Location;
