"use client"

import { motion } from "framer-motion"
import { CalendarCheck, Award } from "lucide-react"
import { useState } from "react"
import PageTransition from "../components/PageTransition"

const EcoCalendar = () => {
  const [dailyTasks, setDailyTasks] = useState([
    { id: 1, text: "Avoid single-use plastics today", completed: false },
    { id: 2, text: "Walk or bike instead of driving", completed: false },
    { id: 3, text: "Reduce food waste by planning meals", completed: false },
  ])

  const [weeklyTasks, setWeeklyTasks] = useState([
    { id: 4, text: "Participate in a local cleanup event", completed: false },
    { id: 5, text: "Learn about a new sustainable practice", completed: false },
  ])

  const handleDailyTaskToggle = (id) => {
    setDailyTasks((prev) => prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const handleWeeklyTaskToggle = (id) => {
    setWeeklyTasks((prev) => prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const streak = 7 // Static for now, could be dynamic based on task completion

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
          <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight">Eco Calendar</h1>
          <p className="text-gray-300 max-w-2xl">
            Track your daily and weekly green tasks to build sustainable habits.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-neutral-900/80 border border-white/5 rounded-xl p-8 space-y-8"
        >
          {/* Streak */}
          <div className="bg-emerald-900/20 border border-emerald-500/30 rounded-lg p-6 text-center space-y-2">
            <h2 className="text-xl font-semibold text-emerald-300 flex items-center justify-center gap-2">
              <Award className="w-6 h-6" /> Streak
            </h2>
            <p className="text-5xl font-bold text-emerald-400">{streak} days</p>
          </div>

          {/* Daily Tasks */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Daily Tasks</h2>
            <div className="space-y-4">
              {dailyTasks.map((task) => (
                <label key={task.id} className="flex items-center gap-4 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleDailyTaskToggle(task.id)}
                    className="w-6 h-6 rounded border-white/20 bg-neutral-800 text-lime-500 focus:ring-lime-400 focus:ring-2"
                  />
                  <span className={`text-lg ${task.completed ? "line-through text-gray-500" : "text-gray-200"}`}>
                    {task.text}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Weekly Tasks */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Weekly Tasks</h2>
            <div className="space-y-4">
              {weeklyTasks.map((task) => (
                <label key={task.id} className="flex items-center gap-4 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleWeeklyTaskToggle(task.id)}
                    className="w-6 h-6 rounded border-white/20 bg-neutral-800 text-lime-500 focus:ring-lime-400 focus:ring-2"
                  />
                  <span className={`text-lg ${task.completed ? "line-through text-gray-500" : "text-gray-200"}`}>
                    {task.text}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-lime-500 hover:bg-lime-400 text-neutral-950 rounded-lg transition-colors font-medium">
            <CalendarCheck className="w-4 h-4" /> View Full Calendar
          </button>
        </motion.div>
      </div>
    </PageTransition>
  )
}

export default EcoCalendar
