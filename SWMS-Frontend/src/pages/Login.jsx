"use client";

import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import api from "../utils/api"; // Import the configured axios instance
import { useAuth } from "../context/AuthContext"; // Import AuthContext
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const { login } = useAuth(); // Use the login function from AuthContext

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
    setApiError(""); // Clear API error on input change
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setApiError("");

    try {
      const response = await api.post("/user/login", {
        email: formData.email,
        password: formData.password,
      });

      const { token, user } = response.data;

      login(token, user);
      console.log("Login successful:", user);

      // const redirectPath = user.role === "admin" ? "/admin-dashboard" : "/dashboard"

      Swal.fire({
        title: "🎉 Login Successful!",
        text: "Welcome back! Redirecting...",
        icon: "success",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: true,
        confirmButtonText: "Go Now",
        background: "#1f2937",
        color: "#f8fafc",
        iconColor: "#22c55e",
        confirmButtonColor: "#22c55e",
        customClass: {
          popup: "rounded-xl shadow-lg",
          title: "text-2xl font-bold",
          confirmButton:
            "px-6 py-2 rounded bg-lime-500 text-neutral-900 font-semibold hover:bg-lime-400 transition",
          timerProgressBar: "bg-lime-400",
        },
        didOpen: () => {
          Swal.getPopup().classList.add(
            "animate_animated",
            "animate_fadeInDown"
          );
        },
      }).then(() => {
        if (response.data.user?.role === "admin") {
          console.log("Admin user detected, redirecting to admin dashboard");
          navigate("/admin-dashboard");
        } else {
          navigate("/dashboard");
        }
      })
    } catch (err) {
      console.error("Login error:", err);
      setApiError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials."
      );

      Swal.fire({
        title: "❌ Login Failed!",
        text: err.response?.data?.message || "Invalid email or password.",
        icon: "error",
        showConfirmButton: true,
        confirmButtonText: "Try Again",
        background: "#1f2937",
        color: "#f8fafc",
        iconColor: "#f87171",
        confirmButtonColor: "#f87171",
        customClass: {
          popup: "rounded-xl shadow-lg",
          title: "text-2xl font-semibold",
          confirmButton:
            "px-6 py-2 rounded bg-red-500 text-white font-medium hover:bg-red-400 transition",
        },
        didOpen: () => {
          Swal.getPopup().classList.add("animate__animated", "animate__shakeX");
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md space-y-8"
        >
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-semibold tracking-tight">
              Welcome Back
            </h1>
            <p className="text-gray-300">Sign in to your SWMS account</p>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-neutral-900/80 border border-white/5 rounded-xl p-8 space-y-6"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {apiError && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm text-center"
                >
                  {apiError}
                </motion.p>
              )}
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className={`w-full pl-12 pr-4 py-3 bg-neutral-800 border rounded-lg focus:outline-none transition-colors ${
                      errors.email
                        ? "border-red-500 focus:border-red-400"
                        : "border-white/10 focus:border-lime-400"
                    }`}
                  />
                </div>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-1"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className={`w-full pl-12 pr-12 py-3 bg-neutral-800 border rounded-lg focus:outline-none transition-colors ${
                      errors.password
                        ? "border-red-500 focus:border-red-400"
                        : "border-white/10 focus:border-lime-400"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-1"
                  >
                    {errors.password}
                  </motion.p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-white/20 bg-neutral-800 text-lime-500 focus:ring-lime-400 focus:ring-2"
                  />
                  <span className="text-gray-300">Remember me</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-lime-400 hover:text-lime-300 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-lime-500 hover:bg-lime-400 disabled:bg-lime-600 disabled:cursor-not-allowed text-neutral-950 rounded-lg transition-colors font-medium"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-neutral-950/30 border-t-neutral-950 rounded-full animate-spin"></div>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            {/* <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-neutral-900 text-gray-400">
                  Or continue with
                </span>
              </div>
            </div> */}
          </motion.div>

          {/* Sign Up Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center"
          >
            <p className="text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-lime-400 hover:text-lime-300 transition-colors font-medium"
              >
                Sign up here
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Login;
