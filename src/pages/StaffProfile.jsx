import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    User,
    Mail,
    Phone,
    Building2,
    BadgeCheck,
    BriefcaseBusiness,
    ArrowLeft,
    Edit3,
    Save,
    X,
    ShieldCheck,
} from "lucide-react";

function StaffProfile() {
    const navigate = useNavigate();

    const [editing, setEditing] = useState(false);

    const [profile, setProfile] = useState({
        fullName: "Ramesh Kumar",
        staffId: "STF-1024",
        email: "ramesh.kumar@cifi.com",
        phone: "9876543210",
        department: "Roads & Transport",
        designation: "Field Staff",
    });

    const [tempProfile, setTempProfile] = useState(profile);

    const handleEdit = () => {
        setTempProfile(profile);
        setEditing(true);
    };

    const handleCancel = () => {
        setTempProfile(profile);
        setEditing(false);
    };

    const handleSave = () => {
        setProfile(tempProfile);
        setEditing(false);
    };

    const handleChange = (field, value) => {
        setTempProfile({
            ...tempProfile,
            [field]: value,
        });
    };

    return (
        <div className="min-h-screen bg-[#f6f9fc]">

            {/* ================= SIDEBAR ================= */}
            <aside className="fixed left-0 top-0 h-screen w-64 bg-[#0d3550] text-white">

                <div className="border-b border-white/10 px-6 py-8">
                    <h1 className="text-3xl font-bold">
                        CIFI
                    </h1>

                    <p className="mt-1 text-sm text-white/80">
                        Staff Portal
                    </p>
                </div>

                <nav className="px-4 py-6 space-y-2">

                    <button
                        onClick={() => navigate("/staff")}
                        className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left text-white/90 hover:bg-white/10"
                    >
                        <BriefcaseBusiness size={21} />
                        Dashboard
                    </button>

                    <button
                        onClick={() => navigate("/staff/assigned")}
                        className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left text-white/90 hover:bg-white/10"
                    >
                        <BadgeCheck size={21} />
                        Assigned Issues
                    </button>

                    <button
                        onClick={() => navigate("/staff/reports")}
                        className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left text-white/90 hover:bg-white/10"
                    >
                        <ShieldCheck size={21} />
                        My Reports
                    </button>

                    <button
                        onClick={() => navigate("/staff/location")}
                        className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left text-white/90 hover:bg-white/10"
                    >
                        <Building2 size={21} />
                        Location View
                    </button>

                </nav>

                <button
                    onClick={() => navigate("/")}
                    className="absolute bottom-8 left-4 flex w-[calc(100%-32px)] items-center gap-4 rounded-xl px-4 py-3 text-white/90 hover:bg-white/10"
                >
                    Logout
                </button>

            </aside>

            {/* ================= MAIN ================= */}
            <main className="ml-64 min-h-screen">

                {/* TOP BAR */}
                <header className="flex h-[76px] items-center justify-between border-b border-slate-200 bg-white px-8">

                    <div>
                        <h2 className="text-lg font-semibold text-[#0d3550]">
                            Staff Profile
                        </h2>

                        <p className="text-sm text-slate-500">
                            Manage your staff account details
                        </p>
                    </div>

                    {/* BACK */}
                    <button
                        onClick={() => navigate("/staff")}
                        className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
                    >
                        <ArrowLeft size={18} />
                        Back to Dashboard
                    </button>

                </header>

                {/* CONTENT */}
                <section className="p-8">

                    <div className="mx-auto max-w-5xl">

                        {/* PROFILE HEADER */}
                        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

                            <div className="flex items-center justify-between border-b border-slate-200 px-8 py-7">

                                <div className="flex items-center gap-5">

                                    {/* AVATAR */}
                                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#0d3550] text-2xl font-bold text-white">
                                        {profile.fullName
                                            .split(" ")
                                            .map((word) => word[0])
                                            .join("")
                                            .slice(0, 2)
                                            .toUpperCase()}
                                    </div>

                                    <div>
                                        <h1 className="text-2xl font-bold text-[#0d3550]">
                                            {profile.fullName}
                                        </h1>

                                        <p className="mt-1 text-slate-500">
                                            {profile.designation}
                                        </p>

                                        <p className="mt-1 text-sm text-blue-600">
                                            Staff ID: {profile.staffId}
                                        </p>
                                    </div>

                                </div>

                                {/* EDIT BUTTON */}
                                {!editing ? (
                                    <button
                                        onClick={handleEdit}
                                        className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
                                    >
                                        <Edit3 size={18} />
                                        Edit Profile
                                    </button>
                                ) : (
                                    <div className="flex gap-3">

                                        <button
                                            onClick={handleCancel}
                                            className="flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-600 hover:bg-slate-50"
                                        >
                                            <X size={18} />
                                            Cancel
                                        </button>

                                        <button
                                            onClick={handleSave}
                                            className="flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700"
                                        >
                                            <Save size={18} />
                                            Save Changes
                                        </button>

                                    </div>
                                )}

                            </div>

                            {/* PROFILE DETAILS */}
                            <div className="p-8">

                                <h2 className="mb-6 text-lg font-bold text-[#0d3550]">
                                    Personal Information
                                </h2>

                                <div className="grid grid-cols-2 gap-6">

                                    {/* FULL NAME */}
                                    <ProfileField
                                        icon={User}
                                        label="Full Name"
                                        value={
                                            editing
                                                ? tempProfile.fullName
                                                : profile.fullName
                                        }
                                        editing={editing}
                                        onChange={(value) =>
                                            handleChange("fullName", value)
                                        }
                                    />

                                    {/* STAFF ID */}
                                    <ProfileField
                                        icon={BadgeCheck}
                                        label="Staff ID"
                                        value={profile.staffId}
                                        editing={false}
                                    />

                                    {/* EMAIL */}
                                    <ProfileField
                                        icon={Mail}
                                        label="Email Address"
                                        value={
                                            editing
                                                ? tempProfile.email
                                                : profile.email
                                        }
                                        editing={editing}
                                        onChange={(value) =>
                                            handleChange("email", value)
                                        }
                                    />

                                    {/* PHONE */}
                                    <ProfileField
                                        icon={Phone}
                                        label="Phone Number"
                                        value={
                                            editing
                                                ? tempProfile.phone
                                                : profile.phone
                                        }
                                        editing={editing}
                                        onChange={(value) =>
                                            handleChange("phone", value)
                                        }
                                    />

                                    {/* DEPARTMENT */}
                                    <ProfileField
                                        icon={Building2}
                                        label="Department"
                                        value={
                                            editing
                                                ? tempProfile.department
                                                : profile.department
                                        }
                                        editing={editing}
                                        onChange={(value) =>
                                            handleChange("department", value)
                                        }
                                    />

                                    {/* DESIGNATION */}
                                    <ProfileField
                                        icon={BriefcaseBusiness}
                                        label="Designation"
                                        value={
                                            editing
                                                ? tempProfile.designation
                                                : profile.designation
                                        }
                                        editing={editing}
                                        onChange={(value) =>
                                            handleChange("designation", value)
                                        }
                                    />

                                </div>

                            </div>

                        </div>

                        {/* ACCOUNT INFORMATION */}
                        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

                            <h2 className="text-lg font-bold text-[#0d3550]">
                                Account Information
                            </h2>

                            <div className="mt-5 grid grid-cols-3 gap-5">

                                <div className="rounded-xl bg-blue-50 p-5">
                                    <p className="text-sm text-slate-500">
                                        Account Type
                                    </p>

                                    <p className="mt-1 font-bold text-[#0d3550]">
                                        Field Staff
                                    </p>
                                </div>

                                <div className="rounded-xl bg-green-50 p-5">
                                    <p className="text-sm text-slate-500">
                                        Account Status
                                    </p>

                                    <p className="mt-1 font-bold text-green-600">
                                        Active
                                    </p>
                                </div>

                                <div className="rounded-xl bg-orange-50 p-5">
                                    <p className="text-sm text-slate-500">
                                        Department
                                    </p>

                                    <p className="mt-1 font-bold text-[#0d3550]">
                                        {profile.department}
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>

                </section>

            </main>
        </div>
    );
}


/* =========================================================
   PROFILE FIELD
========================================================= */

function ProfileField({
    icon: Icon,
    label,
    value,
    editing,
    onChange,
}) {
    return (
        <div>

            <label className="mb-2 block text-sm font-semibold text-slate-600">
                {label}
            </label>

            <div className="relative">

                <Icon
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                    value={value}
                    disabled={!editing}
                    onChange={(e) => onChange?.(e.target.value)}
                    className={`w-full rounded-xl border py-3 pl-12 pr-4 outline-none ${editing
                        ? "border-blue-300 bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                        : "border-slate-200 bg-slate-50 text-slate-700"
                        }`}
                />

            </div>

        </div>
    );
}

export default StaffProfile;