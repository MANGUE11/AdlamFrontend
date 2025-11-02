import React from 'react'
import { useLanguage } from '../src/providers/LanguageProvider'
import { Link } from 'react-router-dom'

// URL de l'image de la communauté, mise à jour pour être accessible
const communityImage = '../images/communaute.jpg'

const CommunitySection = () => {
  const { translations, selectedLanguage, textDirection } = useLanguage()
  const currentLang = translations[selectedLanguage]
  const communityData = currentLang.community

  // Détermine l'alignement du texte en fonction de la direction et de la taille de l'écran
  const textAlignment =
    textDirection === 'rtl'
      ? 'text-right md:text-right'
      : 'text-left md:text-left'

  return (
    <section className='bg-white py-16 font-sans'>
      <div className='container mx-auto max-w-7xl px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
        {/* Section de l'image */}
        <div className='relative p-4 md:p-8 flex justify-center'>
          <div className='absolute top-0 left-0 w-[90%] h-[90%] hidden md:block'></div>
          <img
            src={communityImage}
            alt='Hutte traditionnelle peule'
            className='w-full max-w-md h-auto object-cover rounded-lg shadow-lg transform md:translate-x-4 md:-translate-y-4'
          />
        </div>

        {/* Section du texte */}
        <div
          className={`flex flex-col items-center md:items-start text-center md:text-left ${textAlignment}`}
          style={{ direction: textDirection }}
        >
          <h2 className={`text-3xl font-bold text-[#2c3159] mb-4 font-adlam`}>
            {communityData.title}
          </h2>
          <p className={`text-gray-600 mb-8 leading-relaxed font-adlam`}>
            {communityData.description}
          </p>
          <Link to='/community'>
            {' '}
            {/* Transforme le bouton en lien */}
            <button className='bg-[#2c3159] text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-[#1a1e3a] transition duration-300 font-adlam'>
              <span>{communityData.button}</span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CommunitySection
