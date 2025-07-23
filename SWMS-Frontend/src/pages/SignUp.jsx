"use client"

import { motion } from "framer-motion"
import { Mail, Lock, Eye, EyeOff, User, Phone, ArrowRight, Check } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import PageTransition from "../components/PageTransition"
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		password: "",
		confirmPassword: "",
		agreeToTerms: false,
		subscribeNewsletter: false,
	})
	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)
	const [errors, setErrors] = useState({})
	const [isLoading, setIsLoading] = useState(false)

	const handleInputChange = (e) => {
		const { name, value, type, checked } = e.target
		setFormData((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}))
		// Clear error when user starts typing
		if (errors[name]) {
			setErrors((prev) => ({
				...prev,
				[name]: "",
			}))
		}
	}

	const validateForm = () => {
		const newErrors = {}

		// First name validation
		if (!formData.firstName.trim()) {
			newErrors.firstName = "First name is required"
		} else if (formData.firstName.trim().length < 2) {
			newErrors.firstName = "First name must be at least 2 characters"
		}

		// Last name validation
		if (!formData.lastName.trim()) {
			newErrors.lastName = "Last name is required"
		} else if (formData.lastName.trim().length < 2) {
			newErrors.lastName = "Last name must be at least 2 characters"
		}

		// Email validation
		if (!formData.email) {
			newErrors.email = "Email is required"
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "Please enter a valid email address"
		}

		// Phone validation
		if (!formData.phone) {
			newErrors.phone = "Phone number is required"
		} else if (!/^\+?[\d\s\-$$$$]{10,}$/.test(formData.phone)) {
			newErrors.phone = "Please enter a valid phone number"
		}

		// Password validation
		if (!formData.password) {
			newErrors.password = "Password is required"
		} else if (formData.password.length < 8) {
			newErrors.password = "Password must be at least 8 characters"
		} else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
			newErrors.password = "Password must contain at least one uppercase letter, one lowercase letter, and one number"
		}

		// Confirm password validation
		if (!formData.confirmPassword) {
			newErrors.confirmPassword = "Please confirm your password"
		} else if (formData.password !== formData.confirmPassword) {
			newErrors.confirmPassword = "Passwords do not match"
		}

		// Terms agreement validation
		if (!formData.agreeToTerms) {
			newErrors.agreeToTerms = "You must agree to the terms and conditions"
		}

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (!validateForm()) return

		setIsLoading(true)

		try {
			const response = await fetch("http://localhost:9705/user/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: `${formData.firstName} ${formData.lastName}`,
					email: formData.email,
					password: formData.password,
					phone: formData.phone,
				}),
			})

			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.message || "Registration failed")
			}

			console.log("Registration successful:", data.user)

			// SweetAlert Success Alert
			Swal.fire({
				title: "🎉 Registration Successful!",
				text: "You're all set! Redirecting to login...",
				icon: "success",
				timer: 3000,
				timerProgressBar: true,
				showConfirmButton: true,
				confirmButtonColor: "#22c55e", // Tailwind lime-500
				background: "#1f2937", // Tailwind slate-800
				color: "#f1f5f9", // Tailwind slate-100
				iconColor: "#22c55e",
				customClass: {
					popup: "rounded-xl shadow-lg",
					title: "text-2xl font-semibold",
					confirmButton: "px-6 py-2 rounded bg-lime-500 text-neutral-900 font-semibold hover:bg-lime-400",
					timerProgressBar: "bg-lime-400",
				},
				didOpen: () => {
					const popup = Swal.getPopup()
					popup.classList.add("animate__animated", "animate__fadeInDown")
				},
			}).then(() => {
				navigate("/login")
			})
		} catch (err) {
			console.error("Error:", err.message)
			Swal.fire({
				title: "Error!",
				text: err.message,
				icon: "error",
				confirmButtonText: "Try Again"
			})
		} finally {
			setIsLoading(false)
		}
	}


	const getPasswordStrength = () => {
		const password = formData.password
		if (!password) return { strength: 0, label: "", color: "" }

		let strength = 0
		if (password.length >= 8) strength++
		if (/[a-z]/.test(password)) strength++
		if (/[A-Z]/.test(password)) strength++
		if (/\d/.test(password)) strength++
		if (/[^a-zA-Z\d]/.test(password)) strength++

		const labels = ["Very Weak", "Weak", "Fair", "Good", "Strong"]
		const colors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-blue-500", "bg-green-500"]

		return {
			strength: (strength / 5) * 100,
			label: labels[strength - 1] || "",
			color: colors[strength - 1] || "bg-gray-500",
		}
	}

	const passwordStrength = getPasswordStrength()

	return (
		<PageTransition>
			<div className="min-h-screen flex items-center justify-center px-6 py-24">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="w-full max-w-2xl space-y-8"
				>
					{/* Header */}
					<div className="text-center space-y-4">
						<h1 className="text-3xl font-semibold tracking-tight">Create Your Account</h1>
						<p className="text-gray-300">Join SWMS and start your sustainable journey</p>
					</div>

					{/* Form */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className="bg-neutral-900/80 border border-white/5 rounded-xl p-8 space-y-6"
					>
						<form onSubmit={handleSubmit} className="space-y-6">
							{/* Name Fields */}
							<div className="grid md:grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium mb-2">First Name</label>
									<div className="relative">
										<User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
										<input
											type="text"
											name="firstName"
											value={formData.firstName}
											onChange={handleInputChange}
											placeholder="Enter your first name"
											className={`w-full pl-12 pr-4 py-3 bg-neutral-800 border rounded-lg focus:outline-none transition-colors ${errors.firstName
												? "border-red-500 focus:border-red-400"
												: "border-white/10 focus:border-lime-400"
												}`}
										/>
									</div>
									{errors.firstName && (
										<motion.p
											initial={{ opacity: 0, y: -10 }}
											animate={{ opacity: 1, y: 0 }}
											className="text-red-400 text-sm mt-1"
										>
											{errors.firstName}
										</motion.p>
									)}
								</div>

								<div>
									<label className="block text-sm font-medium mb-2">Last Name</label>
									<div className="relative">
										<User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
										<input
											type="text"
											name="lastName"
											value={formData.lastName}
											onChange={handleInputChange}
											placeholder="Enter your last name"
											className={`w-full pl-12 pr-4 py-3 bg-neutral-800 border rounded-lg focus:outline-none transition-colors ${errors.lastName
												? "border-red-500 focus:border-red-400"
												: "border-white/10 focus:border-lime-400"
												}`}
										/>
									</div>
									{errors.lastName && (
										<motion.p
											initial={{ opacity: 0, y: -10 }}
											animate={{ opacity: 1, y: 0 }}
											className="text-red-400 text-sm mt-1"
										>
											{errors.lastName}
										</motion.p>
									)}
								</div>
							</div>

							{/* Email Field */}
							<div>
								<label className="block text-sm font-medium mb-2">Email Address</label>
								<div className="relative">
									<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
									<input
										type="email"
										name="email"
										value={formData.email}
										onChange={handleInputChange}
										placeholder="Enter your email"
										className={`w-full pl-12 pr-4 py-3 bg-neutral-800 border rounded-lg focus:outline-none transition-colors ${errors.email ? "border-red-500 focus:border-red-400" : "border-white/10 focus:border-lime-400"
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

							{/* Phone Field */}
							<div>
								<label className="block text-sm font-medium mb-2">Phone Number</label>
								<div className="relative">
									<Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
									<input
										type="tel"
										name="phone"
										value={formData.phone}
										onChange={handleInputChange}
										placeholder="Enter your phone number"
										className={`w-full pl-12 pr-4 py-3 bg-neutral-800 border rounded-lg focus:outline-none transition-colors ${errors.phone ? "border-red-500 focus:border-red-400" : "border-white/10 focus:border-lime-400"
											}`}
									/>
								</div>
								{errors.phone && (
									<motion.p
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										className="text-red-400 text-sm mt-1"
									>
										{errors.phone}
									</motion.p>
								)}
							</div>

							{/* Password Field */}
							<div>
								<label className="block text-sm font-medium mb-2">Password</label>
								<div className="relative">
									<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
									<input
										type={showPassword ? "text" : "password"}
										name="password"
										value={formData.password}
										onChange={handleInputChange}
										placeholder="Create a strong password"
										className={`w-full pl-12 pr-12 py-3 bg-neutral-800 border rounded-lg focus:outline-none transition-colors ${errors.password ? "border-red-500 focus:border-red-400" : "border-white/10 focus:border-lime-400"
											}`}
									/>
									<button
										type="button"
										onClick={() => setShowPassword(!showPassword)}
										className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
									>
										{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
									</button>
								</div>

								{/* Password Strength Indicator */}
								{formData.password && (
									<div className="mt-2 space-y-2">
										<div className="flex items-center gap-2">
											<div className="flex-1 h-2 bg-neutral-700 rounded-full overflow-hidden">
												<div
													className={`h-full transition-all duration-300 ${passwordStrength.color}`}
													style={{ width: `${passwordStrength.strength}%` }}
												></div>
											</div>
											<span className="text-xs text-gray-400">{passwordStrength.label}</span>
										</div>
									</div>
								)}

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

							{/* Confirm Password Field */}
							<div>
								<label className="block text-sm font-medium mb-2">Confirm Password</label>
								<div className="relative">
									<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
									<input
										type={showConfirmPassword ? "text" : "password"}
										name="confirmPassword"
										value={formData.confirmPassword}
										onChange={handleInputChange}
										placeholder="Confirm your password"
										className={`w-full pl-12 pr-12 py-3 bg-neutral-800 border rounded-lg focus:outline-none transition-colors ${errors.confirmPassword
											? "border-red-500 focus:border-red-400"
											: "border-white/10 focus:border-lime-400"
											}`}
									/>
									<button
										type="button"
										onClick={() => setShowConfirmPassword(!showConfirmPassword)}
										className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
									>
										{showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
									</button>
								</div>
								{errors.confirmPassword && (
									<motion.p
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										className="text-red-400 text-sm mt-1"
									>
										{errors.confirmPassword}
									</motion.p>
								)}
							</div>

							{/* Checkboxes */}
							<div className="space-y-4">
								<label className="flex items-start gap-3 cursor-pointer">
									<div className="relative flex-shrink-0 mt-0.5">
										<input
											type="checkbox"
											name="agreeToTerms"
											checked={formData.agreeToTerms}
											onChange={handleInputChange}
											className="sr-only"
										/>
										<div
											className={`w-5 h-5 rounded border-2 transition-colors ${formData.agreeToTerms ? "bg-lime-500 border-lime-500" : "border-white/20 bg-neutral-800"
												}`}
										>
											{formData.agreeToTerms && (
												<Check className="w-3 h-3 text-neutral-950 absolute top-0.5 left-0.5" />
											)}
										</div>
									</div>
									<span className="text-sm text-gray-300">
										I agree to the{" "}
										<Link to="/terms" className="text-lime-400 hover:text-lime-300 transition-colors">
											Terms of Service
										</Link>{" "}
										and{" "}
										<Link to="/privacy" className="text-lime-400 hover:text-lime-300 transition-colors">
											Privacy Policy
										</Link>
									</span>
								</label>
								{errors.agreeToTerms && (
									<motion.p
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										className="text-red-400 text-sm"
									>
										{errors.agreeToTerms}
									</motion.p>
								)}

								<label className="flex items-start gap-3 cursor-pointer">
									<div className="relative flex-shrink-0 mt-0.5">
										<input
											type="checkbox"
											name="subscribeNewsletter"
											checked={formData.subscribeNewsletter}
											onChange={handleInputChange}
											className="sr-only"
										/>
										<div
											className={`w-5 h-5 rounded border-2 transition-colors ${formData.subscribeNewsletter ? "bg-lime-500 border-lime-500" : "border-white/20 bg-neutral-800"
												}`}
										>
											{formData.subscribeNewsletter && (
												<Check className="w-3 h-3 text-neutral-950 absolute top-0.5 left-0.5" />
											)}
										</div>
									</div>
									<span className="text-sm text-gray-300">Subscribe to our newsletter for eco-tips and updates</span>
								</label>
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
										Create Account
										<ArrowRight className="w-4 h-4" />
									</>
								)}
							</button>
						</form>

						{/* Divider */}
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-white/10"></div>
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="px-2 bg-neutral-900 text-gray-400">Or sign up with</span>
							</div>
						</div>

						{/* Social Login */}
						<div className="grid grid-cols-2 gap-4">
							<button className="flex items-center justify-center gap-2 px-4 py-2 border border-white/10 hover:border-white/20 rounded-lg transition-colors">
								<svg className="w-5 h-5" viewBox="0 0 24 24">
									<path
										fill="currentColor"
										d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
									/>
									<path
										fill="currentColor"
										d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
									/>
									<path
										fill="currentColor"
										d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
									/>
									<path
										fill="currentColor"
										d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
									/>
								</svg>
								Google
							</button>
							<button className="flex items-center justify-center gap-2 px-4 py-2 border border-white/10 hover:border-white/20 rounded-lg transition-colors">
								<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
									<path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
								</svg>
								Twitter
							</button>
						</div>
					</motion.div>

					{/* Login Link */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.8, delay: 0.4 }}
						className="text-center"
					>
						<p className="text-gray-400">
							Already have an account?{" "}
							<Link to="/login" className="text-lime-400 hover:text-lime-300 transition-colors font-medium">
								Sign in here
							</Link>
						</p>
					</motion.div>
				</motion.div>
			</div>
		</PageTransition>
	)
}

export default SignUp
