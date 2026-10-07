import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    Edit3,
    Save,
    Mail,
    Phone,
    Shield,
    Building2,
    User,
    Bell,
} from "lucide-react";
import AuthoritySidebar from "../components/Authoritysidebar";

export default function AuthorityProfile() {
    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false);

    const [profile, setProfile] = useState({
        name: "Admin",
        email: "admin@cifi.gov.in",
        phone: "+91 98765 43210",
        role: "Administrator",
        department: "Municipal Authority",
    });

    const handleChange = (field, value) => {
        setProfile((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSave = () => {
        setIsEditing(false);
    };

    return (
        <div className="min-h-screen bg-[#F2F7FB]">

            {/* ================= SIDEBAR ================= */}
            <AuthoritySidebar />


            {/* ================= MAIN CONTENT ================= */}
            <main className="ml-64 min-h-screen">

                {/* ================= TOP HEADER ================= */}
                <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-slate-200 bg-white px-7">

                    {/* Left side */}
                    <div className="flex items-center gap-3">

                        <button
                            onClick={() => navigate("/authority")}
                            className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-[#174F73]"
                        >
                            <ArrowLeft size={18} />
                            Back to Dashboard
                        </button>

                    </div>


                    {/* Right side */}
                    <div className="flex items-center gap-6">

                        {/* ================= NOTIFICATION ================= */}
                        <div
                            className="relative cursor-pointer"
                            onClick={() =>
                                navigate("/authority/notifications")
                            }
                        >

                            {/* Notification Count */}
                            <span className="absolute -right-1 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
                                3
                            </span>

                            <Bell
                                size={25}
                                strokeWidth={2}
                                className="text-[#174F73]"
                            />

                        </div>


                        {/* ================= ADMIN PROFILE ================= */}
                        <div
                            onClick={() => navigate("/authority/profile")}
                            className="flex cursor-pointer items-center gap-3 rounded-xl p-1.5 transition hover:bg-slate-50"
                        >

                            {/* Circle Avatar */}
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#174F73] text-sm font-semibold text-white">
                                A
                            </div>


                            {/* Admin Details */}
                            <div className="leading-tight">

                                <p className="text-sm font-semibold text-[#173F5F]">
                                    Admin
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                    Municipal Authority
                                </p>

                            </div>

                        </div>

                    </div>

                </header>


                {/* ================= PAGE CONTENT ================= */}
                <section className="p-7">

                    {/* ================= PAGE HEADING ================= */}
                    <div className="mb-6">

                        <h1 className="text-[30px] font-bold text-[#123B5D]">
                            Admin Profile
                        </h1>

                        <p className="mt-1 text-[15px] text-slate-500">
                            View and manage your authority account information.
                        </p>

                    </div>


                    {/* ================= PROFILE CARD ================= */}
                    <div className="w-full max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">


                        {/* ================= PROFILE TOP ================= */}
                        <div className="flex items-center justify-between border-b border-slate-200 px-7 py-6">

                            {/* Left */}
                            <div className="flex items-center gap-5">

                                {/* Big Avatar */}
                                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#174F73] text-2xl font-bold text-white">
                                    {profile.name.charAt(0).toUpperCase()}
                                </div>


                                {/* Name */}
                                <div>

                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={profile.name}
                                            onChange={(e) =>
                                                handleChange(
                                                    "name",
                                                    e.target.value
                                                )
                                            }
                                            className="h-11 w-64 rounded-lg border border-slate-300 px-3 text-lg font-semibold text-[#123B5D] outline-none focus:border-[#174F73]"
                                        />
                                    ) : (
                                        <h2 className="text-xl font-bold text-[#123B5D]">
                                            {profile.name}
                                        </h2>
                                    )}

                                    <p className="mt-1 text-sm text-slate-500">
                                        {profile.role}
                                    </p>

                                </div>

                            </div>


                            {/* Edit / Save */}
                            {!isEditing ? (

                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="flex items-center gap-2 rounded-lg bg-[#17496d] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0b2d45]"
                                >
                                    <Edit3 size={18} />
                                    Edit Profile
                                </button>

                            ) : (

                                <div className="flex items-center gap-3">

                                    <button
                                        onClick={() => setIsEditing(false)}
                                        className="rounded-lg border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        onClick={handleSave}
                                        className="flex items-center gap-2 rounded-lg bg-[#17496d] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0b2d45]"
                                    >
                                        <Save size={18} />
                                        Save Changes
                                    </button>

                                </div>

                            )}

                        </div>


                        {/* ================= PERSONAL INFORMATION ================= */}
                        <div className="p-7">

                            <div className="mb-6">

                                <h3 className="text-lg font-bold text-[#123B5D]">
                                    Personal Information
                                </h3>

                                <p className="mt-1 text-sm text-slate-500">
                                    Your authority account details.
                                </p>

                            </div>


                            <div className="grid grid-cols-2 gap-5">


                                {/* ================= FULL NAME ================= */}
                                <div className="rounded-xl border border-slate-200 p-5">

                                    <div className="flex items-center gap-2 text-slate-400">

                                        <User size={18} />

                                        <span className="text-xs font-medium">
                                            Full Name
                                        </span>

                                    </div>


                                    {isEditing ? (

                                        <input
                                            type="text"
                                            value={profile.name}
                                            onChange={(e) =>
                                                handleChange(
                                                    "name",
                                                    e.target.value
                                                )
                                            }
                                            className="mt-3 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm text-[#123B5D] outline-none focus:border-[#174F73]"
                                        />

                                    ) : (

                                        <p className="mt-3 text-sm font-semibold text-[#123B5D]">
                                            {profile.name}
                                        </p>

                                    )}

                                </div>


                                {/* ================= EMAIL ================= */}
                                <div className="rounded-xl border border-slate-200 p-5">

                                    <div className="flex items-center gap-2 text-slate-400">

                                        <Mail size={18} />

                                        <span className="text-xs font-medium">
                                            Email Address
                                        </span>

                                    </div>


                                    {isEditing ? (

                                        <input
                                            type="email"
                                            value={profile.email}
                                            onChange={(e) =>
                                                handleChange(
                                                    "email",
                                                    e.target.value
                                                )
                                            }
                                            className="mt-3 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm text-[#123B5D] outline-none focus:border-[#174F73]"
                                        />

                                    ) : (

                                        <p className="mt-3 text-sm font-semibold text-[#123B5D]">
                                            {profile.email}
                                        </p>

                                    )}

                                </div>


                                {/* ================= PHONE ================= */}
                                <div className="rounded-xl border border-slate-200 p-5">

                                    <div className="flex items-center gap-2 text-slate-400">

                                        <Phone size={18} />

                                        <span className="text-xs font-medium">
                                            Phone Number
                                        </span>

                                    </div>


                                    {isEditing ? (

                                        <input
                                            type="text"
                                            value={profile.phone}
                                            onChange={(e) =>
                                                handleChange(
                                                    "phone",
                                                    e.target.value
                                                )
                                            }
                                            className="mt-3 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm text-[#123B5D] outline-none focus:border-[#174F73]"
                                        />

                                    ) : (

                                        <p className="mt-3 text-sm font-semibold text-[#123B5D]">
                                            {profile.phone}
                                        </p>

                                    )}

                                </div>


                                {/* ================= ROLE ================= */}
                                <div className="rounded-xl border border-slate-200 p-5">

                                    <div className="flex items-center gap-2 text-slate-400">

                                        <Shield size={18} />

                                        <span className="text-xs font-medium">
                                            Role
                                        </span>

                                    </div>


                                    {isEditing ? (

                                        <input
                                            type="text"
                                            value={profile.role}
                                            onChange={(e) =>
                                                handleChange(
                                                    "role",
                                                    e.target.value
                                                )
                                            }
                                            className="mt-3 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm text-[#123B5D] outline-none focus:border-[#174F73]"
                                        />

                                    ) : (

                                        <p className="mt-3 text-sm font-semibold text-[#123B5D]">
                                            {profile.role}
                                        </p>

                                    )}

                                </div>


                                {/* ================= DEPARTMENT ================= */}
                                <div className="rounded-xl border border-slate-200 p-5">

                                    <div className="flex items-center gap-2 text-slate-400">

                                        <Building2 size={18} />

                                        <span className="text-xs font-medium">
                                            Department
                                        </span>

                                    </div>


                                    {isEditing ? (

                                        <input
                                            type="text"
                                            value={profile.department}
                                            onChange={(e) =>
                                                handleChange(
                                                    "department",
                                                    e.target.value
                                                )
                                            }
                                            className="mt-3 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm text-[#123B5D] outline-none focus:border-[#174F73]"
                                        />

                                    ) : (

                                        <p className="mt-3 text-sm font-semibold text-[#123B5D]">
                                            {profile.department}
                                        </p>

                                    )}

                                </div>

                            </div>


                            {/* ================= BOTTOM SAVE ================= */}
                            {isEditing && (

                                <div className="mt-6 flex justify-end border-t border-slate-200 pt-5">

                                    <button
                                        onClick={handleSave}
                                        className="flex items-center gap-2 rounded-lg bg-[#17496d] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0b2d45]"
                                    >
                                        <Save size={18} />
                                        Save Changes
                                    </button>

                                </div>

                            )}

                        </div>

                    </div>

                </section>

            </main>

        </div>
    );
}