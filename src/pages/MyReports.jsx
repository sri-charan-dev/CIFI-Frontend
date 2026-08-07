import Sidebar from "../components/Sidebar";
import { issues } from "../data/issues";
import { useNavigate } from "react-router-dom";
function MyReports() {
    const navigate = useNavigate();
    return (
        <div className="flex bg-[#f4f7fa] min-h-screen">

            <Sidebar />

            <main className="ml-64 flex-1 p-8">

                <h1 className="text-3xl font-bold text-[#173b57]">
                    My Reports
                </h1>

                <p className="text-gray-500 mt-2">
                    Track the status of issues you've reported.
                </p>

                <div className="flex gap-8 mt-8 border-b">

                    <button className="pb-3 border-b-2 border-blue-600 text-blue-600 font-semibold">
                        All (6)
                    </button>

                    <button className="pb-3 text-gray-500 hover:text-blue-600">
                        Reported (2)
                    </button>

                    <button className="pb-3 text-gray-500 hover:text-blue-600">
                        In Progress (2)
                    </button>

                    <button className="pb-3 text-gray-500 hover:text-blue-600">
                        Resolved (2)
                    </button>

                </div>

                <div className="bg-white rounded-x1 shadow-sm mt-6 overflow-hidden">

                    {/* Table Header */}
                    <div className="grid grid-cols-5 gap-4 px-6 py-4 border-b font-semibold text-gray-600">
                        <div>Issue</div>
                        <div>Location</div>
                        <div>Status</div>
                        <div>Reported On</div>
                        <div></div>
                    </div>

                </div>
                {issues.map((issue) => (
                    <div
                        key={issue.id}
                        onClick={() =>
                            navigate(`/issue/${issue.id}`, {
                                state: { from: "/myreports" },
                            })
                        }

                        className="grid grid-cols-5 gap-4 px-6 py-4 border-b items-center hover:bg-gray-50 transition cursor-pointer" >
                        {/* Issue */}
                        <div className="flex items-center gap-3">

                            <img
                                src={issue.image}
                                alt={issue.title}
                                className="w-14 h-14 rounded-lg object-cover"
                            />

                            <span className="font-medium">
                                {issue.title}
                            </span>

                        </div>

                        {/* Location */}
                        <div className="text-gray-600" >
                            {issue.location}
                        </div>

                        {/* Status */}
                        <div>

                            <span
                                className={`px-3 py-1 rounded-full text-sm font-medium
                                         ${issue.status === "Resolved"
                                        ? "bg-green-100 text-green-700"
                                        : issue.status === "In Progress"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : "bg-blue-100 text-blue-700"
                                    }`}
                            >
                                {issue.status}
                            </span>

                        </div>

                        {/* Date */}
                        <div className="text-gray-600">
                            {issue.reportedDate}
                        </div>

                        {/* Arrow */}
                        <div className="text-right text-2xl text-gray-400">
                            →
                        </div>

                    </div >
                ))
                }

            </main >

        </div >
    );
}

export default MyReports;