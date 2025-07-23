import { motion } from "framer-motion"
import {
  ArrowRight,
  Camera,
  MessageCircle,
  GraduationCap,
  ClipboardList,
  ShoppingBag,
  Truck,
  MapPin,
} from "lucide-react"
import { Link } from "react-router-dom"
import PageTransition from "../components/PageTransition"

const Home = () => {
  const features = [
    {
      icon: Camera,
      title: "Waste Classifier",
      desc: "Upload a photo, get instant AI classification plus recycling tips.",
    },
    {
      icon: MessageCircle,
      title: "Eco-Chatbot",
      desc: "Ask anything about recycling, sustainable living and the app.",
    },
    {
      icon: GraduationCap,
      title: "Gamified Learning",
      desc: "Watch bite-sized videos, earn badges and level up your eco-IQ.",
    },
    { icon: ClipboardList, title: "Quizzes & Badges", desc: "Challenge yourself with MCQs after each module." },
    { icon: ShoppingBag, title: "Eco-Commerce", desc: "Discover hand-picked sustainable products." },
    {
      icon: Truck,
      title: "Sell Recyclables",
      desc: "Form-based flow to monetize your sorted trash with local collectors.",
    },
    { icon: MapPin, title: "Nearby Centers", desc: "Interactive map showing closest recycling points." },
  ]

  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden h-[80vh] flex items-center">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          src="https://images.unsplash.com/photo-1621619856624-42fd193a0661?w=1600&q=80"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          alt="Waste management background"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-800/40 via-transparent to-neutral-950/80"></div>

        <div className="relative mx-auto max-w-7xl px-6 w-full flex flex-col items-center text-center gap-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl lg:text-6xl font-semibold tracking-tight"
          >
            Smart Waste
            <br className="hidden lg:block" /> Management System
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-xl text-gray-300"
          >
            AI-powered waste classification, gamified learning, eco-commerce and more — all in one sleek dashboard.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              to="/features"
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-medium rounded transition-colors"
            >
              Explore Features <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="mx-auto max-w-7xl px-6 py-24 space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <h2 className="text-3xl font-semibold tracking-tight">All-in-One Feature Suite</h2>
          <p className="text-gray-300 max-w-2xl">
            Everything you need to recycle smarter, learn faster and live greener.
          </p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group border border-white/5 rounded-lg p-6 bg-neutral-900/80 hover:bg-neutral-800 hover:border-lime-400 transition-all duration-300"
            >
              <feature.icon className="w-6 h-6 text-lime-400 mb-4" />
              <h3 className="font-medium mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-300">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </PageTransition>
  )
}

export default Home
