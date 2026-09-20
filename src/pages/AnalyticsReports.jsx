import React, { useMemo, useState } from "react";
import { issues } from "../data/issues";

import Authoritysidebar from "../components/Authoritysidebar";

import {
    Home,
    Search,
    Bell,
    ChevronDown,
    CalendarDays,
    MapPin,
    FileText,
    Download,
    TrendingUp,
    Clock3,
    Target,
    AlertTriangle,
    ArrowUp,
    ArrowDown,
    CircleArrowUp,
    CircleArrowDown,
    Lightbulb,
    BarChart3,
} from "lucide-react";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts";


function AnalyticsReports() {

    // =========================================================
    // STATE
    // =========================================================

    const [search, setSearch] = useState("");

    const [dateRange, setDateRange] = useState(
        "01 Jan 2026 - 30 Sep 2026"
    );

    const [area, setArea] = useState("All Areas");

    const [category, setCategory] = useState("All Categories");

    const [department, setDepartment] = useState("All Departments");

    const [reportingTrendType, setReportingTrendType] = useState("Monthly");

    const [categoryTrendType, setCategoryTrendType] = useState("Monthly");

    const [exportOpen, setExportOpen] = useState(false);


    // =========================================================
    // DEPARTMENT MAPPING
    // =========================================================

    const departmentMap = {
        "Potholes": "Roads & Transport",
        "Footpath": "Roads & Transport",
        "Street Lights": "Electrical",
        "Drainage": "Drainage",
        "Waterlogging": "Drainage",
        "Garbage": "Sanitation",
    };


    // =========================================================
    // FILTER OPTIONS
    // =========================================================

    const areas = useMemo(() => {

        const uniqueAreas = issues.map(
            (issue) => issue.location.split(",")[0].trim()
        );

        return ["All Areas", ...new Set(uniqueAreas)];

    }, []);


    const categories = useMemo(() => {

        const uniqueCategories = issues.map(
            (issue) => issue.category
        );

        return ["All Categories", ...new Set(uniqueCategories)];

    }, []);


    const departments = [
        "All Departments",
        "Roads & Transport",
        "Sanitation",
        "Drainage",
        "Electrical",
        "Parks & Public Spaces",
        "Water Supply",
    ];


    // =========================================================
    // FILTERED ISSUES
    // =========================================================

    const filteredIssues = useMemo(() => {

        return issues.filter((issue) => {

            const issueArea =
                issue.location.split(",")[0].trim();

            const issueDepartment =
                departmentMap[issue.category] || "Other";

            const matchesSearch =
                issue.title
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                issue.location
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                issue.category
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const matchesArea =
                area === "All Areas" ||
                issueArea === area;

            const matchesCategory =
                category === "All Categories" ||
                issue.category === category;

            const matchesDepartment =
                department === "All Departments" ||
                issueDepartment === department;

            return (
                matchesSearch &&
                matchesArea &&
                matchesCategory &&
                matchesDepartment
            );

        });

    }, [
        search,
        area,
        category,
        department,
    ]);


    // =========================================================
    // BASIC ANALYTICS
    // =========================================================

    const totalReports = filteredIssues.length;

    const resolvedCount = filteredIssues.filter(
        (issue) => issue.status === "Resolved"
    ).length;

    const inProgressCount = filteredIssues.filter(
        (issue) => issue.status === "In Progress"
    ).length;

    const reportedCount = filteredIssues.filter(
        (issue) => issue.status === "Reported"
    ).length;

    const criticalCount = filteredIssues.filter(
        (issue) => issue.severity === "Critical"
    ).length;

    const resolutionRate =
        totalReports > 0
            ? Math.round((resolvedCount / totalReports) * 100)
            : 0;


    // =========================================================
    // CATEGORY DATA
    // =========================================================

    const categoryData = useMemo(() => {

        const result = {};

        filteredIssues.forEach((issue) => {

            if (!result[issue.category]) {
                result[issue.category] = 0;
            }

            result[issue.category]++;

        });

        return Object.entries(result).map(
            ([name, value]) => ({
                name,
                value,
            })
        );

    }, [filteredIssues]);


    // =========================================================
    // DEPARTMENT DATA
    // =========================================================

    const departmentData = useMemo(() => {

        const result = departments
            .filter(
                (name) => name !== "All Departments"
            )
            .map((name) => ({
                name,
                assigned: 0,
                resolved: 0,
                pending: 0,
            }));


        filteredIssues.forEach((issue) => {

            const departmentName =
                departmentMap[issue.category];

            const departmentItem =
                result.find(
                    (item) =>
                        item.name === departmentName
                );

            if (!departmentItem) return;

            departmentItem.assigned++;

            if (issue.status === "Resolved") {
                departmentItem.resolved++;
            }

            if (
                issue.status === "Reported" ||
                issue.status === "In Progress"
            ) {
                departmentItem.pending++;
            }

        });

        return result;

    }, [filteredIssues]);


    // =========================================================
    // REPORTING TREND
    // Uses actual reportedDate from issues.js
    // =========================================================

    const monthlyTrend = useMemo(() => {

        const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
        ];

        return months.map((month, index) => {

            const monthNumber =
                String(index + 1).padStart(2, "0");

            const monthIssues =
                filteredIssues.filter((issue) => {

                    const match =
                        issue.reportedDate?.match(
                            /(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/
                        );

                    if (!match) return false;

                    const monthName =
                        match[2];

                    const monthMap = {
                        January: "01",
                        February: "02",
                        March: "03",
                        April: "04",
                        May: "05",
                        June: "06",
                        July: "07",
                        August: "08",
                        September: "09",
                        October: "10",
                        November: "11",
                        December: "12",
                    };

                    return (
                        monthMap[monthName] ===
                        monthNumber
                    );

                });

            return {
                month,
                total: monthIssues.length,
                resolved: monthIssues.filter(
                    (issue) =>
                        issue.status === "Resolved"
                ).length,
                inProgress: monthIssues.filter(
                    (issue) =>
                        issue.status === "In Progress"
                ).length,
                critical: monthIssues.filter(
                    (issue) =>
                        issue.severity === "Critical"
                ).length,
            };

        });

    }, [filteredIssues]);


    // =========================================================
    // CATEGORY TREND
    // =========================================================

    const categoryTrend = useMemo(() => {

        const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
        ];

        const uniqueCategories = [
            ...new Set(
                filteredIssues.map(
                    (issue) => issue.category
                )
            ),
        ];

        return months.map((month, index) => {

            const monthNumber =
                index + 1;

            const row = {
                month,
            };

            uniqueCategories.forEach(
                (cat) => {

                    row[cat] =
                        filteredIssues.filter(
                            (issue) => {

                                const match =
                                    issue.reportedDate?.match(
                                        /(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/
                                    );

                                if (!match)
                                    return false;

                                const monthName =
                                    match[2];

                                const monthMap = {
                                    January: 1,
                                    February: 2,
                                    March: 3,
                                    April: 4,
                                    May: 5,
                                    June: 6,
                                    July: 7,
                                    August: 8,
                                    September: 9,
                                    October: 10,
                                    November: 11,
                                    December: 12,
                                };

                                return (
                                    match[0] &&
                                    monthMap[
                                    monthName
                                    ] === monthNumber &&
                                    issue.category ===
                                    cat
                                );

                            }
                        ).length;

                }
            );

            return row;

        });

    }, [filteredIssues]);


    // =========================================================
    // RESOLUTION DISTRIBUTION
    // Actual resolution duration is NOT available in issues.js
    // So use status distribution instead of fake time values.
    // =========================================================

    const resolutionDistribution = [
        {
            name: "Resolved",
            value: resolvedCount,
        },
        {
            name: "In Progress",
            value: inProgressCount,
        },
        {
            name: "Reported",
            value: reportedCount,
        },
    ];


    // =========================================================
    // PROBLEM AREAS
    // =========================================================

    const problemAreas = useMemo(() => {

        const areaMap = {};

        filteredIssues.forEach((issue) => {

            const areaName =
                issue.location
                    .split(",")[0]
                    .trim();

            if (!areaMap[areaName]) {
                areaMap[areaName] = {
                    name: areaName,
                    count: 0,
                    critical: 0,
                };
            }

            areaMap[areaName].count++;

            if (
                issue.severity ===
                "Critical"
            ) {
                areaMap[areaName].critical++;
            }

        });

        return Object.values(areaMap)
            .sort(
                (a, b) =>
                    b.count - a.count
            )
            .slice(0, 5);

    }, [filteredIssues]);


    // =========================================================
    // RECURRING ISSUES
    // =========================================================

    const recurringIssues = useMemo(() => {

        const result = {};

        filteredIssues.forEach((issue) => {

            if (!result[issue.category]) {

                result[issue.category] = {
                    name: issue.category,
                    reports: 0,
                    locations: new Set(),
                };

            }

            result[issue.category].reports++;

            result[issue.category].locations.add(
                issue.location
                    .split(",")[0]
                    .trim()
            );

        });

        return Object.values(result)
            .map((item) => ({
                name: item.name,
                reports: item.reports,
                locations:
                    item.locations.size,
            }))
            .sort(
                (a, b) =>
                    b.reports - a.reports
            );

    }, [filteredIssues]);


    // =========================================================
    // COLORS
    // =========================================================

    const categoryColors = [
        "#EF4444",
        "#3B82F6",
        "#22C55E",
        "#F59E0B",
        "#8B5CF6",
        "#06B6D4",
    ];


    // =========================================================
    // EXPORT
    // =========================================================

    const exportCSV = () => {

        const headers = [
            "Issue",
            "Category",
            "Location",
            "Severity",
            "Status",
            "Priority",
        ];

        const rows = filteredIssues.map(
            (issue) => [
                issue.title,
                issue.category,
                issue.location,
                issue.severity,
                issue.status,
                issue.priority,
            ]
        );

        const csvContent = [
            headers,
            ...rows,
        ]
            .map((row) =>
                row
                    .map(
                        (value) =>
                            `"${String(
                                value ?? ""
                            ).replace(
                                /"/g,
                                '""'
                            )}"`
                    )
                    .join(",")
            )
            .join("\n");

        const blob = new Blob(
            [csvContent],
            {
                type: "text/csv;charset=utf-8;",
            }
        );

        const url =
            URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.href = url;
        link.download =
            "CIFI-Analytics-Report.csv";

        link.click();

        URL.revokeObjectURL(url);

        setExportOpen(false);
    };


    const generateReport = () => {

        const reportWindow =
            window.open(
                "",
                "_blank"
            );

        if (!reportWindow) {
            alert(
                "Please allow pop-ups to generate the report."
            );
            return;
        }

        reportWindow.document.write(`
            <html>
            <head>
                <title>CIFI Analytics Report</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        padding: 40px;
                        color: #173b57;
                    }
                    h1 {
                        margin-bottom: 5px;
                    }
                    p {
                        color: #64748b;
                    }
                    .cards {
                        display: grid;
                        grid-template-columns: repeat(4, 1fr);
                        gap: 15px;
                        margin: 30px 0;
                    }
                    .card {
                        border: 1px solid #e2e8f0;
                        border-radius: 10px;
                        padding: 18px;
                    }
                    .value {
                        font-size: 28px;
                        font-weight: bold;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-top: 30px;
                    }
                    th, td {
                        border: 1px solid #e2e8f0;
                        padding: 10px;
                        text-align: left;
                    }
                    th {
                        background: #f1f5f9;
                    }
                </style>
            </head>

            <body>

                <h1>CIFI Analytics & Reports</h1>

                <p>
                    Infrastructure analytics report
                </p>

                <p>
                    Date Range: ${dateRange}
                </p>

                <div class="cards">

                    <div class="card">
                        <div>Total Reports</div>
                        <div class="value">${totalReports}</div>
                    </div>

                    <div class="card">
                        <div>Resolved</div>
                        <div class="value">${resolvedCount}</div>
                    </div>

                    <div class="card">
                        <div>In Progress</div>
                        <div class="value">${inProgressCount}</div>
                    </div>

                    <div class="card">
                        <div>Critical</div>
                        <div class="value">${criticalCount}</div>
                    </div>

                </div>

                <h2>Issues</h2>

                <table>

                    <thead>
                        <tr>
                            <th>Issue</th>
                            <th>Category</th>
                            <th>Location</th>
                            <th>Severity</th>
                            <th>Status</th>
                            <th>Priority</th>
                        </tr>
                    </thead>

                    <tbody>

                        ${filteredIssues
                .map(
                    (issue) => `
                                    <tr>
                                        <td>${issue.title}</td>
                                        <td>${issue.category}</td>
                                        <td>${issue.location}</td>
                                        <td>${issue.severity}</td>
                                        <td>${issue.status}</td>
                                        <td>${issue.priority}</td>
                                    </tr>
                                `
                )
                .join("")}

                    </tbody>

                </table>

            </body>
            </html>
        `);

        reportWindow.document.close();

        setTimeout(() => {
            reportWindow.print();
        }, 500);
    };


    // =========================================================
    // APPLY FILTERS
    // =========================================================

    const applyFilters = () => {
        // Filtering is already reactive.
        // This button gives visual confirmation.
        alert(
            `Filters applied. ${filteredIssues.length} issues found.`
        );
    };


    return (

        <div className="flex min-h-screen bg-[#f4f7fa]">

            {/* =====================================================
                SIDEBAR
            ====================================================== */}

            <Authoritysidebar />


            {/* =====================================================
                MAIN AREA
            ====================================================== */}

            <div className="ml-64 flex-1 min-h-screen bg-[#f4f7fa]">


                {/* =================================================
                    TOP BAR
                ================================================= */}

                <header className="h-[58px] bg-white/95 border-b border-gray-100 px-7 flex items-center justify-between sticky top-0 z-30">

                    {/* LEFT */}

                    <div className="flex items-center gap-3 text-[#173b57]">

                        <BarChart3 size={19} />

                        <span className="text-gray-300">
                            /
                        </span>

                        <span className="font-medium">
                            Analytics & Reports
                        </span>

                    </div>


                    {/* RIGHT */}

                    <div className="flex items-center gap-4">


                        {/* DATE */}

                        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 h-9">

                            <CalendarDays
                                size={16}
                                className="text-[#173b57]"
                            />

                            <select
                                value={dateRange}
                                onChange={(e) =>
                                    setDateRange(
                                        e.target.value
                                    )
                                }
                                className="text-sm text-[#173b57] bg-transparent outline-none"
                            >

                                <option>
                                    01 Jan 2026 - 30 Sep 2026
                                </option>

                                <option>
                                    01 Jan 2026 - 31 Dec 2026
                                </option>

                                <option>
                                    Current Data
                                </option>

                            </select>

                        </div>


                        {/* LOCATION */}

                        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 h-9">

                            <MapPin
                                size={16}
                                className="text-[#173b57]"
                            />

                            <span className="text-sm text-[#173b57]">
                                Hyderabad
                            </span>

                            <ChevronDown size={14} />

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


                {/* =================================================
                    PAGE CONTENT
                ================================================= */}

                <main className="p-6">


                    {/* PAGE TITLE */}

                    <div className="flex items-start justify-between mb-5">

                        <div>

                            <h1 className="text-3xl font-bold text-[#173b57]">
                                Analytics & Reports
                            </h1>

                            <p className="text-gray-500 mt-1">
                                Understand trends, performance and insights to build a better city.
                            </p>

                        </div>


                        {/* ACTION BUTTONS */}

                        <div className="flex items-center gap-3">

                            <button
                                onClick={generateReport}
                                className="flex items-center gap-2 bg-[#175579] hover:bg-[#123f5a] text-white px-5 py-2.5 rounded-lg text-sm font-medium transition"
                            >

                                <FileText size={17} />

                                Generate Report

                            </button>


                            <div className="relative">

                                <button
                                    onClick={() =>
                                        setExportOpen(
                                            !exportOpen
                                        )
                                    }
                                    className="flex items-center gap-2 bg-white border border-gray-300 text-[#173b57] px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50"
                                >

                                    <Download size={17} />

                                    Export

                                    <ChevronDown size={15} />

                                </button>


                                {exportOpen && (

                                    <div className="absolute right-0 top-12 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-50">

                                        <button
                                            onClick={exportCSV}
                                            className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50"
                                        >
                                            Export CSV
                                        </button>

                                        <button
                                            onClick={generateReport}
                                            className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50"
                                        >
                                            Print / PDF
                                        </button>

                                    </div>

                                )}

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        FILTERS
                    ================================================= */}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 mb-4">

                        {/* DATE */}

                        <div className="bg-white border border-gray-200 rounded-lg p-2">

                            <label className="block text-xs text-gray-500 mb-1 px-1">
                                Date Range
                            </label>

                            <select
                                value={dateRange}
                                onChange={(e) =>
                                    setDateRange(
                                        e.target.value
                                    )
                                }
                                className="w-full text-sm text-[#173b57] outline-none"
                            >

                                <option>
                                    01 Jan 2026 - 30 Sep 2026
                                </option>

                                <option>
                                    01 Jan 2026 - 31 Dec 2026
                                </option>

                                <option>
                                    Current Data
                                </option>

                            </select>

                        </div>


                        {/* AREA */}

                        <div className="bg-white border border-gray-200 rounded-lg p-2">

                            <label className="block text-xs text-gray-500 mb-1 px-1">
                                Area
                            </label>

                            <select
                                value={area}
                                onChange={(e) =>
                                    setArea(
                                        e.target.value
                                    )
                                }
                                className="w-full text-sm text-[#173b57] outline-none"
                            >

                                {areas.map(
                                    (item) => (
                                        <option
                                            key={item}
                                        >
                                            {item}
                                        </option>
                                    )
                                )}

                            </select>

                        </div>


                        {/* CATEGORY */}

                        <div className="bg-white border border-gray-200 rounded-lg p-2">

                            <label className="block text-xs text-gray-500 mb-1 px-1">
                                Category
                            </label>

                            <select
                                value={category}
                                onChange={(e) =>
                                    setCategory(
                                        e.target.value
                                    )
                                }
                                className="w-full text-sm text-[#173b57] outline-none"
                            >

                                {categories.map(
                                    (item) => (
                                        <option
                                            key={item}
                                        >
                                            {item}
                                        </option>
                                    )
                                )}

                            </select>

                        </div>


                        {/* DEPARTMENT */}

                        <div className="bg-white border border-gray-200 rounded-lg p-2">

                            <label className="block text-xs text-gray-500 mb-1 px-1">
                                Department
                            </label>

                            <select
                                value={department}
                                onChange={(e) =>
                                    setDepartment(
                                        e.target.value
                                    )
                                }
                                className="w-full text-sm text-[#173b57] outline-none"
                            >

                                {departments.map(
                                    (item) => (
                                        <option
                                            key={item}
                                        >
                                            {item}
                                        </option>
                                    )
                                )}

                            </select>

                        </div>


                        {/* APPLY */}

                        <button
                            onClick={applyFilters}
                            className="bg-[#175579] text-white rounded-lg font-medium hover:bg-[#123f5a] transition"
                        >
                            Apply Filters
                        </button>

                    </div>


                    {/* =================================================
                        SUMMARY CARDS
                    ================================================= */}

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 mb-4">


                        {/* TOTAL */}

                        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">

                            <div className="flex justify-between">

                                <div>

                                    <p className="text-sm text-gray-500">
                                        {totalReports}
                                    </p>

                                    <p className="text-2xl font-bold text-[#173b57]">
                                        {totalReports}
                                    </p>

                                    <p className="text-xs text-[#173b57] mt-1">
                                        Total Reports
                                    </p>

                                </div>

                                <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                                    <TrendingUp size={25} />
                                </div>

                            </div>

                            <div className="flex items-center justify-end gap-1 mt-2 text-xs text-gray-400">
                                <CircleArrowUp
                                    size={13}
                                />
                                Current dataset
                            </div>

                        </div>


                        {/* AVG RESPONSE */}

                        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">

                            <div className="flex justify-between">

                                <div>

                                    <p className="text-sm text-gray-500">
                                        Resolution
                                    </p>

                                    <p className="text-2xl font-bold text-[#173b57]">
                                        {resolvedCount}
                                    </p>

                                    <p className="text-xs text-[#173b57] mt-1">
                                        Resolved Issues
                                    </p>

                                </div>

                                <div className="w-12 h-12 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center">
                                    <Clock3 size={25} />
                                </div>

                            </div>

                            <div className="flex items-center justify-end gap-1 mt-2 text-xs text-green-500">
                                <ArrowUp size={13} />
                                Available resolution data
                            </div>

                        </div>


                        {/* RESOLUTION RATE */}

                        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">

                            <div className="flex justify-between">

                                <div>

                                    <p className="text-sm text-gray-500">
                                        Resolution Rate
                                    </p>

                                    <p className="text-2xl font-bold text-[#173b57]">
                                        {resolutionRate}%
                                    </p>

                                    <p className="text-xs text-[#173b57] mt-1">
                                        Successfully resolved
                                    </p>

                                </div>

                                <div className="w-12 h-12 rounded-lg bg-green-50 text-green-500 flex items-center justify-center">
                                    <Target size={25} />
                                </div>

                            </div>

                            <div className="flex items-center justify-end gap-1 mt-2 text-xs text-green-500">
                                <ArrowUp size={13} />
                                Based on current reports
                            </div>

                        </div>


                        {/* CRITICAL */}

                        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">

                            <div className="flex justify-between">

                                <div>

                                    <p className="text-sm text-gray-500">
                                        Critical Issues
                                    </p>

                                    <p className="text-2xl font-bold text-[#173b57]">
                                        {criticalCount}
                                    </p>

                                    <p className="text-xs text-[#173b57] mt-1">
                                        Issues needing priority
                                    </p>

                                </div>

                                <div className="w-12 h-12 rounded-lg bg-red-50 text-red-500 flex items-center justify-center">
                                    <AlertTriangle size={25} />
                                </div>

                            </div>

                            <div className="flex items-center justify-end gap-1 mt-2 text-xs text-red-500">
                                <ArrowUp size={13} />
                                Priority attention
                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        REPORTING TREND + CATEGORY TREND + STATUS
                    ================================================= */}

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-3 mb-4">


                        {/* REPORTING TREND */}

                        <div className="xl:col-span-1 bg-white rounded-xl border border-gray-100 p-4 shadow-sm">

                            <div className="flex justify-between items-start">

                                <div>

                                    <h2 className="font-bold text-[#173b57]">
                                        Reporting Trend
                                    </h2>

                                </div>


                                <div className="flex bg-gray-50 rounded-lg p-1">

                                    {[
                                        "Daily",
                                        "Weekly",
                                        "Monthly",
                                    ].map((item) => (

                                        <button
                                            key={item}
                                            onClick={() =>
                                                setReportingTrendType(
                                                    item
                                                )
                                            }
                                            className={`px-3 py-1 rounded-md text-xs ${reportingTrendType ===
                                                item
                                                ? "bg-blue-500 text-white"
                                                : "text-gray-600"
                                                }`}
                                        >
                                            {item}
                                        </button>

                                    ))}

                                </div>

                            </div>

                            <div className="h-52 mt-3">

                                <ResponsiveContainer
                                    width="100%"
                                    height="100%"
                                >

                                    <LineChart
                                        data={
                                            monthlyTrend
                                        }
                                    >

                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            stroke="#e5e7eb"
                                        />

                                        <XAxis
                                            dataKey="month"
                                            fontSize={11}
                                        />

                                        <YAxis
                                            allowDecimals={false}
                                            fontSize={11}
                                        />

                                        <Tooltip />

                                        <Line
                                            type="monotone"
                                            dataKey="total"
                                            stroke="#3B82F6"
                                            strokeWidth={3}
                                            dot={{ r: 3 }}
                                            name="Total Reports"
                                        />

                                        <Line
                                            type="monotone"
                                            dataKey="resolved"
                                            stroke="#22C55E"
                                            strokeWidth={2}
                                            dot={{ r: 3 }}
                                            name="Resolved"
                                        />

                                        <Line
                                            type="monotone"
                                            dataKey="inProgress"
                                            stroke="#F59E0B"
                                            strokeWidth={2}
                                            dot={{ r: 3 }}
                                            name="In Progress"
                                        />

                                        <Line
                                            type="monotone"
                                            dataKey="critical"
                                            stroke="#EF4444"
                                            strokeWidth={2}
                                            dot={{ r: 3 }}
                                            name="Critical"
                                        />

                                    </LineChart>

                                </ResponsiveContainer>

                            </div>

                            <div className="flex flex-wrap justify-center gap-4 text-xs mt-2">

                                <span className="text-blue-600">
                                    ● Total Reports
                                </span>

                                <span className="text-green-600">
                                    ● Resolved
                                </span>

                                <span className="text-orange-500">
                                    ● In Progress
                                </span>

                                <span className="text-red-500">
                                    ● Critical
                                </span>

                            </div>

                        </div>


                        {/* CATEGORY TREND */}

                        <div className="xl:col-span-1 bg-white rounded-xl border border-gray-100 p-4 shadow-sm">

                            <div className="flex justify-between items-center">

                                <h2 className="font-bold text-[#173b57]">
                                    Category-wise Trend
                                </h2>

                                <div className="flex bg-gray-50 rounded-lg p-1">

                                    {[
                                        "Daily",
                                        "Weekly",
                                        "Monthly",
                                    ].map((item) => (

                                        <button
                                            key={item}
                                            onClick={() =>
                                                setCategoryTrendType(
                                                    item
                                                )
                                            }
                                            className={`px-3 py-1 rounded-md text-xs ${categoryTrendType ===
                                                item
                                                ? "bg-blue-500 text-white"
                                                : "text-gray-600"
                                                }`}
                                        >
                                            {item}
                                        </button>

                                    ))}

                                </div>

                            </div>


                            <div className="h-52 mt-3">

                                <ResponsiveContainer
                                    width="100%"
                                    height="100%"
                                >

                                    <LineChart
                                        data={
                                            categoryTrend
                                        }
                                    >

                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            stroke="#e5e7eb"
                                        />

                                        <XAxis
                                            dataKey="month"
                                            fontSize={11}
                                        />

                                        <YAxis
                                            allowDecimals={false}
                                            fontSize={11}
                                        />

                                        <Tooltip />

                                        {[
                                            "Potholes",
                                            "Street Lights",
                                            "Drainage",
                                            "Garbage",
                                            "Footpath",
                                            "Water Supply",
                                        ]
                                            .filter(
                                                (name) =>
                                                    categoryData.some(
                                                        (item) =>
                                                            item.name ===
                                                            name
                                                    )
                                            )
                                            .map(
                                                (
                                                    name,
                                                    index
                                                ) => (

                                                    <Line
                                                        key={
                                                            name
                                                        }
                                                        type="monotone"
                                                        dataKey={
                                                            name
                                                        }
                                                        stroke={
                                                            categoryColors[
                                                            index %
                                                            categoryColors.length
                                                            ]
                                                        }
                                                        strokeWidth={
                                                            2
                                                        }
                                                        dot={{
                                                            r: 2,
                                                        }}
                                                        name={
                                                            name
                                                        }
                                                    />

                                                )
                                            )}

                                    </LineChart>

                                </ResponsiveContainer>

                            </div>


                            <div className="flex flex-wrap gap-3 text-xs">

                                {categoryData.map(
                                    (
                                        item,
                                        index
                                    ) => (

                                        <span
                                            key={
                                                item.name
                                            }
                                            className="flex items-center gap-1"
                                        >

                                            <span
                                                className="w-2.5 h-2.5 rounded-full"
                                                style={{
                                                    background:
                                                        categoryColors[
                                                        index %
                                                        categoryColors.length
                                                        ],
                                                }}
                                            />

                                            {item.name}

                                        </span>

                                    )
                                )}

                            </div>

                        </div>


                        {/* RESOLUTION DISTRIBUTION */}

                        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">

                            <h2 className="font-bold text-[#173b57]">
                                Resolution Distribution
                            </h2>

                            <p className="text-xs text-gray-500 mt-1">
                                Current issue status distribution
                            </p>


                            <div className="h-60 mt-2">

                                <ResponsiveContainer
                                    width="100%"
                                    height="100%"
                                >

                                    <BarChart
                                        data={
                                            resolutionDistribution
                                        }
                                    >

                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            stroke="#e5e7eb"
                                        />

                                        <XAxis
                                            dataKey="name"
                                            fontSize={11}
                                        />

                                        <YAxis
                                            allowDecimals={false}
                                            fontSize={11}
                                        />

                                        <Tooltip />

                                        <Bar
                                            dataKey="value"
                                            radius={[
                                                6,
                                                6,
                                                0,
                                                0,
                                            ]}
                                        >

                                            {resolutionDistribution.map(
                                                (
                                                    entry,
                                                    index
                                                ) => (

                                                    <Cell
                                                        key={
                                                            entry.name
                                                        }
                                                        fill={
                                                            [
                                                                "#22C55E",
                                                                "#3B82F6",
                                                                "#F59E0B",
                                                            ][
                                                            index
                                                            ]
                                                        }
                                                    />

                                                )
                                            )}

                                        </Bar>

                                    </BarChart>

                                </ResponsiveContainer>

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        DEPARTMENT PERFORMANCE
                    ================================================= */}

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 mb-4">


                        {/* DEPARTMENT TABLE */}

                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">

                            <div className="p-4">

                                <h2 className="font-bold text-[#173b57]">
                                    Department Performance
                                </h2>

                            </div>


                            <div className="overflow-x-auto">

                                <table className="w-full text-sm">

                                    <thead className="bg-gray-50 text-gray-600">

                                        <tr>

                                            <th className="text-left px-4 py-3">
                                                #
                                            </th>

                                            <th className="text-left px-4 py-3">
                                                Department
                                            </th>

                                            <th className="text-left px-4 py-3">
                                                Assigned
                                            </th>

                                            <th className="text-left px-4 py-3">
                                                Resolved
                                            </th>

                                            <th className="text-left px-4 py-3">
                                                Pending
                                            </th>

                                            <th className="text-left px-4 py-3">
                                                Performance
                                            </th>

                                        </tr>

                                    </thead>


                                    <tbody>

                                        {departmentData.map(
                                            (
                                                item,
                                                index
                                            ) => {

                                                const performance =
                                                    item.assigned >
                                                        0
                                                        ? Math.round(
                                                            (item.resolved /
                                                                item.assigned) *
                                                            100
                                                        )
                                                        : 0;

                                                return (

                                                    <tr
                                                        key={
                                                            item.name
                                                        }
                                                        className="border-t border-gray-100"
                                                    >

                                                        <td className="px-4 py-3">
                                                            {index +
                                                                1}
                                                        </td>

                                                        <td className="px-4 py-3 font-medium text-[#173b57]">
                                                            {
                                                                item.name
                                                            }
                                                        </td>

                                                        <td className="px-4 py-3">
                                                            {
                                                                item.assigned
                                                            }
                                                        </td>

                                                        <td className="px-4 py-3 text-green-600">
                                                            {
                                                                item.resolved
                                                            }
                                                        </td>

                                                        <td className="px-4 py-3">
                                                            {
                                                                item.pending
                                                            }
                                                        </td>

                                                        <td className="px-4 py-3">

                                                            <div className="flex items-center gap-2">

                                                                <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">

                                                                    <div
                                                                        className="h-full bg-green-500 rounded-full"
                                                                        style={{
                                                                            width: `${performance}%`,
                                                                        }}
                                                                    />

                                                                </div>

                                                                <span className="text-xs">
                                                                    {
                                                                        performance
                                                                    }%
                                                                </span>

                                                            </div>

                                                        </td>

                                                    </tr>

                                                );

                                            }
                                        )}

                                    </tbody>

                                </table>

                            </div>

                        </div>


                        {/* TOP PROBLEM AREAS */}

                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">

                            <h2 className="font-bold text-[#173b57] mb-4">
                                Top 5 Problem Areas
                            </h2>


                            <div className="space-y-4">

                                {problemAreas.map(
                                    (
                                        item,
                                        index
                                    ) => {

                                        const max =
                                            problemAreas[0]
                                                ?.count ||
                                            1;

                                        const percentage =
                                            (item.count /
                                                max) *
                                            100;

                                        return (

                                            <div
                                                key={
                                                    item.name
                                                }
                                                className="flex items-center gap-3"
                                            >

                                                <span className="w-5 text-sm text-gray-500">
                                                    {index +
                                                        1}
                                                </span>

                                                <span className="w-28 text-sm text-[#173b57]">
                                                    {
                                                        item.name
                                                    }
                                                </span>

                                                <div className="flex-1 h-4 bg-gray-100 rounded overflow-hidden">

                                                    <div
                                                        className={`h-full rounded ${item.critical >
                                                            0
                                                            ? "bg-red-400"
                                                            : "bg-orange-400"
                                                            }`}
                                                        style={{
                                                            width: `${percentage}%`,
                                                        }}
                                                    />

                                                </div>

                                                <span className="w-8 text-sm font-medium">
                                                    {
                                                        item.count
                                                    }
                                                </span>

                                            </div>

                                        );

                                    }
                                )}

                                {problemAreas.length ===
                                    0 && (

                                        <p className="text-sm text-gray-400">
                                            No problem areas found.
                                        </p>

                                    )}

                            </div>

                        </div>

                    </div>


                    {/* RECURRING ISSUES */}

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-3 mb-4">


                        {/* RECURRING ISSUES */}

                        <div className="xl:col-span-1 bg-white rounded-xl border border-gray-100 shadow-sm p-4">

                            <h2 className="font-bold text-[#173b57] mb-4">
                                Recurring Issues Analysis
                            </h2>


                            <div className="overflow-x-auto">

                                <table className="w-full text-sm">

                                    <thead className="bg-gray-50">

                                        <tr>

                                            <th className="text-left px-3 py-3">
                                                #
                                            </th>

                                            <th className="text-left px-3 py-3">
                                                Recurring Issue
                                            </th>

                                            <th className="text-left px-3 py-3">
                                                Locations
                                            </th>

                                            <th className="text-left px-3 py-3">
                                                Reports
                                            </th>

                                            <th className="text-left px-3 py-3">
                                                Trend
                                            </th>

                                        </tr>

                                    </thead>


                                    <tbody>

                                        {recurringIssues.map(
                                            (
                                                item,
                                                index
                                            ) => (

                                                <tr
                                                    key={
                                                        item.name
                                                    }
                                                    className="border-t border-gray-100"
                                                >

                                                    <td className="px-3 py-3">
                                                        {index +
                                                            1}
                                                    </td>

                                                    <td className="px-3 py-3 font-medium text-[#173b57]">
                                                        {
                                                            item.name
                                                        }
                                                    </td>

                                                    <td className="px-3 py-3">
                                                        {
                                                            item.locations
                                                        }
                                                    </td>

                                                    <td className="px-3 py-3">
                                                        {
                                                            item.reports
                                                        }
                                                    </td>

                                                    <td className="px-3 py-3">

                                                        <ArrowUp
                                                            size={
                                                                16
                                                            }
                                                            className="text-green-500"
                                                        />

                                                    </td>

                                                </tr>

                                            )
                                        )}

                                    </tbody>

                                </table>

                            </div>

                        </div>

                        {/* YEAR-ON-YEAR COMPARISON */}

                        <div className="xl:col-span-1 bg-white rounded-xl border border-gray-100 shadow-sm p-4">

                            <div className="flex items-center justify-between mb-3">

                                <h2 className="font-bold text-[#173b57]">
                                    Year-on-Year Comparison
                                </h2>

                                <span className="text-xs text-gray-400">
                                    Reports
                                </span>

                            </div>


                            <div className="h-60">

                                <ResponsiveContainer
                                    width="100%"
                                    height="100%"
                                >

                                    <BarChart
                                        data={[
                                            {
                                                year: "2025",
                                                reported: 0,
                                                resolved: 0,
                                            },
                                            {
                                                year: "2026",
                                                reported: totalReports,
                                                resolved: resolvedCount,
                                            },
                                        ]}
                                    >

                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            stroke="#e5e7eb"
                                        />

                                        <XAxis
                                            dataKey="year"
                                            fontSize={11}
                                        />

                                        <YAxis
                                            allowDecimals={false}
                                            fontSize={11}
                                        />

                                        <Tooltip />

                                        <Bar
                                            dataKey="reported"
                                            name="Reported"
                                            fill="#60A5FA"
                                            radius={[5, 5, 0, 0]}
                                        />

                                        <Bar
                                            dataKey="resolved"
                                            name="Resolved"
                                            fill="#2563EB"
                                            radius={[5, 5, 0, 0]}
                                        />

                                    </BarChart>

                                </ResponsiveContainer>

                            </div>


                            <div className="flex justify-center gap-5 text-xs mt-2">

                                <span className="text-blue-400">
                                    ● Reported
                                </span>

                                <span className="text-blue-700">
                                    ● Resolved
                                </span>

                            </div>

                        </div>


                        {/* RIGHT SIDE*/}

                        <div className="xl:col-span-1 flex flex-col gap-3">

                            {/* KEY INSIGHTS */}

                            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">

                                <div className="flex items-center gap-2 mb-4">

                                    <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                                        <Lightbulb size={19} />
                                    </div>

                                    <div>

                                        <h2 className="font-bold text-[#173b57]">
                                            Key Insights
                                        </h2>

                                        <p className="text-xs text-gray-500">
                                            Automatically generated from current issue data
                                        </p>

                                    </div>

                                </div>


                                <div className="flex flex-col gap-3">


                                    <div className="bg-gray-50 rounded-lg p-4 flex gap-3">

                                        <CircleArrowUp
                                            className="text-green-500 flex-shrink-0"
                                            size={20}
                                        />

                                        <p className="text-sm text-gray-600">
                                            {totalReports} infrastructure reports are currently available in the dataset.
                                        </p>

                                    </div>


                                    <div className="bg-gray-50 rounded-lg p-4 flex gap-3">

                                        <CircleArrowUp
                                            className="text-blue-500 flex-shrink-0"
                                            size={20}
                                        />

                                        <p className="text-sm text-gray-600">
                                            {resolvedCount} issues have been marked as resolved.
                                        </p>

                                    </div>


                                    <div className="bg-gray-50 rounded-lg p-4 flex gap-3">

                                        <AlertTriangle
                                            className="text-red-500 flex-shrink-0"
                                            size={20}
                                        />

                                        <p className="text-sm text-gray-600">
                                            {criticalCount} issue requires critical priority attention.
                                        </p>

                                    </div>


                                    <div className="bg-gray-50 rounded-lg p-4 flex gap-3">

                                        <MapPin
                                            className="text-blue-500 flex-shrink-0"
                                            size={20}
                                        />

                                        <p className="text-sm text-gray-600">
                                            {problemAreas[0]?.name || "No area"} currently has the highest number of reports.
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>
                    </div>
                </main>

            </div>

        </div>
    );
}


export default AnalyticsReports;