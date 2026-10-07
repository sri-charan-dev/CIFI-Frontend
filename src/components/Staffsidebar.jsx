import { useNavigate } from "react-router-dom";
import {
    Home as HomeIcon,
    FileText,
    MapPin,
    BellIcon,
    LogOut,
} from "lucide-react";

function StaffSidebar() {
    const navigate = useNavigate();

    return (
        <aside className="fixed left-0 top-0 w-64 h-screen bg-[#0b2d45] text-white flex flex-col">

            {/* LOGO */}
            <div className="px-6 py-7 border-b border-white/10">

                <h1 className="text-3xl font-bold tracking-wide">
                    CIFI
                </h1>

                <p className="text-xs text-gray-300 mt-1">
                    Staff Portal
                </p>

            </div>


            {/* NAVIGATION */}
            <nav className="flex-1 px-4 py-6 space-y-2">

                {/* DASHBOARD */}
                <button
                    onClick={() => navigate("/staff")}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition"
                >
                    <HomeIcon size={20} />
                    <span>Dashboard</span>
                </button>


                {/* ASSIGNED ISSUES */}
                <button
                    onClick={() => navigate("/staff/issues")}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition"
                >
                    <FileText size={20} />
                    <span>Assigned Issues</span>
                </button>


                {/* MY REPORTS */}
                <button
                    onClick={() => navigate("/staff/My-reports")}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition"
                >
                    <FileText size={20} />
                    <span>My Reports</span>
                </button>


                {/* LOCATION VIEW */}
                <button
                    onClick={() => navigate("/staff/location-view")}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition"
                >
                    <MapPin size={20} />
                    <span>Location View</span>
                </button>


                {/* NOTIFICATIONS */}
                <button
                    onClick={() => navigate("/staff/notifications")}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition"
                >
                    <BellIcon size={20} />
                    <span>Notifications</span>
                </button>

            </nav>


            {/* BOTTOM NAVIGATION */}
            <div className="px-4 pb-6 space-y-2">

                {/* LOGOUT */}
                <button
                    onClick={() => {
                        alert("Logged out successfully!");
                        navigate("/");
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-500/20 hover:text-red-300 transition"
                >
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>

            </div>

        </aside>
    );
}

export default StaffSidebar;