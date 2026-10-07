import StaffSidebar from "../components/StaffSidebar";
import { useState } from "react";
import hyderabadMap from "../assets/maps/hyderabad-map.png";

import {
    Search,
    MapPin,
    Navigation,
    Clock3,
    CheckCircle2,
} from "lucide-react";

function StaffLocationView() {
    const [search, setSearch] = useState("");

    const locations = [
        {
            id: 1,
            name: "Banjara Hills",
            issue: "Large Pothole on Main Road",
            status: "In Progress",
            time: "Today, 10:30 AM",
        },
        {
            id: 2,
            name: "Jubilee Hills",
            issue: "Broken Street Light",
            status: "Completed",
            time: "Today, 09:15 AM",
        },
        {
            id: 3,
            name: "Kukatpally",
            issue: "Garbage Overflow",
            status: "Assigned",
            time: "Yesterday, 04:20 PM",
        },
        {
            id: 4,
            name: "Ameerpet",
            issue: "Water Leakage",
            status: "In Progress",
            time: "Yesterday, 02:10 PM",
        },
    ];

    const filteredLocations = locations.filter((location) =>
        `${location.name} ${location.issue}`
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
                <header className="flex h-[60px] items-center border-b border-slate-200 bg-white px-6">

                    <div className="relative w-[390px]">

                        <Search
                            size={20}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search reports location..."
                            className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none transition focus:border-blue-400"
                        />

                    </div>

                </header>


                {/* PAGE CONTENT */}
                <section className="px-4 py-4">

                    {/* TITLE */}
                    <div className="mb-4">

                        <h1 className="text-[28px] font-bold leading-tight text-[#0d3550]">
                            Location View
                        </h1>

                        <p className="mt-1.5 text-sm text-slate-500">
                            Visualize the locations of your assigned reports on the map.
                        </p>

                    </div>


                    {/* MAP */}
                    <div className="relative h-[405px] overflow-hidden rounded-2xl border border-slate-200 bg-[#e9f1e9] shadow-sm">

                        <img
                            src={hyderabadMap}
                            alt="Hyderabad Map"
                            className="absolute inset-0 h-full w-full object-cover"
                        />


                        {/* LOCATION 1 */}
                        <div className="absolute left-[25%] top-[25%]">

                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500 shadow-lg ring-4 ring-red-100">

                                <MapPin
                                    size={24}
                                    className="text-white"
                                />

                            </div>

                        </div>


                        {/* LOCATION 2 */}
                        <div className="absolute left-[55%] top-[40%]">

                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 shadow-lg ring-4 ring-orange-100">

                                <MapPin
                                    size={24}
                                    className="text-white"
                                />

                            </div>

                        </div>


                        {/* LOCATION 3 */}
                        <div className="absolute left-[72%] top-[60%]">

                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 shadow-lg ring-4 ring-blue-100">

                                <MapPin
                                    size={24}
                                    className="text-white"
                                />

                            </div>

                        </div>


                        {/* LOCATION 4 */}
                        <div className="absolute left-[40%] top-[68%]">

                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 shadow-lg ring-4 ring-green-100">

                                <MapPin
                                    size={24}
                                    className="text-white"
                                />

                            </div>

                        </div>


                        {/* HYDERABAD LABEL */}
                        <div className="absolute left-6 top-6 rounded-xl bg-white px-5 py-3.5 shadow-lg">

                            <p className="font-bold text-[#0d3550]">
                                Hyderabad
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                                Staff Field Locations
                            </p>

                        </div>


                        {/* TODAY INFO */}
                        <div className="absolute bottom-5 left-5 rounded-xl bg-white px-5 py-3.5 shadow-lg">

                            <p className="font-semibold text-[#0d3550]">
                                Today's Field Locations
                            </p>

                            <div className="mt-1.5 flex gap-4 text-xs text-slate-500">

                                <span>
                                    4 Locations
                                </span>

                                <span>
                                    •
                                </span>

                                <span>
                                    2 In Progress
                                </span>

                            </div>

                        </div>


                        {/* LEGEND */}
                        <div className="absolute right-5 top-5 rounded-xl bg-white p-4 shadow-lg">

                            <p className="mb-2.5 text-sm font-semibold text-[#0d3550]">
                                Status
                            </p>

                            <div className="space-y-1.5 text-xs text-slate-600">

                                <div className="flex items-center gap-2">
                                    <span className="h-3 w-3 rounded-full bg-red-500" />
                                    High Priority
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="h-3 w-3 rounded-full bg-orange-500" />
                                    In Progress
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="h-3 w-3 rounded-full bg-blue-500" />
                                    Assigned
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="h-3 w-3 rounded-full bg-green-500" />
                                    Completed
                                </div>

                            </div>

                        </div>

                    </div>


                    {/* RECENT LOCATIONS */}
                    <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                        {/* HEADER */}
                        <div className="border-b border-slate-100 px-5 py-4">

                            <h2 className="text-lg font-bold text-[#0d3550]">
                                Recent Locations
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Your recent field visits
                            </p>

                        </div>


                        {/* LOCATION LIST */}
                        {filteredLocations.length > 0 ? (

                            filteredLocations.map((location) => (

                                <div
                                    key={location.id}
                                    className="flex items-center gap-4 border-b border-slate-100 px-5 py-4 last:border-b-0"
                                >

                                    {/* ICON */}
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">

                                        {location.status === "Completed" ? (

                                            <CheckCircle2
                                                size={21}
                                                className="text-green-600"
                                            />

                                        ) : (

                                            <Navigation
                                                size={20}
                                                className="text-blue-600"
                                            />

                                        )}

                                    </div>


                                    {/* DETAILS */}
                                    <div className="flex-1">

                                        <h3 className="text-sm font-semibold text-[#0d3550]">
                                            {location.name}
                                        </h3>

                                        <p className="mt-1 text-xs text-slate-500">
                                            {location.issue}
                                        </p>

                                    </div>


                                    {/* STATUS */}
                                    <div className="text-right">

                                        <span
                                            className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${location.status === "Completed"
                                                ? "bg-green-50 text-green-600"
                                                : location.status === "In Progress"
                                                    ? "bg-orange-50 text-orange-600"
                                                    : "bg-blue-50 text-blue-600"
                                                }`}
                                        >
                                            {location.status}
                                        </span>

                                        <p className="mt-1.5 flex items-center justify-end gap-1 text-[11px] text-slate-400">

                                            <Clock3 size={12} />

                                            {location.time}

                                        </p>

                                    </div>

                                </div>

                            ))

                        ) : (

                            <div className="px-5 py-8 text-center text-sm text-slate-500">
                                No locations found.
                            </div>

                        )}

                    </div>

                </section>

            </main>

        </div>
    );
}

export default StaffLocationView;