"use client"

import { motion } from "framer-motion"
import { Camera, MessageCircle, GraduationCap, ShoppingBag, Truck, MapPin, Zap, Shield, Users } from "lucide-react"
import PageTransition from "../components/PageTransition"
import { Link } from "react-router-dom" // Correct import

const Features = () => {
  const mainFeatures = [
    {
      icon: Camera,
      title: "AI Waste Classifier",
      desc: "Advanced computer vision technology that instantly identifies waste types from photos and provides detailed recycling instructions.",
      details: ["Real-time image recognition", "Detailed recycling guides", "Material composition analysis"],
      link: "/waste-classifier",
    },
    {
      icon: MessageCircle,
      title: "Smart Eco-Chatbot",
      desc: "Your personal sustainability assistant powered by AI, ready to answer questions about recycling and eco-friendly living.",
      details: ["24/7 availability", "Personalized recommendations", "Multi-language support"],
      link: "/chatbot",
    },
    {
      icon: GraduationCap,
      title: "Gamified Learning Hub",
      desc: "Interactive educational modules with video content, quizzes, and achievement systems to make learning fun.",
      details: ["Video tutorials", "Progress tracking", "Achievement badges"],
      link: "/learn",
    },
  ]

  const additionalFeatures = [
    { icon: ShoppingBag, title: "Eco-Commerce", desc: "Curated marketplace for sustainable products" },
    { icon: Truck, title: "Waste Collection", desc: "Connect with local recycling services" },
    { icon: MapPin, title: "Location Services", desc: "Find nearby recycling centers" },
    { icon: Zap, title: "Real-time Analytics", desc: "Track your environmental impact" },
    { icon: Shield, title: "Data Security", desc: "Your privacy is our priority" },
    { icon: Users, title: "Community", desc: "Connect with eco-conscious users" },
  ]

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-6 py-24 space-y-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight">Powerful Features</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Discover all the tools and capabilities that make SWMS the ultimate waste management solution.
          </p>
        </motion.div>

        {/* Main Features */}
        <div className="space-y-16">
          {mainFeatures.map((feature, index) => (
            <Link
              key={feature.title}
              to={feature.link} // Corrected from 'href' to 'to'
              className={`flex flex-col lg:flex-row items-center gap-12 group ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="flex-1 space-y-6"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-lime-500/20 border border-lime-500/30 group-hover:bg-lime-500/30 transition-colors">
                    <feature.icon className="w-8 h-8 text-lime-400" />
                  </div>
                  <h2 className="text-2xl font-semibold group-hover:text-lime-300 transition-colors">
                    {feature.title}
                  </h2>
                </div>
                <p className="text-gray-300 text-lg">{feature.desc}</p>
                <ul className="space-y-2">
                  {feature.details.map((detail, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-lime-400"></div>
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="flex-1"
              >
                <div className="aspect-video rounded-lg bg-gradient-to-br from-emerald-900/50 to-neutral-900/50 border border-white/10 flex items-center justify-center group-hover:border-lime-400/50 transition-colors">
                  <feature.icon className="w-24 h-24 text-lime-400/50 group-hover:text-lime-400/70 transition-colors" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Additional Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="text-3xl font-semibold tracking-tight text-center">More Features</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="p-6 rounded-lg bg-neutral-900/80 border border-white/5 hover:border-lime-400/50 transition-all duration-300"
              >
                <feature.icon className="w-8 h-8 text-lime-400 mb-4" />
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-300">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </PageTransition>
  )
}

export default Features
