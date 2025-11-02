// src/contexts/LanguageContext.jsx
import { createContext, useContext } from 'react'

// Crée le contexte de la langue
export const LanguageContext = createContext()

// Hook personnalisé pour utiliser le contexte de la langue plus facilement
export const useLanguage = () => {
  return useContext(LanguageContext)
}
