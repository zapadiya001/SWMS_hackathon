"use client"

import { createContext, useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true) // Indicates if auth state is being loaded from localStorage
  const navigate = useNavigate()

  useEffect(() => {
    console.log("AuthContext useEffect: Starting to load auth data...")
    const storedToken = localStorage.getItem("token")
    const storedUser = localStorage.getItem("user")

    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        // Ensure the parsed user object has an 'id' property
        if (parsedUser && parsedUser.id) {
          setToken(storedToken)
          setUser(parsedUser)
          console.log("AuthContext useEffect: User and token loaded from localStorage.", parsedUser)
        } else {
          console.warn("AuthContext useEffect: Stored user data is missing 'id' or is invalid. Clearing storage.")
          localStorage.removeItem("token")
          localStorage.removeItem("user")
        }
      } catch (e) {
        console.error("AuthContext useEffect: Failed to parse stored user data from localStorage.", e)
        localStorage.removeItem("token")
        localStorage.removeItem("user")
      }
    } else {
      console.log("AuthContext useEffect: No user or token found in localStorage.")
    }
    setLoading(false) // Set loading to false once the check is complete
    console.log("AuthContext useEffect: Auth data loading complete. Loading state set to false.")
  }, [])

  const login = (newToken, newUser) => {
    console.log("AuthContext login: Attempting to log in user:", newUser)
    if (!newUser || !newUser.id) {
      console.error("AuthContext login: newUser object is invalid or missing 'id'. Aborting login.")
      // You might want to set an error state here if this happens
      return
    }
    setToken(newToken)
    setUser(newUser)
    localStorage.setItem("token", newToken)
    localStorage.setItem("user", JSON.stringify(newUser))
    console.log("AuthContext login: User logged in successfully. Redirecting to /.")
    navigate("/") // Redirect to home after login
  }

  const logout = () => {
    console.log("AuthContext logout: Logging out user.")
    setToken(null)
    setUser(null)
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/login") // Redirect to login after logout
  }

  const updateUser = (updatedUserData) => {
    console.log("AuthContext updateUser: Updating user data in context:", updatedUserData)
    if (!updatedUserData || !updatedUserData.id) {
      console.error("AuthContext updateUser: updatedUserData is invalid or missing 'id'. Aborting update.")
      // You might want to set an error state here if this happens
      return
    }
    setUser(updatedUserData)
    localStorage.setItem("user", JSON.stringify(updatedUserData))
    console.log("AuthContext updateUser: User data updated in context and localStorage.")
  }

  const isAuthenticated = !!token

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout, loading, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
