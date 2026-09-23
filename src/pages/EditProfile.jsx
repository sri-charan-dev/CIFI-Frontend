import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    User,
    Mail,
    Phone,
    MapPin,
    Camera,
    ArrowLeft,
} from "lucide-react";

import Sidebar from "../components/Sidebar";

function EditProfile() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "Sri Charan",
        email: "charan@gmail.com",
        phone: "+91 XXXXX XXXXX",
        location: "Hyderabad, Telangana",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = () => {
        alert("Profile updated successfully!");
        navigate("/profile");
    };

    return (
        <div className="min-h-screen bg-[#f5f8fb]">

            {/* EXISTING SIDEBAR */}
            <Sidebar />

            {/* MAIN CONTENT */}
            <div className="ml-64">

                {/* TOP HEADER */}
                <header className="h-20 bg-white border-b border-gray-200 flex items-center px-8">
                    <div>
                        <h1 className="text-2xl font-bold text-[#0b2d45]">
                            Edit Profile
                        </h1>

                        <p className="text-sm text-gray-500 mt-1">
                            Update your personal information
                        </p>
                    </div>
                </header>

                {/* CONTENT */}
                <main className="p-8">

                    {/* BACK BUTTON */}
                    <button
                        onClick={() => navigate("/profile")}
                        className="flex items-center gap-2 text-[#17496d] hover:text-[#0b2d45] mb-6 transition"
                    >
                        <ArrowLeft size={18} />
                        Back to Profile
                    </button>

                    {/* EDIT PROFILE CARD */}
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">

                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                                <User
                                    size={21}
                                    className="text-blue-700"
                                />
                            </div>

                            <div>
                                <h2 className="text-lg font-semibold text-gray-800">
                                    Personal Information
                                </h2>

                                <p className="text-sm text-gray-500">
                                    Update your account details
                                </p>
                            </div>
                        </div>

                        {/* PROFILE PHOTO */}
                        <div className="flex items-center gap-5 mb-8">

                            <div className="w-24 h-24 rounded-full bg-[#17496d] flex items-center justify-center">
                                <User
                                    size={42}
                                    className="text-white"
                                />
                            </div>

                            <div>
                                <button
                                    type="button"
                                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                                >
                                    <Camera size={17} />
                                    Change Photo
                                </button>

                                <p className="text-xs text-gray-400 mt-2">
                                    JPG or PNG. Maximum size 2MB.
                                </p>
                            </div>

                        </div>

                        {/* FORM */}
                        <div className="grid grid-cols-2 gap-6">

                            {/* FULL NAME */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name
                                </label>

                                <div className="relative">
                                    <User
                                        size={18}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    />

                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#17496d] focus:ring-1 focus:ring-[#17496d]"
                                    />
                                </div>
                            </div>

                            {/* EMAIL */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>

                                <div className="relative">
                                    <Mail
                                        size={18}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    />

                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        disabled
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 bg-gray-100 text-gray-500 rounded-lg cursor-not-allowed"
                                    />
                                </div>

                                <p className="text-xs text-gray-400 mt-1">
                                    Email address cannot be changed.
                                </p>
                            </div>

                            {/* PHONE */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone Number
                                </label>

                                <div className="relative">
                                    <Phone
                                        size={18}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    />

                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#17496d] focus:ring-1 focus:ring-[#17496d]"
                                    />
                                </div>
                            </div>

                            {/* LOCATION */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Location
                                </label>

                                <div className="relative">
                                    <MapPin
                                        size={18}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    />

                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#17496d] focus:ring-1 focus:ring-[#17496d]"
                                    />
                                </div>
                            </div>

                        </div>

                        {/* BUTTONS */}
                        <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">

                            <button
                                type="button"
                                onClick={() => navigate("/profile")}
                                className="px-5 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={handleSave}
                                className="px-5 py-3 rounded-lg bg-[#17496d] text-white hover:bg-[#0b2d45] transition"
                            >
                                Save Changes
                            </button>

                        </div>

                    </div>

                </main>
            </div>
        </div>
    );
}

export default EditProfile;