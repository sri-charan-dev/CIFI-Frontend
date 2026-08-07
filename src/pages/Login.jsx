import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import loginBg from "../assets/cifi-login-bg.png";
import { useNavigate } from "react-router-dom";

function Login() {
  const [userType, setUserType] = useState("citizen");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email.trim()) {
      alert("Please enter your email address");
      return;
    }

    const nameFromEmail = email.split("@")[0];

    const formattedName =
      nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);

    console.log("Logging in...")

    setTimeout(() => {
      console.log("navigating to home...")

      navigate("/home", {
        state: { userName: formattedName },
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen flex bg-white">

      {/* LEFT SIDE */}
      <div className="w-1/2 min-h-screen bg-[#001b35] overflow-hidden">
        <img
          src={loginBg}
          alt="CIFI Infrastructure"
          className="w-full h-screen object-contain bg-[#001b35]"
        />
      </div>

      {/* RIGHT SIDE */}
      <div className="w-1/2 flex items-center justify-center px-12">
        <div className="w-full max-w-md">

          <h2 className="text-4xl font-bold text-[#163d5c]">
            Welcome Back
          </h2>

          <p className="mt-2 text-gray-500">
            Sign in to continue to CIFI
          </p>

          {/* USER TYPE */}
          <div className="mt-8 grid grid-cols-2 bg-gray-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setUserType("citizen")}
              className={`py-3 rounded-lg font-semibold transition-all duration-300 ${userType === "citizen"
                  ? "bg-[#17496d] text-white shadow-md"
                  : "text-gray-500 hover:text-blue-600"
                }`}
            >
              Citizen
            </button>

            <button
              type="button"
              onClick={() => setUserType("authority")}
              className={`py-3 rounded-lg font-semibold transition-all duration-300 ${userType === "authority"
                  ? "bg-[#17496d] text-white shadow-md"
                  : "text-gray-500 hover:text-blue-600"
                }`}
            >
              Authority
            </button>
          </div>

          {/* EMAIL */}
          <div className="mt-7">
            <label className="block mb-2 font-medium text-gray-700">
              Email Address
            </label>

            <div className="flex items-center border border-gray-300 rounded-xl px-4">
              <Mail size={20} className="text-gray-400" />

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-3 outline-none"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="mt-5">
            <label className="block mb-2 font-medium text-gray-700">
              Password
            </label>

            <div className="flex items-center border border-gray-300 rounded-xl px-4">
              <Lock size={20} className="text-gray-400" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full px-3 py-3 outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* FORGOT PASSWORD */}
          <div className="mt-4 flex justify-end">
            <button className="text-blue-600 font-medium">
              Forgot Password?
            </button>
          </div>

          {/* LOGIN BUTTON */}
          <button onClick={handleLogin} className="mt-7 w-full bg-[#123b5d] text-white py-3 rounded-xl font-semibold hover:bg-[#0d304b] transition">
            Login
          </button>

          <p className="mt-6 text-center text-gray-500">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("Register")}
              className="text-[#147a85] font-semibold">
              Register
            </button>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login; 