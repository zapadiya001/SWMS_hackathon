// import { motion } from "framer-motion"
// import { Play, Award, Trophy, Star, Clock, Users } from "lucide-react"
// import PageTransition from "../components/PageTransition"
// import { useEffect, useState } from "react"
// import axios from "axios"

// const Learn = () => {

//   const [courses, setCourses] = useState([])

//   useEffect(() => {
//     const fetchVideos = async () => {
//       try {
//         const res = await axios.get("http://localhost:9705/educationVideo") // Use your actual API base URL
//         setCourses(res.data.data) // Adjust if your API response structure is different
//       } catch (err) {
//         console.error("Error fetching videos:", err)
//       }
//     }

//     fetchVideos()
//   }, [])

//   const handleWatch = async (video) => {
//   // 1. Open the video
//   window.open(video.videoUrl, "_blank")

//   // 2. Mark as watched via backend
//   try {
//     const token = localStorage.getItem("token") // adjust if using context or cookies
//     await axios.post("http://localhost:9705/progress/mark-watched", {
//       videoId: video._id,
//     }, {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//     console.log("Marked as watched!")
//   } catch (err) {
//     console.error("Failed to mark video as watched:", err)
//   }
// }

//   const badges = [
//     { name: "Eco-Mate", color: "bg-green-500", earned: true },
//     { name: "Recycle Pro", color: "bg-blue-500", earned: true },
//     { name: "Ultimate Eco-Champion", color: "bg-purple-500", earned: false },
//   ]

//   const leaderboard = [
//     { name: "Jordan", score: "100%", badge: "Ultimate Eco-Champion", rank: 1 },
//     { name: "Alex", score: "92%", badge: "Recycle Pro", rank: 2 },
//     { name: "Sam", score: "88%", badge: "Eco-Mate", rank: 3 },
//     { name: "Taylor", score: "85%", badge: "Eco-Mate", rank: 4 },
//     { name: "Casey", score: "82%", badge: "Eco-Mate", rank: 5 },
//   ]

//   // const courses = [
//   //   {
//   //     title: "Waste Classification Basics",
//   //     duration: "15 min",
//   //     lessons: 5,
//   //     progress: 100,
//   //     thumbnail: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&q=80",
//   //   },
//   //   {
//   //     title: "Advanced Recycling Techniques",
//   //     duration: "25 min",
//   //     lessons: 8,
//   //     progress: 60,
//   //     thumbnail: "https://images.unsplash.com/photo-1621619856624-42fd193a0661?w=400&q=80",
//   //   },
//   //   {
//   //     title: "Sustainable Living Guide",
//   //     duration: "30 min",
//   //     lessons: 10,
//   //     progress: 30,
//   //     thumbnail: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&q=80",
//   //   },
//   // ]

//   return (
//     <PageTransition>
//       <div className="mx-auto max-w-7xl px-6 py-24 space-y-16">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-center space-y-4"
//         >
//           <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight">Learn & Earn Badges</h1>
//           <p className="text-gray-300 max-w-2xl mx-auto">
//             Short expert-curated videos keep you engaged while milestones reward your dedication.
//           </p>
//         </motion.div>

//         {/* Badges Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//           className="text-center space-y-6"
//         >
//           <h2 className="text-2xl font-semibold">Your Achievements</h2>
//           <div className="flex justify-center gap-4 flex-wrap">
//             {badges.map((badge, index) => (
//               <motion.div
//                 key={badge.name}
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 viewport={{ once: true }}
//                 className={`px-6 py-3 rounded-full text-sm font-medium ${
//                   badge.earned ? `${badge.color} text-white` : "bg-neutral-800 text-gray-400 border border-white/10"
//                 }`}
//               >
//                 <div className="flex items-center gap-2">
//                   {badge.earned ? <Award className="w-4 h-4" /> : <Star className="w-4 h-4" />}
//                   {badge.name}
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>

