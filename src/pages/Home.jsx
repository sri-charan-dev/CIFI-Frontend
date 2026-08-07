import potholeImg from "../assets/issues/pothole.png";
import streetLightImg from "../assets/issues/broken-street-light.png";
import drainImg from "../assets/issues/overflow-drain.png";
import garbageImg from "../assets/issues/garbage-pileup.png";
import footpathImg from "../assets/issues/damaged-footpath.png";
import WaterloggingImg from "../assets/issues/waterlogging.png";
import HyderabadMap from "../assets/maps/hyderabad-map.png";
import Sidebar from "../components/Sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ClipboardList,
  Construction,
  Lightbulb,
  Trash2,
  Waves,
  TriangleAlert,
} from "lucide-react";

function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const userName = location.state?.userName || "Citizen";

  const issues = [
    {
      id: 1,
      title: "Large Pothole",
      location: "Banjara Hills",
      severity: "Critical",
      status: "Pending",
      time: "2 hours ago",
      image: potholeImg,
      top: "120px",
      left: "250px",
    },
    {
      id: 2,
      title: "Broken Street Light",
      location: "jubilee Hills",
      severity: "High",
      status: "Resolved",
      time: "5 hours ago",
      image: streetLightImg,
      top: "160px",
      left: "210px",
    },
    {
      id: 3,
      title: "Overflowing Drain",
      location: "Kukatpally",
      severity: "High",
      status: "In Progress",
      time: "Yesterday",
      image: drainImg,
      top: "140px",
      left: "120px",
    },
    {
      id: 4,
      image: footpathImg,
      title: "Damaged Footpath",
      category: "Potholes",
      location: "Ameerpet Metro Station",
      severity: "Medium",
      status: "Reported",
      time: "2 days ago",
      top: "180px",
      left: "260px",
    },
    {
      id: 5,
      image: garbageImg,
      title: "Garbage Pileup",
      category: "Garbage",
      location: "Green Park Colony",
      severity: "Medium",
      status: "Resolved",
      time: "3 days ago",
      top: "110px",
      left: "310px",
    },
    {
      id: 6,
      image: WaterloggingImg,
      title: "Waterlogging on 3rd Block Road",
      category: "Drainage",
      location: "Madhapur, 3rd Block",
      severity: "High",
      status: "In Progress",
      time: "4 days ago",
      top: "170px",
      left: "360px",
    },
  ];

  const stats = {
    totalIssues: issues.length,

    resolved: issues.filter(
      issue => issue.status === "Resolved"
    ).length,

    inProgress: issues.filter(
      issue => issue.status === "In Progress"
    ).length,

    critical: issues.filter(
      issue =>
        issue.severity === "Critical" &&
        issue.status === "Pending"
    ).length,
  };

  return (
    <div className="flex h-screen flex bg-[#f4f7fa]">

      <Sidebar />

      {/* MAIN CONTENT */}
      <main className="ml-64 flex-1 h-screen overflow-y-auto p-8">
        <h1 className="text-3xl font-bold text-[#173b57]">
          Welcome back, {userName}!
        </h1>
        <p className="text-gray-500 mt-2">
          Here's what's happening with infrastructure in your community.
        </p>

        {/* STATISTICS CARDS */}
        <div className="grid grid-cols-4 gap-6 mt-8">
          {/* Total Issues */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">Total Issues</p>
                <h2 className="text-4xl font-bold mt-2">{stats.totalIssues}</h2>
              </div>
              <div className="bg-blue-100 p-4 rounded-xl">
                <ClipboardList className="text-blue-600" size={28} />
              </div>
            </div>
          </div>

          {/* Resolved */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">Resolved Issues</p>
                <h2 className="text-4xl font-bold mt-2">{stats.resolved}</h2>
              </div>
              <div className="bg-green-100 p-4 rounded-xl text-2xl">✅</div>
            </div>
          </div>

          {/* In Progress */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">In Progress</p>
                <h2 className="text-4xl font-bold mt-2">{stats.inProgress}</h2>
              </div>
              <div className="bg-yellow-100 p-4 rounded-xl text-2xl">⏳</div>
            </div>
          </div>

          {/* Critical */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">Critical Issues</p>
                <h2 className="text-4xl font-bold mt-2">{stats.critical}</h2>
              </div>
              <div className="bg-red-100 p-4 rounded-xl text-2xl">⚠️</div>
            </div>
          </div>
        </div>

        {/* SECOND ROW */}
        <div className="grid grid-cols-3 gap-6 mt-6">
          {/* REPORT NEW ISSUE */}
          <div className="col-span-1 bg-white rounded-xl shadow-sm p-6 flex flex-col justify-between">
            <h2 className="text-xl font-bold text-[#173b57]">Report New Issue</h2>
            <p className="text-gray-500 mt-3">
              See something broken in your community? Report it in just a few seconds.
            </p>
            <button
              onClick={() => navigate("/report")}
              className="mt-6 bg-[#17496d] hover:bg-[#123b5d] text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Report Now
            </button>
          </div>

          {/* POPULAR ISSUE TYPES */}
          <div className="col-span-2 bg-white rounded-xl shadow-sm p-6 min-h-[260px]">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-[#173b57]">Popular Issue Types</h2>
              <button className="text-[#17496d] font-medium hover:underline">View All</button>
            </div>

            <div className="grid grid-cols-5 gap-6 mt-8">
              <div className="flex flex-col items-center">
                <Construction size={32} className="text-[#17496d]" />
                <p className="text-sm mt-2 text-center">Potholes</p>
              </div>
              <div className="flex flex-col items-center">
                <Lightbulb size={32} className="text-[#17496d]" />
                <p className="text-sm mt-2 text-center">Lights</p>
              </div>
              <div className="flex flex-col items-center">
                <Waves size={32} className="text-[#17496d]" />
                <p className="text-sm mt-2 text-center">Drains</p>
              </div>
              <div className="flex flex-col items-center">
                <Trash2 size={32} className="text-[#17496d]" />
                <p className="text-sm mt-2 text-center">Garbage</p>
              </div>
              <div className="flex flex-col items-center">
                <TriangleAlert size={32} className="text-[#17496d]" />
                <p className="text-sm mt-2 text-center">Roads</p>
              </div>
            </div>
          </div>
        </div>
        {/* THIRD ROW */}
        <div className="grid grid-cols-2 gap-6 mt-6">

          {/* Recent Issues */}
          <div className="bg-white rounded-xl shadow-sm p-6">

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-[#173b57]">
                Recent Issues in Your Area
              </h2>

              <button className="text-[#17496d] font-medium hover:underline">
                View All
              </button>
            </div>

            <div className="space-y-4">

              {issues.map((issue) => (

                <div
                  key={issue.id}
                  className="flex items-center gap-4 border-b pb-4"
                >

                  <img
                    src={issue.image}
                    alt={issue.title}
                    className="w-20 h-20 rounded-lg object-cover"
                  />

                  <div className="flex-1">

                    <h3 className="font-semibold">
                      {issue.title}
                    </h3>

                    <p className="text-sm text-gray-500">
                      📍 {issue.location}
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      {issue.time}
                    </p>

                  </div>

                  <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
                    {issue.severity}
                  </span>

                </div>

              ))}

            </div>

          </div>
          {/* Heatmap */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-[#173b57]">
                Infrastructure Heatmap
              </h2>

              <button className="text-[#17496d] font-medium hover:underline">
                View Full Map
              </button>
            </div>
            <div className="relative w-full h-[450px] border rounded-lg overflow-hidden">

              <img
                src={HyderabadMap}
                alt="Hyderabad Map"
                className="w-full h-full object-cover"
              />


              {issues.map((issue) => (
                <div
                  key={issue.id}
                  className="group absolute"
                  style={{
                    top: issue.top,
                    left: issue.left,
                  }}
                >
                  {/* Glowing circle */}
                  <div
                    className={`absolute w-6 h-6 rounded-full animate-ping opacity-70 ${issue.severity === "Critical"
                      ? "bg-red-500"
                      : issue.severity === "High"
                        ? "bg-orange-500"
                        : "bg-yellow-400"
                      }`}
                  ></div>

                  {/* Main marker */}
                  <div
                    className={`relative w-4 h-4 rounded-full border-2 border-white ${issue.severity === "Critical"
                      ? "bg-red-700"
                      : issue.severity === "High"
                        ? "bg-orange-600"
                        : "bg-yellow-500"
                      }`}
                  ></div>

                  {/* Tooltip */}
                  <div className="hidden group-hover:block absolute top-6 left-5 bg-white shadow-lg rounded-lg p-3 w-56 z-50">
                    <img
                      src={issue.image}
                      alt={issue.title}
                      className="w-full h-24 object-cover rounded-md"
                    />

                    <h3 className="font-semibold mt-2">{issue.title}</h3>

                    <p className="text-sm text-gray-500">
                      📍 {issue.location}
                    </p>

                    <span className="inline-block mt-2 px-2 py-1 bg-red-100 text-red-600 rounded-full text-xs">
                      {issue.severity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-6 mt-4 text-sm">

            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-600"></div>
              <span>Critical</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <span>High</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <span>Medium</span>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}

export default Home;
