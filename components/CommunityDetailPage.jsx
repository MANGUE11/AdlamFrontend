// src/pages/CommunityDetailPage.js
import React from 'react'
import { useLanguage } from '../src/providers/LanguageProvider'
import { Link } from 'react-router-dom'

const CommunityDetailPage = () => {
  const { translations, selectedLanguage, textDirection } = useLanguage()
  const currentLang = translations[selectedLanguage]
  const communityDetailsData = currentLang.communityDetails // On va créer cette clé dans le fichier de traductions

  const textAlignClass = textDirection === 'rtl' ? 'text-right' : 'text-left'

  return (
    <div
      className='bg-white pt-40 pb-16 font-sans md:pt-16'
      style={{ direction: textDirection }}
    >
      <div className='container mx-auto max-w-4xl px-4'>
        {/* Bouton de retour */}
        <Link
          to='/'
          className='inline-block bg-[#2c3159] text-white font-bold py-2 px-6 rounded-full shadow-lg hover:bg-[#1a1e3a] transition duration-300 mb-8'
        >
          {communityDetailsData.backButton}
        </Link>

        {/* Titre principal */}
        <h1
          className={`text-4xl md:text-5xl font-bold text-[#2c3159] mb-8 font-adlam ${textAlignClass}`}
        >
          {communityDetailsData.title}
        </h1>

        {/* Introduction avec texte justifié */}
        <p
          className={`text-gray-600 text-lg leading-relaxed mb-8 text-justify`}
        >
          {communityDetailsData.intro}
        </p>

        {/* Section principale avec image et texte justifié */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-12'>
          <img
            src='/images/communaute.jpg' // Remplace par le chemin de ton image
            alt={communityDetailsData.title}
            className='rounded-lg shadow-lg w-full h-auto object-cover'
          />
          <div className={`flex flex-col`}>
            <h2
              className={`text-2xl font-bold text-[#2c3159] mb-4 font-adlam ${textAlignClass}`}
            >
              {communityDetailsData.section1.heading}
            </h2>
            <p className='text-gray-600 leading-relaxed mb-4 text-justify'>
              {communityDetailsData.section1.text}
            </p>
          </div>
        </div>

        {/* Autres paragraphes ou sections avec texte justifié */}
        <div className={`space-y-6 text-justify`}>
          <p className='text-gray-600 leading-relaxed'>
            {communityDetailsData.section2.text}
          </p>
        </div>
      </div>
    </div>
  )
}

export default CommunityDetailPage
