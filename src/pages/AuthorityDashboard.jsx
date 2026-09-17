import { issues } from "../data/issues";
import Authoritysidebar from "../components/Authoritysidebar";
import hyderabadMap from "../assets/maps/hyderabad-map.png";
import { useNavigate } from "react-router-dom";

import {
    FileText,
    Clock,
    LoaderCircle,
    CheckCircle,
} from "lucide-react";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts";


function AuthorityDashboard() {

    const navigate = useNavigate();

    // ---------- DATA ----------

    const count = (key, value) =>
        issues.filter(issue => issue[key] === value).length;

    const totalIssues = issues.length;
    const reportedIssues = count("status", "Reported");
    const inProgressIssues = count("status", "In Progress");
    const resolvedIssues = count("status", "Resolved");
    const criticalIssues = count("severity", "Critical");

    const statusData = [
        { name: "Reported", value: 6 },
        { name: "In Progress", value: inProgressIssues },
        { name: "Resolved", value: resolvedIssues }
    ];

    const categoryData = [
        "Potholes",
        "Street Lights",
        "Drainage",
        "Footpath",
        "Garbage"
    ].map(name => ({
        name,
        value: count("category", name)
    }));

    const severityData = ["Critical", "High", "Medium"]
        .map(name => ({
            name,
            value: count("severity", name)
        }));

    const areaHealthData = issues.map(issue => ({
        area: issue.location.split(",")[0],
        health: 100 - issue.severityScore
    }));

    const mapPositions = {
        1: { top: "120px", left: "250px" },
        2: { top: "160px", left: "210px" },
        3: { top: "140px", left: "120px" },
        4: { top: "180px", left: "260px" },
        5: { top: "110px", left: "310px" },
        6: { top: "170px", left: "360px" },
    };


    // ---------- UI DATA ----------

    const cards = [
        {
            title: "Total Issues",
            value: totalIssues,
            text: "All reported issues",
            icon: <FileText size={18} />,
            iconStyle: "bg-blue-50 text-blue-600",
            textStyle: "text-gray-400"
        },
        {
            title: "In Progress",
            value: inProgressIssues,
            text: "Currently handling",
            icon: <LoaderCircle size={18} />,
            iconStyle: "bg-yellow-50 text-yellow-600",
            textStyle: "text-orange-500"
        },
        {
            title: "Resolved",
            value: resolvedIssues,
            text: "Successfully resolved",
            icon: <CheckCircle size={18} />,
            iconStyle: "bg-green-50 text-green-600",
            textStyle: "text-green-600"
        },
        {
            title: "Critical Issues",
            value: criticalIssues,
            text: "Needs priority attention",
            icon: <span className="text-lg font-bold">!</span>,
            iconStyle: "bg-red-50 text-red-600",
            textStyle: "text-red-500"
        },
        {
            title: "Avg. Response Time",
            value: "2.4 Days",
            text: "Improving this week",
            icon: <Clock size={18} />,
            iconStyle: "bg-purple-50 text-purple-600",
            textStyle: "text-green-600"
        }
    ];

    const chartProps = {
        margin: { top: 5, right: 10, left: -20, bottom: 5 }
    };


    return (
        <div className="flex min-h-screen bg-[#f4f7fa]">

            <Authoritysidebar />

            <main className="ml-64 flex-1 p-8">

                {/* HEADER */}

                <div className="mb-7">
                    <h1 className="text-3xl font-bold text-[#173b57]">
                        Authority Dashboard
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Monitor and manage reported infrastructure issues.
                    </p>
                </div>


                {/* SUMMARY CARDS */}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">

                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition"
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

                                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${card.iconStyle}`}>
                                    {card.icon}
                                </div>

                            </div>

                            <p className={`text-[11px] mt-2 ${card.textStyle}`}>
                                {card.text}
                            </p>

                        </div>
                    ))}

                </div>


                {/* CHARTS */}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-6">


                    {/* STATUS */}

                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">

                        <h2 className="text-lg font-bold text-[#173b57]">
                            Issues by Status
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Current status of reported issues
                        </p>

                        <div className="h-64 mt-4">

                            <ResponsiveContainer width="100%" height="100%">

                                <BarChart data={statusData} {...chartProps}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis allowDecimals={false} />
                                    <Tooltip />

                                    <Bar
                                        dataKey="value"
                                        fill="#17496d"
                                        radius={[6, 6, 0, 0]}
                                    />
                                </BarChart>

                            </ResponsiveContainer>

                        </div>

                    </div>


                    {/* SEVERITY */}

                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">

                        <h2 className="text-lg font-bold text-[#173b57]">
                            Issues by Severity
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Distribution based on issue severity
                        </p>

                        <div className="h-64 mt-4">

                            <ResponsiveContainer width="100%" height="100%">

                                <BarChart data={severityData} {...chartProps}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis allowDecimals={false} />
                                    <Tooltip />

                                    <Bar
                                        dataKey="value"
                                        fill="#17496d"
                                        radius={[6, 6, 0, 0]}
                                    />
                                </BarChart>

                            </ResponsiveContainer>

                        </div>

                    </div>


                    {/* CATEGORY */}

                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">

                        <h2 className="text-lg font-bold text-[#173b57]">
                            Issues by Category
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Distribution of infrastructure issues
                        </p>

                        <div className="h-64 mt-4">

                            <ResponsiveContainer width="100%" height="100%">

                                <PieChart>

                                    <Pie
                                        data={categoryData}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        label
                                    >

                                        {categoryData.map((_, index) => (
                                            <Cell
                                                key={index}
                                                fill={[
                                                    "#17496d",
                                                    "#2878a8",
                                                    "#4ca3c7",
                                                    "#7ab8d1",
                                                    "#9fcbd9"
                                                ][index]}
                                            />
                                        ))}

                                    </Pie>

                                    <Tooltip />
                                    <Legend />

                                </PieChart>

                            </ResponsiveContainer>

                        </div>

                    </div>

                </div>


                {/* AREA HEALTH */}

                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mt-5">

                    <div className="flex items-center justify-between mb-5">

                        <div>
                            <h2 className="text-lg font-bold text-[#173b57]">
                                Area-wise Infrastructure Health
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Infrastructure health based on reported issue severity
                            </p>
                        </div>

                        <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
                            View All Areas →
                        </button>

                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

                        {areaHealthData.map((area, index) => {

                            const color =
                                area.health >= 70
                                    ? "green"
                                    : area.health >= 40
                                        ? "orange"
                                        : "red";

                            return (
                                <div
                                    key={index}
                                    className="border border-gray-100 rounded-lg p-4"
                                >

                                    <div className="flex items-center justify-between">

                                        <span className="text-sm font-medium text-gray-700">
                                            {area.area}
                                        </span>

                                        <span className={`text-sm font-bold text-${color}-600`}>
                                            {area.health}/100
                                        </span>

                                    </div>

                                    <div className="w-full bg-gray-100 rounded-full h-2 mt-3">

                                        <div
                                            className={`h-2 rounded-full bg-${color}-500`}
                                            style={{ width: `${area.health}%` }}
                                        />

                                    </div>

                                    <p className="text-xs text-gray-400 mt-2">
                                        Based on current reported issues
                                    </p>

                                </div>
                            );

                        })}

                    </div>

                </div>


                {/* HEATMAP */}

                <div className="bg-white rounded-xl shadow-sm p-6 mt-5">

                    <div className="flex justify-between items-center mb-4">

                        <h2 className="text-xl font-bold text-[#173b57]">
                            Live Issue Heatmap
                        </h2>

                        <span className="text-sm text-gray-500">
                            {issues.length} active locations
                        </span>

                    </div>


                    <div className="relative w-full h-[450px] border rounded-lg overflow-hidden">

                        <img
                            src={hyderabadMap}
                            alt="Hyderabad Map"
                            className="w-full h-full object-cover"
                        />


                        {issues.map(issue => {

                            const position = mapPositions[issue.id];

                            return (
                                <div
                                    key={issue.id}
                                    className="group absolute"
                                    style={position}
                                >

                                    <div
                                        className={`absolute w-6 h-6 rounded-full animate-ping opacity-70 ${issue.severity === "Critical"
                                            ? "bg-red-500"
                                            : issue.severity === "High"
                                                ? "bg-orange-500"
                                                : "bg-yellow-400"
                                            }`}
                                    />

                                    <div
                                        className={`relative w-4 h-4 rounded-full border-2 border-white ${issue.severity === "Critical"
                                            ? "bg-red-700"
                                            : issue.severity === "High"
                                                ? "bg-orange-600"
                                                : "bg-yellow-500"
                                            }`}
                                    />


                                    {/* HOVER CARD */}

                                    <div className="hidden group-hover:block absolute top-6 left-5 bg-white shadow-xl rounded-xl p-3 w-60 z-50">

                                        <img
                                            src={issue.image}
                                            alt={issue.title}
                                            className="w-full h-28 object-cover rounded-lg"
                                        />

                                        <h3 className="font-semibold text-[#173b57] mt-2">
                                            {issue.title}
                                        </h3>

                                        <p className="text-sm text-gray-500 mt-1">
                                            📍 {issue.location}
                                        </p>

                                        <div className="flex items-center gap-2 mt-2">

                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-medium ${issue.severity === "Critical"
                                                    ? "bg-red-100 text-red-600"
                                                    : issue.severity === "High"
                                                        ? "bg-orange-100 text-orange-600"
                                                        : "bg-yellow-100 text-yellow-700"
                                                    }`}
                                            >
                                                {issue.severity}
                                            </span>

                                            <span className="text-xs text-gray-500">
                                                {issue.status}
                                            </span>

                                        </div>

                                    </div>

                                </div>
                            );

                        })}

                    </div>


                    {/* LEGEND */}

                    <div className="flex justify-center gap-6 mt-4 text-sm">

                        {[
                            ["bg-red-600", "Critical"],
                            ["bg-orange-500", "High"],
                            ["bg-yellow-400", "Medium"]
                        ].map(([color, label]) => (
                            <div key={label} className="flex items-center gap-2">
                                <div className={`w-3 h-3 rounded-full ${color}`} />
                                <span>{label}</span>
                            </div>
                        ))}

                    </div>

                </div>

            </main>

        </div>
    );
}

export default AuthorityDashboard;