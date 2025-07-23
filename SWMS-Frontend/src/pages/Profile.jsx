// "use client"

// import { motion } from "framer-motion"
// import { User, Mail, Edit, LogOut, Loader2, CheckCircle, XCircle, Lock, ArrowLeft } from "lucide-react"
// import { useState, useEffect } from "react"
// import { Link } from "react-router-dom"
// import PageTransition from "../components/PageTransition"
// import { useAuth } from "../context/AuthContext"
// import api from "../utils/api"
// import Swal from "sweetalert2"

// const Profile = () => {
// 	const { user, logout, updateUser, loading: authLoading } = useAuth()

// 	const [name, setName] = useState(user?.name || "")
// 	const [email, setEmail] = useState(user?.email || "")
// 	const [isEditing, setIsEditing] = useState(false)
// 	const [isLoading, setIsLoading] = useState(false)
// 	const [apiError, setApiError] = useState(null)
// 	const [successMessage, setSuccessMessage] = useState(null)

// 	// useEffect(() => {
// 	// 	window.location.reload() 
// 	// 	setName(user?.name || "")
// 	// 	setEmail(user?.email || "")
// 	// 	setApiError(null)
// 	// 	setSuccessMessage(null)
// 	// }, [user, isEditing])


// 	useEffect(() => {
//   const hasReloaded = sessionStorage.getItem("hasReloaded")

//   if (!hasReloaded) {
//     sessionStorage.setItem("hasReloaded", "true")
//     window.location.reload()
//   } else {
//     // This part runs after reload
//     setName(user?.name || "")
//     setEmail(user?.email || "")
//     setApiError(null)
//     setSuccessMessage(null)
//   }
// }, [user, isEditing])

// 	const handleSaveName = async () => {
// 		setApiError(null)
// 		setSuccessMessage(null)

// 		if (!user || !user.id) {
// 			Swal.fire({
// 				icon: "error",
// 				title: "User data not loaded",
// 				text: "Please try again.",
// 			})
// 			return
// 		}

// 		if (name === user?.name) {
// 			Swal.fire({
// 				icon: "info",
// 				title: "No changes detected",
// 				text: "The name has not been changed.",
// 			})
// 			setIsEditing(false)
// 			return
// 		}

// 		const result = await Swal.fire({
// 			title: "Are you sure?",
// 			text: "You are about to update your name.",
// 			icon: "question",
// 			showCancelButton: true,
// 			confirmButtonColor: "#84cc16",
// 			cancelButtonColor: "#d33",
// 			confirmButtonText: "Yes, update it!",
// 		})

// 		if (!result.isConfirmed) return

// 		setIsLoading(true)

// 		try {
// 			const nameUpdateRes = await api.put(`/user/${user.id}`, { name })
// 			updateUser(nameUpdateRes.data.user)
// 			setIsEditing(false)

// 			Swal.fire({
// 				icon: "success",
// 				title: "Profile Updated",
// 				text: "Your name has been updated successfully!",
// 				timer: 2000,
// 				showConfirmButton: false,
// 			})
// 		} catch (err) {
// 			console.error("Profile name update error:", err)
// 			Swal.fire({
// 				icon: "error",
// 				title: "Update Failed",
// 				text: err.response?.data?.message || "Failed to update profile name. Please try again.",
// 			})
// 		} finally {
// 			setIsLoading(false)
// 		}
// 	}

// 	const isSaveDisabled = isLoading || authLoading

// 	return (
// 		<PageTransition>
// 			<div className="mx-auto max-w-4xl px-6 py-24 space-y-12">
// 				{/* Header */}
// 				<motion.div
// 					initial={{ opacity: 0, y: 30 }}
// 					animate={{ opacity: 1, y: 0 }}
// 					transition={{ duration: 0.8 }}
// 					className="space-y-4"
// 				>
// 					<h1 className="text-4xl lg:text-5xl font-semibold tracking-tight">Your Profile</h1>
// 					<p className="text-gray-300 max-w-2xl">Manage your account information and preferences.</p>
// 				</motion.div>

