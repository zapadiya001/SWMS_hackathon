"use client"

import { motion } from "framer-motion"
import { UploadCloud, ImageIcon, Camera, CheckCircle, XCircle, Info } from "lucide-react"
import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import PageTransition from "../components/PageTransition"

const WasteClassifier = () => {
  const [image, setImage] = useState(null)
  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

const onDrop = useCallback((acceptedFiles) => {
  const file = acceptedFiles[0]
  if (file) {
    const imageUrl = URL.createObjectURL(file)
    setImage(imageUrl)
    setPrediction(null)
    setError(null)
    setLoading(true)

    const formData = new FormData()
    formData.append("file", file)

    fetch("http://localhost:8000/classify-and-check", {
      method: "POST",
      body: formData,
    })
      .then(async (res) => {
        const data = await res.json()
        if (res.ok) {
          setPrediction({
            class: data.predicted_class,
            tip: data.gemini_response,
          })
        } else {
          throw new Error(data.error || "Something went wrong")
        }
      })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }
}, [])


  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".png", ".jpg", ".gif"],
    },
    multiple: false,
  })

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
          <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight">Waste Classifier</h1>
          <p className="text-gray-300 max-w-2xl">
            Upload an image of your waste to get instant classification and recycling tips.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-neutral-900/80 border border-white/5 rounded-xl p-8 space-y-8"
        >
          {/* Upload Area */}
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
              isDragActive ? "border-lime-400 bg-neutral-800" : "border-white/10 hover:border-lime-400/50"
            }`}
          >
            <input {...getInputProps()} />
            {image ? (
              <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                <img src={image || "/placeholder.svg"} alt="Uploaded waste" className="w-full h-full object-contain" />
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setImage(null)
                    setPrediction(null)
                  }}
                  className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600"
                >
                  <XCircle className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <UploadCloud className="w-16 h-16 text-gray-400 mx-auto" />
                <p className="text-gray-300">
                  Drag and drop an image here, or browse to upload. You can also take a photo directly from your device.
                </p>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-lime-500 hover:bg-lime-400 text-neutral-950 font-medium rounded transition-colors"
                >
                  <ImageIcon className="w-4 h-4" /> Browse Files
                </button>
                {/* Optional: Add a "Take Photo" button for mobile */}
                <input type="file" accept="image/*" capture="environment" className="hidden" id="take-photo" />
                <label
                  htmlFor="take-photo"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-white/10 hover:border-lime-400/50 text-gray-100 font-medium rounded transition-colors cursor-pointer ml-4"
                >
                  <Camera className="w-4 h-4" /> Take Photo
                </label>
              </div>
            )}
          </div>

          {/* Prediction Results */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Prediction Results</h2>
            {loading && (
              <div className="text-center py-8">
                <div className="w-8 h-8 border-4 border-lime-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-400">Classifying waste...</p>
              </div>
            )}
            {error && (
              <div className="text-center py-8 text-red-400">
                <XCircle className="w-12 h-12 mx-auto mb-4" />
                <p>{error}</p>
              </div>
            )}
            {prediction && !loading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-neutral-800 border border-white/10 rounded-lg p-6 space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div>
                    <p className="text-sm text-gray-400">Class:</p>
                    <p className="text-xl font-bold text-lime-400">{prediction.class}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Segregation Tip:</p>
                  <p className="text-base text-gray-300">{prediction.tip}</p>
                </div>
              </motion.div>
            )}
            {!image && !loading && !prediction && (
              <div className="text-center py-8 text-gray-400">
                <Info className="w-12 h-12 mx-auto mb-4 text-gray-600" />
                <p>Upload an image to see classification results.</p>
              </div>
            )}
          </div>

          {/* Feedback */}
          {/* <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Feedback</h2>
            <p className="text-gray-300">Was this correct?</p>
            <div className="flex gap-4">
              <button className="px-6 py-2 bg-lime-500 hover:bg-lime-400 text-neutral-950 rounded-lg transition-colors font-medium">
                Yes
              </button>
              <button className="px-6 py-2 border border-white/10 hover:border-white/20 rounded-lg transition-colors">
                No
              </button>
            </div>
          </div> */}
        </motion.div>
      </div>
    </PageTransition>
  )
}

export default WasteClassifier
