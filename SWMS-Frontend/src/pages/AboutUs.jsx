"use client"

import { motion } from "framer-motion"
import { Target, Eye, Heart, Leaf, Users, Globe } from "lucide-react"
import PageTransition from "../components/PageTransition"

const AboutUs = () => {
  const values = [
    {
      icon: Leaf,
      title: "Sustainability",
      description: "Committed to promoting eco-friendly practices and reducing environmental impact.",
    },
    {
      icon: Users,
      title: "Community",
      description: "Fostering a global community dedicated to responsible waste management.",
    },
    {
      icon: Heart,
      title: "Innovation",
      description: "Continuously developing cutting-edge solutions for a greener future.",
    },
    {
      icon: Globe,
      title: "Impact",
      description: "Driving measurable positive change in waste reduction and recycling worldwide.",
    },
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
          <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight">About SWMS</h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Our mission is to revolutionize waste management through technology and education.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row items-center gap-12"
        >
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-lime-500/20 border border-lime-500/30">
                <Target className="w-8 h-8 text-lime-400" />
              </div>
              <h2 className="text-2xl font-semibold">Our Mission</h2>
            </div>
            <p className="text-gray-300 text-lg">
              At SWMS, we believe in a world where waste is a resource, not a burden. Our mission is to empower
              individuals and communities with smart tools and knowledge to manage waste efficiently, promote recycling,
              and foster sustainable living habits. We aim to make environmental responsibility accessible and rewarding
              for everyone.
            </p>
          </div>
          <div className="flex-1">
            <img
              src="https://d18x2uyjeekruj.cloudfront.net/wp-content/uploads/2023/03/waste.jpg"
              alt="Our Mission"
              className="rounded-lg object-cover aspect-video border border-white/10"
            />
          </div>
        </motion.div>

        {/* Vision Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row-reverse items-center gap-12"
        >
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-lime-500/20 border border-lime-500/30">
                <Eye className="w-8 h-8 text-lime-400" />
              </div>
              <h2 className="text-2xl font-semibold">Our Vision</h2>
            </div>
            <p className="text-gray-300 text-lg">
              We envision a future where waste is minimized, resources are conserved, and communities thrive in harmony
              with nature. Through continuous innovation and user engagement, SWMS strives to be the leading platform
              for sustainable waste management globally, inspiring a collective shift towards a circular economy.
            </p>
          </div>
          <div className="flex-1">
            <img
              src="https://waste-management-world.com/imager/media/wasteManagementWorld/5688499/AdobeStock_786644632_428fd902f4247199467725e7eccf1673.jpeg"
              alt="Our Vision"
              className="rounded-lg object-cover aspect-video border border-white/10"
            />
          </div>
        </motion.div>

        {/* Our Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-8 text-center"
        >
          <h2 className="text-3xl font-semibold tracking-tight">Our Values</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="p-6 rounded-lg bg-neutral-900/80 border border-white/5 hover:border-lime-400/50 transition-all duration-300"
              >
                <value.icon className="w-8 h-8 text-lime-400 mb-4 mx-auto" />
                <h3 className="font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-gray-300">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </PageTransition>
  )
}

export default AboutUs
