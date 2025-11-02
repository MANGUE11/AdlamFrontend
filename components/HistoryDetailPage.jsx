import React from 'react'
import { useLanguage } from '../src/providers/LanguageProvider'
import { Link } from 'react-router-dom'

const HistoryDetailPage = () => {
  const { translations, selectedLanguage, textDirection } = useLanguage()
  const currentLang = translations[selectedLanguage]
  const historyDetailsData = currentLang.historicDetails

  // On n'a plus besoin de cette variable pour les paragraphes, on va utiliser text-justify directement
  // const textAlignClass = textDirection === 'rtl' ? 'text-right' : 'text-left'

  return (
    <div
      className='bg-white pt-40 pb-16 font-sans md:pt-16'
      style={{ direction: textDirection }}
    >
      <div className='container mx-auto max-w-4xl px-4'>
        {/* Back button */}
        <Link
          to='/'
          className='inline-block bg-[#2c3159] text-white font-bold py-2 px-6 rounded-full shadow-lg hover:bg-[#1a1e3a] transition duration-300 mb-8'
        >
          {historyDetailsData.backButton}
        </Link>

        {/* Main title - Il peut rester aligné à gauche ou à droite selon la direction du texte */}
        <h1
          className={`text-4xl md:text-5xl font-bold text-[#2c3159] mb-8 font-adlam ${
            textDirection === 'rtl' ? 'text-right' : 'text-left'
          }`}
        >
          {historyDetailsData.title}
        </h1>

        {/* Introduction - On applique la justification ici */}
        <p
          className={`text-gray-600 text-lg leading-relaxed mb-8 text-justify`}
        >
          {historyDetailsData.intro}
        </p>

        {/* Main section with image and text */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-12'>
          <img
            src='/images/frère.jpeg'
            alt={historyDetailsData.title}
            className='rounded-lg shadow-lg w-full h-auto object-cover'
          />
          <div className={`flex flex-col`}>
            {/* Le titre de la section peut rester aligné selon la direction */}
            <h2
              className={`text-2xl font-bold text-[#2c3159] mb-4 font-adlam ${
                textDirection === 'rtl' ? 'text-right' : 'text-left'
              }`}
            >
              {historyDetailsData.section1.heading}
            </h2>
            {/* On applique la justification ici */}
            <p className='text-gray-600 leading-relaxed mb-4 text-justify'>
              {historyDetailsData.section1.text}
            </p>
          </div>
        </div>

        {/* Other paragraphs or sections - On applique la justification ici */}
        <div className={`space-y-6 text-justify`}>
          <p className='text-gray-600 leading-relaxed'>
            {historyDetailsData.section2.text}
          </p>
        </div>
      </div>
    </div>
  )
}

export default HistoryDetailPage
