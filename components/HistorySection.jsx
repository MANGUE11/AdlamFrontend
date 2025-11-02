// src/components/HistorySection.js
import React from 'react'
import { useLanguage } from '../src/providers/LanguageProvider'
import { Link } from 'react-router-dom' // Importe le composant Link

const HistorySection = () => {
  const { translations, selectedLanguage, textDirection } = useLanguage()
  const currentLang = translations[selectedLanguage]
  const historyData = currentLang.history

  // Détermine l'alignement du texte en fonction de la direction
  const textAlignClass = textDirection === 'rtl' ? 'text-right' : 'text-left'

  return (
    <section
      className='bg-white py-16 font-sans'
      style={{ direction: textDirection }}
    >
      <div className='container mx-auto max-w-7xl px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
        {/* Colonne de gauche : Image (Taille ajustée et fond enlevé) */}
        {/* Suppression de : p-8 bg-gray-100 rounded-lg shadow-md */}
        <div className='flex justify-center items-center'>
          <img
            src='/images/frère.jpeg'
            alt={
              currentLang.history.imageAlt ||
              'Image illustrant l’histoire ou l’alphabet Adlam'
            }
            // Changement CLÉ : Définition d'une taille fixe (h-96 w-96)
            // et suppression des classes 'max-h-full max-w-full'
            className='h-96 w-96 rounded-lg object-contain'
          />
        </div>

        {/* Colonne de gauche : Alphabet Adlam (MIS EN COMMENTAIRE - Reste intact) */}
        {/* ... */}

        {/* Colonne de droite : Historique et description (Reste intact) */}
        <div className={`flex flex-col items-start ${textAlignClass}`}>
          <h2 className={`text-3xl font-bold text-[#2c3159] mb-4 font-adlam`}>
            {historyData.title}
          </h2>
          {/* Paragraphe avec le texte justifié dynamiquement */}
          <p
            className={`text-gray-600 mb-8 leading-relaxed font-adlam ${textAlignClass}`}
          >
            {historyData.description}
          </p>

          {/* Remplacement du bouton par un Link pour la navigation */}
          <Link
            to='/history-details' // L'URL de la page détaillée que nous avons définie
            className='bg-[#2c3159] text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-[#1a1e3a] transition duration-300 font-adlam'
            style={{ direction: textDirection }}
          >
            <span>{historyData.button}</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default HistorySection
