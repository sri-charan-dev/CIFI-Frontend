import { useNavigate } from "react-router-dom";
import {
    Home as HomeIcon,
    FileText,
    Users,
    Building2,
    BarChart3,
    Tags,
    BellIcon,
    Settings,
    LogOut,
} from "lucide-react";

function AuthoritySidebar() {
    const navigate = useNavigate();

    return (
        <aside className="fixed left-0 top-0 w-64 h-screen bg-[#0b2d45] text-white flex flex-col">

            {/* LOGO */}
            <div className="px-6 py-7 border-b border-white/10">
                <h1 className="text-3xl font-bold tracking-wide">
                    CIFI
                </h1>

                <p className="text-xs text-gray-300 mt-1">
                    Authority Portal
                </p>
            </div>

            {/* NAVIGATION */}
            <nav className="flex-1 px-4 py-6 space-y-2">

                {/* DASHBOARD */}
                <button
                    onClick={() => navigate("/authority")}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-[#17496d] text-white transition"
                >
                    <HomeIcon size={20} />
                    <span>Dashboard</span>
                </button>

                {/* ISSUES */}
                <button
                    onClick={() => navigate("/authority/issues")}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition"
                >
                    <FileText size={20} />
                    <span>Issues</span>
                </button>

                {/* USERS */}
                <button
                    onClick={() => navigate("/authority/users")}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition"
                >
                    <Users size={20} />
                    <span>Users</span>
                </button>

                {/* DEPARTMENTS */}
                <button
                    onClick={() => navigate("/authority/departments")}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition"
                >
                    <Building2 size={20} />
                    <span>Departments</span>
                </button>

                {/* ANALYTICS */}
                <button
                    onClick={() => navigate("/authority/analytics")}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition"
                >
                    <BarChart3 size={20} />
                    <span>Analytics & Reports</span>
                </button>

                {/* CATEGORIES */}
                <button
                    onClick={() => navigate("/authority/categories")}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition"
                >
                    <Tags size={20} />
                    <span>Manage Categories</span>
                </button>

                {/* NOTIFICATIONS */}
                <button
                    onClick={() => navigate("/authority/notifications")}
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

export default AuthoritySidebar;