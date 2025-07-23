import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import ScrollToTop from "./components/ScrollToTop"
import ProgressBar from "./components/ProgressBar"
import Home from "./pages/Home"
import Features from "./pages/Features"
import Learn from "./pages/Learn"
import Shop from "./pages/Shop"
import SellTrash from "./pages/SellTrash"
import Nearby from "./pages/Nearby"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import Quiz from "./pages/Quiz"
import QuizAttempt from "./pages/QuizAttempt"
import Chatbot from "./pages/Chatbot"
import WasteDiary from "./pages/WasteDiary"
import Profile from "./pages/Profile"
import WasteClassifier from "./pages/WasteClassifier"
import EcoCalendar from "./pages/EcoCalendar"
import { AuthProvider, useAuth } from "./context/AuthContext" // Import AuthProvider and useAuth
import "./App.css"
import Cart from "./pages/Cart.jsx"
import AdminDashboard from "./pages/AdminDashboard.jsx"
import News from "./pages/News.jsx"
import Video from "./pages/Video.jsx"
import AboutUs from "./pages/AboutUs.jsx"
import ChangePassword from "./pages/ChangePassword.jsx"
import ForgotPassword from "./pages/ForgotPassword.jsx" // Import the new Forgot Password page
import ResultPage from "./pages/ResultPage.jsx" // Import ResultPage for quiz results
import { Toaster } from "react-hot-toast";


// A wrapper component for protected routes
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    // You can render a loading spinner or skeleton here
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-gray-100">
        Loading application...
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}

function App() {
  return (
    <Router>
      <Toaster position="top-center " />
      <AuthProvider>
        {" "}
        {/* Wrap the entire application with AuthProvider */}
        <div className="bg-gradient-to-b from-neutral-950 via-neutral-900 to-emerald-950 text-gray-100 font-inter leading-relaxed scroll-smooth min-h-screen">
          <ProgressBar />
          <Navbar />
          <AnimatePresence mode="wait">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/features" element={<Features />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Add the new Forgot Password route */}
              {/* Add other public routes here if any */}

              {/* Protected Routes */}
              <Route path="/quiz/:quizId/attempt" element={<ProtectedRoute><QuizAttempt /></ProtectedRoute>} />
              <Route path="/result/:resultId" element={<ProtectedRoute><ResultPage /></ProtectedRoute>} />
              <Route
                path="/learn"
                element={
                  <ProtectedRoute>
                    <Learn />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/sell-trash"
                element={
                  <ProtectedRoute>
                    <SellTrash />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin-dashboard"
                element={
                    <AdminDashboard />
                }
              />
              <Route
                path="/nearby"
                element={
                  <ProtectedRoute>
                    <Nearby />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/quiz"
                element={
                  <ProtectedRoute>
                    <Quiz />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/quiz/:id/attempt"
                element={
                  <ProtectedRoute>
                    <QuizAttempt/>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/chatbot"
                element={
                  <ProtectedRoute>
                    <Chatbot />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/waste-diary"
                element={
                  <ProtectedRoute>
                    <WasteDiary />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/waste-classifier"
                element={
                  <ProtectedRoute>
                    <WasteClassifier />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/eco-calendar"
                element={
                  <ProtectedRoute>
                    <EcoCalendar />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/change-password"
                element={
                  <ProtectedRoute>
                    <ChangePassword />
                  </ProtectedRoute>
                }
              />
              <Route path="/learn/video" element={<ProtectedRoute><Video /></ProtectedRoute>} /> 
                <Route path="/learn/news" element={<ProtectedRoute><News /></ProtectedRoute>} />
              {/* Catch-all for unmatched routes, redirect to home or login if not authenticated */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>
          <Footer />
          <ScrollToTop />
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App
