import StaffSidebar from "../components/StaffSidebar";
import { useState } from "react";

import {
    Search,
    ClipboardList,
    AlertTriangle,
    CheckCircle2,
    UserPlus,
} from "lucide-react";

function StaffNotifications() {

    const [search, setSearch] = useState("");

    const notifications = [
        {
            icon: ClipboardList,
            title: "New issue assigned",
            message:
                "A new Garbage Overflow issue has been assigned to you.",
            time: "10 minutes ago",
            type: "blue",
        },
        {
            icon: AlertTriangle,
            title: "High priority issue",
            message:
                "The Road Pothole issue in Banjara Hills requires immediate attention.",
            time: "1 hour ago",
            type: "red",
        },
        {
            icon: CheckCircle2,
            title: "Report approved",
            message:
                "Your Street Light repair report has been approved by the authority.",
            time: "3 hours ago",
            type: "green",
        },
        {
            icon: UserPlus,
            title: "Issue reassigned",
            message:
                "Water Leakage issue has been assigned to you by the department.",
            time: "Yesterday",
            type: "orange",
        },
    ];


    // Search notifications
    const filteredNotifications = notifications.filter((notification) =>
        `${notification.title} ${notification.message}`
            .toLowerCase()
            .includes(search.toLowerCase())
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

                <header className="flex h-[60px] items-center border-b border-slate-200 bg-white px-5">

                    <div className="relative w-[390px]">

                        <Search
                            size={20}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search notifications..."
                            className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none transition focus:border-blue-400"
                        />

                    </div>

                </header>


                {/* =====================================================
                    PAGE CONTENT
                ===================================================== */}

                <section className="px-4 py-5">

                    {/* TITLE */}
                    <div className="mb-5">

                        <h1 className="text-[28px] font-bold leading-tight text-[#0d3550]">
                            Notifications
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Stay updated with the latest notifications regarding your assigned issues and reports.
                        </p>

                    </div>


                    {/* =================================================
                        NOTIFICATION CARD
                    ================================================= */}

                    <div className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

                        {filteredNotifications.length > 0 ? (

                            filteredNotifications.map((notification, index) => {

                                const Icon = notification.icon;


                                const iconStyle = {
                                    blue: "bg-blue-50 text-blue-600",
                                    red: "bg-red-50 text-red-600",
                                    green: "bg-green-50 text-green-600",
                                    orange: "bg-orange-50 text-orange-600",
                                };


                                return (

                                    <div
                                        key={index}
                                        className="flex w-full items-start gap-4 border-b border-slate-100 px-5 py-4 last:border-b-0"
                                    >

                                        {/* ICON */}

                                        <div
                                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconStyle[notification.type]}`}
                                        >

                                            <Icon size={21} />

                                        </div>


                                        {/* CONTENT */}

                                        <div className="min-w-0 flex-1">

                                            <h3 className="text-[15px] font-semibold text-[#0d3550]">
                                                {notification.title}
                                            </h3>

                                            <p className="mt-1 text-sm leading-5 text-slate-500">
                                                {notification.message}
                                            </p>

                                            <p className="mt-1.5 text-xs text-slate-400">
                                                {notification.time}
                                            </p>

                                        </div>


                                        {/* UNREAD DOT */}

                                        {index < 2 && (

                                            <div className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-blue-600" />

                                        )}

                                    </div>

                                );

                            })

                        ) : (

                            /* NO RESULTS */

                            <div className="px-5 py-10 text-center">

                                <Search
                                    size={30}
                                    className="mx-auto text-slate-300"
                                />

                                <p className="mt-2 text-sm text-slate-500">
                                    No notifications found.
                                </p>

                            </div>

                        )}

                    </div>

                </section>

            </main>

        </div>
    );
}

export default StaffNotifications;