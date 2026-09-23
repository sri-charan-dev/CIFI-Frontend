import React from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import {
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Edit3,
    ShieldCheck,
} from "lucide-react";

function Profile() {
    const navigate = useNavigate();

    // Citizen details
    const user = {
        name: "Sri Charan",
        email: "charan@gmail.com",
        phone: "+91 XXXXX XXXXX",
        location: "Hyderabad, Telangana",
        memberSince: "September 2026",
        role: "Citizen",
    };

    return (
        <div className="min-h-screen bg-[#f5f8fb]">

            <Sidebar />

            <div className="ml-64">

                {/* TOP HEADER */}
                <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8">
                    <div>
                        <h1 className="text-2xl font-bold text-[#0b2d45]">
                            Profile
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Manage your personal information
                        </p>
                    </div>
                </header>

                {/* MAIN CONTENT */}
                <main className="p-8">

                    {/* PROFILE HEADER CARD */}
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">

                        <div className="flex items-center justify-between">

                            {/* USER INFO */}
                            <div className="flex items-center gap-6">

                                {/* PROFILE AVATAR */}
                                <div className="w-24 h-24 rounded-full bg-[#17496d] flex items-center justify-center">
                                    <User
                                        size={42}
                                        className="text-white"
                                    />
                                </div>

                                <div>
                                    <div className="flex items-center gap-3">
                                        <h2 className="text-2xl font-bold text-gray-800">
                                            {user.name}
                                        </h2>

                                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                                            {user.role}
                                        </span>
                                    </div>

                                    <p className="text-gray-500 mt-1">
                                        {user.email}
                                    </p>

                                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                                        <MapPin size={16} />
                                        {user.location}
                                    </div>
                                </div>

                            </div>

                            {/* EDIT BUTTON */}
                            <button
                                onClick={() => navigate("/profile/edit")}
                                className="flex items-center gap-2 px-5 py-3 rounded-lg bg-[#17496d] text-white hover:bg-[#0b2d45] transition"
                            >
                                <Edit3 size={18} />
                                Edit Profile
                            </button>

                        </div>
                    </div>

                    {/* BASIC INFORMATION */}
                    <div className="mt-6 bg-white rounded-2xl border border-gray-200 shadow-sm p-8">

                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                                <ShieldCheck
                                    size={21}
                                    className="text-blue-700"
                                />
                            </div>

                            <div>
                                <h2 className="text-lg font-semibold text-gray-800">
                                    Basic Information
                                </h2>

                                <p className="text-sm text-gray-500">
                                    Your personal account information
                                </p>
                            </div>
                        </div>

                        {/* INFORMATION GRID */}
                        <div className="grid grid-cols-2 gap-6">

                            {/* FULL NAME */}
                            <div className="border border-gray-200 rounded-xl p-5">
                                <div className="flex items-center gap-3 mb-2">
                                    <User
                                        size={18}
                                        className="text-[#17496d]"
                                    />
                                    <p className="text-sm text-gray-500">
                                        Full Name
                                    </p>
                                </div>

                                <p className="font-semibold text-gray-800">
                                    {user.name}
                                </p>
                            </div>

                            {/* EMAIL */}
                            <div className="border border-gray-200 rounded-xl p-5">
                                <div className="flex items-center gap-3 mb-2">
                                    <Mail
                                        size={18}
                                        className="text-[#17496d]"
                                    />
                                    <p className="text-sm text-gray-500">
                                        Email Address
                                    </p>
                                </div>

                                <p className="font-semibold text-gray-800">
                                    {user.email}
                                </p>
                            </div>

                            {/* PHONE */}
                            <div className="border border-gray-200 rounded-xl p-5">
                                <div className="flex items-center gap-3 mb-2">
                                    <Phone
                                        size={18}
                                        className="text-[#17496d]"
                                    />
                                    <p className="text-sm text-gray-500">
                                        Phone Number
                                    </p>
                                </div>

                                <p className="font-semibold text-gray-800">
                                    {user.phone}
                                </p>
                            </div>

                            {/* LOCATION */}
                            <div className="border border-gray-200 rounded-xl p-5">
                                <div className="flex items-center gap-3 mb-2">
                                    <MapPin
                                        size={18}
                                        className="text-[#17496d]"
                                    />
                                    <p className="text-sm text-gray-500">
                                        Location
                                    </p>
                                </div>

                                <p className="font-semibold text-gray-800">
                                    {user.location}
                                </p>
                            </div>

                            {/* MEMBER SINCE */}
                            <div className="border border-gray-200 rounded-xl p-5">
                                <div className="flex items-center gap-3 mb-2">
                                    <Calendar
                                        size={18}
                                        className="text-[#17496d]"
                                    />
                                    <p className="text-sm text-gray-500">
                                        Member Since
                                    </p>
                                </div>

                                <p className="font-semibold text-gray-800">
                                    {user.memberSince}
                                </p>
                            </div>

                            {/* ACCOUNT TYPE */}
                            <div className="border border-gray-200 rounded-xl p-5">
                                <div className="flex items-center gap-3 mb-2">
                                    <ShieldCheck
                                        size={18}
                                        className="text-[#17496d]"
                                    />
                                    <p className="text-sm text-gray-500">
                                        Account Type
                                    </p>
                                </div>

                                <p className="font-semibold text-gray-800">
                                    Citizen Account
                                </p>
                            </div>

                        </div>
                    </div>

                </main>
            </div>
        </div>
    );
}

export default Profile;