import { useNavigate } from "react-router-dom";
import React, { useMemo, useState } from "react";
import {
    Search,
    Plus,
    Users,
    UserCheck,
    UserX,
    Clock3,
    MapPin,
    BriefcaseBusiness,
    MoreVertical,
    Eye,
    Pencil,
    X,
    Bell,
} from "lucide-react";
import AuthoritySidebar from "../components/Authoritysidebar";

const initialStaff = [
    {
        id: "EMP001",
        name: "Ravi Kumar",
        department: "Roads & Transport",
        area: "Banjara Hills",
        assignments: 3,
        status: "Available",
        phone: "+91 98765 43210",
        email: "ravikumar@cifi.gov.in",
    },
    {
        id: "EMP002",
        name: "Suresh Reddy",
        department: "Electrical",
        area: "Jubilee Hills",
        assignments: 2,
        status: "Busy",
        phone: "+91 98765 43211",
        email: "suresh@cifi.gov.in",
    },
    {
        id: "EMP003",
        name: "Anil Sharma",
        department: "Drainage",
        area: "Kukatpally",
        assignments: 4,
        status: "Busy",
        phone: "+91 98765 43212",
        email: "anil@cifi.gov.in",
    },
    {
        id: "EMP004",
        name: "Kiran Naik",
        department: "Roads & Transport",
        area: "Ameerpet",
        assignments: 1,
        status: "Available",
        phone: "+91 98765 43213",
        email: "kiran@cifi.gov.in",
    },
    {
        id: "EMP005",
        name: "Mahesh",
        department: "Water Supply",
        area: "Madhapur",
        assignments: 2,
        status: "On Leave",
        phone: "+91 98765 43214",
        email: "mahesh@cifi.gov.in",
    },
    {
        id: "EMP006",
        name: "Venkatesh",
        department: "Sanitation",
        area: "Gachibowli",
        assignments: 1,
        status: "Available",
        phone: "+91 98765 43215",
        email: "venkatesh@cifi.gov.in",
    },
];

const departments = [
    "Roads & Transport",
    "Electrical",
    "Drainage",
    "Water Supply",
    "Sanitation",
];

const areas = [
    "Banjara Hills",
    "Jubilee Hills",
    "Kukatpally",
    "Ameerpet",
    "Madhapur",
    "Gachibowli",
];

const emptyForm = {
    name: "",
    department: "",
    area: "",
    phone: "",
    email: "",
    status: "Available",
};

function StatusBadge({ status }) {
    const styles = {
        Available: "bg-emerald-50 text-emerald-600",
        Busy: "bg-orange-50 text-orange-600",
        "On Leave": "bg-red-50 text-red-600",
    };

    return (
        <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${styles[status] || "bg-slate-100 text-slate-600"
                }`}
        >
            {status}
        </span>
    );
}

function StatCard({ icon, title, value, iconBg, iconColor }) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-4">
                <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${iconBg} ${iconColor}`}
                >
                    {icon}
                </div>

                <div>
                    <p className="text-sm text-slate-500">{title}</p>
                    <p className="mt-1 text-2xl font-bold text-[#123B5D]">{value}</p>
                </div>
            </div>
        </div>
    );
}

function InfoBox({ icon, label, value }) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="mb-2 flex items-center gap-2 text-slate-400">
                {icon}
                <span className="text-xs">{label}</span>
            </div>

            <p className="text-sm font-semibold text-[#123B5D]">{value}</p>
        </div>
    );
}

