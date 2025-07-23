"use client"

import { motion } from "framer-motion"
import { Mail, Send, Key, CheckCircle, XCircle, Loader2, ArrowLeft, ArrowRight } from "lucide-react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import PageTransition from "../components/PageTransition"
import api from "../utils/api"

const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [step, setStep] = useState("email") // 'email', 'otp', 'success'
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const navigate = useNavigate()

  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    setApiError(null)
    setSuccessMessage(null)
    setIsLoading(true)

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setApiError("Please enter a valid email address.")
      setIsLoading(false)
      return
    }

    try {
      // Simulate API call to request OTP
      const response = await api.post("/user/forgot-password-request", { email })
      setSuccessMessage(response.data.message || "OTP sent to your email!")
      setStep("otp") // Move to OTP input step
    } catch (err) {
      console.error("Forgot password request error:", err)
      setApiError(err.response?.data?.message || "Failed to send OTP. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleOtpSubmit = async (e) => {
    e.preventDefault()
    setApiError(null)
    setSuccessMessage(null)
    setIsLoading(true)

    if (!otp || otp.length !== 6 || !/^\d+$/.test(otp)) {
      setApiError("Please enter a valid 6-digit OTP.")
      setIsLoading(false)
      return
    }

    try {
      // Simulate OTP verification. In a real app, this would verify the OTP
      // and return a temporary token for password reset.
      // For this simulation, we'll just generate a dummy token and proceed.
      const dummyResetToken = `dummy_reset_token_${Date.now()}` // Replace with actual token from backend
      setSuccessMessage("OTP verified! Redirecting to password reset...")
      setTimeout(() => {
        navigate(`/change-password?token=${dummyResetToken}&email=${email}`) // Pass token and email to change password page
      }, 1500)
    } catch (err) {
      console.error("OTP verification error:", err)
      setApiError(err.response?.data?.message || "Invalid or expired OTP. Please try again.")
    } finally {
      setIsLoading(false)
    }
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
            <h1 className="text-3xl font-semibold tracking-tight">Forgot Password</h1>
            <p className="text-gray-300">
              {step === "email" && "Enter your email to receive a password reset OTP."}
              {step === "otp" && "Enter the 6-digit OTP sent to your email."}
            </p>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-neutral-900/80 border border-white/5 rounded-xl p-8 space-y-6"
          >
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

            {step === "email" && (
              <form onSubmit={handleEmailSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@example.com"
                      className="w-full pl-12 pr-4 py-3 bg-neutral-800 border border-white/10 rounded-lg focus:border-lime-400 focus:outline-none transition-colors"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-lime-500 hover:bg-lime-400 disabled:bg-lime-600 disabled:cursor-not-allowed text-neutral-950 rounded-lg transition-colors font-medium"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Get OTP <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {step === "otp" && (
              <form onSubmit={handleOtpSubmit} className="space-y-6">
                <div>
                  <label htmlFor="otp" className="block text-sm font-medium mb-2">
                    OTP
                  </label>
                  <div className="relative">
                    <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      id="otp"
                      name="otp"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter 6-digit OTP"
                      maxLength="6"
                      className="w-full pl-12 pr-4 py-3 bg-neutral-800 border border-white/10 rounded-lg focus:border-lime-400 focus:outline-none transition-colors"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-lime-500 hover:bg-lime-400 disabled:bg-lime-600 disabled:cursor-not-allowed text-neutral-950 rounded-lg transition-colors font-medium"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Verify OTP <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setStep("email")}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-white/10 hover:border-lime-400 text-gray-100 rounded-lg transition-colors font-medium mt-4"
                >
                  <ArrowLeft className="w-4 h-4" /> Resend OTP / Change Email
                </button>
              </form>
            )}

            {/* Back to Login Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center"
            >
              <p className="text-gray-400">
                Remembered your password?{" "}
                <Link to="/login" className="text-lime-400 hover:text-lime-300 transition-colors font-medium">
                  Sign in here
                </Link>
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </PageTransition>
  )
}

export default ForgotPassword
