import { useNavigate } from "react-router-dom";

import StaffSidebar from "../components/StaffSidebar";

import {
    Search,
    Bell,
    CalendarDays,
    ClipboardList,
    Clock3,
    CheckCircle2,
    MapPin,
    ChevronRight,
} from "lucide-react";

import { issues } from "../data/issues";


function StaffDashboard() {

    const navigate = useNavigate();

    // Existing issues data
    const staffIssues = issues || [];


    // Counts
    const assignedCount = staffIssues.length;

    const inProgressCount = staffIssues.filter(
        (issue) => issue.status === "In Progress"
    ).length;

    const highPriorityCount = staffIssues.filter(
        (issue) =>
            issue.priority === "High" ||
            issue.priority === "Critical" ||
            issue.severity === "High" ||
            issue.severity === "Critical"
    ).length;

    const completedReports = staffIssues.filter(
        (issue) =>
            issue.status === "Resolved" ||
            issue.status === "Completed"
    );


    return (
        <div className="min-h-screen bg-[#f6f9fc]">

            {/* SIDEBAR */}
            <StaffSidebar />


            {/* MAIN CONTENT */}
            <main className="ml-64 min-h-screen">

                {/* =====================================================
                    TOP BAR
                ===================================================== */}

                <header className="sticky top-0 z-40 flex h-[60px] items-center justify-between border-b border-slate-200 bg-white px-7">

                    {/* SEARCH */}
                    <div className="relative w-[360px]">

                        <Search
                            size={20}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                            type="text"
                            placeholder="Search issues, location..."
                            className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-[15px] outline-none transition focus:border-blue-400"
                        />

                    </div>


                    {/* RIGHT SIDE */}
                    <div className="flex items-center gap-5">

                        {/* NOTIFICATION */}
                        <button
                            onClick={() =>
                                navigate("/staff/notifications")
                            }
                            className="relative"
                        >

                            <Bell
                                size={24}
                                className="text-slate-600"
                            />

                            <span className="absolute -right-2 -top-2 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                                3
                            </span>

                        </button>


                        {/* PROFILE */}
                        <button
                            onClick={() => navigate("/staff/profile")}
                            className="flex items-center gap-3 rounded-xl px-3 py-2 text-left hover:bg-slate-50 transition"
                        >
                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0d3550] font-semibold text-white">
                                RK
                            </div>

                            <div>
                                <p className="font-semibold text-[#0d3550]">
                                    Ramesh Kumar
                                </p>

                                <span className="text-sm text-slate-500">
                                    Field Staff
                                </span>
                            </div>
                        </button>

                    </div>

                </header>


                {/* =====================================================
                    PAGE CONTENT
                ===================================================== */}

                <section className="p-4">


                    {/* =================================================
                        TITLE + DATE
                    ================================================= */}

                    <div className="mb-4 flex items-start justify-between">

                        {/* TITLE */}
                        <div>

                            <h1 className="text-[25px] font-bold leading-tight text-[#0d3550]">
                                Good Morning, Ramesh!
                            </h1>

                            <p className="mt-1 text-[15px] text-slate-500">
                                Here are your field operations overview for today.
                            </p>

                        </div>


                        {/* DATE CARD */}
                        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-3 shadow-sm">

                            <div className="rounded-lg bg-blue-50 p-2.5">
                                <CalendarDays
                                    size={21}
                                    className="text-blue-600"
                                />
                            </div>

                            <div>
                                <p className="text-xs text-slate-500">
                                    Today
                                </p>

                                <p className="text-sm font-semibold text-[#0d3550]">
                                    {new Date().toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                        weekday: "long",
                                    })}
                                </p>
                            </div>

                        </div>
                    </div>



                    {/* =================================================
                        STATS CARDS
                        ================================================= */}

                    <div className="grid grid-cols-4 gap-4">


                        {/* ASSIGNED */}
                        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">

                            <div className="flex items-start justify-between">

                                <div>

                                    <p className="text-sm text-slate-500">
                                        Assigned Issues
                                    </p>

                                    <p className="mt-2 text-[32px] font-bold leading-none text-[#0d3550]">
                                        {assignedCount}
                                    </p>

                                </div>


                                <div className="rounded-xl bg-red-50 p-3">

                                    <ClipboardList
                                        size={23}
                                        className="text-red-500"
                                    />

                                </div>

                            </div>


                            <span className="mt-3 inline-block rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-500">

                                {highPriorityCount} High Priority

                            </span>

                        </div>


                        {/* IN PROGRESS */}
                        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">

                            <div className="flex items-start justify-between">

                                <div>

                                    <p className="text-sm text-slate-500">
                                        In Progress
                                    </p>

                                    <p className="mt-2 text-[32px] font-bold leading-none text-[#0d3550]">
                                        {inProgressCount}
                                    </p>

                                </div>


                                <div className="rounded-xl bg-orange-50 p-3">

                                    <Clock3
                                        size={23}
                                        className="text-orange-500"
                                    />

                                </div>

                            </div>


                            <span className="mt-3 inline-block rounded-lg bg-orange-50 px-3 py-1.5 text-xs font-medium text-orange-500">

                                On Field

                            </span>

                        </div>


                        {/* REPORTS */}
                        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">

                            <div className="flex items-start justify-between">

                                <div>

                                    <p className="text-sm text-slate-500">
                                        Reports Submitted
                                    </p>

                                    <p className="mt-2 text-[32px] font-bold leading-none text-[#0d3550]">
                                        {completedReports.length}
                                    </p>

                                </div>


                                <div className="rounded-xl bg-green-50 p-3">

                                    <CheckCircle2
                                        size={23}
                                        className="text-green-500"
                                    />

                                </div>

                            </div>


                            <span className="mt-3 inline-block rounded-lg bg-green-50 px-3 py-1.5 text-xs font-medium text-green-600">

                                This Week

                            </span>

                        </div>


                        {/* LOCATIONS */}
                        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">

                            <div className="flex items-start justify-between">

                                <div>

                                    <p className="text-sm text-slate-500">
                                        Locations Visited
                                    </p>

                                    <p className="mt-2 text-[32px] font-bold leading-none text-[#0d3550]">
                                        4
                                    </p>

                                </div>


                                <div className="rounded-xl bg-blue-50 p-3">

                                    <MapPin
                                        size={23}
                                        className="text-blue-500"
                                    />

                                </div>

                            </div>


                            <span className="mt-3 inline-block rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-600">

                                This Month

                            </span>

                        </div>

                    </div>


                    {/* =================================================
                        LOWER SECTION
                    ================================================= */}

                    <div className="mt-5 grid grid-cols-2 gap-4">


                        {/* =================================================
                            MY ASSIGNED ISSUES
                        ================================================= */}

                        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

                            {/* HEADER */}
                            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">

                                <div>

                                    <h2 className="text-[18px] font-bold text-[#0d3550]">
                                        My Assigned Issues
                                    </h2>

                                    <p className="mt-0.5 text-xs text-slate-500">
                                        Issues currently assigned to you
                                    </p>

                                </div>


                                <button
                                    onClick={() =>
                                        navigate("/staff/assigned-issues")
                                    }
                                    className="text-sm font-medium text-blue-600 hover:text-blue-700"
                                >
                                    View All
                                </button>

                            </div>


                            {/* ISSUE LIST */}

                            {staffIssues.slice(0, 3).map((issue) => {

                                const priority =
                                    issue.priority ||
                                    issue.severity ||
                                    "Medium";

                                const status =
                                    issue.status ||
                                    "Assigned";


                                return (

                                    <button
                                        key={issue.id}
                                        onClick={() =>
                                            navigate(
                                                `/staff/issue/${issue.id}`
                                            )
                                        }
                                        className="flex w-full items-center gap-3.5 border-b border-slate-100 px-5 py-3.5 text-left transition hover:bg-slate-50"
                                    >

                                        {/* ICON */}
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-slate-100">

                                            <ClipboardList
                                                size={21}
                                                className="text-[#0d3550]"
                                            />

                                        </div>


                                        {/* DETAILS */}
                                        <div className="min-w-0 flex-1">

                                            <p className="truncate text-sm font-semibold text-[#0d3550]">
                                                {issue.title}
                                            </p>


                                            <div className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">

                                                <MapPin size={12} />

                                                <span className="truncate">
                                                    {issue.location}
                                                </span>

                                            </div>


                                            {/* TAGS */}
                                            <div className="mt-2 flex gap-2">

                                                <span
                                                    className={`rounded-md px-2.5 py-1 text-[11px] font-medium ${priority === "Critical"
                                                        ? "bg-red-50 text-red-600"
                                                        : priority === "High"
                                                            ? "bg-red-50 text-red-500"
                                                            : priority === "Medium"
                                                                ? "bg-orange-50 text-orange-500"
                                                                : "bg-green-50 text-green-600"
                                                        }`}
                                                >
                                                    {priority}
                                                </span>


                                                <span
                                                    className={`rounded-md px-2.5 py-1 text-[11px] font-medium ${status === "In Progress"
                                                        ? "bg-orange-50 text-orange-600"
                                                        : status === "Resolved"
                                                            ? "bg-green-50 text-green-600"
                                                            : "bg-blue-50 text-blue-600"
                                                        }`}
                                                >
                                                    {status}
                                                </span>

                                            </div>

                                        </div>


                                        {/* ARROW */}
                                        <ChevronRight
                                            size={19}
                                            className="shrink-0 text-slate-400"
                                        />

                                    </button>

                                );

                            })}

                        </div>



                        {/* =================================================
                            RECENT REPORTS
                        ================================================= */}

                        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

                            {/* HEADER */}
                            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">

                                <div>

                                    <h2 className="text-[18px] font-bold text-[#0d3550]">
                                        Recent Reports
                                    </h2>

                                    <p className="mt-0.5 text-xs text-slate-500">
                                        Your recently completed activities
                                    </p>

                                </div>


                                <button
                                    onClick={() =>
                                        navigate("/staff/my-reports")
                                    }
                                    className="text-sm font-medium text-blue-600 hover:text-blue-700"
                                >
                                    View All
                                </button>

                            </div>


                            {/* REPORT LIST */}

                            {completedReports.length > 0 ? (

                                completedReports
                                    .slice(0, 3)
                                    .map((report) => (

                                        <button
                                            key={report.id}
                                            onClick={() =>
                                                navigate(
                                                    "/staff/my-reports"
                                                )
                                            }
                                            className="flex w-full items-center gap-3.5 border-b border-slate-100 px-5 py-3.5 text-left transition hover:bg-slate-50"
                                        >

                                            {/* ICON */}
                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-green-50">

                                                <CheckCircle2
                                                    size={21}
                                                    className="text-green-500"
                                                />

                                            </div>


                                            {/* DETAILS */}
                                            <div className="min-w-0 flex-1">

                                                <p className="truncate text-sm font-semibold text-[#0d3550]">
                                                    {report.title}
                                                </p>

                                                <p className="mt-0.5 truncate text-xs text-slate-500">
                                                    {report.location}
                                                </p>

                                            </div>


                                            <ChevronRight
                                                size={19}
                                                className="shrink-0 text-slate-400"
                                            />

                                        </button>

                                    ))

                            ) : (

                                <div className="p-6 text-center">

                                    <CheckCircle2
                                        size={30}
                                        className="mx-auto text-slate-300"
                                    />

                                    <p className="mt-2 text-sm text-slate-500">
                                        No completed reports yet.
                                    </p>

                                </div>

                            )}

                        </div>

                    </div>

                </section>

            </main>

        </div>
    );
}


export default StaffDashboard;