import { useState } from "react";
import StaffSidebar from "../components/StaffSidebar";

import {
    Search,
    CheckCircle2,
    MapPin,
    CalendarDays,
    Clock3,
} from "lucide-react";


function StaffMyReports() {

    const [search, setSearch] = useState("");

    // Completed work done by this staff member
    const completedReports = [
        {
            id: 1,
            title: "Broken Street Light",
            location: "Jubilee Hills, Park Lane",
            category: "Street Light",
            completedDate: "04 Oct 2026",
            duration: "2 hours",
            workDone:
                "Faulty bulb and damaged wiring were replaced successfully.",
        },
        {
            id: 2,
            title: "Garbage Pileup",
            location: "Green Park Colony",
            category: "Garbage",
            completedDate: "03 Oct 2026",
            duration: "1.5 hours",
            workDone:
                "Accumulated garbage was cleared and the surrounding area was cleaned.",
        },
        {
            id: 3,
            title: "Drainage Cleaning",
            location: "Ameerpet Main Road",
            category: "Drainage",
            completedDate: "01 Oct 2026",
            duration: "3 hours",
            workDone:
                "Blocked drainage was cleaned and normal water flow was restored.",
        },
        {
            id: 4,
            title: "Road Repair",
            location: "Kukatpally Housing Board",
            category: "Road Damage",
            completedDate: "29 Sep 2026",
            duration: "4 hours",
            workDone:
                "Damaged road surface was repaired and levelled.",
        },
    ];


    const filteredReports = completedReports.filter((report) =>
        `${report.title} ${report.location} ${report.category}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );


    return (
        <div className="min-h-screen bg-[#f6f9fc]">

            {/* SIDEBAR */}
            <StaffSidebar />

            {/* MAIN */}
            <main className="ml-64 min-h-screen">

                {/* TOP BAR */}
                <header className="flex h-[60px] items-center border-b border-slate-200 bg-white px-7">

                    <div className="relative w-[390px]">

                        <Search
                            size={21}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search completed reports..."
                            className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none focus:border-blue-400"
                        />

                    </div>

                </header>


                {/* CONTENT */}
                <section className="p-4">

                    {/* TITLE */}
                    <div>

                        <h1 className="text-[25px] font-bold text-[#0d3550]">
                            My Reports
                        </h1>

                        <p className="mt-1 text-slate-500">
                            View the work completed by you.
                        </p>

                    </div>


                    {/* SUMMARY CARDS */}
                    <div className="mt-7 grid grid-cols-3 gap-5">

                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                            <p className="text-sm text-slate-500">
                                Completed Reports
                            </p>

                            <p className="mt-2 text-3xl font-bold text-[#0d3550]">
                                {completedReports.length}
                            </p>

                        </div>


                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                            <p className="text-sm text-slate-500">
                                This Week
                            </p>

                            <p className="mt-2 text-3xl font-bold text-green-600">
                                4
                            </p>

                        </div>


                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                            <p className="text-sm text-slate-500">
                                Average Completion
                            </p>

                            <p className="mt-2 text-3xl font-bold text-blue-600">
                                2.6 hrs
                            </p>

                        </div>

                    </div>


                    {/* REPORTS */}
                    <div className="mt-7 space-y-4">

                        {filteredReports.map((report) => (

                            <div
                                key={report.id}
                                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                            >

                                <div className="flex items-start gap-5">

                                    {/* ICON */}
                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-green-50">

                                        <CheckCircle2
                                            size={28}
                                            className="text-green-500"
                                        />

                                    </div>


                                    {/* DETAILS */}
                                    <div className="flex-1">

                                        <div className="flex items-start justify-between">

                                            <div>

                                                <h2 className="text-lg font-bold text-[#0d3550]">
                                                    {report.title}
                                                </h2>

                                                <div className="mt-2 flex items-center gap-1 text-sm text-slate-500">

                                                    <MapPin size={15} />

                                                    {report.location}

                                                </div>

                                            </div>


                                            <span className="rounded-lg bg-green-50 px-3 py-2 text-xs font-semibold text-green-600">
                                                Resolved
                                            </span>

                                        </div>


                                        {/* WORK DONE */}
                                        <div className="mt-5 rounded-xl bg-slate-50 p-4">

                                            <p className="text-sm font-semibold text-[#0d3550]">
                                                Work Completed
                                            </p>

                                            <p className="mt-1 text-sm leading-6 text-slate-600">
                                                {report.workDone}
                                            </p>

                                        </div>


                                        {/* META */}
                                        <div className="mt-4 flex gap-6 text-sm text-slate-500">

                                            <span className="flex items-center gap-2">

                                                <CalendarDays size={15} />

                                                {report.completedDate}

                                            </span>


                                            <span className="flex items-center gap-2">

                                                <Clock3 size={15} />

                                                {report.duration}

                                            </span>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                </section>

            </main>

        </div>
    );
}

export default StaffMyReports;