//         {/* Featured Video */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//           className="bg-emerald-900/25 backdrop-blur rounded-xl p-8"
//         >
//           <div className="flex flex-col lg:flex-row gap-8 items-center">
//             <div className="flex-1 space-y-4">
//               <h2 className="text-2xl font-semibold">Featured: Waste Sorting Fundamentals</h2>
//               <p className="text-gray-300">
//                 Learn the basics of proper waste classification and recycling techniques in this comprehensive guide.
//               </p>
//               <div className="flex items-center gap-4 text-sm text-gray-400">
//                 <div className="flex items-center gap-1">
//                   <Clock className="w-4 h-4" />
//                   12 minutes
//                 </div>
//                 <div className="flex items-center gap-1">
//                   <Users className="w-4 h-4" />
//                   1.2k views
//                 </div>
//               </div>
//             </div>
//             <div className="flex-1">
//               <div className="aspect-video rounded-lg overflow-hidden border border-white/10 relative group cursor-pointer">
//                 <img
//                   src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&q=80"
//                   alt="Educational video thumbnail"
//                   className="w-full h-full object-cover"
//                 />
//                 <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-colors">
//                   <div className="w-16 h-16 rounded-full bg-lime-500 flex items-center justify-center group-hover:scale-110 transition-transform">
//                     <Play className="w-6 h-6 text-neutral-950 ml-1" fill="currentColor" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         {/* Courses Grid */}
//         <div className="space-y-8">
//           <motion.h2
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             viewport={{ once: true }}
//             className="text-2xl font-semibold"
//           >
//             Available Courses
//           </motion.h2>
//           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//             {courses.map((video, index) => {
//               // Extract YouTube thumbnail
//               const getYouTubeThumbnail = (url) => {
//                 const videoIdMatch = url.match(/(?:\?v=|\/embed\/|\.be\/)([\w\-]+)/)
//                 const videoId = videoIdMatch?.[1]
//                 return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : "/placeholder.svg"
//               }

//               return (
//                 <motion.div
//                   key={video._id}
//                   onClick={()=> handleWatch(video)}
//                   initial={{ opacity: 0, y: 30 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.6, delay: index * 0.1 }}
//                   viewport={{ once: true }}
//                   whileHover={{ y: -5 }}
//                   className="bg-neutral-900/80 border border-white/5 rounded-xl overflow-hidden hover:border-lime-400/50 transition-all duration-300"
//                 >
//                   <div className="aspect-video relative">
//                     <img
//                       src={getYouTubeThumbnail(video.videoUrl)}
//                       alt={video.title}
//                       className="w-full h-full object-cover"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
//                   </div>
//                   <div className="p-6 space-y-3">
//                     <h3 className="font-semibold">{video.title}</h3>
//                     <div className="flex items-center gap-4 text-sm text-gray-400">
//                       <span>{video.description}</span>
//                     </div>
//                     <div className="text-sm text-lime-400">Watch now</div>
//                   </div>
//                 </motion.div>
//               )
//             })}
//           </div>

//         </div>

//         {/* Leaderboard */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//           className="bg-neutral-900/90 border border-white/5 rounded-xl p-6"
//         >
//           <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
//             <Trophy className="w-5 h-5 text-lime-400" />
//             Quiz Leaderboard
//           </h2>
//           <div className="overflow-x-auto">
//             <table className="w-full text-sm">
//               <thead>
//                 <tr className="text-left text-gray-400 border-b border-white/10">
//                   <th className="py-3">Rank</th>
//                   <th className="py-3">User</th>
//                   <th className="py-3">Score</th>
//                   <th className="py-3">Badge</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-white/5">
//                 {leaderboard.map((user, index) => (
//                   <motion.tr
//                     key={user.name}
//                     initial={{ opacity: 0, x: -20 }}
//                     whileInView={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.5, delay: index * 0.1 }}
//                     viewport={{ once: true }}
//                     className="hover:bg-white/5 transition-colors"
//                   >
//                     <td className="py-3">
//                       <div className="flex items-center gap-2">
//                         {user.rank <= 3 && (
//                           <Trophy
//                             className={`w-4 h-4 ${
//                               user.rank === 1 ? "text-yellow-500" : user.rank === 2 ? "text-gray-400" : "text-amber-600"
//                             }`}
//                           />
//                         )}
//                         #{user.rank}
//                       </div>
//                     </td>
//                     <td className="py-3 font-medium">{user.name}</td>
//                     <td className="py-3 text-lime-400">{user.score}</td>
//                     <td className="py-3">
//                       <span className="px-2 py-1 rounded text-xs bg-neutral-800 text-gray-300">{user.badge}</span>
//                     </td>
//                   </motion.tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </motion.div>
//       </div>
//     </PageTransition>
//   )
// }

// export default Learn
import { Link } from "react-router-dom"
import PageTransition from "../components/PageTransition"

const Learn = () => (
  <PageTransition>
    <div className="text-center py-24 space-y-6">
      <h1 className="text-4xl font-bold">Welcome to Learning Hub</h1>
      <p className="text-gray-300">Choose your learning type:</p>
      <div className="flex justify-center gap-6">
        <Link to="/learn/video" className="px-6 py-3 bg-lime-600 rounded-full text-white hover:scale-105 transition">
          📹 Video Courses
        </Link>
        <Link to="/learn/news" className="px-6 py-3 bg-emerald-700 rounded-full text-white hover:scale-105 transition">
          📰 Eco News
        </Link>
      </div>
    </div>
  </PageTransition>
)

export default Learn