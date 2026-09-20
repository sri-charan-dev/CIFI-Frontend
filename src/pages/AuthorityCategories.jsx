import { useMemo, useRef, useState } from "react";
import { issues } from "../data/issues";
import Authoritysidebar from "../components/Authoritysidebar";

import {
    Home,
    Search,
    Bell,
    ChevronDown,
    Plus,
    Tag,
    CheckCircle,
    PauseCircle,
    BarChart3,
    Edit3,
    Trash2,
    AlertTriangle,
    Lightbulb,
    Upload,
    Download,
    FileText,
    X,
    Save,
    Road,
    Lightbulb as StreetLightIcon,
    Droplets,
    Trash,
    Footprints,
    MoreHorizontal,
} from "lucide-react";

import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
} from "recharts";


function AuthorityCategories() {

    // =========================================================
    // CATEGORY DEFINITIONS
    // Based only on existing issues.js categories
    // =========================================================

    const categoryDefinitions = [
        {
            key: "Potholes",
            name: "Pothole / Road Damage",
            description: "Potholes, broken roads, uneven surfaces",
            icon: Road,
            color: "bg-red-50",
            iconColor: "text-red-500",
            iconBg: "bg-red-100",
        },
        {
            key: "Street Lights",
            name: "Street Light",
            description: "Non-functional or damaged street lights",
            icon: StreetLightIcon,
            color: "bg-amber-50",
            iconColor: "text-amber-500",
            iconBg: "bg-amber-100",
        },
        {
            key: "Drainage",
            name: "Drainage / Sewage",
            description: "Drain blockages, sewage leaks, overflow",
            icon: Droplets,
            color: "bg-blue-50",
            iconColor: "text-blue-500",
            iconBg: "bg-blue-100",
        },
        {
            key: "Garbage",
            name: "Garbage / Solid Waste",
            description: "Garbage accumulation and collection issues",
            icon: Trash,
            color: "bg-emerald-50",
            iconColor: "text-emerald-500",
            iconBg: "bg-emerald-100",
        },
        {
            key: "Footpath",
            name: "Footpath / Sidewalk",
            description: "Damaged or obstructed pedestrian paths",
            icon: Footprints,
            color: "bg-violet-50",
            iconColor: "text-violet-500",
            iconBg: "bg-violet-100",
        },
    ];


    // =========================================================
    // STATE
    // =========================================================

    const [categories, setCategories] = useState(
        categoryDefinitions.map((category) => ({
            ...category,
            status: "Active",
        }))
    );

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("All Status");

    const [topSearch, setTopSearch] = useState("");

    const [showModal, setShowModal] = useState(false);

    const [editingCategory, setEditingCategory] = useState(null);

    const [categoryName, setCategoryName] = useState("");

    const [categoryDescription, setCategoryDescription] = useState("");

    const fileInputRef = useRef(null);


    // =========================================================
    // CATEGORY REPORT COUNTS
    // =========================================================

    const categoryReportCount = useMemo(() => {

        const counts = {};

        issues.forEach((issue) => {

            if (!counts[issue.category]) {
                counts[issue.category] = 0;
            }

            counts[issue.category]++;

        });

        return counts;

    }, []);


    // =========================================================
    // SUMMARY
    // =========================================================

    const totalCategories = categories.length;

    const activeCategories = categories.filter(
        (category) => category.status === "Active"
    ).length;

    const inactiveCategories = categories.filter(
        (category) => category.status === "Inactive"
    ).length;

    const totalReports = issues.length;


    // =========================================================
    // FILTERED CATEGORIES
    // =========================================================

    const filteredCategories = useMemo(() => {

        return categories.filter((category) => {

            const searchValue = search.toLowerCase();

            const matchesSearch =
                category.name
                    .toLowerCase()
                    .includes(searchValue) ||
                category.key
                    .toLowerCase()
                    .includes(searchValue) ||
                category.description
                    .toLowerCase()
                    .includes(searchValue);

            const matchesStatus =
                statusFilter === "All Status" ||
                category.status === statusFilter;

            return matchesSearch && matchesStatus;

        });

    }, [categories, search, statusFilter]);


    // =========================================================
    // CATEGORY DISTRIBUTION
    // =========================================================

    const distributionData = useMemo(() => {

        return categories
            .map((category) => ({
                name: category.name,
                value: categoryReportCount[category.key] || 0,
            }))
            .filter((item) => item.value > 0);

    }, [categories, categoryReportCount]);


    const chartColors = [
        "#EF4444",
        "#F59E0B",
        "#3B82F6",
        "#22C55E",
        "#8B5CF6",
    ];


    // =========================================================
    // OPEN ADD MODAL
    // =========================================================

    const openAddModal = () => {

        setEditingCategory(null);

        setCategoryName("");

        setCategoryDescription("");

        setShowModal(true);

    };


    // =========================================================
    // OPEN EDIT MODAL
    // =========================================================

    const openEditModal = (category) => {

        setEditingCategory(category);

        setCategoryName(category.name);

        setCategoryDescription(category.description);

        setShowModal(true);

    };


    // =========================================================
    // SAVE CATEGORY
    // =========================================================

    const saveCategory = () => {

        if (!categoryName.trim()) {
            alert("Please enter a category name.");
            return;
        }


        if (editingCategory) {

            setCategories((previous) =>
                previous.map((category) =>
                    category.key === editingCategory.key
                        ? {
                            ...category,
                            name: categoryName.trim(),
                            description:
                                categoryDescription.trim(),
                        }
                        : category
                )
            );

        } else {

            const newKey = categoryName
                .trim()
                .replace(/\s+/g, " ");

            const newCategory = {
                key: newKey,
                name: categoryName.trim(),
                description:
                    categoryDescription.trim() ||
                    "Infrastructure issue category",
                icon: MoreHorizontal,
                color: "bg-slate-50",
                iconColor: "text-slate-500",
                iconBg: "bg-slate-100",
                status: "Active",
            };

            setCategories((previous) => [
                ...previous,
                newCategory,
            ]);

        }

        setShowModal(false);

        setEditingCategory(null);

        setCategoryName("");

        setCategoryDescription("");

    };


    // =========================================================
    // DELETE CATEGORY
    // =========================================================

    const deleteCategory = (category) => {

        const reportCount =
            categoryReportCount[category.key] || 0;

        if (reportCount > 0) {

            alert(
                `"${category.name}" has ${reportCount} existing report(s). It cannot be deleted while reports are using this category.`
            );

            return;

        }


        const confirmed = window.confirm(
            `Delete "${category.name}"?`
        );

        if (!confirmed) return;


        setCategories((previous) =>
            previous.filter(
                (item) => item.key !== category.key
            )
        );

    };


    // =========================================================
    // TOGGLE STATUS
    // =========================================================

    const toggleStatus = (category) => {

        setCategories((previous) =>
            previous.map((item) =>
                item.key === category.key
                    ? {
                        ...item,
                        status:
                            item.status === "Active"
                                ? "Inactive"
                                : "Active",
                    }
                    : item
            )
        );

    };


    // =========================================================
    // EXPORT CSV
    // =========================================================

    const exportCategories = () => {

        const headers = [
            "Category",
            "Description",
            "Reports",
            "Status",
        ];

        const rows = categories.map((category) => [
            category.name,
            category.description,
            categoryReportCount[category.key] || 0,
            category.status,
        ]);

        const csv = [
            headers,
            ...rows,
        ]
            .map((row) =>
                row
                    .map((value) =>
                        `"${String(value).replace(/"/g, '""')}"`
                    )
                    .join(",")
            )
            .join("\n");


        const blob = new Blob(
            [csv],
            { type: "text/csv;charset=utf-8;" }
        );

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;

        link.download = "cifi-categories.csv";

        link.click();

        URL.revokeObjectURL(url);

    };


    // =========================================================
    // BULK IMPORT
    // =========================================================

    const handleImportClick = () => {

        fileInputRef.current?.click();

    };


    const handleFileImport = (event) => {

        const file = event.target.files?.[0];

        if (!file) return;


        const reader = new FileReader();

        reader.onload = (e) => {

            const text = e.target.result;

            const lines = text
                .split(/\r?\n/)
                .filter(Boolean);

            if (lines.length < 2) {
                alert("The CSV file does not contain category data.");
                return;
            }


            const imported = lines
                .slice(1)
                .map((line) => {

                    const values = line
                        .split(",")
                        .map((value) =>
                            value
                                .trim()
                                .replace(/^"|"$/g, "")
                        );

                    return {
                        key: values[0],
                        name: values[0],
                        description:
                            values[1] ||
                            "Imported infrastructure category",
                        icon: MoreHorizontal,
                        color: "bg-slate-50",
                        iconColor: "text-slate-500",
                        iconBg: "bg-slate-100",
                        status: "Active",
                    };

                })
                .filter(
                    (item) =>
                        item.name &&
                        !categories.some(
                            (category) =>
                                category.name.toLowerCase() ===
                                item.name.toLowerCase()
                        )
                );


            if (imported.length > 0) {

                setCategories((previous) => [
                    ...previous,
                    ...imported,
                ]);

                alert(
                    `${imported.length} category(s) imported successfully.`
                );

            } else {

                alert(
                    "No new categories were found in the file."
                );

            }

        };


        reader.readAsText(file);

        event.target.value = "";

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

                        <span className="text-[#172b4d] font-medium">
                            Manage Categories
                        </span>

                    </div>


                    <div className="flex items-center gap-5">


                        {/* TOP SEARCH */}

                        <div className="relative">

                            <Search
                                size={18}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                value={topSearch}
                                onChange={(e) =>
                                    setTopSearch(e.target.value)
                                }
                                onKeyDown={(e) => {

                                    if (e.key === "Enter") {
                                        setSearch(topSearch);
                                    }

                                }}
                                placeholder="Search categories..."
                                className="w-64 h-10 pl-10 pr-4 rounded-lg border border-gray-200 bg-white text-sm outline-none focus:ring-2 focus:ring-blue-100"
                            />

                        </div>


                        {/* NOTIFICATION */}

                        <button
                            className="relative text-[#315a78] hover:text-blue-600"
                            onClick={() =>
                                alert("No new category notifications.")
                            }
                        >

                            <Bell size={21} />

                            <span className="absolute -right-1 -top-1 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-white" />

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
                    PAGE CONTENT
                ================================================= */}

                <main className="p-6">


                    {/* =================================================
                        PAGE HEADER
                    ================================================= */}

                    <div className="flex items-center justify-between mb-5">

                        <div>

                            <h1 className="text-3xl font-bold text-[#142c47]">
                                Manage Categories
                            </h1>

                            <p className="text-[#38506b] mt-1">
                                Add, edit or manage issue categories to classify infrastructure reports.
                            </p>

                        </div>


                        <button
                            onClick={openAddModal}
                            className="flex items-center gap-2 bg-[#15557d] hover:bg-[#104765] text-white px-5 py-3 rounded-lg font-medium shadow-sm"
                        >

                            <Plus size={19} />

                            Add Category

                        </button>

                    </div>


                    {/* =================================================
                        SUMMARY CARDS
                    ================================================= */}

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-5">


                        {/* TOTAL */}

                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-4">

                            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">

                                <Tag size={27} />

                            </div>

                            <div>

                                <p className="text-2xl font-bold text-[#142c47]">
                                    {totalCategories}
                                </p>

                                <p className="font-medium text-[#142c47]">
                                    Total Categories
                                </p>

                                <p className="text-xs text-gray-500 mt-1">
                                    All issue categories
                                </p>

                            </div>

                        </div>


                        {/* ACTIVE */}

                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-4">

                            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center">

                                <CheckCircle size={27} />

                            </div>

                            <div>

                                <p className="text-2xl font-bold text-[#142c47]">
                                    {activeCategories}
                                </p>

                                <p className="font-medium text-[#142c47]">
                                    Active Categories
                                </p>

                                <p className="text-xs text-gray-500 mt-1">
                                    Currently in use
                                </p>

                            </div>

                        </div>


                        {/* INACTIVE */}

                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-4">

                            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center">

                                <PauseCircle size={27} />

                            </div>

                            <div>

                                <p className="text-2xl font-bold text-[#142c47]">
                                    {inactiveCategories}
                                </p>

                                <p className="font-medium text-[#142c47]">
                                    Inactive Categories
                                </p>

                                <p className="text-xs text-gray-500 mt-1">
                                    Currently not in use
                                </p>

                            </div>

                        </div>


                        {/* REPORTS */}

                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-4">

                            <div className="w-14 h-14 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center">

                                <BarChart3 size={27} />

                            </div>

                            <div>

                                <p className="text-2xl font-bold text-[#142c47]">
                                    {totalReports}
                                </p>

                                <p className="font-medium text-[#142c47]">
                                    Total Reports
                                </p>

                                <p className="text-xs text-gray-500 mt-1">
                                    Across all categories
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        MAIN GRID
                    ================================================= */}

                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">


                        {/* =================================================
                            CATEGORY TABLE
                        ================================================= */}

                        <div className="xl:col-span-9 bg-white rounded-xl border border-gray-100 shadow-sm p-4">


                            {/* TABLE HEADER */}

                            <div className="flex items-center justify-between mb-4">

                                <h2 className="text-xl font-bold text-[#142c47]">
                                    Categories List
                                </h2>


                                <div className="flex items-center gap-3">


                                    {/* SEARCH */}

                                    <div className="relative">

                                        <Search
                                            size={17}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                        />

                                        <input
                                            value={search}
                                            onChange={(e) =>
                                                setSearch(e.target.value)
                                            }
                                            placeholder="Search categories..."
                                            className="w-56 h-9 pl-9 pr-3 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-100"
                                        />

                                    </div>


                                    {/* STATUS */}

                                    <div className="relative">

                                        <select
                                            value={statusFilter}
                                            onChange={(e) =>
                                                setStatusFilter(e.target.value)
                                            }
                                            className="h-9 px-3 pr-8 border border-gray-200 rounded-lg text-sm bg-white outline-none"
                                        >

                                            <option>
                                                All Status
                                            </option>

                                            <option>
                                                Active
                                            </option>

                                            <option>
                                                Inactive
                                            </option>

                                        </select>

                                    </div>

                                </div>

                            </div>


                            {/* TABLE */}

                            <div className="overflow-x-auto">

                                <table className="w-full text-sm">

                                    <thead>

                                        <tr className="bg-[#f7f9fb] text-[#172b4d]">

                                            <th className="text-left px-3 py-3 font-semibold">
                                                #
                                            </th>

                                            <th className="text-left px-3 py-3 font-semibold">
                                                Category
                                            </th>

                                            <th className="text-left px-3 py-3 font-semibold">
                                                Icon
                                            </th>

                                            <th className="text-left px-3 py-3 font-semibold">
                                                Description
                                            </th>

                                            <th className="text-center px-3 py-3 font-semibold">
                                                Reports
                                            </th>

                                            <th className="text-center px-3 py-3 font-semibold">
                                                Status
                                            </th>

                                            <th className="text-center px-3 py-3 font-semibold">
                                                Actions
                                            </th>

                                        </tr>

                                    </thead>


                                    <tbody>

                                        {filteredCategories.map(
                                            (category, index) => {

                                                const Icon =
                                                    category.icon;

                                                const reports =
                                                    categoryReportCount[
                                                    category.key
                                                    ] || 0;

                                                return (

                                                    <tr
                                                        key={category.key}
                                                        className="border-b border-gray-100 hover:bg-gray-50 transition"
                                                    >

                                                        {/* NUMBER */}

                                                        <td className="px-3 py-4 text-gray-700">
                                                            {index + 1}
                                                        </td>


                                                        {/* CATEGORY */}

                                                        <td className="px-3 py-4">

                                                            <div className="flex items-center gap-3">

                                                                <div
                                                                    className={`w-9 h-9 rounded-lg ${category.color} flex items-center justify-center`}
                                                                >

                                                                    <Icon
                                                                        size={19}
                                                                        className={
                                                                            category.iconColor
                                                                        }
                                                                    />

                                                                </div>

                                                                <div>

                                                                    <p className="font-semibold text-[#172b4d]">
                                                                        {
                                                                            category.name
                                                                        }
                                                                    </p>

                                                                </div>

                                                            </div>

                                                        </td>


                                                        {/* ICON */}

                                                        <td className="px-3 py-4">

                                                            <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center">

                                                                <Icon
                                                                    size={18}
                                                                    className="text-slate-600"
                                                                />

                                                            </div>

                                                        </td>


                                                        {/* DESCRIPTION */}

                                                        <td className="px-3 py-4 text-gray-600 max-w-xs">

                                                            {
                                                                category.description
                                                            }

                                                        </td>


                                                        {/* REPORTS */}

                                                        <td className="px-3 py-4 text-center font-medium text-[#172b4d]">

                                                            {reports}

                                                        </td>


                                                        {/* STATUS */}

                                                        <td className="px-3 py-4 text-center">

                                                            <button
                                                                onClick={() =>
                                                                    toggleStatus(
                                                                        category
                                                                    )
                                                                }
                                                                className={`px-3 py-1 rounded-full text-xs font-medium ${category.status ===
                                                                    "Active"
                                                                    ? "bg-emerald-100 text-emerald-700"
                                                                    : "bg-red-100 text-red-600"
                                                                    }`}
                                                            >

                                                                {
                                                                    category.status
                                                                }

                                                            </button>

                                                        </td>


                                                        {/* ACTIONS */}

                                                        <td className="px-3 py-4">

                                                            <div className="flex items-center justify-center gap-2">

                                                                <button
                                                                    onClick={() =>
                                                                        openEditModal(
                                                                            category
                                                                        )
                                                                    }
                                                                    className="px-3 py-2 rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50"
                                                                >

                                                                    Edit

                                                                </button>


                                                                <button
                                                                    onClick={() =>
                                                                        deleteCategory(
                                                                            category
                                                                        )
                                                                    }
                                                                    className="w-9 h-9 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center"
                                                                >

                                                                    <Trash2
                                                                        size={17}
                                                                    />

                                                                </button>

                                                            </div>

                                                        </td>

                                                    </tr>

                                                );

                                            }
                                        )}

                                    </tbody>

                                </table>


                                {/* EMPTY */}

                                {filteredCategories.length === 0 && (

                                    <div className="py-12 text-center text-gray-500">

                                        <Search
                                            size={30}
                                            className="mx-auto mb-2 text-gray-300"
                                        />

                                        No categories found.

                                    </div>

                                )}

                            </div>

                        </div>


                        {/* =================================================
                            RIGHT SIDE
                        ================================================= */}

                        <div className="xl:col-span-3 flex flex-col gap-4">


                            {/* =================================================
                                CATEGORY DISTRIBUTION
                            ================================================= */}

                            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">

                                <h2 className="text-lg font-bold text-[#142c47]">
                                    Category Distribution
                                </h2>


                                <div className="h-56 mt-2">

                                    {distributionData.length > 0 ? (

                                        <ResponsiveContainer
                                            width="100%"
                                            height="100%"
                                        >

                                            <PieChart>

                                                <Pie
                                                    data={
                                                        distributionData
                                                    }
                                                    dataKey="value"
                                                    nameKey="name"
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={48}
                                                    outerRadius={75}
                                                    paddingAngle={2}
                                                >

                                                    {distributionData.map(
                                                        (_, index) => (

                                                            <Cell
                                                                key={index}
                                                                fill={
                                                                    chartColors[
                                                                    index %
                                                                    chartColors.length
                                                                    ]
                                                                }
                                                            />

                                                        )
                                                    )}

                                                </Pie>

                                                <Tooltip />

                                            </PieChart>

                                        </ResponsiveContainer>

                                    ) : (

                                        <div className="h-full flex items-center justify-center text-gray-400">
                                            No report data
                                        </div>

                                    )}

                                </div>


                                {/* LEGEND */}

                                <div className="space-y-2">

                                    {distributionData.map(
                                        (item, index) => {

                                            const percentage =
                                                totalReports > 0
                                                    ? Math.round(
                                                        (item.value /
                                                            totalReports) *
                                                        100
                                                    )
                                                    : 0;

                                            return (

                                                <div
                                                    key={item.name}
                                                    className="flex items-center justify-between text-xs"
                                                >

                                                    <div className="flex items-center gap-2 min-w-0">

                                                        <span
                                                            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                                                            style={{
                                                                backgroundColor:
                                                                    chartColors[
                                                                    index %
                                                                    chartColors.length
                                                                    ],
                                                            }}
                                                        />

                                                        <span className="text-gray-700 truncate">
                                                            {item.name}
                                                        </span>

                                                    </div>

                                                    <span className="font-medium text-[#172b4d]">
                                                        {percentage}%
                                                    </span>

                                                </div>

                                            );

                                        }
                                    )}

                                </div>

                            </div>


                            {/* =================================================
                                QUICK ACTIONS
                            ================================================= */}

                            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">

                                <h2 className="text-lg font-bold text-[#142c47] mb-3">
                                    Quick Actions
                                </h2>


                                {/* ADD */}

                                <button
                                    onClick={openAddModal}
                                    className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 text-left mb-2"
                                >

                                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">

                                        <Plus size={20} />

                                    </div>

                                    <div>

                                        <p className="font-semibold text-[#172b4d]">
                                            Add New Category
                                        </p>

                                        <p className="text-xs text-gray-500">
                                            Create a new issue category
                                        </p>

                                    </div>

                                </button>


                                {/* IMPORT */}

                                <button
                                    onClick={handleImportClick}
                                    className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 text-left mb-2"
                                >

                                    <div className="w-10 h-10 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center">

                                        <Upload size={20} />

                                    </div>

                                    <div>

                                        <p className="font-semibold text-[#172b4d]">
                                            Bulk Import
                                        </p>

                                        <p className="text-xs text-gray-500">
                                            Import categories from CSV
                                        </p>

                                    </div>

                                </button>


                                {/* EXPORT */}

                                <button
                                    onClick={exportCategories}
                                    className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 text-left"
                                >

                                    <div className="w-10 h-10 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center">

                                        <Download size={20} />

                                    </div>

                                    <div>

                                        <p className="font-semibold text-[#172b4d]">
                                            Export Categories
                                        </p>

                                        <p className="text-xs text-gray-500">
                                            Download category data
                                        </p>

                                    </div>

                                </button>


                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept=".csv"
                                    onChange={handleFileImport}
                                    className="hidden"
                                />

                            </div>


                            {/* =================================================
                                NOTE
                            ================================================= */}

                            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">

                                <div className="flex gap-3">

                                    <Lightbulb
                                        size={22}
                                        className="text-blue-600 flex-shrink-0"
                                    />

                                    <div>

                                        <h3 className="font-semibold text-[#173b57]">
                                            Note
                                        </h3>

                                        <p className="text-xs text-[#38506b] mt-1 leading-5">
                                            Categories help classify
                                            infrastructure reports and
                                            route issues to the correct
                                            department.

                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </main>

            </div>


            {/* =========================================================
                ADD / EDIT MODAL
            ========================================================= */}

            {showModal && (

                <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">

                    <div className="bg-white w-full max-w-md rounded-2xl shadow-xl">

                        {/* MODAL HEADER */}

                        <div className="flex items-center justify-between p-5 border-b border-gray-100">

                            <div>

                                <h2 className="text-lg font-bold text-[#142c47]">

                                    {editingCategory
                                        ? "Edit Category"
                                        : "Add Category"}

                                </h2>

                                <p className="text-xs text-gray-500 mt-1">

                                    Manage category information

                                </p>

                            </div>


                            <button
                                onClick={() =>
                                    setShowModal(false)
                                }
                                className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center"
                            >

                                <X size={18} />

                            </button>

                        </div>


                        {/* FORM */}

                        <div className="p-5 space-y-4">


                            <div>

                                <label className="block text-sm font-medium text-[#172b4d] mb-1">
                                    Category Name
                                </label>

                                <input
                                    value={categoryName}
                                    onChange={(e) =>
                                        setCategoryName(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Enter category name"
                                    className="w-full h-11 px-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-100"
                                />

                            </div>


                            <div>

                                <label className="block text-sm font-medium text-[#172b4d] mb-1">
                                    Description
                                </label>

                                <textarea
                                    value={
                                        categoryDescription
                                    }
                                    onChange={(e) =>
                                        setCategoryDescription(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Enter category description"
                                    rows={4}
                                    className="w-full p-3 border border-gray-200 rounded-lg outline-none resize-none focus:ring-2 focus:ring-blue-100"
                                />

                            </div>


                            <div className="flex justify-end gap-3 pt-2">

                                <button
                                    onClick={() =>
                                        setShowModal(false)
                                    }
                                    className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>


                                <button
                                    onClick={saveCategory}
                                    className="px-5 py-2 rounded-lg bg-[#15557d] text-white hover:bg-[#104765] flex items-center gap-2"
                                >

                                    <Save size={17} />

                                    {editingCategory
                                        ? "Save Changes"
                                        : "Add Category"}

                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );
}


export default AuthorityCategories;