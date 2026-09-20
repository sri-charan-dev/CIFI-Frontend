import { issues } from "../data/issues";
import Authoritysidebar from "../components/Authoritysidebar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { House, Search, Bell, ChevronDown, FileText } from "lucide-react";

function AuthorityIssues() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");

    return (
        <div className="flex min-h-screen bg-[#f4f7fa]">

            {/* SIDEBAR */}
            <Authoritysidebar />

            {/* MAIN CONTENT AREA */}
            <div className="ml-64 flex-1 min-h-screen bg-[#f4f7fa]">

                {/* ================= TOP BAR ================= */}
                <header className="h-[58px] bg-white/95 border-b border-gray-100 px-7 flex items-center justify-between sticky top-0 z-20">

                    {/* LEFT SIDE */}
                    <div className="flex items-center gap-3 text-[#173b57]">

                        <FileText size={19} />

                        <span className="text-gray-300">
                            /
                        </span>

                        <span className="font-medium">
                            Issues
                        </span>

                    </div>


                    {/* RIGHT SIDE */}
                    <div className="flex items-center gap-5">

                        {/* SEARCH */}
                        <div className="relative w-60">

                            <Search
                                size={17}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                type="text"
                                placeholder="Search issues..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                className="w-full h-10 pl-10 pr-4 rounded-lg bg-[#f6f8fb] border border-gray-100 text-sm outline-none focus:border-blue-300"
                            />

                        </div>


                        {/* NOTIFICATION */}
                        <div className="relative text-[#173b57]">

                            <Bell size={20} />

                            <span className="absolute -right-1 -top-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />

                        </div>


                        {/* ADMIN */}
                        <div className="flex items-center gap-2">

                            <div className="w-9 h-9 rounded-full bg-[#17496d] text-white flex items-center justify-center font-semibold">
                                A
                            </div>

                            <div className="leading-tight">

                                <p className="text-sm font-semibold text-gray-800">
                                    Admin
                                </p>

                                <p className="text-xs text-gray-500">
                                    Authority
                                </p>

                            </div>

                            <ChevronDown
                                size={16}
                                className="text-gray-500"
                            />

                        </div>

                    </div>

                </header>

                {/* MAIN CONTENT */}
                <main className="p-8">

                    {/* HEADER */}
                    <div className="mb-7">
                        <h1 className="text-3xl font-bold text-[#173b57]">
                            All Issues
                        </h1>

                        <p className="text-gray-500 mt-2">
                            View and manage all infrastructure issues reported by citizens.
                        </p>
                    </div>

                    {/* BACK BUTTON */}
                    <button
                        onClick={() => navigate("/authority")}
                        className="mb-5 text-sm font-medium text-blue-600 hover:text-blue-800"
                    >
                        ← Back to Dashboard
                    </button>

                    {/* ISSUES TABLE */}
                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">

                        <div className="flex items-center justify-between mb-5">

                            <div>
                                <h2 className="text-lg font-bold text-[#173b57]">
                                    All Reported Issues
                                </h2>

                                <p className="text-sm text-gray-500 mt-1">
                                    Complete list of infrastructure issues
                                </p>
                            </div>

                            <span className="text-sm text-gray-500">
                                {issues.length} Issues
                            </span>

                        </div>

                        {/* TABLE */}
                        <div className="overflow-x-auto">

                            <table className="w-full">

                                <thead>
                                    <tr className="border-b border-gray-100">

                                        {[
                                            "Issue",
                                            "Category",
                                            "Location",
                                            "Severity",
                                            "Status",
                                            "Priority"
                                        ].map((head) => (
                                            <th
                                                key={head}
                                                className="text-left py-3 px-3 text-xs font-semibold text-gray-500"
                                            >
                                                {head}
                                            </th>
                                        ))}

                                    </tr>
                                </thead>

                                <tbody>

                                    {issues.map((issue) => (

                                        <tr
                                            key={issue.id}
                                            className="border-b border-gray-50 hover:bg-gray-50 transition"
                                        >

                                            {/* ISSUE */}
                                            <td className="py-4 px-3">

                                                <div className="flex items-center gap-3">

                                                    <img
                                                        src={issue.image}
                                                        alt={issue.title}
                                                        className="w-10 h-10 rounded-lg object-cover"
                                                    />

                                                    <div>

                                                        <p className="text-sm font-medium text-gray-800">
                                                            {issue.title}
                                                        </p>

                                                        <p className="text-xs text-gray-400 mt-1">
                                                            Report #{issue.id}
                                                        </p>

                                                    </div>

                                                </div>

                                            </td>

                                            {/* CATEGORY */}
                                            <td className="py-4 px-3 text-sm text-gray-600">
                                                {issue.category}
                                            </td>

                                            {/* LOCATION */}
                                            <td className="py-4 px-3 text-sm text-gray-600">
                                                {issue.location}
                                            </td>

                                            {/* SEVERITY */}
                                            <td className="py-4 px-3">

                                                <span
                                                    className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${issue.severity === "Critical"
                                                        ? "bg-red-50 text-red-600"
                                                        : issue.severity === "High"
                                                            ? "bg-orange-50 text-orange-600"
                                                            : issue.severity === "Medium"
                                                                ? "bg-yellow-50 text-yellow-600"
                                                                : "bg-green-50 text-green-600"
                                                        }`}
                                                >
                                                    {issue.severity}
                                                </span>

                                            </td>

                                            {/* STATUS */}
                                            <td className="py-4 px-3">

                                                <span
                                                    className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${issue.status === "Resolved"
                                                        ? "bg-green-50 text-green-600"
                                                        : issue.status === "In Progress"
                                                            ? "bg-blue-50 text-blue-600"
                                                            : "bg-orange-50 text-orange-600"
                                                        }`}
                                                >
                                                    {issue.status}
                                                </span>

                                            </td>

                                            {/* PRIORITY */}
                                            <td
                                                className={`py-4 px-3 text-sm font-semibold ${issue.priority === "Critical"
                                                    ? "text-red-600"
                                                    : issue.priority === "High"
                                                        ? "text-orange-600"
                                                        : "text-yellow-600"
                                                    }`}
                                            >
                                                {issue.priority}
                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    </div>

                </main>
            </div>
        </div>
    );
}

export default AuthorityIssues;