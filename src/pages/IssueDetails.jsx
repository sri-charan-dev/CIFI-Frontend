import potholeImg from "../assets/issues/pothole.png";
import streetLightImg from "../assets/issues/broken-street-light.png";
import drainImg from "../assets/issues/overflow-drain.png";
import garbageImg from "../assets/issues/garbage-pileup.png";
import footpathImg from "../assets/issues/damaged-footpath.png";
import WaterloggingImg from "../assets/issues/waterlogging.png";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { MapPin } from "lucide-react";
import { issues } from "../data/issues";

function IssueDetails() {

  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const perviousPage = location.state?.from || "/explore";
  const issue = issues.find(
    (item) => item.id === Number(id)
  );
  if (!issue) {
    return (
      <div className="p-10 text-center text-red-600 text-2xl">
        Issue Not Found
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <button
        onClick={() => navigate(perviousPage)}
        className="text-blue-600 font-medium mb-6 hover:text-blue-800 transition"
      >
        ← Back to Issues
      </button>

      <div className="flex justify-between items-start">

        <div>

          <div className="flex items-center gap-3">

            <h1 className="text-4xl font-bold">
              {issue.title}
            </h1>

            <span className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm">
              {issue.severity}
            </span>

          </div>

          <p className="text-gray-500 mt-2">
            Reported on {issue.reportedDate},  by {issue.reportedby}
          </p>

          <div className="grid grid-cols-3 gap-8 mt-8">

            {/* LEFT SIDE */}
            <div className="col-span-2">

              {/* Image Card */}
              <div className="bg-white border rounded-xl p-4 shadow-sm">

                {/* Main Image */}
                <img
                  src={issue.image}
                  alt={issue.title}
                  className="w-full h-[330px] object-cover rounded-lg"
                />

                {/* Thumbnail Images */}
                <div className="flex gap-3 mt-4">

                  <img
                    src={issue.image}
                    className="w-24 h-16 rounded-lg border object-cover cursor-pointer hover:ring-2 hover:ring-blue-500"
                    alt=""
                  />

                  <img
                    src={issue.image}
                    className="w-24 h-16 rounded-lg border object-cover cursor-pointer hover:ring-2 hover:ring-blue-500"
                    alt=""
                  />

                  <img
                    src={issue.image}
                    className="w-24 h-16 rounded-lg border object-cover cursor-pointer hover:ring-2 hover:ring-blue-500"
                    alt=""
                  />

                </div>

              </div>

              {/* Description */}
              <div className="bg-white rounded-xl border shadow-sm p-6 mt-6">

                <h2 className="text-2xl font-semibold mb-4">
                  Description
                </h2>

                <p className="text-gray-600 leading-8">
                  {issue.description}
                </p>

              </div>

              {/* Location */}
              <div className="bg-white rounded-xl border shadow-sm p-6 mt-6">

                <div className="flex items-start gap-4">

                  <MapPin
                    size={28}
                    className="text-blue-600 mt-1"
                  />

                  <div>

                    <h2 className="text-2xl font-semibold mb-4">
                      Location
                    </h2>

                    <p className="text-gray-600">
                      {issue.location}
                    </p>

                    <button className="mt-4 text-blue-600 font-semibold hover:underline">
                      Open in Map
                    </button>

                  </div>

                </div>

              </div>

            </div>

            {/* RIGHT SIDE */}
            <div>
              <div className="bg-white border rounded-xl p-6 shadow-sm">

                <h2 className="text-2xl font-semibold mb-6">
                  AI Analysis
                </h2>

                <div className="space-y-5">

                  <div>
                    <p className="text-gray-500 text-sm">
                      AI Detected Category
                    </p>

                    <p className="font-semibold">
                      {issue.aiCategory}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500 text-sm">
                      Confidence Score
                    </p>

                    <p className="text-green-600 font-bold">
                      {issue.confidence}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500 text-sm">
                      AI Severity Score
                    </p>

                    <p className="font-bold">
                      {issue.severityScore} / 100
                    </p>

                    <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                      <div className="w-[92%] h-2 bg-red-500 rounded-full"></div>
                    </div>

                  </div>

                  <div>
                    <p className="text-gray-500 text-sm">
                      Duplicate Reports Found
                    </p>

                    <p className="font-semibold">
                      {issue.duplicateReports} Similar Reports
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500 text-sm">
                      Escalation Risk
                    </p>

                    <p className="text-orange-600 font-bold">
                      {issue.escalationRisk}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500 text-sm">
                      AI Recommended Priority
                    </p>

                    <p className="text-red-600 font-bold">
                      {issue.priority}
                    </p>
                  </div>

                </div>
                {/* Status Timeline */}
                <div className="bg-white rounded-xl border shadow-sm p-6 mt-6">

                  <h2 className="text-2xl font-semibold mb-6">
                    Status Timeline
                  </h2>

                  <div className="space-y-6">
                    {issue.timeline.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center"
                      >
                        {/* Left */}
                        <div className="flex items-center gap-3 flex-1">

                          <div className={`w-3 h-3 rounded-full ${item.color}`}></div>

                          <span className="font-medium">
                            {item.status}
                          </span>

                        </div>

                        {/* Right */}
                        <span className="text-gray-500 text-sm text-right whitespace-nowrap">
                          {item.date}
                        </span>

                      </div>
                    ))}
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

        <button
          onClick={async () => {
            if (navigator.share) {
              try {
                await navigator.share({
                  title: issue.title,
                  text: `${issue.title} - ${issue.location}`,
                  url: window.location.href,
                });
              } catch (err) {
                console.log("Share cancelled");
              }
            } else {
              await navigator.clipboard.writeText(window.location.href);
              alert("Link copied to clipboard!");
            }
          }}
          className="border px-5 py-2 rounded-lg shadow-sm hover:bg-gray-50"
        >
          Share
        </button>

      </div>

    </div>
  );
}

export default IssueDetails;