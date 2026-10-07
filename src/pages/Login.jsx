import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Building2,
  HardHat,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

import cifiBackgroundImage from "../assets/images/cifi-background-image.png";

function Login() {
  const navigate = useNavigate();

  const [userType, setUserType] = useState("citizen");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }

    // =========================
    // AUTHORITY LOGIN
    // =========================
    if (userType === "authority") {
      navigate("/authority");
      return;
    }

    // =========================
    // STAFF LOGIN
    // =========================
    if (userType === "staff") {
      navigate("/staff");
      return;
    }

    // =========================
    // CITIZEN LOGIN
    // =========================
    const nameFromEmail = email
      .split("@")[0]
      .replace(/[._-]/g, " ");

    const formattedName = nameFromEmail
      .split(" ")
      .map(
        (word) =>
          word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join(" ");

    navigate("/home", {
      state: {
        userName: formattedName,
      },
    });
  };

  return (
    <div className="fixed inset-0 h-screen w-screen overflow-hidden bg-[#eef6fb]">

      {/* ===================================================== */}
      {/* BACKGROUND / 1536 x 1024 = 3:2 */}
      {/* ===================================================== */}

      <div className="absolute inset-0 overflow-hidden">

        <img
          src={cifiBackgroundImage}
          alt="CIFI Background"
          className="absolute inset-0 h-full w-full object-cover"
        />

      </div>


      {/* ===================================================== */}
      {/* LOGIN CARD */}
      {/* Original design size: 570 x 690 */}
      {/* ===================================================== */}

      <div className="absolute inset-0 flex items-center justify-end">

        <div
          className="
                    mr-[1.5vw]
                    w-[37.1vw]
                    max-w-[570px]
                    min-w-[420px]

                    rounded-[28px]

                    border
                    border-white/80

                    bg-white/[0.96]

                    shadow-[0_20px_60px_rgba(18,59,93,0.20)]

                    backdrop-blur-md

                    p-[2.0vw]

                    max-h-[calc(100vh-32px)]
                "
        >

          {/* ================================================= */}
          {/* HEADER */}
          {/* ================================================= */}

          <div>

            <div className="flex items-center gap-3">

              <div className="h-[3px] w-7 rounded-full bg-[#174F73]" />

              <p className="text-base font-medium text-[#54728C]">
                Welcome to CIFI
              </p>

            </div>


            <h1 className="mt-3 text-[clamp(26px,2.1vw,36px)] font-bold leading-tight tracking-tight text-[#123B5D]">
              Login to Your Account
            </h1>


            <p className="mt-1 text-[clamp(14px,1.05vw,18px)] text-[#54728C]">
              Choose your role and continue
            </p>

          </div>


          {/* ================================================= */}
          {/* ROLE SELECTION */}
          {/* ================================================= */}

          <div className="mt-6 grid grid-cols-3 gap-3">

            {/* CITIZEN */}
            <button
              type="button"
              onClick={() => setUserType("citizen")}
              className={`flex h-[105px] flex-col items-center justify-center rounded-2xl border-2 transition ${userType === "citizen"
                ? "border-blue-500 bg-blue-50"
                : "border-transparent bg-slate-50 hover:border-slate-200"
                }`}
            >

              <User
                size={28}
                className={
                  userType === "citizen"
                    ? "text-blue-600"
                    : "text-[#315875]"
                }
              />

              <p className="mt-1 text-sm font-bold text-[#123B5D]">
                Citizen
              </p>

              <p className="text-[11px] text-[#54728C]">
                Report Issues
              </p>

            </button>


            {/* AUTHORITY */}
            <button
              type="button"
              onClick={() => setUserType("authority")}
              className={`flex h-[105px] flex-col items-center justify-center rounded-2xl border-2 transition ${userType === "authority"
                ? "border-blue-500 bg-blue-50"
                : "border-transparent bg-slate-50 hover:border-slate-200"
                }`}
            >

              <Building2
                size={28}
                className={
                  userType === "authority"
                    ? "text-blue-600"
                    : "text-[#315875]"
                }
              />

              <p className="mt-1 text-sm font-bold text-[#123B5D]">
                Authority
              </p>

              <p className="text-[11px] text-[#54728C]">
                Admin Access
              </p>

            </button>


            {/* STAFF */}
            <button
              type="button"
              onClick={() => setUserType("staff")}
              className={`flex h-[105px] flex-col items-center justify-center rounded-2xl border-2 transition ${userType === "staff"
                ? "border-orange-500 bg-orange-50"
                : "border-transparent bg-slate-50 hover:border-slate-200"
                }`}
            >

              <HardHat
                size={28}
                className={
                  userType === "staff"
                    ? "text-orange-500"
                    : "text-[#315875]"
                }
              />

              <p className="mt-1 text-sm font-bold text-[#123B5D]">
                Staff
              </p>

              <p className="text-[11px] text-[#54728C]">
                Field Operations
              </p>

            </button>

          </div>


          {/* ================================================= */}
          {/* FORM */}
          {/* ================================================= */}

          <form
            onSubmit={handleLogin}
            className="mt-5"
          >

            {/* EMAIL */}

            <div>

              <label className="mb-1.5 block text-sm font-medium text-[#315875]">
                Email Address
              </label>

              <div className="relative">

                <Mail
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="e.g. charan@gmail.com"
                  className="
                                    h-14
                                    w-full
                                    rounded-xl
                                    border
                                    border-slate-200
                                    bg-white
                                    pl-12
                                    pr-4
                                    text-base
                                    text-[#123B5D]
                                    outline-none
                                    focus:border-[#174F73]
                                    focus:ring-2
                                    focus:ring-[#174F73]/10
                                "
                />

              </div>

            </div>


            {/* PASSWORD */}

            <div className="mt-4">

              <label className="mb-1.5 block text-sm font-medium text-[#315875]">
                Password
              </label>

              <div className="relative">

                <Lock
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="Enter your password"
                  className="
                                    h-14
                                    w-full
                                    rounded-xl
                                    border
                                    border-slate-200
                                    bg-white
                                    pl-12
                                    pr-12
                                    text-base
                                    text-[#123B5D]
                                    outline-none
                                    focus:border-[#174F73]
                                    focus:ring-2
                                    focus:ring-[#174F73]/10
                                "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="
                                    absolute
                                    right-4
                                    top-1/2
                                    -translate-y-1/2
                                    text-slate-400
                                "
                >

                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}

                </button>

              </div>

            </div>


            {/* REMEMBER / FORGOT */}

            <div className="mt-4 flex items-center justify-between">

              <label className="flex items-center gap-2 text-sm text-[#315875]">

                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) =>
                    setRememberMe(e.target.checked)
                  }
                  className="h-4 w-4 accent-[#174F73]"
                />

                Remember me

              </label>


              <button
                type="button"
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Forgot Password?
              </button>

            </div>


            {/* LOGIN */}

            <button
              type="submit"
              className="
                            mt-5
                            flex
                            h-14
                            w-full
                            items-center
                            justify-center
                            gap-3
                            rounded-xl
                            bg-[#174F73]
                            text-base
                            font-semibold
                            text-white
                            shadow-md
                            transition
                            hover:bg-[#123E5B]
                        "
            >

              Login

              <ArrowRight size={20} />

            </button>

          </form>


          {/* ================================================= */}
          {/* OR */}
          {/* ================================================= */}

          <div className="my-4 flex items-center gap-3">

            <div className="h-px flex-1 bg-slate-200" />

            <span className="text-xs text-slate-400">
              OR
            </span>

            <div className="h-px flex-1 bg-slate-200" />

          </div>


          {/* ================================================= */}
          {/* CREATE ACCOUNT */}
          {/* ================================================= */}

          <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">

            <div>

              <p className="text-sm font-bold text-[#123B5D]">
                Don't have an account?
              </p>

              <p className="text-xs text-[#54728C]">
                Join CIFI and make your community better
              </p>

            </div>


            <button
              type="button"
              onClick={() => navigate("/register")}
              className="
                            rounded-lg
                            border-2
                            border-blue-500
                            px-4
                            py-2
                            text-sm
                            font-semibold
                            text-blue-600
                            transition
                            hover:bg-blue-50
                        "
            >
              Create Account
            </button>

          </div>

        </div>

      </div>

    </div>
  );

}

export default Login;