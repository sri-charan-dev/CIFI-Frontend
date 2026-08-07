import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HyderabadMap from "../assets/maps/hyderabad-map.png";

function ReportIssue() {
  const navigate = useNavigate();
  const handleCurrentLocation = () => {
    alert("Current Location button clicked");

    // TODO:
    // Backend team will replace this
    // with GPS location logic.
  };
  const handleSubmit = () => {
    console.log("Submit button clicked");

    // TODO:
    // Backend team will add API call here
  };

  return (
    <div className="min-h-screen bg-[#f4f7fa] p-8">

      {/* Main Card */}
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-md p-8">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">

          <button
            onClick={() => navigate("/home")}
            className="w-11 h-11 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
          >
            <ArrowLeft size={22} />
          </button>

          <div>
            <h1 className="text-3xl font-bold text-[#173b57]">
              Report New Infrastructure Issue
            </h1>

            <p className="text-gray-500 mt-1">
              Help improve your community by reporting issues quickly.
            </p>
          </div>

        </div>

        {/* Category & Severity */}
        <div className="border rounded-xl p-6">

          <div className="grid grid-cols-2 gap-6">

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Issue Category
              </label>

              <select className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#17496d]">
                <option>Pothole</option>
                <option>Broken Street Light</option>
                <option>Garbage</option>
                <option>Drain Overflow</option>
                <option>Road Damage</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Severity
              </label>

              <select className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#17496d]">
                <option>Auto Detect</option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
              </select>
            </div>

          </div>

        </div>

        {/* Issue Title & Location */}
        <div className="border rounded-xl p-6 mt-6">

          <div className="space-y-6">

            {/* Issue Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Issue Title
              </label>

              <input
                type="text"
                placeholder="Enter issue title"
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#17496d]" />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Location
              </label>

              <div className="flex gap-3">

                <input
                  type="text"
                  placeholder="Enter address"
                  className="flex-1 border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#17496d]" />

                <button
                  onClick={handleCurrentLocation}
                  className="bg-[#17496d] hover:bg-[#123b5d] text-white px-5 rounded-lg transition">
                  📍 Current Location
                </button>

              </div>

            </div>

          </div>

        </div>

        {/* Map Preview */}
        <div className="border rounded-xl p-6 mt-6">

          <h2 className="text-lg font-semibold text-[#173b57] mb-4">
            Map Preview
          </h2>

          <div className="w-full h-[220px] rounded-lg overflow-hidden border">

            <img
              src={HyderabadMap}
              alt="Map Preview"
              className="w-full h-full object-cover" />

          </div>

        </div>

        {/* Description */}
        <div className="border rounded-xl p-6 mt-6">

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Description
          </label>

          <textarea
            rows="5"
            placeholder="Describe the issue in detail..."
            className="w-full border rounded-lg px-4 py-3 resize-none outline-none focus:ring-2 focus:ring-[#17496d]"
          ></textarea>

        </div>

        {/* Upload & AI Prediction */}
        <div className="grid grid-cols-2 gap-6 mt-6">

          {/* Upload */}
          <div className="border rounded-xl p-6">

            <h2 className="text-lg font-semibold text-[#173b57] mb-4">
              Upload Image
            </h2>

            <label className="border-2 border-dashed rounded-xl h-52 flex  flex-col justify-center items-center cursor-pointer hover:bg-gray-50 transition">

              <span className="text-5xl">📷</span>

              <p className="mt-3 font-medium">
                Click to Upload
              </p>

              <p className="text-sm text-gray-500">
                JPG, PNG
              </p>

              <input
                type="file"
                className="hidden" />

            </label>

          </div>

          {/* AI Prediction */}
          <div className="border rounded-xl p-6">

            <h2 className="text-lg font-semibold text-[#173b57] mb-4">
              AI Prediction
            </h2>

            <div className="space-y-4">

              <div className="flex justify-between">
                <span>Issue Type</span>
                <span className="font-semibold">Pothole</span>
              </div>

              <div className="flex justify-between">
                <span>Severity</span>
                <span className="text-red-600 font-semibold">
                  High
                </span>
              </div>

              <div className="flex justify-between">
                <span>Confidence</span>
                <span className="font-semibold">
                  92%
                </span>
              </div>

              <div className="mt-6 bg-red-100 text-red-600 rounded-lg p-4   text-center font-semibold">
                🔴 High Risk
              </div>

            </div>
          </div> {/* Upload & AI Prediction Grid Ends */}

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-8">

            <button
              onClick={() => navigate("/home")}
              className="px-6 py-3 rounded-lg border hover:bg-gray-100 transition">
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              className="px-8 py-3 rounded-lg bg-[#17496d] hover:bg-[#123b5d] text-white font-semibold transition">
              Submit Report
            </button>

          </div>

        </div> {/* Main Card Ends */}

      </div> {/* Page Ends */}
    </div>
  );
}

export default ReportIssue;