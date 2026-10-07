import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import StaffSidebar from "../components/StaffSidebar";

import {
    ArrowLeft,
    MapPin,
    CalendarDays,
    User,
    Play,
    CheckCircle2,
    AlertTriangle,
} from "lucide-react";

// USE YOUR EXISTING issues.js
import { issues } from "../data/issues";


function StaffIssueDetails() {

    const navigate = useNavigate();
    const { id } = useParams();

    // Find issue from existing issues.js
    const issue = issues.find(
        (item) => String(item.id) === String(id)
    );

    // Local status so staff can change status on this page
    const [currentStatus, setCurrentStatus] = useState(
        issue?.status || "Assigned"
    );


    // If issue doesn't exist
    if (!issue) {
        return (
            <div className="min-h-screen bg-[#f6f9fc]">

                <StaffSidebar />

                <main className="ml-64 min-h-screen p-7">

                    <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">

                        <h1 className="text-2xl font-bold text-[#0d3550]">
                            Issue Not Found
                        </h1>

                        <p className="mt-2 text-slate-500">
                            The requested issue could not be found.
                        </p>

                        <button
                            onClick={() =>
                                navigate("/staff/assigned-issues")
                            }
                            className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
                        >
                            Back to Assigned Issues
                        </button>

                    </div>

                </main>

            </div>
        );
    }


    // Start work
    const handleStartWork = () => {
        setCurrentStatus("In Progress");
    };


    // Mark resolved
    const handleResolve = () => {
        setCurrentStatus("Resolved");

        setTimeout(() => {
            navigate("/staff/my-reports");
        }, 500);
    };


    return (
        <div className="min-h-screen bg-[#f6f9fc]">

            {/* SIDEBAR */}
            <StaffSidebar />


            {/* MAIN */}
            <main className="ml-64 min-h-screen">


                {/* TOP BAR */}
                <header className="flex h-[60px] items-center border-b border-slate-200 bg-white px-7">

                    <button
                        onClick={() =>
                            navigate("/staff/issues")
                        }
                        className="flex items-center gap-2 font-medium text-blue-600 hover:text-blue-700"
                    >
                        <ArrowLeft size={20} />

                        Back to Assigned Issues
                    </button>

                </header>


                {/* CONTENT */}
                <section className="p-4">


                    {/* TITLE */}
                    <div className="mb-5">

                        <span className="text-sm font-semibold text-blue-600">
                            Issue #{issue.id}
                        </span>

                        <h1 className="mt-2 text-[32px] font-bold text-[#0d3550]">
                            {issue.title}
                        </h1>

                        <div className="mt-2 flex items-center gap-2 text-slate-500">

                            <MapPin size={17} />

                            {issue.location}

                        </div>

                    </div>



                    {/* MAIN GRID */}
                    <div className="grid grid-cols-3 gap-6">


                        {/* LEFT SIDE */}
                        <div className="col-span-2 space-y-6">


                            {/* ISSUE DESCRIPTION */}
                            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">

                                <h2 className="text-xl font-bold text-[#0d3550]">
                                    Issue Description
                                </h2>

                                <p className="mt-4 leading-7 text-slate-600">

                                    {issue.description ||
                                        "Infrastructure issue reported by the citizen and assigned to field staff for inspection and resolution."}

                                </p>

                            </div>



                            {/* WORK STATUS */}
                            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">

                                <h2 className="text-xl font-bold text-[#0d3550]">
                                    Work Status
                                </h2>


                                <div className="mt-8 flex items-center">


                                    {/* ASSIGNED */}
                                    <div className="flex flex-col items-center">

                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">

                                            <CheckCircle2
                                                size={23}
                                                className="text-blue-600"
                                            />

                                        </div>

                                        <p className="mt-2 text-xs font-semibold text-slate-700">
                                            Assigned
                                        </p>

                                    </div>


                                    {/* LINE */}
                                    <div
                                        className={`h-1 flex-1 ${currentStatus === "In Progress" ||
                                            currentStatus === "Resolved"
                                            ? "bg-orange-400"
                                            : "bg-slate-200"
                                            }`}
                                    />



                                    {/* IN PROGRESS */}
                                    <div className="flex flex-col items-center">

                                        <div
                                            className={`flex h-12 w-12 items-center justify-center rounded-full ${currentStatus === "In Progress" ||
                                                currentStatus === "Resolved"
                                                ? "bg-orange-100"
                                                : "bg-slate-100"
                                                }`}
                                        >

                                            <Play
                                                size={21}
                                                className={
                                                    currentStatus === "In Progress" ||
                                                        currentStatus === "Resolved"
                                                        ? "text-orange-600"
                                                        : "text-slate-400"
                                                }
                                            />

                                        </div>

                                        <p className="mt-2 text-xs font-semibold text-slate-700">
                                            In Progress
                                        </p>

                                    </div>


                                    {/* LINE */}
                                    <div
                                        className={`h-1 flex-1 ${currentStatus === "Resolved"
                                            ? "bg-green-400"
                                            : "bg-slate-200"
                                            }`}
                                    />



                                    {/* RESOLVED */}
                                    <div className="flex flex-col items-center">

                                        <div
                                            className={`flex h-12 w-12 items-center justify-center rounded-full ${currentStatus === "Resolved"
                                                ? "bg-green-100"
                                                : "bg-slate-100"
                                                }`}
                                        >

                                            <CheckCircle2
                                                size={23}
                                                className={
                                                    currentStatus === "Resolved"
                                                        ? "text-green-600"
                                                        : "text-slate-400"
                                                }
                                            />

                                        </div>

                                        <p className="mt-2 text-xs font-semibold text-slate-700">
                                            Resolved
                                        </p>

                                    </div>

                                </div>


                                {/* CURRENT STATUS */}
                                <div className="mt-7 rounded-xl bg-slate-50 p-4">

                                    <p className="text-sm text-slate-500">
                                        Current Status
                                    </p>

                                    <p
                                        className={`mt-1 font-bold ${currentStatus === "Resolved"
                                            ? "text-green-600"
                                            : currentStatus === "In Progress"
                                                ? "text-orange-600"
                                                : "text-blue-600"
                                            }`}
                                    >
                                        {currentStatus}
                                    </p>

                                </div>

                            </div>



                            {/* FIELD ACTIONS */}
                            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">

                                <h2 className="text-xl font-bold text-[#0d3550]">
                                    Field Actions
                                </h2>


                                <div className="mt-5 flex gap-4">


                                    {/* START WORK */}
                                    {currentStatus === "Assigned" && (

                                        <button
                                            onClick={handleStartWork}
                                            className="flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
                                        >

                                            <Play size={18} />

                                            Start Work

                                        </button>

                                    )}



                                    {/* MARK RESOLVED */}
                                    {currentStatus === "In Progress" && (

                                        <button
                                            onClick={handleResolve}
                                            className="flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
                                        >

                                            <CheckCircle2 size={18} />

                                            Mark as Resolved

                                        </button>

                                    )}



                                    {/* ALREADY RESOLVED */}
                                    {currentStatus === "Resolved" && (

                                        <div className="flex items-center gap-2 rounded-xl bg-green-50 px-6 py-3 font-semibold text-green-600">

                                            <CheckCircle2 size={18} />

                                            Issue Resolved

                                        </div>

                                    )}

                                </div>

                            </div>

                        </div>



                        {/* RIGHT SIDE */}
                        <div className="space-y-6">


                            {/* ISSUE INFORMATION */}
                            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                                <h2 className="font-bold text-[#0d3550]">
                                    Issue Information
                                </h2>


                                <div className="mt-5 space-y-5">


                                    {/* PRIORITY */}
                                    <div>

                                        <p className="text-xs text-slate-400">
                                            Priority
                                        </p>

                                        <p
                                            className={`mt-1 font-semibold ${issue.priority === "Critical"
                                                ? "text-red-600"
                                                : issue.priority === "High"
                                                    ? "text-red-500"
                                                    : issue.priority === "Medium"
                                                        ? "text-orange-500"
                                                        : "text-green-600"
                                                }`}
                                        >
                                            {issue.priority ||
                                                issue.severity ||
                                                "Medium"}
                                        </p>

                                    </div>



                                    {/* CATEGORY */}
                                    <div>

                                        <p className="text-xs text-slate-400">
                                            Category
                                        </p>

                                        <p className="mt-1 font-semibold text-slate-700">

                                            {issue.category ||
                                                issue.aiCategory ||
                                                "Infrastructure Issue"}

                                        </p>

                                    </div>



                                    {/* ASSIGNED DATE */}
                                    <div>

                                        <p className="text-xs text-slate-400">
                                            Assigned Date
                                        </p>

                                        <p className="mt-1 flex items-center gap-2 font-semibold text-slate-700">

                                            <CalendarDays size={15} />

                                            {issue.assignedDate ||
                                                "04 Oct 2026"}

                                        </p>

                                    </div>



                                    {/* REPORTED DATE */}
                                    <div>

                                        <p className="text-xs text-slate-400">
                                            Reported Date
                                        </p>

                                        <p className="mt-1 flex items-center gap-2 font-semibold text-slate-700">

                                            <CalendarDays size={15} />

                                            {issue.reportedDate ||
                                                "Not available"}

                                        </p>

                                    </div>



                                    {/* REPORTED BY */}
                                    <div>

                                        <p className="text-xs text-slate-400">
                                            Reported By
                                        </p>

                                        <p className="mt-1 flex items-center gap-2 font-semibold text-slate-700">

                                            <User size={15} />

                                            {issue.reportedBy ||
                                                "Citizen"}

                                        </p>

                                    </div>

                                </div>

                            </div>



                            {/* AI INFORMATION */}
                            <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6">

                                <h2 className="font-bold text-[#0d3550]">
                                    AI Analysis
                                </h2>


                                <div className="mt-4 space-y-3">

                                    <div className="flex justify-between">

                                        <span className="text-sm text-slate-500">
                                            AI Category
                                        </span>

                                        <span className="text-sm font-semibold text-blue-600">
                                            {issue.aiCategory ||
                                                issue.category ||
                                                "Infrastructure"}

                                        </span>

                                    </div>


                                    <div className="flex justify-between">

                                        <span className="text-sm text-slate-500">
                                            Confidence
                                        </span>

                                        <span className="text-sm font-semibold text-blue-600">
                                            {issue.confidence || "—"}
                                        </span>

                                    </div>


                                    <div className="flex justify-between">

                                        <span className="text-sm text-slate-500">
                                            Severity Score
                                        </span>

                                        <span className="text-sm font-semibold text-blue-600">
                                            {issue.severityScore || "—"}
                                        </span>

                                    </div>

                                </div>

                            </div>



                            {/* SAFETY REMINDER */}
                            <div className="rounded-2xl border border-orange-200 bg-orange-50 p-6">

                                <div className="flex gap-3">

                                    <AlertTriangle
                                        size={22}
                                        className="shrink-0 text-orange-600"
                                    />


                                    <div>

                                        <p className="font-semibold text-orange-700">
                                            Safety Reminder
                                        </p>

                                        <p className="mt-1 text-sm leading-6 text-orange-600">
                                            Follow field safety procedures
                                            while working on this issue.
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </section>

            </main>

        </div>
    );
}

export default StaffIssueDetails;