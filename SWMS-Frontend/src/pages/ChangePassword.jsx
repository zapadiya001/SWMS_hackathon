"use client"

import { Link, useLocation } from "react-router-dom" // Import useLocation

import { motion } from "framer-motion"
import { Lock, Eye, EyeOff, Loader2, CheckCircle, XCircle, ArrowLeft } from "lucide-react"
import { useState, useEffect } from "react" // Import useEffect
import { useNavigate } from "react-router-dom"
import PageTransition from "../components/PageTransition"
import { useAuth } from "../context/AuthContext"
import api from "../utils/api"

const ChangePassword = () => {
  const { user, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation() // Get location object to read query params

  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false)

  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  // Extract token and email from URL query parameters
  const queryParams = new URLSearchParams(location.search)
  const resetToken = queryParams.get("token")
  const resetEmail = queryParams.get("email")

  // Determine if this is a "forgot password" flow or a logged-in user changing password
  const isForgotPasswordFlow = !!resetToken && !!resetEmail

  useEffect(() => {
    if (isForgotPasswordFlow && !resetToken) {
      // If it's supposed to be a forgot password flow but no token, redirect
      setApiError("Invalid password reset link. Please try again from the forgot password page.")
      setTimeout(() => navigate("/forgot-password"), 3000)
    }
  }, [isForgotPasswordFlow, resetToken, navigate])

  const handlePasswordChange = async (e) => {
    e.preventDefault()
    setApiError(null)
    setSuccessMessage(null)
    setIsLoading(true)

    if (newPassword.length < 6) {
      setApiError("New password must be at least 6 characters long.")
      setIsLoading(false)
      return
    }
    if (newPassword !== confirmNewPassword) {
      setApiError("New passwords do not match.")
      setIsLoading(false)
      return
    }

    try {
      if (isForgotPasswordFlow) {
        // Use the reset-password endpoint for forgot password flow
        await api.post("/user/reset-password", {
          email: resetEmail,
          otp: resetToken, // In a real app, this might be a token, or a separate OTP field
          newPassword: newPassword,
        })
        setSuccessMessage("Password updated successfully! Redirecting to login...")
        setNewPassword("")
        setConfirmNewPassword("")
        setTimeout(() => {
          navigate("/login") // Redirect to login after success for forgot password flow
        }, 2000)
      } else {
        // Use the change-password endpoint for logged-in users
        if (!user || !user.id) {
          setApiError("User data not loaded. Please log in again.")
          setIsLoading(false)
          return
        }
        await api.put(`/user/${user.id}/password`, { newPassword })
        setSuccessMessage("Password updated successfully! Redirecting to profile...")
        setNewPassword("")
        setConfirmNewPassword("")
        setTimeout(() => {
          navigate("/profile") // Redirect to profile after success for logged-in user
        }, 2000)
      }
    } catch (err) {
      console.error("Password change error:", err)
      setApiError(err.response?.data?.message || "Failed to change password. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (authLoading && !isForgotPasswordFlow) {
    // Only show loading if not a forgot password flow (as user might not be logged in)
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-gray-100">
        Loading user data...
      </div>
    )
  }

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
            <h1 className="text-3xl font-semibold tracking-tight">Change Password</h1>
            <p className="text-gray-300">Update your account password securely.</p>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-neutral-900/80 border border-white/5 rounded-xl p-8 space-y-6"
          >
            <form onSubmit={handlePasswordChange} className="space-y-6">
              {apiError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-red-400 text-sm bg-red-900/20 border border-red-500/30 rounded-lg p-3"
                >
                  <XCircle className="w-5 h-5" />
                  <span>{apiError}</span>
                </motion.div>
              )}
              {successMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-green-400 text-sm bg-green-900/20 border border-green-500/30 rounded-lg p-3"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>{successMessage}</span>
                </motion.div>
              )}

              {/* New Password Field */}
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium mb-2">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showNewPassword ? "text" : "password"}
                    id="newPassword"
                    name="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password (min 6 chars)"
                    className="w-full pl-12 pr-12 py-3 bg-neutral-800 border border-lime-400 rounded-lg focus:outline-none transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                  >
                    {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm New Password Field */}
              <div>
                <label htmlFor="confirmNewPassword" className="block text-sm font-medium mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showConfirmNewPassword ? "text" : "password"}
                    id="confirmNewPassword"
                    name="confirmNewPassword"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="w-full pl-12 pr-12 py-3 bg-neutral-800 border border-lime-400 rounded-lg focus:outline-none transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                  >
                    {showConfirmNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-lime-500 hover:bg-lime-400 disabled:bg-lime-600 disabled:cursor-not-allowed text-neutral-950 rounded-lg transition-colors font-medium"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Lock className="w-4 h-4" /> Update Password
                  </>
                )}
              </button>
            </form>

            {/* Back Button */}
            <Link
              to={isForgotPasswordFlow ? "/forgot-password" : "/profile"}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-white/10 hover:border-lime-400 text-gray-100 rounded-lg transition-colors font-medium mt-4"
            >
              <ArrowLeft className="w-4 h-4" /> {isForgotPasswordFlow ? "Back to Forgot Password" : "Back to Profile"}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </PageTransition>
  )
}

export default ChangePassword
