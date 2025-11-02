// src/components/HeroSection/HeroSection.jsx
import React from 'react'
import { useLanguage } from '../../src/providers/LanguageProvider'
import { Link } from 'react-router-dom' // **Ajouter l'importation de Link**

const HeroSection = () => {
  // Utilisez le contexte de la langue
  const { translations, selectedLanguage, textDirection } = useLanguage()
  const currentLang = translations[selectedLanguage]

  return (
    // Ajoute une marge supérieure pour décaler le contenu sous le header fixe
    <div // mt-40 pour compenser le header sur mobile. md:mt-24 pour desktop.
      className='mt-40 md:mt-24 font-sans relative 
               min-h-[70vh] sm:min-h-[80vh] // <-- Hauteur minimale garantie (70% de la vue)
               md:h-[80vh] lg:h-[65vh] // <-- On peut garder les hauteurs fixes pour les grands écrans
               bg-cover bg-center flex items-center justify-center text-center 
               p-10 md:p-16' // <-- Padding pour ne pas coller aux bords
      style={{ backgroundImage: `url('/images/HeroImage.jpeg')` }}
    >
      {/* Ajoute une surcouche avec le dégradé */}
      {/* Le dégradé utilise la couleur hexadécimale avec une opacité */}
      <div className='absolute inset-0 bg-gradient-to-t from-[#2c3159] to-transparent opacity-80'></div>

      {/* Conteneur pour centrer le contenu de la section Hero */}
      <div className='relative z-10 text-white container mx-auto max-w-7xl px-4 flex flex-col items-center'>
        <div className='max-w-2xl mb-8'>
          <h2
            className='text-3xl sm:text-4xl md:text-5xl font-bold font-adlam mb-4 leading-tight'
            style={{ direction: textDirection }}
          >
            {currentLang.hero.title}
          </h2>
          <p
            className='text-base sm:text-lg md:text-xl font-adlam mb-6'
            style={{ direction: textDirection }}
          >
            {currentLang.hero.description}
          </p>
        </div>
        <Link
          to='/a-propos' // Définir la route vers la page AboutPage
          className='flex items-center justify-center gap-2 bg-[#fff2cd] text-[#2c3159] font-bold py-3 px-8 rounded-full shadow-lg hover:bg-yellow-500 transition duration-300 font-adlam'
          style={{ direction: textDirection }}
        >
          <span>{currentLang.hero.button}</span>
          <i className='fa-solid fa-arrow-right'></i>
        </Link>
      </div>
    </div>
  )
}

export default HeroSection
