import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { issues } from "../data/issues";
import Authoritysidebar from "../components/Authoritysidebar";

import {
    Home,
    Search,
    Bell,
    ChevronDown,
    CheckCheck,
    AlertTriangle,
    CheckCircle,
    Clock,
    FileText,
    Trash2,
    Settings,
    X,
} from "lucide-react";


function AuthorityNotifications() {

    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState("All");
    const [search, setSearch] = useState("");
    const [readNotifications, setReadNotifications] = useState([]);


    // =========================================================
    // GENERATE NOTIFICATIONS FROM EXISTING ISSUES
    // =========================================================

    const notifications = useMemo(() => {

        const result = [];

        issues.forEach((issue) => {

            // Critical issue
            if (issue.severity === "Critical") {

                result.push({
                    id: `critical-${issue.id}`,
                    issueId: issue.id,
                    type: "Critical",
                    title: "Critical issue requires attention",
                    message: issue.title,
                    location: issue.location,
                    time: issue.time,
                    icon: AlertTriangle,
                    iconBg: "bg-red-50",
                    iconColor: "text-red-500",
                    unread: true,
                });

            }

            // Resolved issue
            if (issue.status === "Resolved") {

                result.push({
                    id: `resolved-${issue.id}`,
                    issueId: issue.id,
                    type: "Updates",
                    title: "Issue has been resolved",
                    message: issue.title,
                    location: issue.location,
                    time: issue.time,
                    icon: CheckCircle,
                    iconBg: "bg-emerald-50",
                    iconColor: "text-emerald-500",
                    unread: false,
                });

            }

            // In progress
            if (issue.status === "In Progress") {

                result.push({
                    id: `progress-${issue.id}`,
                    issueId: issue.id,
                    type: "Issues",
                    title: "Issue is currently in progress",
                    message: issue.title,
                    location: issue.location,
                    time: issue.time,
                    icon: Clock,
                    iconBg: "bg-amber-50",
                    iconColor: "text-amber-500",
                    unread: true,
                });

            }

            // Reported
            if (issue.status === "Reported") {

                result.push({
                    id: `reported-${issue.id}`,
                    issueId: issue.id,
                    type: "Issues",
                    title: "New infrastructure issue reported",
                    message: issue.title,
                    location: issue.location,
                    time: issue.time,
                    icon: FileText,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                    unread: true,
                });

            }

        });

        return result;

    }, []);


    // =========================================================
    // FILTER
    // =========================================================

    const filteredNotifications = useMemo(() => {

        return notifications.filter((notification) => {

            const matchesTab =
                activeTab === "All" ||
                notification.type === activeTab ||
                (
                    activeTab === "Critical" &&
                    notification.type === "Critical"
                );

            const searchText = search.toLowerCase();

            const matchesSearch =
                notification.title
                    .toLowerCase()
                    .includes(searchText) ||
                notification.message
                    .toLowerCase()
                    .includes(searchText) ||
                notification.location
                    .toLowerCase()
                    .includes(searchText);

            return matchesTab && matchesSearch;

        });

    }, [notifications, activeTab, search]);


    // =========================================================
    // COUNTS
    // =========================================================

    const unreadCount = notifications.filter(
        (notification) =>
            notification.unread &&
            !readNotifications.includes(notification.id)
    ).length;

    const criticalCount = notifications.filter(
        (notification) =>
            notification.type === "Critical"
    ).length;


    // =========================================================
    // MARK AS READ
    // =========================================================

    const markAsRead = (id) => {

        setReadNotifications((previous) => {

            if (previous.includes(id)) {
                return previous;
            }

            return [...previous, id];

        });

    };


    // =========================================================
    // MARK ALL AS READ
    // =========================================================

    const markAllAsRead = () => {

        setReadNotifications(
            notifications.map(
                (notification) => notification.id
            )
        );

    };


    // =========================================================
    // OPEN ISSUE
    // =========================================================

    const openIssue = (issueId, notificationId) => {

        markAsRead(notificationId);

        navigate(`/issue/${issueId}`);

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

            <div className="ml-64 flex-1 min-h-screen">


                {/* =================================================
                    TOP BAR
                ================================================= */}

                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-30">

                    <div className="flex items-center gap-3">

                        <Home
                            size={20}
                            className="text-[#315a78]"
                        />

                        <span className="text-gray-400">
                            /
                        </span>

                        <span className="font-medium text-[#172b4d]">
                            Notifications
                        </span>

                    </div>


                    <div className="flex items-center gap-5">


                        {/* SEARCH */}

                        <div className="relative">

                            <Search
                                size={18}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                placeholder="Search notifications..."
                                className="w-64 h-10 pl-10 pr-4 rounded-lg border border-gray-200 bg-white text-sm outline-none focus:ring-2 focus:ring-blue-100"
                            />

                        </div>


                        {/* BELL */}

                        <button className="relative text-[#315a78]">

                            <Bell size={21} />

                            {unreadCount > 0 && (
                                <span className="absolute -right-1 -top-1 w-3 h-3 rounded-full bg-red-500 border-2 border-white" />
                            )}

                        </button>


                        {/* ADMIN */}

                        <div className="flex items-center gap-3">

                            <div className="w-10 h-10 rounded-full bg-[#1d5d87] text-white flex items-center justify-center font-semibold">
                                A
                            </div>

                            <div className="leading-tight">

                                <p className="font-semibold text-[#172b4d]">
                                    Admin
                                </p>

                                <p className="text-xs text-gray-500">
                                    Authority
                                </p>

                            </div>

                            <ChevronDown
                                size={18}
                                className="text-[#315a78]"
                            />

                        </div>

                    </div>

                </header>


                {/* =================================================
                    CONTENT
                ================================================= */}

                <main className="p-6">


                    {/* =================================================
                        PAGE HEADER
                    ================================================= */}

                    <div className="flex items-center justify-between mb-5">

                        <div>

                            <h1 className="text-3xl font-bold text-[#142c47]">
                                Notifications
                            </h1>

                            <p className="text-[#38506b] mt-1">
                                Stay updated with important infrastructure activities and issue updates.
                            </p>

                        </div>


                        <button
                            onClick={markAllAsRead}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-[#315a78] hover:bg-gray-50 font-medium"
                        >

                            <CheckCheck size={18} />

                            Mark all as read

                        </button>

                    </div>


                    {/* =================================================
                        SUMMARY CARDS
                    ================================================= */}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">


                        {/* ALL */}

                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-4">

                            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">

                                <Bell size={23} />

                            </div>

                            <div>

                                <p className="text-2xl font-bold text-[#142c47]">
                                    {notifications.length}
                                </p>

                                <p className="font-medium text-[#172b4d]">
                                    Total Notifications
                                </p>

                            </div>

                        </div>


                        {/* UNREAD */}

                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-4">

                            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">

                                <Clock size={23} />

                            </div>

                            <div>

                                <p className="text-2xl font-bold text-[#142c47]">
                                    {unreadCount}
                                </p>

                                <p className="font-medium text-[#172b4d]">
                                    Unread
                                </p>

                            </div>

                        </div>


                        {/* CRITICAL */}

                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-4">

                            <div className="w-12 h-12 rounded-xl bg-red-50 text-red-500 flex items-center justify-center">

                                <AlertTriangle size={23} />

                            </div>

                            <div>

                                <p className="text-2xl font-bold text-[#142c47]">
                                    {criticalCount}
                                </p>

                                <p className="font-medium text-[#172b4d]">
                                    Critical Alerts
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        NOTIFICATION PANEL
                    ================================================= */}

                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm">


                        {/* TABS */}

                        <div className="flex items-center justify-between px-5 pt-4 border-b border-gray-100">

                            <div className="flex items-center gap-6">

                                {[
                                    "All",
                                    "Issues",
                                    "Updates",
                                    "Critical",
                                ].map((tab) => (

                                    <button
                                        key={tab}
                                        onClick={() =>
                                            setActiveTab(tab)
                                        }
                                        className={`pb-3 text-sm font-medium border-b-2 transition ${activeTab === tab
                                            ? "text-[#15557d] border-[#15557d]"
                                            : "text-gray-500 border-transparent hover:text-[#15557d]"
                                            }`}
                                    >

                                        {tab}

                                        {tab === "All" && (
                                            <span className="ml-2 text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                                                {notifications.length}
                                            </span>
                                        )}

                                        {tab === "Critical" && (
                                            <span className="ml-2 text-xs bg-red-50 text-red-500 px-2 py-0.5 rounded-full">
                                                {criticalCount}
                                            </span>
                                        )}

                                    </button>

                                ))}

                            </div>

                        </div>


                        {/* NOTIFICATION LIST */}

                        <div className="divide-y divide-gray-100">

                            {filteredNotifications.length > 0 ? (

                                filteredNotifications.map(
                                    (notification) => {

                                        const Icon =
                                            notification.icon;

                                        const isRead =
                                            readNotifications.includes(
                                                notification.id
                                            );

                                        return (

                                            <div
                                                key={notification.id}
                                                onClick={() =>
                                                    openIssue(
                                                        notification.issueId,
                                                        notification.id
                                                    )
                                                }
                                                className={`px-5 py-4 flex items-start gap-4 cursor-pointer hover:bg-gray-50 transition ${!isRead &&
                                                    notification.unread
                                                    ? "bg-blue-50/30"
                                                    : "bg-white"
                                                    }`}
                                            >


                                                {/* ICON */}

                                                <div
                                                    className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${notification.iconBg}`}
                                                >

                                                    <Icon
                                                        size={20}
                                                        className={
                                                            notification.iconColor
                                                        }
                                                    />

                                                </div>


                                                {/* CONTENT */}

                                                <div className="flex-1 min-w-0">

                                                    <div className="flex items-start justify-between gap-4">

                                                        <div>

                                                            <p className="font-semibold text-[#172b4d]">

                                                                {
                                                                    notification.title
                                                                }

                                                            </p>

                                                            <p className="text-sm text-gray-700 mt-1">

                                                                {
                                                                    notification.message
                                                                }

                                                            </p>

                                                            <p className="text-xs text-gray-500 mt-1">

                                                                {
                                                                    notification.location
                                                                }

                                                            </p>

                                                        </div>


                                                        <div className="flex items-center gap-3 flex-shrink-0">

                                                            <span className="text-xs text-gray-400">
                                                                {
                                                                    notification.time
                                                                }
                                                            </span>

                                                            {!isRead &&
                                                                notification.unread && (
                                                                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                                                                )}

                                                        </div>

                                                    </div>

                                                </div>

                                            </div>

                                        );

                                    }
                                )

                            ) : (

                                <div className="py-16 text-center">

                                    <div className="w-14 h-14 rounded-full bg-gray-100 mx-auto flex items-center justify-center">

                                        <Bell
                                            size={25}
                                            className="text-gray-400"
                                        />

                                    </div>

                                    <h3 className="font-semibold text-[#172b4d] mt-4">
                                        No notifications found
                                    </h3>

                                    <p className="text-sm text-gray-500 mt-1">
                                        Try changing your search or filter.
                                    </p>

                                </div>

                            )}

                        </div>

                    </div>

                </main>

            </div>

        </div>
    );
}


export default AuthorityNotifications;