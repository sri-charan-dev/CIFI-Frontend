import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { notifications } from "../data/notifications";
import {
    CheckCircle,
    Clock,
    Bot,
    UserCheck,
} from "lucide-react";

function Notifications() {
    const [notificationList, setNotificationList] = useState(notifications);
    return (
        <div className="flex bg-[#f4f7fa] min-h-screen">

            <Sidebar />

            <main className="ml-64 flex-1 p-8">

                <div className="flex justify-between items-center">

                    <div>
                        <h1 className="text-3xl font-bold text-[#173b57]">
                            Notifications
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Stay updated with your reported issues.
                        </p>
                    </div>

                    <button
                        onClick={() =>
                            setNotificationList(
                                notificationList.map((items) => ({
                                    ...items,
                                    unread: false,
                                }))
                            )
                        }
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                        Mark all as read
                    </button>

                </div>
                <div className="mt-8 space-y-5">

                    {notificationList.map((notification) => {

                        const getIcon = () => {
                            switch (notification.type) {
                                case "assigned":
                                    return (
                                        <UserCheck className="text-red-500" size={28} />
                                    );

                                case "progress":
                                    return (
                                        <Clock className="text-yellow-500" size={28} />
                                    );

                                case "resolved":
                                    return (
                                        <CheckCircle className="text-green-500" size={28} />
                                    );

                                case "ai":
                                    return (
                                        <Bot className="text-blue-500" size={28} />
                                    );

                                default:
                                    return null;
                            }
                        };

                        return (

                            <div
                                key={notification.id}
                                className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-5 flex justify-between items-start cursor-pointer"
                            >

                                <div className="flex gap-4">

                                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                                        {getIcon()}
                                    </div>

                                    <div>

                                        <h3 className="font-semibold text-lg">
                                            {notification.title}
                                        </h3>

                                        <p className="text-gray-600 mt-1">
                                            {notification.message}
                                        </p>

                                    </div>

                                </div>

                                <div className="text-right">

                                    <p className="text-gray-500 text-sm">
                                        {notification.time}
                                    </p>

                                    {notification.unread && (
                                        <div className="w-3 h-3 bg-blue-600 rounded-full ml-auto mt-4"></div>
                                    )}

                                </div>

                            </div>

                        );

                    })}

                </div>

            </main>

        </div>
    );
}

export default Notifications;