"use client"

import { motion } from "framer-motion"
import { Calendar, Trash2, Weight, MessageSquare, Plus, Loader2, XCircle, Trash } from "lucide-react"
import { useState, useEffect, useCallback } from "react"
import { Link } from "react-router-dom"
import PageTransition from "../components/PageTransition"
import api from "../utils/api"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"

const WasteDiary = () => {
  const [formData, setFormData] = useState({
    type: "",
    weight: "",
    description: "",
  })
  const [pastEntries, setPastEntries] = useState([])
  const [dailySummary, setDailySummary] = useState([])
  const [weeklySummary, setWeeklySummary] = useState([])
  const [loadingEntries, setLoadingEntries] = useState(true) // Separate loading state for entries
  const [loadingSummaries, setLoadingSummaries] = useState(true) // Separate loading state for summaries
  const [submitLoading, setSubmitLoading] = useState(false)
  const [error, setError] = useState(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const wasteTypes = [
    { value: "Plastic", label: "Plastic" },
    { value: "Paper", label: "Paper" },
    { value: "Glass", label: "Glass" },
    { value: "Metal", label: "Metal" },
    { value: "Organic", label: "Organic" },
    { value: "Electronic Waste", label: "Electronic Waste" },
  ]

  const fetchWasteData = useCallback(async () => {
    setError(null)
    setLoadingEntries(true)
    setLoadingSummaries(true)
    try {
      const [entriesRes, dailyRes, weeklyRes] = await Promise.all([
        api.get("/wasteDiary"),
        api.get("/wasteDiary/summary/daily"),
        api.get("/wasteDiary/summary/weekly"),
      ])
      setPastEntries(entriesRes.data)
      setDailySummary(dailyRes.data)
      setWeeklySummary(weeklyRes.data)
      console.log("Frontend (WasteDiary): Daily Summary Data received:", dailyRes.data)
      console.log("Frontend (WasteDiary): Weekly Summary Data received:", weeklyRes.data)
    } catch (err) {
      console.error("Frontend Error (fetchWasteData):", err)
      setError(
        err.response?.data?.message ||
          "Failed to load waste data. Please ensure the backend server is running and you are logged in.",
      )
    } finally {
      setLoadingEntries(false)
      setLoadingSummaries(false)
    }
  }, [])

  useEffect(() => {
    fetchWasteData()
  }, [fetchWasteData])

  const handleLogChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setSubmitSuccess(false) // Clear success message on input change
    setError(null) // Clear error on input change
  }

  // New handler to restrict input to numbers and a single decimal point
  const handleWeightKeyDown = (e) => {
    // Allow: backspace, delete, tab, escape, enter, and .
    if (
      [46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
      // Allow: Ctrl+A, Command+A
      (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
      // Allow: home, end, left, right, down, up
      (e.keyCode >= 35 && e.keyCode <= 40)
    ) {
      // let it happen, don't do anything
      return
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault()
    }

    // Allow only one decimal point
    if (e.key === "." && formData.weight.includes(".")) {
      e.preventDefault()
    }
  }

  const handleLogSubmit = async (e) => {
    e.preventDefault()
    setSubmitLoading(true)
    setError(null)
    setSubmitSuccess(false)

    try {
      await api.post("/wasteDiary", {
        type: formData.type,
        weight: Number.parseFloat(formData.weight),
        description: formData.description,
      })
      setSubmitSuccess(true)
      setFormData({ type: "", weight: "", description: "" }) // Reset form
      fetchWasteData() // Re-fetch data to update charts and history
    } catch (err) {
      console.error("Frontend Error (handleLogSubmit):", err)
      setError(err.response?.data?.message || "Failed to add waste entry. Please try again.")
    } finally {
      setSubmitLoading(false)
    }
  }

  const handleDeleteEntry = async (id) => {
    try {
      await api.delete(`/wasteDiary/${id}`)
      fetchWasteData() // Re-fetch data to update the list and charts
    } catch (err) {
      console.error("Frontend Error (handleDeleteEntry):", err)
      setError(err.response?.data?.message || "Failed to delete entry.")
    }
  }

  const totalDailyWeight = dailySummary.reduce((sum, day) => sum + day.kg, 0).toFixed(2)
  const totalWeeklyWeight = weeklySummary.reduce((sum, week) => sum + week.kg, 0).toFixed(2)

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-6 py-24 space-y-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight">Waste Diary</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">Log your waste, track your progress, and see your impact.</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Log Waste Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            <h2 className="text-2xl font-semibold">Log Waste</h2>
            <form
              onSubmit={handleLogSubmit}
              className="space-y-6 bg-neutral-900/80 border border-white/5 rounded-xl p-8"
            >
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm text-center"
                >
                  {error}
                </motion.p>
              )}
              {submitSuccess && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-400 text-sm text-center"
                >
                  Waste entry added successfully!
                </motion.p>
              )}
              <div>
                <label htmlFor="wasteType" className="block text-sm font-medium mb-2">
                  Select Waste Type
                </label>
                <select
                  id="wasteType"
                  name="type"
                  value={formData.type}
                  onChange={handleLogChange}
                  className="w-full bg-neutral-800 border border-white/10 px-4 py-3 rounded-lg focus:border-lime-400 focus:outline-none transition-colors"
                  required
                >
                  <option value="">Select</option>
                  {wasteTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="weight" className="block text-sm font-medium mb-2">
                  Weight (kg)
                </label>
                <div className="relative">
                  <input
                    type="number" // Keep type="number" for mobile keyboard and validation hints
                    id="weight"
                    name="weight"
                    value={formData.weight}
                    onChange={handleLogChange}
                    onKeyDown={handleWeightKeyDown} // Add the new keydown handler
                    placeholder="Enter weight in kilograms"
                    min="0.01"
                    step="0.01"
                    className="w-full pl-4 pr-10 py-3 bg-neutral-800 border border-white/10 rounded-lg focus:border-lime-400 focus:outline-none transition-colors"
                    required
                  />
                  <Weight className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-2">
                  Description (Optional)
                </label>
                <div className="relative">
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleLogChange}
                    placeholder="Add any notes about this waste entry"
                    rows="3"
                    className="w-full pl-4 pr-10 py-3 bg-neutral-800 border border-white/10 rounded-lg focus:border-lime-400 focus:outline-none transition-colors resize-none"
                  />
                  <MessageSquare className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
                </div>
              </div>
              <button
                type="submit"
                disabled={submitLoading}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-lime-500 hover:bg-lime-400 disabled:bg-lime-600 disabled:cursor-not-allowed text-neutral-950 rounded-lg transition-colors font-medium"
              >
                {submitLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Plus className="w-4 h-4" /> Add Entry
                  </>
                )}
              </button>
            </form>

            {/* Waste History */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-semibold">Waste History</h2>
              {loadingEntries ? (
                <div className="text-center py-8">
                  <Loader2 className="w-8 h-8 border-4 border-lime-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-gray-400">Loading waste history...</p>
                </div>
              ) : error ? (
                <div className="text-center py-8 text-red-400">
                  <XCircle className="w-12 h-12 mx-auto mb-4" />
                  <p>{error}</p>
                </div>
              ) : pastEntries.length === 0 ? (
                <div className="bg-neutral-900/80 border border-white/5 rounded-xl p-8 text-center text-gray-400">
                  <Trash2 className="w-12 h-12 mx-auto mb-4 text-gray-600" />
                  <p>Your waste log entries will appear here.</p>
                </div>
              ) : (
                <div className="bg-neutral-900/80 border border-white/5 rounded-xl p-4">
                  <div className="max-h-96 overflow-y-auto space-y-3">
                    {pastEntries.map((entry) => (
                      <div key={entry._id} className="flex items-center justify-between p-3 bg-neutral-800 rounded-lg">
                        <div>
                          <p className="font-medium">
                            {entry.type} - {entry.weight} kg
                          </p>
                          {entry.description && <p className="text-sm text-gray-400">{entry.description}</p>}
                        </div>
                        <div className="flex items-center gap-2">
                          <p className="text-xs text-gray-500">{new Date(entry.createdAt).toLocaleDateString()}</p>
                          <button
                            onClick={() => handleDeleteEntry(entry._id)}
                            className="p-1 rounded-full text-red-400 hover:bg-red-900/50 transition-colors"
                            aria-label={`Delete entry for ${entry.type} on ${new Date(
                              entry.createdAt,
                            ).toLocaleDateString()}`}
                          >
                            <Trash className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>

          {/* Waste Composition */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-1 space-y-8"
          >
            <h2 className="text-2xl font-semibold">Waste Composition</h2>

            {loadingSummaries ? (
              <div className="text-center py-8">
                <Loader2 className="w-8 h-8 border-4 border-lime-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-400">Loading summaries...</p>
              </div>
            ) : error ? (
              <div className="text-center py-8 text-red-400">
                <XCircle className="w-12 h-12 mx-auto mb-4" />
                <p>{error}</p>
              </div>
            ) : (
              <>
                {/* Daily Waste Chart */}
                <div className="bg-neutral-900/80 border border-white/5 rounded-xl p-6 space-y-4">
                  <h3 className="font-semibold text-lg">Daily Waste</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-lime-400">{totalDailyWeight} kg</span>
                  </div>
                  <div className="h-[150px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={dailySummary} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                        <CartesianGrid vertical={false} stroke="#404040" />
                        <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} className="text-xs" />
                        <YAxis
                          dataKey="kg"
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(value) => `${value}kg`}
                          className="text-xs"
                        />
                        <Tooltip />
                        <Line dataKey="kg" type="monotone" stroke="#a3e635" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Weekly Waste Chart */}
                <div className="bg-neutral-900/80 border border-white/5 rounded-xl p-6 space-y-4">
                  <h3 className="font-semibold text-lg">Weekly Waste</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-lime-400">{totalWeeklyWeight} kg</span>
                  </div>
                  <div className="h-[150px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={weeklySummary} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                        <CartesianGrid vertical={false} stroke="#404040" />
                        <XAxis dataKey="week" tickLine={false} axisLine={false} tickMargin={8} className="text-xs" />
                        <YAxis
                          dataKey="kg"
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(value) => `${value}kg`}
                          className="text-xs"
                        />
                        <Tooltip />
                        <Line dataKey="kg" type="monotone" stroke="#34d399" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <Link
                    to="/eco-calendar"
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-lime-500 hover:bg-lime-400 text-neutral-950 rounded-lg transition-colors font-medium"
                  >
                    <Calendar className="w-4 h-4" /> View Calendar
                  </Link>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}

export default WasteDiary
