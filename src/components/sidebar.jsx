import { useNavigate } from "react-router-dom";
import {
    Home as HomeIcon,
    PlusCircle,
    Search,
    FileText,
    Settings,
    LogOut,
    BellIcon,
    CircleQuestionMark,
    InfoIcon,
    Mail,
} from "lucide-react";
function Sidebar() {
    const navigate = useNavigate();
    return (
        <aside className="fixed left-0 top-0 w-64 h-screen bg-[#0b2d45] text-white flex flex-col">
            {/* LOGO */}
            <div className="px-6 py-7 border-b border-white/10">
                <h1 className="text-3xl font-bold tracking-wide">CIFI</h1>
                <p className="text-xs text-gray-300 mt-1">
                    Smart City. Better Living..
                </p>
            </div>

            {/* NAVIGATION */}
            <nav className="flex-1 px-4 py-6 space-y-2">
                <button
                    onClick={() => navigate("/home")}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-[#17496d] text-white">
                    <HomeIcon size={20} />
                    <span>Home</span>
                </button>

                <button
                    onClick={() => navigate("/report")}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition">
                    <PlusCircle size={20} />
                    <span>Report Issue</span>
                </button>

                <button onClick={() => navigate("/explore")}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition">
                    <Search size={20} />
                    <span>Explore Issues</span>
                </button>

                <button
                    onClick={() => navigate("/myreports")}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition">
                    <FileText size={20} />
                    <span>My Reports</span>
                </button>

                <button
                    onClick={() => navigate("/notifications")}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition">
                    <BellIcon size={20} />
                    <span>Notifications</span>
                </button>

                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition">
                    <CircleQuestionMark size={20} />
                    <span>How it Works</span>
                </button>

                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition">
                    <InfoIcon size={20} />
                    <span>About Us</span>
                </button>

                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition">
                    <Mail size={20} />
                    <span>Contact Us</span>
                </button>
            </nav>

            {/* BOTTOM NAVIGATION */}
            <div className="px-4 pb-6 space-y-2">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition">
                    <Settings size={20} />
                    <span>Settings</span>
                </button>

                <button
                    onClick={() => {
                        alert("Logged out successfully!");
                        navigate("/");
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-500/20 hover:text-red-300 transition">
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );

}

export default Sidebar;