// 				<motion.div
// 					initial={{ opacity: 0, y: 30 }}
// 					animate={{ opacity: 1, y: 0 }}
// 					transition={{ duration: 0.8, delay: 0.2 }}
// 					className="bg-neutral-900/80 border border-white/5 rounded-xl p-8 space-y-8"
// 				>
// 					{/* Profile Header */}
// 					<div className="flex items-center gap-6">
// 						<img
// 							src={user?.profileImage || "/images/guest-user.webp"}
// 							alt={user?.name || "User Profile"}
// 							className="w-24 h-24 rounded-full object-cover border-2 border-lime-400"
// 						/>
// 						<div>
// 							<h2 className="text-2xl font-semibold">{user?.name || "Guest User"}</h2>
// 							<p className="text-gray-400 text-sm">
// 								Joined{" "}
// 								{user?.createdAt
// 									? new Date(user.createdAt).toLocaleDateString("en-US", {
// 											year: "numeric",
// 											month: "long",
// 											day: "numeric",
// 									  })
// 									: "N/A"}
// 							</p>
// 						</div>
// 						<button
// 							onClick={() => {
// 								setIsEditing(!isEditing)
// 								setApiError(null)
// 								setSuccessMessage(null)
// 							}}
// 							className="ml-auto p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 transition-colors"
// 							aria-label={isEditing ? "Cancel editing" : "Edit profile"}
// 							disabled={authLoading}
// 						>
// 							<Edit className="w-5 h-5 text-lime-400" />
// 						</button>
// 					</div>

// 					{/* Feedback Messages */}
// 					{apiError && (
// 						<motion.div
// 							initial={{ opacity: 0, y: -10 }}
// 							animate={{ opacity: 1, y: 0 }}
// 							className="flex items-center gap-2 text-red-400 text-sm bg-red-900/20 border border-red-500/30 rounded-lg p-3"
// 						>
// 							<XCircle className="w-5 h-5" />
// 							<span>{apiError}</span>
// 						</motion.div>
// 					)}
// 					{successMessage && (
// 						<motion.div
// 							initial={{ opacity: 0, y: -10 }}
// 							animate={{ opacity: 1, y: 0 }}
// 							className="flex items-center gap-2 text-green-400 text-sm bg-green-900/20 border border-green-500/30 rounded-lg p-3"
// 						>
// 							<CheckCircle className="w-5 h-5" />
// 							<span>{successMessage}</span>
// 						</motion.div>
// 					)}
// 					<div>
// 						<label className="block text-sm font-medium mb-2">Total Eco Coins</label>
// 						<div className="relative">
// 							<CheckCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-400 w-5 h-5" />
// 							<input
// 								type="text"
// 								value={user?.ecoPoints ?? 0}
// 								disabled
// 								className="w-full pl-12 pr-4 py-3 bg-neutral-800 border border-white/10 rounded-lg text-yellow-300 font-semibold focus:outline-none transition-colors cursor-not-allowed"
// 							/>
// 						</div>
// 					{/* Account Information */}
// 					<div className="space-y-6">
// 						<h3 className="text-xl font-semibold">Account Information</h3>
// 					</div>

// 						{authLoading ? (
// 							<div className="text-center py-8">
// 								<Loader2 className="w-8 h-8 border-4 border-lime-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
// 								<p className="text-gray-400">Loading user data...</p>
// 							</div>
// 						) : (
// 							<div className="space-y-4">
// 								{/* Name */}
// 								<div>
// 									<label htmlFor="name" className="block text-sm font-medium mb-2">
// 										Name
// 									</label>
// 									<div className="relative">
// 										<User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
// 										<input
// 											type="text"
// 											id="name"
// 											name="name"
// 											value={name}
// 											onChange={(e) => setName(e.target.value)}
// 											disabled={!isEditing}
// 											className={`w-full pl-12 pr-4 py-3 bg-neutral-800 border rounded-lg focus:outline-none transition-colors ${
// 												isEditing
// 													? "border-lime-400"
// 													: "border-white/10 cursor-not-allowed"
// 											}`}
// 										/>
// 									</div>
// 								</div>

// 								{/* Email (Read-only) */}
// 								<div>
// 									<label htmlFor="email" className="block text-sm font-medium mb-2">
// 										Email
// 									</label>
// 									<div className="relative">
// 										<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
// 										<input
// 											type="email"
// 											id="email"
// 											name="email"
// 											value={email}
// 											disabled
// 											className="w-full pl-12 pr-4 py-3 bg-neutral-800 border border-white/10 rounded-lg focus:outline-none transition-colors cursor-not-allowed"
// 										/>
// 									</div>
// 								</div>
// 							</div>
// 						)}