export default function AuthorityStaff() {
    const navigate = useNavigate();
    const [staff, setStaff] = useState(initialStaff);

    const [search, setSearch] = useState("");
    const [departmentFilter, setDepartmentFilter] =
        useState("All Departments");
    const [areaFilter, setAreaFilter] = useState("All Areas");
    const [statusFilter, setStatusFilter] = useState("All Status");

    const [showAddModal, setShowAddModal] = useState(false);
    const [showProfile, setShowProfile] = useState(null);

    const [form, setForm] = useState(emptyForm);

    const filteredStaff = useMemo(() => {
        return staff.filter((person) => {
            const searchText = search.toLowerCase();

            const matchesSearch =
                person.name.toLowerCase().includes(searchText) ||
                person.id.toLowerCase().includes(searchText) ||
                person.department.toLowerCase().includes(searchText) ||
                person.area.toLowerCase().includes(searchText);

            const matchesDepartment =
                departmentFilter === "All Departments" ||
                person.department === departmentFilter;

            const matchesArea =
                areaFilter === "All Areas" || person.area === areaFilter;

            const matchesStatus =
                statusFilter === "All Status" || person.status === statusFilter;

            return (
                matchesSearch &&
                matchesDepartment &&
                matchesArea &&
                matchesStatus
            );
        });
    }, [staff, search, departmentFilter, areaFilter, statusFilter]);

    const totalStaff = staff.length;

    const availableStaff = staff.filter(
        (person) => person.status === "Available"
    ).length;

    const busyStaff = staff.filter(
        (person) => person.status === "Busy"
    ).length;

    const leaveStaff = staff.filter(
        (person) => person.status === "On Leave"
    ).length;

    const handleAddStaff = (e) => {
        e.preventDefault();

        if (!form.name || !form.department || !form.area) {
            alert("Please fill Name, Department and Area.");
            return;
        }

        const newStaff = {
            ...form,
            id: `EMP${String(staff.length + 1).padStart(3, "0")}`,
            assignments: 0,
        };

        setStaff((prev) => [...prev, newStaff]);

        setForm(emptyForm);
        setShowAddModal(false);
    };

    return (
        <div className="min-h-screen bg-[#F2F7FB]">

            {/* Existing CIFI Sidebar */}
            <AuthoritySidebar />

            {/* Main Content */}
            <main className="ml-64 min-h-screen">

                {/* Top Header */}
                <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-slate-200 bg-white px-7">

                    {/* Search */}
                    <div className="relative w-[440px]">
                        <Search
                            size={19}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                            type="text"
                            placeholder="Search staff by name, department or area..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="h-11 w-full rounded-xl border border-slate-200 bg-[#F8FAFC] pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-[#174F73] focus:bg-white"
                        />
                    </div>

                    {/* Right Header */}
                    <div className="flex items-center gap-6">

                        <div
                            className="relative cursor-pointer"
                            onClick={() => navigate("/authority/notifications")}
                        >
                            <span className="absolute -right-1 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
                                3
                            </span>

                            <Bell
                                size={25}
                                strokeWidth={2}
                                className="text-[#174F73]"
                            />
                        </div>

                        <div
                            onClick={() => navigate("/authority/profile")}
                            className="flex cursor-pointer items-center gap-3 rounded-xl p-2 transition hover:bg-slate-50"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#174F73] text-sm font-semibold text-white">
                                A
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-[#173F5F]">
                                    Admin
                                </p>

                                <p className="text-xs text-slate-500">
                                    Municipal Authority
                                </p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <section className="p-7">

                    {/* Heading */}
                    <div className="mb-6 flex items-center justify-between">

                        <div>
                            <h1 className="text-[30px] font-bold text-[#123B5D]">
                                Staff Management
                            </h1>

                            <p className="mt-1 text-[15px] text-slate-500">
                                Manage staff members, departments and work assignments.
                            </p>
                        </div>

                        <button
                            onClick={() => setShowAddModal(true)}
                            className="flex items-center gap-2 rounded-xl bg-[#174F73] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#123E5B]"
                        >
                            <Plus size={18} />
                            Add Staff
                        </button>
                    </div>

                    {/* Statistics */}
                    <div className="mb-6 grid grid-cols-4 gap-5">

                        <StatCard
                            icon={<Users size={22} />}
                            title="Total Staff"
                            value={totalStaff}
                            iconBg="bg-blue-50"
                            iconColor="text-blue-600"
                        />

                        <StatCard
                            icon={<UserCheck size={22} />}
                            title="Available"
                            value={availableStaff}
                            iconBg="bg-emerald-50"
                            iconColor="text-emerald-500"
                        />

                        <StatCard
                            icon={<Clock3 size={22} />}
                            title="Busy"
                            value={busyStaff}
                            iconBg="bg-orange-50"
                            iconColor="text-orange-500"
                        />

                        <StatCard
                            icon={<UserX size={22} />}
                            title="On Leave"
                            value={leaveStaff}
                            iconBg="bg-red-50"
                            iconColor="text-red-500"
                        />
                    </div>

                    {/* Filters */}
                    <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

                        <div className="flex items-center gap-3">

                            <select
                                value={departmentFilter}
                                onChange={(e) =>
                                    setDepartmentFilter(e.target.value)
                                }
                                className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-600 outline-none focus:border-[#174F73]"
                            >
                                <option>All Departments</option>

                                {departments.map((department) => (
                                    <option key={department}>{department}</option>
                                ))}
                            </select>

                            <select
                                value={areaFilter}
                                onChange={(e) =>
                                    setAreaFilter(e.target.value)
                                }
                                className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-600 outline-none focus:border-[#174F73]"
                            >
                                <option>All Areas</option>

                                {areas.map((area) => (
                                    <option key={area}>{area}</option>
                                ))}
                            </select>

                            <select
                                value={statusFilter}
                                onChange={(e) =>
                                    setStatusFilter(e.target.value)
                                }
                                className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-600 outline-none focus:border-[#174F73]"
                            >
                                <option>All Status</option>
                                <option>Available</option>
                                <option>Busy</option>
                                <option>On Leave</option>
                            </select>

                            <div className="relative ml-auto w-[270px]">
                                <Search
                                    size={17}
                                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search staff..."
                                    className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-sm outline-none focus:border-[#174F73]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Staff Table */}
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                        <div className="overflow-x-auto">

                            <table className="w-full">

                                <thead className="border-b border-slate-200 bg-[#F8FAFC]">

                                    <tr className="text-left text-xs font-semibold text-[#315875]">

                                        <th className="px-6 py-4">#</th>

                                        <th className="px-6 py-4">
                                            Staff Name
                                        </th>

                                        <th className="px-6 py-4">
                                            Department
                                        </th>

                                        <th className="px-6 py-4">
                                            Assigned Area
                                        </th>

                                        <th className="px-6 py-4">
                                            Current Assignments
                                        </th>

                                        <th className="px-6 py-4">
                                            Status
                                        </th>

                                        <th className="px-6 py-4 text-right">
                                            Actions
                                        </th>

                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-100">

                                    {filteredStaff.map((person, index) => (

                                        <tr
                                            key={person.id}
                                            className="transition hover:bg-[#F8FBFD]"
                                        >

                                            <td className="px-6 py-5 text-sm text-slate-500">
                                                {index + 1}
                                            </td>

                                            {/* Staff */}
                                            <td className="px-6 py-5">

                                                <div className="flex items-center gap-3">

                                                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E4EEFF] text-sm font-bold text-blue-600">
                                                        {person.name.charAt(0)}
                                                    </div>

                                                    <div>
                                                        <p className="text-sm font-semibold text-[#123B5D]">
                                                            {person.name}
                                                        </p>

                                                        <p className="mt-0.5 text-xs text-slate-400">
                                                            {person.id}
                                                        </p>
                                                    </div>

                                                </div>
                                            </td>

                                            {/* Department */}
                                            <td className="px-6 py-5 text-sm text-[#315875]">
                                                {person.department}
                                            </td>

                                            {/* Area */}
                                            <td className="px-6 py-5">

                                                <div className="flex items-center gap-2 text-sm text-[#315875]">

                                                    <MapPin
                                                        size={15}
                                                        className="text-[#7290A6]"
                                                    />

                                                    {person.area}

                                                </div>

                                            </td>

                                            {/* Assignments */}
                                            <td className="px-6 py-5 text-sm font-semibold text-[#173F5F]">
                                                {person.assignments}
                                            </td>

                                            {/* Status */}
                                            <td className="px-6 py-5">
                                                <StatusBadge status={person.status} />
                                            </td>

                                            {/* Actions */}
                                            <td className="px-6 py-5">

                                                <div className="flex items-center justify-end gap-2">

                                                    <button
                                                        onClick={() =>
                                                            setShowProfile(person)
                                                        }
                                                        className="flex items-center gap-1.5 rounded-lg bg-[#EEF5FF] px-3.5 py-2 text-xs font-semibold text-blue-600 transition hover:bg-[#E3EFFF]"
                                                    >
                                                        <Eye size={14} />
                                                        View
                                                    </button>

                                                    <button
                                                        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-[#174F73]"
                                                    >
                                                        <MoreVertical size={17} />
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>
                                    ))}

                                    {filteredStaff.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan="7"
                                                className="px-6 py-14 text-center text-sm text-slate-500"
                                            >
                                                No staff members found.
                                            </td>
                                        </tr>
                                    )}

                                </tbody>
                            </table>

                        </div>
                    </div>

                </section>
            </main>

            {/* ================= ADD STAFF MODAL ================= */}

            {showAddModal && (

                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#092A40]/40 p-4">

                    <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">

                        {/* Modal Header */}
                        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

                            <div>
                                <h2 className="text-lg font-bold text-[#123B5D]">
                                    Add New Staff
                                </h2>

                                <p className="mt-1 text-xs text-slate-500">
                                    Add a staff member and assign their department.
                                </p>
                            </div>

                            <button
                                onClick={() => setShowAddModal(false)}
                                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
                            >
                                <X size={19} />
                            </button>

                        </div>

                        {/* Form */}
                        <form
                            onSubmit={handleAddStaff}
                            className="space-y-4 p-6"
                        >

                            {/* Name */}
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-[#315875]">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            name: e.target.value,
                                        })
                                    }
                                    placeholder="Enter staff name"
                                    className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-[#174F73]"
                                />
                            </div>

                            {/* Department + Area */}
                            <div className="grid grid-cols-2 gap-4">

                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-[#315875]">
                                        Department
                                    </label>

                                    <select
                                        value={form.department}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                department: e.target.value,
                                            })
                                        }
                                        className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-[#174F73]"
                                    >
                                        <option value="">
                                            Select department
                                        </option>

                                        {departments.map((department) => (
                                            <option key={department}>
                                                {department}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-[#315875]">
                                        Assigned Area
                                    </label>

                                    <select
                                        value={form.area}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                area: e.target.value,
                                            })
                                        }
                                        className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-[#174F73]"
                                    >
                                        <option value="">
                                            Select area
                                        </option>

                                        {areas.map((area) => (
                                            <option key={area}>
                                                {area}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                            </div>

                            {/* Phone + Email */}
                            <div className="grid grid-cols-2 gap-4">

                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-[#315875]">
                                        Phone Number
                                    </label>

                                    <input
                                        type="text"
                                        value={form.phone}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                phone: e.target.value,
                                            })
                                        }
                                        placeholder="+91 XXXXX XXXXX"
                                        className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-[#174F73]"
                                    />
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-[#315875]">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        value={form.email}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                email: e.target.value,
                                            })
                                        }
                                        placeholder="staff@cifi.gov.in"
                                        className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-[#174F73]"
                                    />
                                </div>

                            </div>

                            {/* Status */}
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-[#315875]">
                                    Status
                                </label>

                                <select
                                    value={form.status}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            status: e.target.value,
                                        })
                                    }
                                    className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-[#174F73]"
                                >
                                    <option>Available</option>
                                    <option>Busy</option>
                                    <option>On Leave</option>
                                </select>
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">

                                <button
                                    type="button"
                                    onClick={() => setShowAddModal(false)}
                                    className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="flex items-center gap-2 rounded-xl bg-[#174F73] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#123E5B]"
                                >
                                    <Plus size={17} />
                                    Add Staff
                                </button>

                            </div>

                        </form>
                    </div>
                </div>
            )}

            {/* ================= STAFF PROFILE MODAL ================= */}

            {showProfile && (

                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#092A40]/40 p-4">

                    <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">

                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

                            <div>
                                <p className="text-xs font-semibold tracking-wide text-[#7290A6]">
                                    STAFF PROFILE
                                </p>

                                <h2 className="mt-1 text-xl font-bold text-[#123B5D]">
                                    {showProfile.name}
                                </h2>
                            </div>

                            <button
                                onClick={() => setShowProfile(null)}
                                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
                            >
                                <X size={19} />
                            </button>

                        </div>

                        <div className="p-6">

                            {/* Profile Top */}
                            <div className="flex items-center gap-5 rounded-2xl bg-[#F3F8FC] p-5">

                                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#E2EEFF] text-2xl font-bold text-blue-600">
                                    {showProfile.name.charAt(0)}
                                </div>

                                <div className="flex-1">

                                    <h3 className="text-lg font-bold text-[#123B5D]">
                                        {showProfile.name}
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-500">
                                        {showProfile.id}
                                    </p>

                                    <div className="mt-2">
                                        <StatusBadge status={showProfile.status} />
                                    </div>

                                </div>

                                <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-[#315875] hover:bg-slate-50">
                                    <Pencil size={15} />
                                    Edit
                                </button>

                            </div>

                            {/* Information */}
                            <div className="mt-5 grid grid-cols-2 gap-4">

                                <InfoBox
                                    icon={<BriefcaseBusiness size={18} />}
                                    label="Department"
                                    value={showProfile.department}
                                />

                                <InfoBox
                                    icon={<MapPin size={18} />}
                                    label="Assigned Area"
                                    value={showProfile.area}
                                />

                                <InfoBox
                                    label="Phone"
                                    value={
                                        showProfile.phone || "Not provided"
                                    }
                                />

                                <InfoBox
                                    label="Email"
                                    value={
                                        showProfile.email || "Not provided"
                                    }
                                />

                                <InfoBox
                                    label="Current Assignments"
                                    value={showProfile.assignments}
                                />

                                <InfoBox
                                    label="Employee ID"
                                    value={showProfile.id}
                                />

                            </div>

                            {/* Close */}
                            <div className="mt-5 flex justify-end">

                                <button
                                    onClick={() => setShowProfile(null)}
                                    className="rounded-xl bg-[#174F73] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#123E5B]"
                                >
                                    Close
                                </button>

                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}