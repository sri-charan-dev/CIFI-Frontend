import { useState } from "react";
import { issues } from "../data/issues";
import Authoritysidebar from "../components/Authoritysidebar";

import {
    Building2,
    Search,
    CheckCircle,
    Clock,
    FileText,
    Eye,
    Plus,
    Bell,
    ChevronDown,
    BarChart3,
    Trash2,
    Droplets,
    Zap,
    Trees,
    Waves,
} from "lucide-react";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts";


function AuthorityDepartments() {

    const [search, setSearch] = useState("");


    // Department information
    // Issue counts are calculated from the existing issues.js file.
    const departmentData = [
        {
            name: "Roads & Transport",
            categories: ["Potholes", "Footpath"],
            head: "Road Department",
            contact: "Municipal Roads",
            description: "Road damage and pedestrian infrastructure",
            icon: Building2,
            iconBg: "bg-red-50",
            iconColor: "text-red-500",
        },
        {
            name: "Sanitation",
            categories: ["Garbage"],
            head: "Sanitation Department",
            contact: "Municipal Sanitation",
            description: "Garbage collection and sanitation",
            icon: Trash2,
            iconBg: "bg-blue-50",
            iconColor: "text-blue-500",
        },
        {
            name: "Drainage",
            categories: ["Drainage", "Waterlogging"],
            head: "Drainage Department",
            contact: "Municipal Drainage",
            description: "Drainage, sewage and waterlogging",
            icon: Droplets,
            iconBg: "bg-emerald-50",
            iconColor: "text-emerald-500",
        },
        {
            name: "Electrical (Street Lights)",
            categories: ["Street Lights"],
            head: "Electrical Department",
            contact: "Municipal Electrical",
            description: "Street lights and electrical infrastructure",
            icon: Zap,
            iconBg: "bg-amber-50",
            iconColor: "text-amber-500",
        },
        {
            name: "Parks & Public Spaces",
            categories: ["Parks & Public Spaces"],
            head: "Parks Department",
            contact: "Municipal Parks",
            description: "Parks and public recreational spaces",
            icon: Trees,
            iconBg: "bg-violet-50",
            iconColor: "text-violet-500",
        },
        {
            name: "Water Supply",
            categories: ["Water Supply"],
            head: "Water Supply Department",
            contact: "Municipal Water Board",
            description: "Water supply and pipeline infrastructure",
            icon: Waves,
            iconBg: "bg-sky-50",
            iconColor: "text-sky-500",
        },
    ];


    // Calculate department statistics from issues.js
    const departments = departmentData.map((department) => {

        const departmentIssues = issues.filter((issue) =>
            department.categories.includes(issue.category)
        );

        return {
            ...department,
            total: departmentIssues.length,

            inProgress: departmentIssues.filter(
                (issue) => issue.status === "In Progress"
            ).length,

            resolved: departmentIssues.filter(
                (issue) => issue.status === "Resolved"
            ).length,

            reported: departmentIssues.filter(
                (issue) => issue.status === "Reported"
            ).length,

            critical: departmentIssues.filter(
                (issue) => issue.severity === "Critical"
            ).length,
        };
    });


    // Summary values
    const totalDepartments = departments.length;

    const activeDepartments = departments.filter(
        (department) => department.total > 0
    ).length;

    const assignedIssues = issues.filter(
        (issue) => issue.status === "In Progress"
    ).length;

    const resolvedIssues = issues.filter(
        (issue) => issue.status === "Resolved"
    ).length;


    // Bar chart data
    const departmentChartData = departments.map((department) => {

        let name = department.name;

        if (department.name === "Roads & Transport") {
            name = "Roads &\nTransport";
        }

        if (department.name === "Electrical (Street Lights)") {
            name = "Electrical";
        }

        if (department.name === "Parks & Public Spaces") {
            name = "Parks &\nPublic Spaces";
        }

        return {
            name,
            issues: department.total,
        };
    });


    // Donut chart data
    const performanceData = [
        {
            name: "Roads & Transportation",
            value: issues.filter(
                (issue) => issue.category === "Potholes" || issue.category === "Footpath"
            ).length,
        },
        {
            name: "Drainage",
            value: issues.filter(
                (issue) => issue.category === "Drainage"
            ).length,
        },
        {
            name: "Electrical",
            value: issues.filter(
                (issue) => issue.category === "Street Lights"
            ).length,
        },
        {
            name: "Sanitation",
            value: issues.filter(
                (issue) => issue.category === "Garbage"
            ).length,
        },
    ];


    const chartColors = [
        "#ef4444",
        "#3b82f6",
        "#22c55e",
        "#f59e0b",
        "#8b5cf6",
        "#38bdf8",
    ];


    // Search departments
    const filteredDepartments = departments.filter((department) =>
        department.name.toLowerCase().includes(search.toLowerCase())
    );


    // Dashboard cards
    const cards = [
        {
            title: "Total Departments",
            value: totalDepartments,
            text: "Handling infrastructure issues",
            icon: Building2,
            iconBg: "bg-blue-50",
            iconColor: "text-blue-500",
        },
        {
            title: "Active Departments",
            value: activeDepartments,
            text: "Currently handling reports",
            icon: CheckCircle,
            iconBg: "bg-emerald-50",
            iconColor: "text-emerald-500",
        },
        {
            title: "Assigned Issues",
            value: assignedIssues,
            text: "Currently in progress",
            icon: Clock,
            iconBg: "bg-amber-50",
            iconColor: "text-amber-500",
        },
        {
            title: "Resolved Issues",
            value: resolvedIssues,
            text: "Across all departments",
            icon: CheckCircle,
            iconBg: "bg-violet-50",
            iconColor: "text-violet-500",
        },
    ];


    return (
        <div className="min-h-screen bg-[#f3f7fb]">

            <Authoritysidebar />

            <main className="ml-64 min-h-screen">

                {/* TOP BAR */}
                <header className="h-[58px] bg-white/95 border-b border-gray-100 px-7 flex items-center justify-between sticky top-0 z-20">

                    <div className="flex items-center gap-3 text-[#173b57]">
                        <Building2 size={19} />
                        <span className="text-gray-300">/</span>
                        <span className="font-medium">
                            Departments
                        </span>
                    </div>


                    <div className="flex items-center gap-5">

                        <div className="relative w-60">

                            <Search
                                size={17}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                type="text"
                                placeholder="Search departments..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                className="w-full h-10 pl-10 pr-4 rounded-lg bg-[#f6f8fb] border border-gray-100 text-sm outline-none focus:border-blue-300"
                            />

                        </div>


                        <div className="relative text-[#173b57]">

                            <Bell size={20} />

                            <span className="absolute -right-1 -top-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />

                        </div>


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


                <div className="p-6">

                    {/* PAGE HEADER */}
                    <div className="flex items-start justify-between mb-6">

                        <div>

                            <h1 className="text-[32px] leading-none font-bold text-[#122f4a]">
                                Departments
                            </h1>

                            <p className="text-[16px] text-[#60758a] mt-2">
                                Manage and monitor municipal departments
                                handling infrastructure issues.
                            </p>

                        </div>


                        <button className="flex items-center gap-2 bg-[#17496d] hover:bg-[#123d5c] text-white px-5 py-3 rounded-lg font-medium shadow-sm transition">

                            <Plus size={18} />

                            Add Department

                        </button>

                    </div>


                    {/* SUMMARY CARDS */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-5">

                        {cards.map((card) => {

                            const Icon = card.icon;

                            return (
                                <div
                                    key={card.title}
                                    className="bg-white rounded-xl border border-gray-100 shadow-[0_3px_14px_rgba(20,55,80,0.07)] p-5"
                                >

                                    <div className="flex items-center justify-between">

                                        <div>

                                            <p className="text-sm text-[#60758a]">
                                                {card.title}
                                            </p>

                                            <p className="text-[30px] leading-none font-bold text-[#173b57] mt-2">
                                                {card.value}
                                            </p>

                                        </div>


                                        <div
                                            className={`w-14 h-14 rounded-2xl flex items-center justify-center ${card.iconBg} ${card.iconColor}`}
                                        >
                                            <Icon size={27} />
                                        </div>

                                    </div>


                                    <p className="text-xs text-gray-400 mt-4">
                                        {card.text}
                                    </p>

                                </div>
                            );
                        })}

                    </div>


                    {/* CHARTS */}
                    <div className="grid grid-cols-1 xl:grid-cols-[1.55fr_1fr] gap-4 mb-5">

                        {/* ISSUES BY DEPARTMENT */}
                        <section className="bg-white rounded-xl border border-gray-100 shadow-[0_3px_14px_rgba(20,55,80,0.07)] p-5">

                            <div className="flex items-start justify-between">

                                <div>

                                    <div className="flex items-center gap-2">

                                        <BarChart3
                                            size={20}
                                            className="text-blue-500"
                                        />

                                        <h2 className="text-lg font-bold text-[#173b57]">
                                            Issues by Department
                                        </h2>

                                    </div>

                                    <p className="text-sm text-gray-500 mt-1">
                                        Distribution of infrastructure issues
                                    </p>

                                </div>


                                <select className="text-xs border border-gray-200 rounded-lg px-3 py-2 text-gray-600 outline-none">
                                    <option>Total Issues</option>
                                    <option>In Progress</option>
                                    <option>Resolved</option>
                                </select>

                            </div>


                            <div className="h-[285px] mt-4">

                                <ResponsiveContainer
                                    width="100%"
                                    height="100%"
                                >

                                    <BarChart
                                        data={departmentChartData}
                                        margin={{
                                            top: 18,
                                            right: 10,
                                            left: 0,
                                            bottom: 10,
                                        }}
                                    >

                                        <CartesianGrid
                                            vertical={false}
                                            stroke="#e5edf3"
                                        />

                                        <XAxis
                                            dataKey="name"
                                            tick={{
                                                fontSize: 11,
                                                fill: "#526b80",
                                            }}
                                            axisLine={false}
                                            tickLine={false}
                                        />

                                        <YAxis
                                            allowDecimals={false}
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{
                                                fontSize: 11,
                                                fill: "#526b80",
                                            }}
                                        />

                                        <Tooltip
                                            cursor={{
                                                fill: "#f5f9fc",
                                            }}
                                            contentStyle={{
                                                borderRadius: 10,
                                                border: "1px solid #e5edf3",
                                            }}
                                        />

                                        <Bar
                                            dataKey="issues"
                                            radius={[7, 7, 0, 0]}
                                            fill="#3b82f6"
                                        />

                                    </BarChart>

                                </ResponsiveContainer>

                            </div>

                        </section>


                        {/* DEPARTMENT PERFORMANCE */}
                        <section className="bg-white rounded-xl border border-gray-100 shadow-[0_3px_14px_rgba(20,55,80,0.07)] p-5">

                            <div className="flex items-start justify-between">

                                <div>

                                    <div className="flex items-center gap-2">

                                        <Building2
                                            size={20}
                                            className="text-blue-500"
                                        />

                                        <h2 className="text-lg font-bold text-[#173b57]">
                                            Department Performance
                                        </h2>

                                    </div>

                                    <p className="text-sm text-gray-500 mt-1">
                                        Distribution of resolved issues
                                    </p>

                                </div>


                                <select className="text-xs border border-gray-200 rounded-lg px-3 py-2 text-gray-600 outline-none">
                                    <option>Resolved Issues</option>
                                    <option>Total Issues</option>
                                </select>

                            </div>


                            <div className="h-[285px] mt-2">

                                {performanceData.length > 0 ? (

                                    <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                    >

                                        <PieChart>

                                            <Pie
                                                data={performanceData}
                                                dataKey="value"
                                                nameKey="name"
                                                cx="36%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={101}
                                                paddingAngle={2}
                                            >

                                                {performanceData.map(
                                                    (entry, index) => (
                                                        <Cell
                                                            key={`cell-${index}`}
                                                            fill={
                                                                chartColors[
                                                                index %
                                                                chartColors.length
                                                                ]
                                                            }
                                                        />
                                                    )
                                                )}

                                            </Pie>


                                            <Tooltip />


                                            <Legend
                                                verticalAlign="middle"
                                                align="right"
                                                layout="vertical"
                                                iconType="circle"
                                                wrapperStyle={{
                                                    fontSize: "12px",
                                                    lineHeight: "24px",
                                                }}
                                            />

                                        </PieChart>

                                    </ResponsiveContainer>

                                ) : (

                                    <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                                        No resolved issues yet
                                    </div>

                                )}

                            </div>

                        </section>

                    </div>


                    {/* DEPARTMENTS TABLE */}
                    <section className="bg-white rounded-xl border border-gray-100 shadow-[0_3px_14px_rgba(20,55,80,0.07)] overflow-hidden">

                        {/* TABLE HEADER */}
                        <div className="p-5 border-b border-gray-100 flex items-center justify-between gap-4">

                            <div>

                                <h2 className="text-lg font-bold text-[#173b57]">
                                    Departments Overview
                                </h2>

                                <p className="text-sm text-gray-500 mt-1">
                                    Detailed information about each department
                                    and their performance.
                                </p>

                            </div>


                            <div className="relative w-64 shrink-0">

                                <Search
                                    size={17}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    type="text"
                                    placeholder="Search departments..."
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(e.target.value)
                                    }
                                    className="w-full h-10 pl-10 pr-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-blue-300"
                                />

                            </div>

                        </div>


                        {/* TABLE */}
                        <div className="overflow-x-auto">

                            <table className="w-full min-w-[1050px]">

                                <thead>

                                    <tr className="bg-[#f6f8fb] border-b border-gray-100">

                                        <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500">
                                            #
                                        </th>

                                        <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500">
                                            Department
                                        </th>

                                        <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500">
                                            Head / Contact
                                        </th>

                                        <th className="text-center py-3 px-3 text-xs font-semibold text-gray-500">
                                            Total Issues
                                        </th>

                                        <th className="text-center py-3 px-3 text-xs font-semibold text-gray-500">
                                            In Progress
                                        </th>

                                        <th className="text-center py-3 px-3 text-xs font-semibold text-gray-500">
                                            Resolved
                                        </th>

                                        <th className="text-center py-3 px-3 text-xs font-semibold text-gray-500">
                                            Avg. Resolution Time
                                        </th>

                                        <th className="text-center py-3 px-3 text-xs font-semibold text-gray-500">
                                            Status
                                        </th>

                                        <th className="text-center py-3 px-3 text-xs font-semibold text-gray-500">
                                            Actions
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {filteredDepartments.map(
                                        (department, index) => {

                                            const Icon = department.icon;

                                            return (
                                                <tr
                                                    key={department.name}
                                                    className="border-b border-gray-100 hover:bg-[#f8fbfd] transition"
                                                >

                                                    <td className="py-3.5 px-4 text-sm text-gray-500">
                                                        {index + 1}
                                                    </td>


                                                    <td className="py-3.5 px-3">

                                                        <div className="flex items-center gap-3">

                                                            <div
                                                                className={`w-9 h-9 rounded-full flex items-center justify-center ${department.iconBg} ${department.iconColor}`}
                                                            >
                                                                <Icon size={18} />
                                                            </div>

                                                            <p className="text-sm font-semibold text-gray-800">
                                                                {department.name}
                                                            </p>

                                                        </div>

                                                    </td>


                                                    <td className="py-3.5 px-3">

                                                        <p className="text-sm text-gray-700">
                                                            {department.head}
                                                        </p>

                                                        <p className="text-xs text-blue-500 mt-0.5">
                                                            {department.contact}
                                                        </p>

                                                    </td>


                                                    <td className="py-3.5 px-3 text-center">

                                                        <span className="inline-flex items-center justify-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold">

                                                            <FileText size={12} />

                                                            {department.total}

                                                        </span>

                                                    </td>


                                                    <td className="py-3.5 px-3 text-center">

                                                        <span className="text-sm font-semibold text-orange-500">
                                                            {department.inProgress}
                                                        </span>

                                                    </td>


                                                    <td className="py-3.5 px-3 text-center">

                                                        <span className="text-sm font-semibold text-green-600">
                                                            {department.resolved}
                                                        </span>

                                                    </td>


                                                    <td className="py-3.5 px-3 text-center">

                                                        <span className="text-sm text-gray-700">
                                                            {department.resolved > 0
                                                                ? "3.5 days"
                                                                : "—"}
                                                        </span>

                                                    </td>


                                                    <td className="py-3.5 px-3 text-center">

                                                        <span
                                                            className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${department.total > 0
                                                                ? "bg-emerald-50 text-emerald-600"
                                                                : "bg-gray-100 text-gray-500"
                                                                }`}
                                                        >
                                                            {department.total > 0
                                                                ? "Active"
                                                                : "No Reports"}
                                                        </span>

                                                    </td>


                                                    <td className="py-3.5 px-3 text-center">

                                                        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-medium text-blue-600 hover:bg-blue-50 transition">

                                                            <Eye size={13} />

                                                            View

                                                        </button>

                                                    </td>

                                                </tr>
                                            );
                                        }
                                    )}

                                </tbody>

                            </table>

                        </div>


                        {/* EMPTY STATE */}
                        {filteredDepartments.length === 0 && (

                            <div className="py-12 text-center text-gray-400 text-sm">
                                No departments found.
                            </div>

                        )}


                        {/* FOOTER */}
                        <div className="px-5 py-3 border-t border-gray-100">

                            <p className="text-xs text-gray-400">
                                Showing {filteredDepartments.length} of{" "}
                                {totalDepartments} departments
                            </p>

                        </div>

                    </section>

                </div>

            </main>

        </div>
    );
}

export default AuthorityDepartments;
