import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Building2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate();

    const [showPassword,setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [password, setPassword] = useState("");

    const [role, setRole] = useState("Citizen");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

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

    const handleRegister = () => {

      if(!fullName || !email || !phone || !password || !confirmPassword){
       alert("Please fill all fields");
        return;
       }

      if(password !== confirmPassword){
      alert("Passwords do not match");
       return;
      }

      navigate("/");
      }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">

      <div className="bg-white w-[500px] rounded-2xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-center">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Join CIFI and report infrastructure issues
        </p>
        <div className="flex gap-4 mt-8">

        <button className="flex-1 border-2 border-blue-600 bg-blue-50         text-blue-600 rounded-xl py-3 font-semibold">
         Citizen
        </button>

        <button className="flex-1 border rounded-xl py-3 font-semibold">
         Authority
        </button>

    </div>

    {/* Full Name */}
    <div className="mt-6">
        <label className="block text-sm font-semibold mb-2">
           Full Name
        </label>

       <div className="relative">
         <User
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

        <input
         value={fullName}
         onChange={(e)=>setFullName(e.target.value)}
         placeholder="Enter your full name"
         className="w-full border border-gray-300 rounded-xl pl-12 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
        />
      </div>
    </div>
    

    {/* Email */}

    <div className="mt-6">

       <label className="block text-sm font-semibold mb-2">
          Email
       </label>

       <div className="relative">
        <Mail
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"/>

        <input
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        type="email"
        placeholder="Enter your email"
        className="w-full border border-gray-300 rounded-xl pl-12 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"/>
        </div>
    </div>

    {/* Phone Number */}
    <div className="mt-6">
        <label className="block text-sm font-semibold mb-2">
           Phone Number
        </label>

      <div className="flex">

      <div className="flex items-center gap-2 border border-r-0              border-gray-300 rounded-l-xl px-3">
         <Phone size={18} className="text-gray-400" />
         <span>+91</span>
      </div>

        <input
        value={phone}
        onChange={(e)=>setPhone(e.target.value)}
        type="tel"
        placeholder="9876543210"
         className="flex-1 border border-gray-300 rounded-r-xl pl-16 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"/>
        </div>
    </div>

    {/* Password */}

    <div className="mt-6">

         <label className="block text-sm font-semibold mb-2">
             Password
         </label>

         <div className="relative">

         <Lock
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"/>

         <input
           type={showPassword ? "text" : "password"}
           value={password}
           onChange={(e) => setPassword(e.target.value)}
           placeholder="Enter password"
           className="w-full border border-gray-300 rounded-xl pl-12 pr-12 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"/>
         <button
               type="button"
                onClick={() => setShowPassword(!showPassword)}
             className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
             </button>
         </div>
    </div>

    {/* Confirm Password */}

    <div className="mt-6">
        <label className="block text-sm font-semibold mb-2">
           Confirm Password
        </label>

        <div className="relative">
            
        <Lock
           size={20}
         className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"/>
     
         <input
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e)=>setConfirmPassword(e.target.value)}
          placeholder="Confirm password"
          className="w-full border border-gray-300 rounded-xl pl-12 pr-12 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"/>

          <button
               type="button"
               onClick={() => setShowConfirmPassword(!showConfirmPassword)}
               className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
            {showConfirmPassword ? (
               <EyeOff size={20} />
                ) : (
               <Eye size={20} />
                 )}
            </button>
        </div>
    </div>

    {/* Password Strength */}
    <div className="mt-6">

      <div className="flex justify-between">

      <span className="text-sm font-medium">
      Password Strength
      </span>

       <span className={`text-sm font-semibold ${strengthColor}`}>
      {strength}
       </span>

       </div>

      <div className="w-full bg-gray-200 h-2 rounded-full mt-2">

      <div
      className={`${progressColor} h-2 rounded-full transition-all duration-300`}
      style={{ width: progressWidth }}
        ></div>

       </div>

    </div>

    {/* Terms & Conditions */}

    <div className="flex items-center gap-2 mt-6">

       <input
        type="checkbox"
        className="w-4 h-4"
         />

       <label className="text-sm text-gray-600">

        I agree to the

        <span className="text-blue-600 cursor-pointer">
          {" "}Terms & Conditions
        </span>

        </label>

    </div>

    {/* Create Account Button */}
    <button
    onClick={handleRegister}
      className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition"
      >
      Create Account
    </button>
    {/* Login Link */}
    <p className="text-center mt-5 text-gray-600">
        Already have an account?{" "}
      <span 
         onClick={() => navigate("/")}
         className="text-blue-600 font-semibold cursor-pointer hover:underline">
         Login
       </span>
    </p>

     </div>
    </div>
  );
}

export default Register;