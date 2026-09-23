import React from "react";
import Sidebar from "../components/Sidebar";
import {
    CircleQuestionMark,
    Camera,
    Brain,
    CopyCheck,
    Building2,
    CheckCircle,
    ArrowRight,
    Users,
} from "lucide-react";

function HowItWorks() {
    const steps = [
        {
            number: "01",
            icon: Camera,
            title: "Report an Issue",
            text: "Take a photo, select the issue and add its location.",
            box: "bg-blue-50",
            border: "border-blue-200",
            numberBg: "bg-blue-100",
            iconColor: "text-blue-700",
        },
        {
            number: "02",
            icon: Brain,
            title: "AI Checks",
            text: "CIFI identifies the issue and checks its severity.",
            box: "bg-green-50",
            border: "border-green-200",
            numberBg: "bg-green-100",
            iconColor: "text-green-700",
        },
        {
            number: "03",
            icon: CopyCheck,
            title: "Group Reports",
            text: "Similar reports about the same problem are grouped.",
            box: "bg-orange-50",
            border: "border-orange-200",
            numberBg: "bg-orange-100",
            iconColor: "text-orange-600",
        },
        {
            number: "04",
            icon: Building2,
            title: "Authority Acts",
            text: "The issue goes to the right department for action.",
            box: "bg-purple-50",
            border: "border-purple-200",
            numberBg: "bg-purple-100",
            iconColor: "text-purple-700",
        },
        {
            number: "05",
            icon: CheckCircle,
            title: "Issue Resolved",
            text: "The problem is fixed and the status is updated.",
            box: "bg-green-50",
            border: "border-green-200",
            numberBg: "bg-green-100",
            iconColor: "text-green-700",
        },
    ];

    return (
        <div className="min-h-screen bg-[#f5f8fb]">

            {/* EXISTING SIDEBAR */}
            <Sidebar />

            {/* MAIN CONTENT */}
            <div className="ml-64">

                {/* MAIN PAGE */}
                <main className="px-8 py-10">

                    {/* PAGE TITLE */}
                    <div className="text-center mb-10">

                        <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-blue-100 flex items-center justify-center">
                            <CircleQuestionMark
                                size={28}
                                className="text-[#17496d]"
                            />
                        </div>

                        <h2 className="text-3xl font-bold text-[#0b2d45]">
                            How CIFI Works
                        </h2>

                        <p className="text-gray-700 font-medium mt-2">
                            Report. Analyze. Fix.
                        </p>

                        <p className="text-gray-500 text-sm mt-1">
                            A simple process to make our cities better for everyone.
                        </p>

                    </div>

                    {/* FIVE STEP FLOW */}
                    <div className="flex items-center justify-between gap-2">

                        {steps.map((step, index) => {
                            const Icon = step.icon;

                            return (
                                <React.Fragment key={step.number}>

                                    {/* STEP CARD */}
                                    <div
                                        className={`
                                            flex-1
                                            min-h-[310px]
                                            rounded-2xl
                                            border
                                            ${step.border}
                                            ${step.box}
                                            px-5
                                            pt-0
                                            pb-6
                                            text-center
                                            relative
                                            flex
                                            flex-col
                                            items-center
                                            shadow-sm
                                        `}
                                    >

                                        {/* NUMBER */}
                                        <div
                                            className={`
                                                w-12
                                                h-12
                                                rounded-full
                                                ${step.numberBg}
                                                flex
                                                items-center
                                                justify-center
                                                font-bold
                                                text-[#0b2d45]
                                                -mt-6
                                                border-4
                                                border-[#f5f8fb]
                                            `}
                                        >
                                            {step.number}
                                        </div>

                                        {/* ICON */}
                                        <div className="w-24 h-24 mt-6 flex items-center justify-center">
                                            <Icon
                                                size={58}
                                                strokeWidth={1.8}
                                                className={step.iconColor}
                                            />
                                        </div>

                                        {/* TITLE */}
                                        <h3 className="text-lg font-bold text-[#0b2d45] mt-4">
                                            {step.title}
                                        </h3>

                                        {/* DESCRIPTION */}
                                        <p className="text-sm text-gray-600 leading-relaxed mt-3">
                                            {step.text}
                                        </p>

                                    </div>

                                    {/* ARROW */}
                                    {index < steps.length - 1 && (
                                        <div className="flex-shrink-0">
                                            <ArrowRight
                                                size={28}
                                                strokeWidth={2}
                                                className="text-[#17496d]"
                                            />
                                        </div>
                                    )}

                                </React.Fragment>
                            );
                        })}

                    </div>

                    {/* BOTTOM INFORMATION BOX */}
                    <div className="max-w-5xl mx-auto mt-10">

                        <div className="bg-blue-50 border border-blue-200 rounded-2xl px-8 py-6 flex items-center justify-center gap-5">

                            {/* ICON */}
                            <div className="w-16 h-16 rounded-xl bg-blue-100 border border-blue-200 flex items-center justify-center flex-shrink-0">
                                <Users
                                    size={34}
                                    className="text-blue-700"
                                />
                            </div>

                            {/* TEXT */}
                            <div>
                                <h3 className="text-xl font-bold text-[#17496d]">
                                    Together, We Can Build Better Cities
                                </h3>

                                <p className="text-sm text-gray-600 mt-1">
                                    Your report helps authorities identify and fix
                                    infrastructure problems faster.
                                </p>
                            </div>

                        </div>

                    </div>

                </main>
            </div>
        </div>
    );
}

export default HowItWorks;