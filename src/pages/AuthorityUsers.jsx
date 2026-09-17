import { useState } from "react";
import { issues } from "../data/issues";
import Authoritysidebar from "../components/Authoritysidebar";

import {
    Users,
    Search,
    MapPin,
    FileText,
    AlertTriangle,
    CheckCircle,
    Clock,
} from "lucide-react";

function AuthorityUsers() {

    const [search, setSearch] = useState("");

    // Create users from issues.js
    const users = Object.values(
        issues.reduce((acc, issue) => {

            const name = issue.reportedBy;

            if (!acc[name]) {
                acc[name] = {
                    name: name,
                    reports: 0,
                    locations: [],
                    latestStatus: issue.status,
                    latestSeverity: issue.severity,
                    latestDate: issue.reportedDate,
                };
            }

            acc[name].reports++;

            if (!acc[name].locations.includes(issue.location)) {
                acc[name].locations.push(issue.location);
            }

            return acc;

        }, {})
    );

    // Search users
    const filteredUsers = users.filter((user) => {

        const searchText = search.toLowerCase();

        return (
            user.name.toLowerCase().includes(searchText) ||
            user.locations.some((location) =>
                location.toLowerCase().includes(searchText)
            )
        );
    });

    const totalUsers = users.length;

    const totalReports = issues.length;

    const activeReporters = users.filter(
        user => user.reports > 0
    ).length;

    const criticalReports = issues.filter(
        issue => issue.severity === "Critical"
    ).length;

    const cards = [
        {
            title: "Total Users",
            value: totalUsers,
            text: "Citizens who reported issues",
            icon: <Users size={20} />,
            style: "bg-blue-50 text-blue-600",
        },
        {
            title: "Active Reporters",
            value: activeReporters,
            text: "Users with submitted reports",
            icon: <CheckCircle size={20} />,
            style: "bg-green-50 text-green-600",
        },
        {
            title: "Total Reports",
            value: totalReports,
            text: "Infrastructure reports",
            icon: <FileText size={20} />,
            style: "bg-purple-50 text-purple-600",
        },
        {
            title: "Critical Reports",
            value: criticalReports,
            text: "Reports needing priority",
            icon: <AlertTriangle size={20} />,
            style: "bg-red-50 text-red-600",
        },
    ];

    return (
        <div className="flex min-h-screen bg-[#f4f7fa]">

            {/* SIDEBAR */}
            <Authoritysidebar />

            {/* MAIN */}
            <main className="ml-64 flex-1 p-8">

                {/* HEADER */}
                <div className="mb-7">

                    <h1 className="text-3xl font-bold text-[#173b57]">
                        Users
                    </h1>

                    <p className="text-gray-500 mt-2">
                        View citizens who have reported infrastructure issues
                        through CIFI.
                    </p>

                </div>


                {/* SUMMARY CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

                    {cards.map((card, index) => (

                        <div
                            key={index}
                            className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
                        >

                            <div className="flex items-start justify-between">

                                <div>

                                    <p className="text-xs font-medium text-gray-500">
                                        {card.title}
                                    </p>

                                    <h2 className="text-2xl font-bold text-[#173b57] mt-1">
                                        {card.value}
                                    </h2>

                                </div>

                                <div
                                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${card.style}`}
                                >
                                    {card.icon}
                                </div>

                            </div>

                            <p className="text-xs text-gray-400 mt-3">
                                {card.text}
                            </p>

                        </div>

                    ))}

                </div>


                {/* USERS TABLE */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100">

                    {/* TABLE HEADER */}
                    <div className="p-5 border-b border-gray-100">

                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                            <div>

                                <h2 className="text-lg font-bold text-[#173b57]">
                                    Registered Citizens
                                </h2>

                                <p className="text-sm text-gray-500 mt-1">
                                    Citizens who have submitted infrastructure
                                    reports.
                                </p>

                            </div>


                            {/* SEARCH */}
                            <div className="relative w-full lg:w-80">

                                <Search
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    type="text"
                                    placeholder="Search by name or location..."
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(e.target.value)
                                    }
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400"
                                />

                            </div>

                        </div>

                    </div>


                    {/* TABLE */}
                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead>

                                <tr className="border-b border-gray-100">

                                    <th className="text-left py-3 px-5 text-xs font-semibold text-gray-500">
                                        User
                                    </th>

                                    <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500">
                                        Location
                                    </th>

                                    <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500">
                                        Reports
                                    </th>

                                    <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500">
                                        Latest Severity
                                    </th>

                                    <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500">
                                        Latest Status
                                    </th>

                                    <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500">
                                        Latest Report
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {filteredUsers.length > 0 ? (

                                    filteredUsers.map((user, index) => (

                                        <tr
                                            key={user.name}
                                            className="border-b border-gray-50 hover:bg-gray-50 transition"
                                        >

                                            {/* USER */}
                                            <td className="py-4 px-5">

                                                <div className="flex items-center gap-3">

                                                    <div className="w-10 h-10 rounded-full bg-[#e8f1f7] text-[#17496d] flex items-center justify-center font-bold">
                                                        {user.name
                                                            .charAt(0)
                                                            .toUpperCase()}
                                                    </div>

                                                    <div>

                                                        <p className="text-sm font-semibold text-gray-800">
                                                            {user.name}
                                                        </p>

                                                        <p className="text-xs text-gray-400 mt-1">
                                                            Citizen #{String(index + 1).padStart(3, "0")}
                                                        </p>

                                                    </div>

                                                </div>

                                            </td>


                                            {/* LOCATION */}
                                            <td className="py-4 px-3">

                                                <div className="flex items-start gap-2">

                                                    <MapPin
                                                        size={15}
                                                        className="text-gray-400 mt-0.5"
                                                    />

                                                    <div>

                                                        {user.locations.map(
                                                            (location, i) => (

                                                                <p
                                                                    key={i}
                                                                    className="text-sm text-gray-600"
                                                                >
                                                                    {location}
                                                                </p>

                                                            )
                                                        )}

                                                    </div>

                                                </div>

                                            </td>


                                            {/* REPORTS */}
                                            <td className="py-4 px-3">

                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold">

                                                    <FileText size={13} />

                                                    {user.reports}

                                                </span>

                                            </td>


                                            {/* SEVERITY */}
                                            <td className="py-4 px-3">

                                                <span
                                                    className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${user.latestSeverity === "Critical"
                                                        ? "bg-red-50 text-red-600"
                                                        : user.latestSeverity === "High"
                                                            ? "bg-orange-50 text-orange-600"
                                                            : "bg-yellow-50 text-yellow-600"
                                                        }`}
                                                >
                                                    {user.latestSeverity}
                                                </span>

                                            </td>


                                            {/* STATUS */}
                                            <td className="py-4 px-3">

                                                <span
                                                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${user.latestStatus === "Resolved"
                                                        ? "bg-green-50 text-green-600"
                                                        : user.latestStatus === "In Progress"
                                                            ? "bg-blue-50 text-blue-600"
                                                            : "bg-orange-50 text-orange-600"
                                                        }`}
                                                >

                                                    {user.latestStatus === "Resolved" ? (
                                                        <CheckCircle size={13} />
                                                    ) : (
                                                        <Clock size={13} />
                                                    )}

                                                    {user.latestStatus}

                                                </span>

                                            </td>


                                            {/* DATE */}
                                            <td className="py-4 px-3 text-sm text-gray-500">
                                                {user.latestDate}
                                            </td>

                                        </tr>

                                    ))

                                ) : (

                                    <tr>

                                        <td
                                            colSpan="6"
                                            className="text-center py-12 text-gray-400"
                                        >
                                            No users found.

                                        </td>

                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>


                    {/* FOOTER */}
                    <div className="px-5 py-4 border-t border-gray-100">

                        <p className="text-xs text-gray-400">
                            Showing {filteredUsers.length} of {totalUsers} citizens
                        </p>

                    </div>

                </div>

            </main>

        </div>
    );
}

export default AuthorityUsers;