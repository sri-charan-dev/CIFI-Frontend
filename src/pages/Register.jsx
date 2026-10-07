import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Building2,
  BadgeCheck,
  BriefcaseBusiness,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  // -----------------------------
  // STATES
  // -----------------------------
  const [role, setRole] = useState("Citizen");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [staffId, setStaffId] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [agreed, setAgreed] = useState(false);

  // -----------------------------
  // PASSWORD STRENGTH
  // -----------------------------
  let strength = "Weak";
  let strengthColor = "text-red-500";
  let progressColor = "bg-red-500";
  let progressWidth = "25%";

  if (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[!@#$%^&*]/.test(password)
  ) {
    strength = "Strong";
    strengthColor = "text-green-600";
    progressColor = "bg-green-500";
    progressWidth = "100%";
  } else if (
    password.length >= 6 &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password)
  ) {
    strength = "Medium";
    strengthColor = "text-yellow-500";
    progressColor = "bg-yellow-500";
    progressWidth = "60%";
  }

  // -----------------------------
  // ROLE CHANGE
  // -----------------------------
  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);

    // Clear role-specific fields
    setDepartment("");
    setDesignation("");
    setEmployeeId("");
    setStaffId("");
  };

  // -----------------------------
  // REGISTER
  // -----------------------------
  const handleRegister = () => {
    // Common validation
    if (!fullName || !email || !phone || !password || !confirmPassword) {
      alert("Please fill all required fields.");
      return;
    }

    // Authority validation
    if (role === "Authority") {
      if (!department || !designation || !employeeId) {
        alert("Please fill all Authority details.");
        return;
      }
    }

    // Staff validation
    if (role === "Staff") {
      if (!department || !staffId) {
        alert("Please fill all Staff details.");
        return;
      }
    }

    // Password validation
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (!agreed) {
      alert("Please agree to the Terms & Conditions.");
      return;
    }

    alert(`${role} account created successfully!`);

    navigate("/");
  };

  // -----------------------------
  // INPUT COMPONENT
  // -----------------------------
  const InputField = ({
    icon: Icon,
    label,
    value,
    onChange,
    placeholder,
    type = "text",
  }) => {
    return (
      <div>
        <label className="block text-sm font-semibold mb-2">
          {label}
        </label>

        <div className="relative">
          <Icon
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-8 px-4">

      <div className="bg-white w-[500px] rounded-2xl shadow-xl p-8">

        {/* =========================
            HEADER
        ========================= */}
        <h1 className="text-3xl font-bold text-center text-gray-900">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Join CIFI and help build better communities
        </p>

        {/* =========================
            ROLE SWITCH
        ========================= */}
        <div className="grid grid-cols-3 gap-3 mt-8">

          {/* CITIZEN */}
          <button
            type="button"
            onClick={() => handleRoleChange("Citizen")}
            className={`flex flex-col items-center justify-center border-2 rounded-xl py-3 transition ${role === "Citizen"
              ? "border-blue-600 bg-blue-50 text-blue-600"
              : "border-gray-200 text-gray-600 hover:border-blue-300"
              }`}
          >
            <User size={22} />

            <span className="font-semibold text-sm mt-1">
              Citizen
            </span>

            <span className="text-xs mt-1">
              Report Issues
            </span>
          </button>

          {/* AUTHORITY */}
          <button
            type="button"
            onClick={() => handleRoleChange("Authority")}
            className={`flex flex-col items-center justify-center border-2 rounded-xl py-3 transition ${role === "Authority"
              ? "border-blue-600 bg-blue-50 text-blue-600"
              : "border-gray-200 text-gray-600 hover:border-blue-300"
              }`}
          >
            <Building2 size={22} />

            <span className="font-semibold text-sm mt-1">
              Authority
            </span>

            <span className="text-xs mt-1">
              Admin Access
            </span>
          </button>

          {/* STAFF */}
          <button
            type="button"
            onClick={() => handleRoleChange("Staff")}
            className={`flex flex-col items-center justify-center border-2 rounded-xl py-3 transition ${role === "Staff"
              ? "border-blue-600 bg-blue-50 text-blue-600"
              : "border-gray-200 text-gray-600 hover:border-blue-300"
              }`}
          >
            <BriefcaseBusiness size={22} />

            <span className="font-semibold text-sm mt-1">
              Staff
            </span>

            <span className="text-xs mt-1">
              Field Operations
            </span>
          </button>

        </div>

        {/* =========================
            SELECTED ROLE INFO
        ========================= */}
        <div className="mt-5 flex items-center gap-2 text-sm text-gray-500">
          {role === "Citizen" && <User size={17} />}
          {role === "Authority" && <ShieldCheck size={17} />}
          {role === "Staff" && <BriefcaseBusiness size={17} />}

          <span>
            Registering as{" "}
            <strong className="text-blue-600">
              {role}
            </strong>
          </span>
        </div>

        {/* =========================
            FULL NAME
        ========================= */}
        <div className="mt-5">
          <InputField
            icon={User}
            label="Full Name"
            value={fullName}
            onChange={setFullName}
            placeholder={
              role === "Citizen"
                ? "Enter your full name"
                : role === "Authority"
                  ? "Enter authority name"
                  : "Enter staff name"
            }
          />
        </div>

        {/* =====================================================
            AUTHORITY EXTRA DETAILS
        ===================================================== */}
        {role === "Authority" && (
          <>
            {/* OFFICIAL EMAIL */}
            <div className="mt-5">
              <InputField
                icon={Mail}
                label="Official Email"
                value={email}
                onChange={setEmail}
                placeholder="e.g. officer@cifi.gov.in"
                type="email"
              />
            </div>

            {/* DEPARTMENT */}
            <div className="mt-5">
              <label className="block text-sm font-semibold mb-2">
                Department
              </label>

              <div className="relative">
                <Building2
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 bg-white"
                >
                  <option value="">
                    Select Department
                  </option>
                  <option value="Municipal Corporation">
                    Municipal Corporation
                  </option>
                  <option value="Roads & Transport">
                    Roads & Transport
                  </option>
                  <option value="Water & Drainage">
                    Water & Drainage
                  </option>
                  <option value="Electrical">
                    Electrical
                  </option>
                  <option value="Sanitation">
                    Sanitation
                  </option>
                </select>
              </div>
            </div>

            {/* DESIGNATION */}
            <div className="mt-5">
              <InputField
                icon={BadgeCheck}
                label="Designation"
                value={designation}
                onChange={setDesignation}
                placeholder="e.g. Municipal Officer"
              />
            </div>

            {/* EMPLOYEE ID */}
            <div className="mt-5">
              <InputField
                icon={BadgeCheck}
                label="Employee ID"
                value={employeeId}
                onChange={setEmployeeId}
                placeholder="Enter employee ID"
              />
            </div>

            {/* PHONE */}
            <div className="mt-5">
              <InputField
                icon={Phone}
                label="Official Phone Number"
                value={phone}
                onChange={setPhone}
                placeholder="9876543210"
                type="tel"
              />
            </div>
          </>
        )}

        {/* =====================================================
            STAFF EXTRA DETAILS
        ===================================================== */}
        {role === "Staff" && (
          <>
            {/* STAFF ID */}
            <div className="mt-5">
              <InputField
                icon={BadgeCheck}
                label="Staff ID"
                value={staffId}
                onChange={setStaffId}
                placeholder="Enter staff ID"
              />
            </div>

            {/* EMAIL */}
            <div className="mt-5">
              <InputField
                icon={Mail}
                label="Email"
                value={email}
                onChange={setEmail}
                placeholder="Enter staff email"
                type="email"
              />
            </div>

            {/* DEPARTMENT */}
            <div className="mt-5">
              <label className="block text-sm font-semibold mb-2">
                Department
              </label>

              <div className="relative">
                <Building2
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 bg-white"
                >
                  <option value="">
                    Select Department
                  </option>
                  <option value="Roads & Transport">
                    Roads & Transport
                  </option>
                  <option value="Water & Drainage">
                    Water & Drainage
                  </option>
                  <option value="Electrical">
                    Electrical
                  </option>
                  <option value="Sanitation">
                    Sanitation
                  </option>
                  <option value="Public Works">
                    Public Works
                  </option>
                </select>
              </div>
            </div>

            {/* PHONE */}
            <div className="mt-5">
              <InputField
                icon={Phone}
                label="Phone Number"
                value={phone}
                onChange={setPhone}
                placeholder="9876543210"
                type="tel"
              />
            </div>
          </>
        )}

        {/* =====================================================
            CITIZEN DETAILS
        ===================================================== */}
        {role === "Citizen" && (
          <>
            {/* EMAIL */}
            <div className="mt-5">
              <InputField
                icon={Mail}
                label="Email"
                value={email}
                onChange={setEmail}
                placeholder="Enter your email"
                type="email"
              />
            </div>

            {/* PHONE */}
            <div className="mt-5">
              <InputField
                icon={Phone}
                label="Phone Number"
                value={phone}
                onChange={setPhone}
                placeholder="9876543210"
                type="tel"
              />
            </div>
          </>
        )}

        {/* =========================
            PASSWORD
        ========================= */}
        <div className="mt-5">

          <label className="block text-sm font-semibold mb-2">
            Password
          </label>

          <div className="relative">

            <Lock
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full border border-gray-300 rounded-xl pl-12 pr-12 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>

          </div>
        </div>

        {/* =========================
            CONFIRM PASSWORD
        ========================= */}
        <div className="mt-5">

          <label className="block text-sm font-semibold mb-2">
            Confirm Password
          </label>

          <div className="relative">

            <Lock
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              className="w-full border border-gray-300 rounded-xl pl-12 pr-12 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showConfirmPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>

          </div>
        </div>

        {/* =========================
            PASSWORD STRENGTH
        ========================= */}
        <div className="mt-5">

          <div className="flex justify-between">

            <span className="text-sm font-medium">
              Password Strength
            </span>

            <span
              className={`text-sm font-semibold ${strengthColor}`}
            >
              {strength}
            </span>

          </div>

          <div className="w-full bg-gray-200 h-2 rounded-full mt-2">

            <div
              className={`${progressColor} h-2 rounded-full transition-all duration-300`}
              style={{ width: progressWidth }}
            />

          </div>

        </div>

        {/* =========================
            TERMS
        ========================= */}
        <div className="flex items-center gap-2 mt-5">

          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="w-4 h-4"
          />

          <label className="text-sm text-gray-600">
            I agree to the{" "}
            <span className="text-blue-600 cursor-pointer">
              Terms & Conditions
            </span>
          </label>

        </div>

        {/* =========================
            CREATE ACCOUNT
        ========================= */}
        <button
          type="button"
          onClick={handleRegister}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition"
        >
          Create {role} Account
        </button>

        {/* =========================
            LOGIN
        ========================= */}
        <p className="text-center mt-5 text-gray-600">

          Already have an account?{" "}

          <span
            onClick={() => navigate("/")}
            className="text-blue-600 font-semibold cursor-pointer hover:underline"
          >
            Login
          </span>

        </p>

      </div>
    </div>
  );
}

export default Register;