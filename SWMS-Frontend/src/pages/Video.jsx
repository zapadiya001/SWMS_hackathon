import { motion } from "framer-motion";
import { Play, Award, Trophy, Star, Clock, Users } from "lucide-react";
import PageTransition from "../components/PageTransition";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const Video = () => {
  const [courses, setCourses] = useState([]);
  const userId = JSON.parse(localStorage.getItem("user"))?.id;

useEffect(() => {
  const fetchVideos = async () => {
    try {
      const res = await axios.get("http://localhost:9705/educationVideo");
      setCourses(res.data.data);
    } catch (err) {
      console.error("Error fetching videos:", err);
    }
  };

  fetchVideos();

  // 👇 Show toast ONLY when tab becomes visible again
  const handleVisibilityChange = () => {
    if (document.visibilityState === "visible") {
      const earned = localStorage.getItem("ecoPointsEarned");
      if (earned) {
        toast.success(`🎉 You earned ${earned} ecoPoints!`);
        localStorage.removeItem("ecoPointsEarned");
      }
    }
  };

  document.addEventListener("visibilitychange", handleVisibilityChange);

  return () => {
    document.removeEventListener("visibilitychange", handleVisibilityChange);
  };
}, []);



 const handleWatch = async (video) => {
  try {
    window.open(video.videoUrl, "_blank");

    const ecoRes = await axios.post(
      `http://localhost:9705/user/${userId}/watch-video`,
      { videoId: video._id },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const earnedPoints = ecoRes.data.ecoPoints;

    // ✅ Save in localStorage to show later
    localStorage.setItem("ecoPointsEarned", earnedPoints);

  } catch (err) {
    console.error("❌ Watch/update error:", err.response?.data || err.message);
    toast.error("Something went wrong! Try again.");
  }
};


  const badges = [
    { name: "Eco-Mate", color: "bg-green-500", earned: true },
    { name: "Recycle Pro", color: "bg-blue-500", earned: true },
    { name: "Ultimate Eco-Champion", color: "bg-purple-500", earned: false },
  ];

  const leaderboard = [
    { name: "Jordan", score: "100%", badge: "Ultimate Eco-Champion", rank: 1 },
    { name: "Alex", score: "92%", badge: "Recycle Pro", rank: 2 },
    { name: "Sam", score: "88%", badge: "Eco-Mate", rank: 3 },
    { name: "Taylor", score: "85%", badge: "Eco-Mate", rank: 4 },
    { name: "Casey", score: "82%", badge: "Eco-Mate", rank: 5 },
  ];

  const getYouTubeThumbnail = (url) => {
    const videoIdMatch = url.match(/(?:\?v=|\/embed\/|\.be\/)([\w\-]+)/);
    const videoId = videoIdMatch?.[1];
    return videoId
      ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
      : "/placeholder.svg";
  };

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-6 py-24 space-y-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight">
            Learn & Earn Badges
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Short expert-curated videos keep you engaged while milestones reward your dedication.
          </p>
        </motion.div>

        {/* Badges Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center space-y-6"
        >
          <h2 className="text-2xl font-semibold">Your Achievements</h2>
          <div className="flex justify-center gap-4 flex-wrap">
            {badges.map((badge, index) => (
              <motion.div
                key={badge.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`px-6 py-3 rounded-full text-sm font-medium ${
                  badge.earned
                    ? `${badge.color} text-white`
                    : "bg-neutral-800 text-gray-400 border border-white/10"
                }`}
              >
                <div className="flex items-center gap-2">
                  {badge.earned ? (
                    <Award className="w-4 h-4" />
                  ) : (
                    <Star className="w-4 h-4" />
                  )}
                  {badge.name}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Courses ListView */}
        <div className="space-y-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-2xl font-semibold"
          >
            Available Courses
          </motion.h2>
          <div className="flex flex-col gap-6">
            {courses.map((video, index) => (
              <motion.div
                key={video._id}
                onClick={() => handleWatch(video)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -2 }}
                className="bg-neutral-900/80 border border-white/5 rounded-xl overflow-hidden hover:border-lime-400/50 transition-all duration-300 flex flex-col md:flex-row cursor-pointer"
              >
                {/* Thumbnail */}
                <div className="w-full md:w-64 aspect-video md:aspect-auto">
                  <img
                    src={getYouTubeThumbnail(video.videoUrl)}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 p-6 space-y-2">
                  <h3 className="font-semibold text-lg">{video.title}</h3>
                  <p className="text-sm text-gray-400">{video.description}</p>
                  <div className="text-sm text-lime-400 font-medium">Watch now</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Video;
