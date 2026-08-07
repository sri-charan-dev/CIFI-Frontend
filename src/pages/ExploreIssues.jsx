import potholeImg from "../assets/issues/pothole.png";
import streetLightImg from "../assets/issues/broken-street-light.png";
import drainImg from "../assets/issues/overflow-drain.png";
import garbageImg from "../assets/issues/garbage-pileup.png";
import footpathImg from "../assets/issues/damaged-footpath.png";
import WaterloggingImg from "../assets/issues/waterlogging.png";
import { issues } from "../data/issues";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home as HomeIcon,
  PlusCircle,
  Search,
  FileText,
  MapPin,
  ChevronRight,
  Settings,
  LogOut,
} from "lucide-react";

function ExploreIssues() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [severity, setSeverity] = useState("All Severities");
  const [status, setStatus] = useState("All Status");
  const [area, setArea] = useState("All Areas");
  const filteredIssues = issues.filter(
    (issue) =>
      issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const [displayedIssues, setDisplayedIssues] = useState(filteredIssues);

  const applyFilters = () => {
    let result = filteredIssues;

    if (category !== "All Categories") {
      result = result.filter(
        (issue) => issue.category === category
      );
    }

    setDisplayedIssues(result);
  };

  return (
    <div className="flex h-screen bg-[#f4f7fa]">

      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 bg-gray-50 overflow-y-auto">

        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Explore Issues
          </h1>

          <p className="text-gray-500 mt-1">
            Browse all reported infrastructure issues in your city.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="🔍 Search by issue title or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">

          <div className="grid grid-cols-5 gap-4">

            {/* Category */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Category
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full mt-2 border rounded-lg px-3 py-2">
                <option>All Categories</option>
                <option>Potholes</option>
                <option>Street Lights</option>
                <option>Garbage</option>
                <option>Drainage</option>
              </select>
            </div>

            {/* Severity */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Severity
              </label>

              <select className="w-full mt-2 border rounded-lg px-3 py-2">
                <option>All Severities</option>
                <option>Critical</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Status
              </label>

              <select className="w-full mt-2 border rounded-lg px-3 py-2">
                <option>All Status</option>
                <option>Pending</option>
                <option>In Progress</option>
                <option>Resolved</option>
              </select>
            </div>

            {/* Area */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Ward / Area
              </label>

              <select className="w-full mt-2 border rounded-lg px-3 py-2">
                <option>All Areas</option>
                <option>Banjara Hills</option>
                <option>Jubilee Hills</option>
                <option>Kukatpally</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex items-end gap-3">

              <button
                onClick={applyFilters}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
                Filter
              </button>

              <button
                onClick={() => {
                  setCategory("All Categories");
                  setSeverity("All Severities");
                  setStatus("All Status");
                  setArea("All Areas");
                  setSearchTerm("");
                  setDisplayedIssues(issues);
                }}
                className="text-blue-600 font-semibold">
                Reset
              </button>

            </div>

          </div>

        </div>

        <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200">

          {displayedIssues.map((issue) => (
            <div
              key={issue.id}
              onClick={() => navigate(`/issue/${issue.id}`, {
                state: { from: "/explore" },
              })
              }
              className="flex items-center justify-between px-6 py-4 border-b last:border-b-0 hover:bg-blue-50 hover:shadow-md transition-all duration-300 cursor-pointer">
              {/* Left Section */}
              <div className="flex items-center gap-4">

                <img
                  src={issue.image}
                  alt={issue.title}
                  className="w-24 h-16 rounded-lg object-cover border" />

                <div>
                  <h3 className="font-semibold text-lg text-gray-900">
                    {issue.title}
                  </h3>

                  <div className="flex items-center gap-1 text-gray-500 text-sm mt-2">
                    <MapPin size={14} />
                    {issue.location}
                  </div>
                </div>

              </div>

              {/* Right Section */}
              <div className="flex items-center gap-6">

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium border
        ${issue.severity === "Critical"
                      ? "bg-red-50 text-red-600 border-red-300"
                      : issue.severity === "High"
                        ? "bg-orange-50 text-orange-600 border-orange-300"
                        : "bg-yellow-50 text-yellow-700 border-yellow-300"
                    }`}>
                  {issue.severity}
                </span>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium border
        ${issue.status === "Resolved"
                      ? "bg-green-50 text-green-600 border-green-300"
                      : issue.status === "In Progress"
                        ? "bg-blue-50 text-blue-600 border-blue-300"
                        : "bg-gray-100 text-gray-600 border-gray-300"
                    }`}>
                  {issue.status}
                </span>

                <span className="text-gray-400 text-sm">
                  {issue.time}
                </span>

                <ChevronRight
                  size={22}
                  className="text-gray-400" />

              </div>

            </div>
          ))}

        </div>


      </main>

    </div>
  );
}

export default ExploreIssues;