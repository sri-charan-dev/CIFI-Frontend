import potholeImg from "../assets/issues/pothole.png";
import streetLightImg from "../assets/issues/broken-street-light.png";
import drainImg from "../assets/issues/overflow-drain.png";
import garbageImg from "../assets/issues/garbage-pileup.png";
import footpathImg from "../assets/issues/damaged-footpath.png";
import WaterloggingImg from "../assets/issues/waterlogging.png";

export const issues = [
    {
        id: 1,
        image: potholeImg,
        title: "Large Pothole on Main Road",
        category: "Potholes",
        location: "Banjara Hills, Road No. 12",
        severity: "Critical",
        status: "In Progress",
        time: "2 hours ago",

        description:
            "Large pothole causing traffic disruption and vehicle damage. This issue is worsening day by day because of heavy rainfall and continuous vehicle movement.",

        reportedBy: "Sri Charan",

        reportedDate: "12 May 2026, 10:30 AM",

        aiCategory: "Pothole / Road Damage",

        confidence: "96%",

        severityScore: 92,

        duplicateReports: 4,

        escalationRisk: "High",

        priority: "Critical",
        timeline: [
            {
                status: "Reported",
                date: "12 May 2026, 10:30 AM",
                color: "bg-blue-600",
            },
            {
                status: "Verified by Authority",
                date: "12 May 2026, 12:15 PM",
                color: "bg-blue-500",
            },
            {
                status: "Assigned to Road Department",
                date: "12 May 2026, 01:00 PM",
                color: "bg-green-500",
            },
            {
                status: "Repair Work In Progress",
                date: "13 May 2026, 09:00 AM",
                color: "bg-yellow-500",
            },
            {
                status: "Expected Completion",
                date: "15 May 2026",
                color: "bg-orange-500",
            }
        ]
    },

    {
        id: 2,
        image: streetLightImg,
        title: "Broken Street Light",
        category: "Street Lights",
        location: "Jubilee Hills, Park Lane",
        severity: "High",
        status: "Resolved",
        time: "1 day ago",

        description:
            "Street light has not been working for several days causing visibility issues during night.",

        reportedBy: "wincent",

        reportedDate: "14 May 2026, 08:00 PM",

        aiCategory: "Street Light",

        confidence: "93%",

        severityScore: 81,

        duplicateReports: 2,

        escalationRisk: "Medium",

        priority: "High",
        timeline: [
            {
                status: "Reported",
                date: "14 May 2026, 08:00 PM",
                color: "bg-blue-600",
            },
            {
                status: "Electrical Inspection",
                date: "15 May 2026, 09:15 AM",
                color: "bg-blue-500",
            },
            {
                status: "Technician Assigned",
                date: "15 May 2026, 10:00 AM",
                color: "bg-green-500",
            },
            {
                status: "Street Light Repaired",
                date: "15 May 2026, 04:45 PM",
                color: "bg-green-600",
            }
        ]
    },

    {
        id: 3,
        image: drainImg,
        title: "Overflowing Drain",
        category: "Drainage",
        location: "Kukatpally, Metro Road",
        severity: "High",
        status: "In Progress",
        time: "2 days ago",

        description:
            "Drain water is overflowing onto the road creating unhygienic conditions.",

        reportedBy: "Bharat",

        reportedDate: "18 May 2026, 07:15 AM",

        aiCategory: "Drainage",

        confidence: "91%",

        severityScore: 85,

        duplicateReports: 3,

        escalationRisk: "High",

        priority: "High",
        timeline: [
            {
                status: "Reported",
                date: "16 May 2026, 07:40 AM",
                color: "bg-blue-600",
            },
            {
                status: "Drainage Team Notified",
                date: "16 May 2026, 09:00 AM",
                color: "bg-blue-500",
            },
            {
                status: "Cleaning Started",
                date: "16 May 2026, 11:30 AM",
                color: "bg-yellow-500",
            },
            {
                status: "Drain Cleaning Completed",
                date: "17 May 2026, 05:20 PM",
                color: "bg-green-600",
            }
        ]
    },

    {
        id: 4,
        image: footpathImg,
        title: "Damaged Footpath",
        category: "Footpath",
        location: "Ameerpet Metro Station",
        severity: "Medium",
        status: "Reported",
        time: "2 days ago",

        description:
            "Footpath tiles are broken making it unsafe for pedestrians.",

        reportedBy: "Murari",

        reportedDate: "18 May 2026, 11:00 AM",

        aiCategory: "Footpath",

        confidence: "88%",

        severityScore: 70,

        duplicateReports: 1,

        escalationRisk: "Low",

        priority: "Medium",
        timeline: [
            {
                status: "Reported",
                date: "18 May 2026, 11:00 AM",
                color: "bg-blue-600",
            },
            {
                status: "Inspection Completed",
                date: "18 May 2026, 03:30 PM",
                color: "bg-blue-500",
            },
            {
                status: "Civil Team Assigned",
                date: "19 May 2026, 09:30 AM",
                color: "bg-green-500",
            },
            {
                status: "Repair Scheduled",
                date: "22 May 2026",
                color: "bg-orange-500",
            }
        ]
    },

    {
        id: 5,
        image: garbageImg,
        title: "Garbage Pileup",
        category: "Garbage",
        location: "Green Park Colony",
        severity: "Medium",
        status: "Resolved",
        time: "3 days ago",

        description:
            "Garbage has accumulated for several days causing foul smell.",

        reportedBy: "Tulsi",

        reportedDate: "19 May 2026, 06:30 AM",

        aiCategory: "Garbage",

        confidence: "94%",

        severityScore: 76,

        duplicateReports: 5,

        escalationRisk: "Medium",

        priority: "Medium",
        timeline: [
            {
                status: "Reported",
                date: "19 May 2026, 06:30 AM",
                color: "bg-blue-600",
            },
            {
                status: "Sanitation Team Assigned",
                date: "19 May 2026, 08:15 AM",
                color: "bg-green-500",
            },
            {
                status: "Garbage Collected",
                date: "19 May 2026, 12:45 PM",
                color: "bg-green-600",
            }
        ]
    },

    {
        id: 6,
        image: WaterloggingImg,
        title: "Waterlogging on 3rd Block Road",
        category: "Drainage",
        location: "Madhapur, 3rd Block",
        severity: "High",
        status: "In Progress",
        time: "4 days ago",

        description:
            "Waterlogging due to continuous rain causing traffic congestion.",

        reportedBy: "Ramya",

        reportedDate: "21 May 2026, 07:20 AM",

        aiCategory: "Waterlogging",

        confidence: "95%",

        severityScore: 89,

        duplicateReports: 2,

        escalationRisk: "High",

        priority: "Critical",
        timeline: [
            {
                status: "Reported",
                date: "21 May 2026, 07:20 AM",
                color: "bg-blue-600",
            },
            {
                status: "Emergency Team Alerted",
                date: "21 May 2026, 08:10 AM",
                color: "bg-red-500",
            },
            {
                status: "Water Pump Deployment",
                date: "21 May 2026, 09:45 AM",
                color: "bg-yellow-500",
            },
            {
                status: "Road Cleared",
                date: "21 May 2026, 04:00 PM",
                color: "bg-green-600",
            }
        ]
    },
];