// 						{/* Save Button */}
// 						{isEditing && (
// 							<motion.button
// 								initial={{ opacity: 0, y: 10 }}
// 								animate={{ opacity: 1, y: 0 }}
// 								transition={{ duration: 0.3 }}
// 								onClick={handleSaveName}
// 								disabled={isSaveDisabled}
// 								className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-lime-500 hover:bg-lime-400 disabled:bg-lime-600 disabled:cursor-not-allowed text-neutral-950 rounded-lg transition-colors font-medium"
// 							>
// 								{isLoading ? (
// 									<Loader2 className="w-5 h-5 animate-spin" />
// 								) : (
// 									<>
// 										<Edit className="w-4 h-4" /> Save Name
// 									</>
// 								)}
// 							</motion.button>
// 						)}

// 						{/* Change Password */}
// 						<Link
// 							to="/change-password"
// 							className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-white/10 hover:border-lime-400 text-gray-100 rounded-lg transition-colors font-medium mt-4"
// 						>
// 							<Lock className="w-4 h-4" /> Change Password
// 						</Link>
// 					</div>

// 					{/* Back to Dashboard */}
// 					<Link
// 						to="/dashboard"
// 						className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-white/10 hover:border-white/30 text-white rounded-lg transition-colors font-medium"
// 					>
// 						<ArrowLeft className="w-5 h-5" /> Back to Dashboard
// 					</Link>

// 					{/* Logout */}
// 					<motion.button
// 						initial={{ opacity: 0, y: 10 }}
// 						animate={{ opacity: 1, y: 0 }}
// 						transition={{ duration: 0.3, delay: 0.3 }}
// 						onClick={logout}
// 						className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors font-medium"
// 					>
// 						<LogOut className="w-5 h-5" /> Logout
// 					</motion.button>
// 				</motion.div>
// 			</div>
// 		</PageTransition>
// 	)
// }

// export default Profile

"use client"

import { motion } from "framer-motion"
import { User, Mail, Edit, LogOut, Loader2, CheckCircle, XCircle, Lock, ArrowLeft } from "lucide-react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import PageTransition from "../components/PageTransition"
import { useAuth } from "../context/AuthContext"
import api from "../utils/api"
import Swal from "sweetalert2"

