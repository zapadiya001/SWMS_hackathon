import { motion } from "framer-motion"
import { Upload, DollarSign, Truck, CheckCircle } from "lucide-react"
import { useState } from "react"
import PageTransition from "../components/PageTransition"

const SellTrash = () => {
  const [formData, setFormData] = useState({
    wasteType: "",
    weight: "",
    address: "",
    contact: "",
    description: "",
    images: [],
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const wasteTypes = [
    { value: "metal", label: "Metal", price: "$2.50/kg" },
    { value: "plastic", label: "Plastic", price: "$1.20/kg" },
    { value: "paper", label: "Paper", price: "$0.80/kg" },
    { value: "electronic", label: "Electronic Waste", price: "$5.00/kg" },
    { value: "glass", label: "Glass", price: "$0.60/kg" },
    { value: "cardboard", label: "Cardboard", price: "$0.70/kg" },
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    setFormData((prev) => ({
      ...prev,
      images: files,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true)
    }, 1000)
  }

  const estimatedPrice =
    formData.weight && formData.wasteType
      ? (Number.parseFloat(formData.weight) * getPricePerKg(formData.wasteType)).toFixed(2)
      : "0.00"

  function getPricePerKg(wasteType) {
    const prices = {
      metal: 2.5,
      plastic: 1.2,
      paper: 0.8,
      electronic: 5.0,
      glass: 0.6,
      cardboard: 0.7,
    }
    return prices[wasteType] || 0
  }

  if (isSubmitted) {
    return (
      <PageTransition>
        <div className="mx-auto max-w-2xl px-6 py-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6 bg-neutral-900/80 border border-white/5 rounded-xl p-12"
          >
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-semibold">Request Submitted!</h1>
            <p className="text-gray-300">
              Your recyclable waste collection request has been submitted successfully. A local collector will contact
              you within 24 hours.
            </p>
            <div className="bg-emerald-900/30 border border-emerald-500/30 rounded-lg p-4">
              <p className="text-emerald-400 font-medium">Estimated Value: ${estimatedPrice}</p>
            </div>
            <button
              onClick={() => {
                setIsSubmitted(false)
                setFormData({
                  wasteType: "",
                  weight: "",
                  address: "",
                  contact: "",
                  description: "",
                  images: [],
                })
              }}
              className="px-6 py-3 bg-lime-500 hover:bg-lime-400 text-neutral-950 rounded-lg transition-colors font-medium"
            >
              Submit Another Request
            </button>
          </motion.div>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <div className="mx-auto max-w-4xl px-6 py-24 space-y-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight">Sell Your Recyclables</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Turn your waste into cash! Connect with local collectors and get paid for your recyclable materials.
          </p>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6"
        >
          <div className="text-center space-y-3">
            <div className="w-12 h-12 bg-lime-500/20 rounded-lg flex items-center justify-center mx-auto">
              <DollarSign className="w-6 h-6 text-lime-400" />
            </div>
            <h3 className="font-semibold">Earn Money</h3>
            <p className="text-sm text-gray-300">Get paid for your recyclable waste materials</p>
          </div>
          <div className="text-center space-y-3">
            <div className="w-12 h-12 bg-lime-500/20 rounded-lg flex items-center justify-center mx-auto">
              <Truck className="w-6 h-6 text-lime-400" />
            </div>
            <h3 className="font-semibold">Free Pickup</h3>
            <p className="text-sm text-gray-300">Local collectors will pick up from your location</p>
          </div>
          <div className="text-center space-y-3">
            <div className="w-12 h-12 bg-lime-500/20 rounded-lg flex items-center justify-center mx-auto">
              <CheckCircle className="w-6 h-6 text-lime-400" />
            </div>
            <h3 className="font-semibold">Easy Process</h3>
            <p className="text-sm text-gray-300">Simple form submission and quick response</p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <h2 className="text-2xl font-semibold">Submit Collection Request</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Waste Type */}
              <div>
                <label className="block text-sm font-medium mb-2">Waste Type *</label>
                <select
                  name="wasteType"
                  value={formData.wasteType}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-neutral-800 border border-white/10 px-4 py-3 rounded-lg focus:border-lime-400 focus:outline-none transition-colors"
                >
                  <option value="">Select waste type</option>
                  {wasteTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label} - {type.price}
                    </option>
                  ))}
                </select>
              </div>

              {/* Weight */}
              <div>
                <label className="block text-sm font-medium mb-2">Weight (kg) *</label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  placeholder="Enter weight in kilograms"
                  min="0.1"
                  step="0.1"
                  required
                  className="w-full bg-neutral-800 border border-white/10 px-4 py-3 rounded-lg focus:border-lime-400 focus:outline-none transition-colors"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium mb-2">Pickup Address *</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter your complete address"
                  rows="3"
                  required
                  className="w-full bg-neutral-800 border border-white/10 px-4 py-3 rounded-lg focus:border-lime-400 focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Contact */}
              <div>
                <label className="block text-sm font-medium mb-2">Contact Number *</label>
                <input
                  type="tel"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  required
                  className="w-full bg-neutral-800 border border-white/10 px-4 py-3 rounded-lg focus:border-lime-400 focus:outline-none transition-colors"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-2">Additional Details</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Any additional information about your recyclables"
                  rows="3"
                  className="w-full bg-neutral-800 border border-white/10 px-4 py-3 rounded-lg focus:border-lime-400 focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium mb-2">Upload Photos (Optional)</label>
                <div className="relative">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full text-sm file:bg-neutral-700 file:border-0 file:px-4 file:py-2 file:text-gray-300 file:rounded file:mr-4 hover:file:bg-neutral-600 transition-colors"
                  />
                  <Upload className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Upload photos of your recyclables to help collectors assess the materials
                </p>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-4 bg-lime-500 hover:bg-lime-400 text-neutral-950 rounded-lg transition-colors font-medium text-lg"
              >
                Submit Collection Request
              </button>
            </form>
          </motion.div>

          {/* Price Calculator */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-2xl font-semibold">Price Calculator</h2>

            <div className="bg-neutral-900/80 border border-white/5 rounded-xl p-6 space-y-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-lime-400 mb-2">${estimatedPrice}</div>
                <p className="text-gray-300">Estimated Value</p>
              </div>

              {formData.wasteType && formData.weight && (
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <div className="flex justify-between text-sm">
                    <span>Material:</span>
                    <span className="capitalize">{formData.wasteType}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Weight:</span>
                    <span>{formData.weight} kg</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Rate:</span>
                    <span>${getPricePerKg(formData.wasteType).toFixed(2)}/kg</span>
                  </div>
                </div>
              )}
            </div>

            {/* Current Rates */}
            <div className="bg-neutral-900/80 border border-white/5 rounded-xl p-6">
              <h3 className="font-semibold mb-4">Current Rates</h3>
              <div className="space-y-3">
                {wasteTypes.map((type) => (
                  <div key={type.value} className="flex justify-between text-sm">
                    <span>{type.label}</span>
                    <span className="text-lime-400">{type.price}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-4">* Rates may vary based on quality and market conditions</p>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}

export default SellTrash
