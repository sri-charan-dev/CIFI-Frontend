import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Search,
    Filter,
    MapPin,
    ClipboardList,
} from "lucide-react";

import StaffSidebar from "../components/StaffSidebar";

// USE EXISTING DATA FILE
import { issues } from "../data/issues";


function StaffAssignedIssues() {

    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");


    // =====================================================
    // USE EXISTING ISSUES DATA
    // =====================================================

    const staffIssues = issues || [];


    // =====================================================
    // COUNTS
    // =====================================================

    const allCount = staffIssues.length;

    const highCount = staffIssues.filter(
        (issue) =>
            issue.priority === "High" ||
            issue.priority === "Critical" ||
            issue.severity === "High" ||
            issue.severity === "Critical"
    ).length;

    const mediumCount = staffIssues.filter(
        (issue) =>
            issue.priority === "Medium" ||
            issue.severity === "Medium"
    ).length;

    const lowCount = staffIssues.filter(
        (issue) =>
            issue.priority === "Low" ||
            issue.severity === "Low"
    ).length;


    // =====================================================
    // FILTER + SEARCH
    // =====================================================

    const filteredIssues = useMemo(() => {

        return staffIssues.filter((issue) => {

            const title =
                issue.title || "";

            const location =
                issue.location || "";

            const priority =
                issue.priority ||
                issue.severity ||
                "Medium";

            const status =
                issue.status ||
                "Assigned";


            const matchesSearch =
                title
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||

                location
                    .toLowerCase()
                    .includes(search.toLowerCase());


            const matchesFilter =
                filter === "All" ||
                priority === filter ||
                status === filter;


            return matchesSearch && matchesFilter;

        });

    }, [staffIssues, search, filter]);


    return (

        <div className="min-h-screen bg-[#f6f9fc]">


            {/* =================================================
                SIDEBAR
            ================================================= */}

            <StaffSidebar />


            {/* =================================================
                MAIN
            ================================================= */}

            <main className="ml-64 min-h-screen">


                {/* =================================================
                    TOP BAR
                ================================================= */}

                <header className="flex h-[60px] items-center justify-between border-b border-slate-200 bg-white px-7">


                    {/* SEARCH */}

                    <div className="relative w-[390px]">

                        <Search
                            size={21}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            placeholder="Search issues, location..."
                            className="h-12 w-full rounded-xl border border-slate-200 pl-11 pr-4 outline-none transition focus:border-blue-400"
                        />

                    </div>

                </header>



                {/* =================================================
                    CONTENT
                ================================================= */}

                <section className="p-4">


                    {/* =================================================
                        TITLE
                    ================================================= */}

                    <div className="mb-7">

                        <h1 className="text-[25px] font-bold text-[#0d3550]">
                            Assigned Issues
                        </h1>

                        <p className="mt-1 text-slate-500">
                            These are the issues assigned to you.
                        </p>

                    </div>



                    {/* =================================================
                        FILTER TABS
                    ================================================= */}

                    <div className="mb-6 flex gap-3">


                        {/* ALL */}

                        <button
                            onClick={() => setFilter("All")}
                            className={`rounded-lg px-5 py-2.5 text-sm font-medium transition ${filter === "All"
                                ? "bg-blue-600 text-white"
                                : "bg-white text-slate-600 hover:bg-slate-100"
                                }`}
                        >
                            All ({allCount})
                        </button>



                        {/* HIGH */}

                        <button
                            onClick={() => setFilter("High")}
                            className={`rounded-lg px-5 py-2.5 text-sm font-medium transition ${filter === "High"
                                ? "bg-red-500 text-white"
                                : "bg-red-50 text-red-500 hover:bg-red-100"
                                }`}
                        >
                            High ({highCount})
                        </button>



                        {/* MEDIUM */}

                        <button
                            onClick={() => setFilter("Medium")}
                            className={`rounded-lg px-5 py-2.5 text-sm font-medium transition ${filter === "Medium"
                                ? "bg-orange-500 text-white"
                                : "bg-orange-50 text-orange-500 hover:bg-orange-100"
                                }`}
                        >
                            Medium ({mediumCount})
                        </button>



                        {/* LOW */}

                        <button
                            onClick={() => setFilter("Low")}
                            className={`rounded-lg px-5 py-2.5 text-sm font-medium transition ${filter === "Low"
                                ? "bg-green-500 text-white"
                                : "bg-green-50 text-green-600 hover:bg-green-100"
                                }`}
                        >
                            Low ({lowCount})
                        </button>

                    </div>



                    {/* =================================================
                        ISSUE LIST
                    ================================================= */}

                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">


                        {filteredIssues.length > 0 ? (

                            filteredIssues.map((issue) => {


                                const priority =
                                    issue.priority ||
                                    issue.severity ||
                                    "Medium";


                                const status =
                                    issue.status ||
                                    "Assigned";


                                return (

                                    <div
                                        key={issue.id}
                                        className="flex items-center gap-5 border-b border-slate-100 p-4 transition hover:bg-slate-50"
                                    >


                                        {/* =================================================
                                            IMAGE / ICON
                                        ================================================= */}

                                        <div className="flex h-[70px] w-[90px] shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-100">

                                            {issue.image ? (

                                                <img
                                                    src={issue.image}
                                                    alt={issue.title}
                                                    className="h-full w-full object-cover"
                                                />

                                            ) : (

                                                <ClipboardList
                                                    size={30}
                                                    className="text-slate-400"
                                                />

                                            )}

                                        </div>



                                        {/* =================================================
                                            ISSUE DETAILS
                                        ================================================= */}

                                        <div className="min-w-0 flex-1">

                                            <h3 className="font-semibold text-[#0d3550]">
                                                {issue.title}
                                            </h3>


                                            <div className="mt-1 flex items-center gap-1 text-sm text-slate-500">

                                                <MapPin size={14} />

                                                {issue.location}

                                            </div>

                                        </div>



                                        {/* =================================================
                                            PRIORITY
                                        ================================================= */}

                                        <span
                                            className={`w-[80px] rounded-md px-3 py-2 text-center text-xs font-semibold ${priority === "Critical"
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



                                        {/* =================================================
                                            STATUS
                                        ================================================= */}

                                        <span
                                            className={`w-[105px] rounded-md px-3 py-2 text-center text-xs font-semibold ${status === "In Progress"
                                                ? "bg-orange-50 text-orange-600"
                                                : status === "Resolved" ||
                                                    status === "Completed"
                                                    ? "bg-green-50 text-green-600"
                                                    : "bg-blue-50 text-blue-600"
                                                }`}
                                        >
                                            {status}
                                        </span>



                                        {/* =================================================
                                            ASSIGNED DATE
                                        ================================================= */}

                                        <div className="w-[105px] text-center text-xs text-slate-500">

                                            <p>
                                                Assigned on
                                            </p>

                                            <p className="font-medium text-slate-700">

                                                {issue.assignedDate ||
                                                    issue.reportedDate ||
                                                    "04 Oct 2026"}

                                            </p>

                                        </div>



                                        {/* =================================================
                                            VIEW DETAILS
                                        ================================================= */}

                                        <button
                                            onClick={() =>
                                                navigate(
                                                    `/staff/issue/${issue.id}`
                                                )
                                            }
                                            className="rounded-lg border border-blue-300 px-4 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
                                        >
                                            View Details
                                        </button>

                                    </div>

                                );

                            })

                        ) : (

                            /* =================================================
                                NO RESULTS
                            ================================================= */

                            <div className="p-12 text-center">

                                <ClipboardList
                                    size={45}
                                    className="mx-auto text-slate-300"
                                />

                                <h2 className="mt-4 text-lg font-bold text-[#0d3550]">
                                    No Issues Found
                                </h2>

                                <p className="mt-2 text-sm text-slate-500">
                                    No issues match your current search or filter.
                                </p>

                            </div>

                        )}

                    </div>

                </section>

            </main>

        </div>
    );
}


export default StaffAssignedIssues;