const Profile = () => {
	const { user, logout, updateUser, loading: authLoading } = useAuth()

	const [name, setName] = useState(user?.name || "")
	const [email, setEmail] = useState(user?.email || "")
	const [ecoPoints, setEcoPoints] = useState(0)
	const [isEditing, setIsEditing] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [apiError, setApiError] = useState(null)
	const [successMessage, setSuccessMessage] = useState(null)

	useEffect(() => {
		setName(user?.name || "")
		setEmail(user?.email || "")
		setApiError(null)
		setSuccessMessage(null)

		const fetchEcoPoints = async () => {
			try {
				if (user?.id) {
					const res = await api.get(`/user/${user.id}/eco-points`, {
						headers: {
							Authorization: `Bearer ${localStorage.getItem("token")}`
						}
					})
					setEcoPoints(res.data.ecoPoints || 0)
				}
			} catch (err) {
				console.error("Failed to fetch ecoPoints:", err)
				setEcoPoints(0)
			}
		}

		if (user) fetchEcoPoints()
	}, [user, isEditing])

	const handleSaveName = async () => {
		setApiError(null)
		setSuccessMessage(null)

		if (!user?.id) {
			Swal.fire({
				icon: "error",
				title: "User data not loaded",
				text: "Please try again.",
			})
			return
		}

		if (name === user.name) {
			Swal.fire({
				icon: "info",
				title: "No changes detected",
				text: "The name has not been changed.",
			})
			setIsEditing(false)
			return
		}

		const result = await Swal.fire({
			title: "Are you sure?",
			text: "You are about to update your name.",
			icon: "question",
			showCancelButton: true,
			confirmButtonColor: "#84cc16",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, update it!",
		})

		if (!result.isConfirmed) return

		setIsLoading(true)

		try {
			const nameUpdateRes = await api.put(`/user/${user.id}`, { name })
			updateUser(nameUpdateRes.data.user)
			setIsEditing(false)

			Swal.fire({
				icon: "success",
				title: "Profile Updated",
				text: "Your name has been updated successfully!",
				timer: 2000,
				showConfirmButton: false,
			})
		} catch (err) {
			console.error("Profile name update error:", err)
			Swal.fire({
				icon: "error",
				title: "Update Failed",
				text: err.response?.data?.message || "Failed to update profile name. Please try again.",
			})
		} finally {
			setIsLoading(false)
		}
	}

	const isSaveDisabled = isLoading || authLoading

	return (
		<PageTransition>
			<div className="mx-auto max-w-4xl px-6 py-24 space-y-12">
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="space-y-4"
				>
					<h1 className="text-4xl lg:text-5xl font-semibold tracking-tight">Your Profile</h1>
					<p className="text-gray-300 max-w-2xl">Manage your account information and preferences.</p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
					className="bg-neutral-900/80 border border-white/5 rounded-xl p-8 space-y-8"
				>
					{/* Profile Header */}
					<div className="flex items-center gap-6">
						<img
							src={user?.profileImage || "/images/guest-user.webp"}
							alt={user?.name || "User Profile"}
							className="w-24 h-24 rounded-full object-cover border-2 border-lime-400"
						/>
						<div>
							<h2 className="text-2xl font-semibold">{user?.name || "Guest User"}</h2>
							<p className="text-gray-400 text-sm">
								Joined{" "}
								{user?.createdAt
									? new Date(user.createdAt).toLocaleDateString("en-US", {
											year: "numeric",
											month: "long",
											day: "numeric",
									  })
									: "N/A"}
							</p>
						</div>
						<button
							onClick={() => {
								setIsEditing(!isEditing)
								setApiError(null)
								setSuccessMessage(null)
							}}
							className="ml-auto p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 transition-colors"
							aria-label={isEditing ? "Cancel editing" : "Edit profile"}
							disabled={authLoading}
						>
							<Edit className="w-5 h-5 text-lime-400" />
						</button>
					</div>

					{/* Feedback Messages */}
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

					{/* Eco Coins */}
					<div>
						<label className="block text-sm font-medium mb-2">Total Eco Coins</label>
						<div className="relative">
							<CheckCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-400 w-5 h-5" />
							<input
								type="text"
								value={ecoPoints}
								disabled
								className="w-full pl-12 pr-4 py-3 bg-neutral-800 border border-white/10 rounded-lg text-yellow-300 font-semibold focus:outline-none transition-colors cursor-not-allowed"
							/>
						</div>
					</div>

					{/* Account Information */}
					<div className="space-y-6">
						<h3 className="text-xl font-semibold">Account Information</h3>
						{authLoading ? (
							<div className="text-center py-8">
								<Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-lime-400" />
								<p className="text-gray-400">Loading user data...</p>
							</div>
						) : (
							<div className="space-y-4">
								{/* Name */}
								<div>
									<label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
									<div className="relative">
										<User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
										<input
											type="text"
											id="name"
											value={name}
											onChange={(e) => setName(e.target.value)}
											disabled={!isEditing}
											className={`w-full pl-12 pr-4 py-3 bg-neutral-800 border rounded-lg focus:outline-none transition-colors ${
												isEditing ? "border-lime-400" : "border-white/10 cursor-not-allowed"
											}`}
										/>
									</div>
								</div>

								{/* Email */}
								<div>
									<label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
									<div className="relative">
										<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
										<input
											type="email"
											id="email"
											value={email}
											disabled
											className="w-full pl-12 pr-4 py-3 bg-neutral-800 border border-white/10 rounded-lg focus:outline-none transition-colors cursor-not-allowed"
										/>
									</div>
								</div>
							</div>
						)}
					</div>

					{/* Save Button */}
					{isEditing && (
						<motion.button
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3 }}
							onClick={handleSaveName}
							disabled={isSaveDisabled}
							className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-lime-500 hover:bg-lime-400 disabled:bg-lime-600 disabled:cursor-not-allowed text-neutral-950 rounded-lg transition-colors font-medium"
						>
							{isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>
								<Edit className="w-4 h-4" /> Save Name
							</>}
						</motion.button>
					)}

					{/* Change Password */}
					<Link
						to="/change-password"
						className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-white/10 hover:border-lime-400 text-gray-100 rounded-lg transition-colors font-medium mt-4"
					>
						<Lock className="w-4 h-4" /> Change Password
					</Link>

					{/* Back to Dashboard */}
					<Link
						to="/dashboard"
						className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-white/10 hover:border-white/30 text-white rounded-lg transition-colors font-medium"
					>
						<ArrowLeft className="w-5 h-5" /> Back to Dashboard
					</Link>

					{/* Logout */}
					<motion.button
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3, delay: 0.3 }}
						onClick={logout}
						className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors font-medium"
					>
						<LogOut className="w-5 h-5" /> Logout
					</motion.button>
				</motion.div>
			</div>
		</PageTransition>
	)
}

export default Profile
