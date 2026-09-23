import React from "react";
import cifiCity from "../assets/cifi-city.png";
import Sidebar from "../components/Sidebar";
import {
    Info,
    Target,
    Eye,
    Users,
    CheckCircle,
    FileText,
    Building2,
    Leaf,
} from "lucide-react";

function AboutUs() {
    return (
        <div className="min-h-screen bg-[#f5f8fb]">

            {/* EXISTING SIDEBAR */}
            <Sidebar />

            {/* MAIN CONTENT */}
            <div className="ml-64">

                <main className="px-8 py-10">

                    {/* PAGE TITLE */}
                    <div className="text-center mb-8">

                        <h1 className="text-4xl font-bold text-[#0b2d45] mt-4">
                            About <span className="text-blue-700">Us</span>
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Building smarter cities through citizen participation
                            and intelligent technology.
                        </p>

                    </div>

                    {/* INTRODUCTION */}
                    <div className="grid grid-cols-2 gap-6 items-stretch mb-6">

                        {/* TEXT CARD */}
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">

                            <h2 className="text-3xl font-bold text-[#0b2d45] leading-tight">
                                A Cleaner, Safer
                                <br />
                                and Better City
                            </h2>

                            <p className="text-gray-600 leading-relaxed mt-5">
                                CIFI (Community Infrastructure Failure Intelligence
                                Platform) is a citizen-driven platform that helps
                                report, track and resolve infrastructure issues
                                in our cities.
                            </p>

                            <p className="text-gray-600 leading-relaxed mt-3">
                                We combine community participation with intelligent
                                technology to make infrastructure management faster,
                                smarter and more efficient.
                            </p>

                            {/* QUOTE */}
                            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">

                                <p className="text-blue-700 font-medium italic">
                                    "Better cities are built when citizens and
                                    authorities work together."
                                </p>

                            </div>

                        </div>

                        {/* CITY VISUAL */}
                        <div className="relative rounded-2xl border border-blue-200 overflow-hidden bg-blue-50 h-full min-h-[300px]">

                            <img
                                src={cifiCity}
                                alt="CIFI Smart City"
                                className="absolute inset-0 w-full h-full object-cover" />

                            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-blue-50/30 to-transparent pointer-events-none"></div>
                        </div>

                    </div>

                    {/* MISSION / VISION / VALUES */}
                    <div className="grid grid-cols-3 gap-5 mb-6">

                        {/* MISSION */}
                        <div className="bg-green-50 border border-green-200 rounded-2xl p-6">

                            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                                <Target
                                    size={25}
                                    className="text-green-700"
                                />
                            </div>

                            <h3 className="text-xl font-bold text-[#0b2d45]">
                                Our Mission
                            </h3>

                            <p className="text-gray-600 text-sm leading-relaxed mt-3">
                                To empower citizens to report infrastructure
                                issues and enable a faster, transparent and
                                efficient resolution process.
                            </p>

                        </div>

                        {/* VISION */}
                        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">

                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                                <Eye
                                    size={25}
                                    className="text-blue-700"
                                />
                            </div>

                            <h3 className="text-xl font-bold text-[#0b2d45]">
                                Our Vision
                            </h3>

                            <p className="text-gray-600 text-sm leading-relaxed mt-3">
                                To create cleaner, safer and smarter cities
                                where every citizen's voice can lead to
                                visible change.
                            </p>

                        </div>

                        {/* VALUES */}
                        <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6">

                            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                                <Users
                                    size={25}
                                    className="text-purple-700"
                                />
                            </div>

                            <h3 className="text-xl font-bold text-[#0b2d45]">
                                Our Values
                            </h3>

                            <div className="space-y-2 mt-3 text-sm text-gray-600">

                                <p className="flex items-center gap-2">
                                    <CheckCircle
                                        size={16}
                                        className="text-blue-600"
                                    />
                                    Citizen First
                                </p>

                                <p className="flex items-center gap-2">
                                    <CheckCircle
                                        size={16}
                                        className="text-blue-600"
                                    />
                                    Transparency
                                </p>

                                <p className="flex items-center gap-2">
                                    <CheckCircle
                                        size={16}
                                        className="text-blue-600"
                                    />
                                    Innovation with AI
                                </p>

                                <p className="flex items-center gap-2">
                                    <CheckCircle
                                        size={16}
                                        className="text-blue-600"
                                    />
                                    Better Communities
                                </p>

                            </div>

                        </div>

                    </div>

                    {/* IMPACT */}
                    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mb-6">

                        <div className="grid grid-cols-4 divide-x divide-gray-200">

                            <div className="text-center px-4">
                                <Users
                                    size={28}
                                    className="mx-auto text-blue-600 mb-2"
                                />

                                <h3 className="text-2xl font-bold text-[#0b2d45]">
                                    1,000+
                                </h3>

                                <p className="text-sm text-gray-500">
                                    Active Citizens
                                </p>
                            </div>

                            <div className="text-center px-4">
                                <FileText
                                    size={28}
                                    className="mx-auto text-blue-600 mb-2"
                                />

                                <h3 className="text-2xl font-bold text-[#0b2d45]">
                                    500+
                                </h3>

                                <p className="text-sm text-gray-500">
                                    Issues Reported
                                </p>
                            </div>

                            <div className="text-center px-4">
                                <CheckCircle
                                    size={28}
                                    className="mx-auto text-green-600 mb-2"
                                />

                                <h3 className="text-2xl font-bold text-[#0b2d45]">
                                    320+
                                </h3>

                                <p className="text-sm text-gray-500">
                                    Issues Resolved
                                </p>
                            </div>

                            <div className="text-center px-4">
                                <Building2
                                    size={28}
                                    className="mx-auto text-blue-600 mb-2"
                                />

                                <h3 className="text-2xl font-bold text-[#0b2d45]">
                                    10+
                                </h3>

                                <p className="text-sm text-gray-500">
                                    Departments
                                </p>
                            </div>

                        </div>

                    </div>

                    {/* BOTTOM MESSAGE */}
                    <div className="bg-blue-50 border border-blue-200 rounded-2xl px-8 py-6 flex items-center justify-center gap-5">

                        <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                            <Leaf
                                size={28}
                                className="text-blue-700"
                            />
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-blue-700">
                                Together for a Better Tomorrow
                            </h3>

                            <p className="text-sm text-gray-600 mt-1">
                                Clean infrastructure. Healthy communities.
                                Happier lives.
                            </p>
                        </div>

                    </div>

                </main>
            </div>
        </div>
    );
}

export default AboutUs;