import React, { useState, createContext, useContext, useEffect } from 'react'

// Crée le contexte d'authentification
const AuthContext = createContext()

// Hook personnalisé pour utiliser le contexte d'authentification
export const useAuth = () => {
  return useContext(AuthContext)
}

// URL de votre API de connexion
const LOGIN_API_URL = 'http://localhost:3000/api/auth/login'

// Composant fournisseur du contexte d'authentification
export const AuthProvider = ({ children }) => {
  // Initialise l'état à partir du localStorage pour la persistance
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('token') // Convertit en booléen (true si le token existe)
  )
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('user')
      return storedUser ? JSON.parse(storedUser) : null
    } catch (e) {
      console.error(
        'Erreur lors du parsing des données utilisateur depuis localStorage',
        e
      )
      return null
    }
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token')) // Ajoute l'état du token // Met à jour le localStorage chaque fois que l'utilisateur ou le token change

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }

    if (token) {
      localStorage.setItem('token', token)
    } else {
      localStorage.removeItem('token')
    }
  }, [user, token])

  const login = async (email, password) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(LOGIN_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const errData = await response.json()
        throw new Error(
          errData.message ||
            'Échec de la connexion. Veuillez vérifier vos informations.'
        )
      }

      const data = await response.json() // Met à jour l'état avec les nouvelles données
      setToken(data.token) // Sauvegarde le token
      setUser(data.user) // Sauvegarde les infos utilisateur
      setIsAuthenticated(true)
      return true
    } catch (err) {
      setError(err.message)
      setIsAuthenticated(false)
      setUser(null) // S'il y a une erreur, on réinitialise l'utilisateur
      setToken(null) // Et le token
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  const value = {
    isAuthenticated,
    user,
    isLoading,
    error,
    token, // Ajoute le token dans le contexte
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
