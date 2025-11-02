import React from 'react'
import { useLanguage } from '../src/providers/LanguageProvider'
import { MessageCircle, Calendar, CalendarCheck, Grid } from 'lucide-react'
import { Link } from 'react-router-dom'

const InitiationSection = () => {
  const { translations, selectedLanguage, textDirection } = useLanguage()
  const currentLang = translations[selectedLanguage]
  const initiationData = currentLang.initiation

  // Les données pour les blocs d'initiation avec les composants d'icônes de lucide-react
  const initiationItems = [
    {
      title: initiationData.tiles[1].title,
      icon: <Calendar size={64} color='#2c3159' strokeWidth={1.5} />,
    },
    {
      title: initiationData.tiles[2].title,
      icon: <CalendarCheck size={64} color='#2c3159' strokeWidth={1.5} />,
    },
    {
      title: initiationData.tiles[3].title,
      icon: <Grid size={64} color='#2c3159' strokeWidth={1.5} />,
    },
  ]

  return (
    <section
      className='bg-[#2c3159] py-16 font-sans text-white text-center'
      style={{ direction: textDirection }}
    >
      <div className='container mx-auto max-w-7xl px-4'>
        {/* Titre et description de la section centrés */}
        <div className='mb-12'>
          <h2
            className='text-3xl md:text-4xl font-extrabold mb-4 font-adlam mx-auto max-w-2xl text-center'
            style={{ direction: textDirection }}
          >
            {initiationData.title}
          </h2>
          <p
            className='text-lg md:text-xl text-gray-300 leading-relaxed font-adlam mx-auto max-w-2xl text-center'
            style={{ direction: textDirection }}
          >
            {initiationData.description}
          </p>
        </div>

        {/* Grille des blocs d'initiation CENTRÉE */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 mb-12 justify-center mx-auto max-w-4xl'>
          {initiationItems.map((item, index) => (
            <div
              key={index}
              className='flex flex-col items-center p-8 rounded-lg shadow-lg border border-[#fff2cd] hover:scale-105 transition-transform duration-300'
              style={{ backgroundColor: '#fff2cd' }}
            >
              {/* Icône du bloc */}
              <div className='w-20 h-20 flex items-center justify-center mb-4'>
                {item.icon}
              </div>
              {/* Titre du bloc avec la nouvelle couleur */}
              <h3
                className='text-xl font-bold font-adlam text-[#2c3159]'
                style={{ direction: textDirection }}
              >
                {item.title}
              </h3>
            </div>
          ))}
        </div>

        {/* Bouton "Voir plus" */}
        <Link to='/initiation'>
          <button className='bg-[#fff2cd] text-[#2c3159] font-bold py-3 px-8 rounded-full shadow-lg hover:bg-yellow-500 transition duration-300 font-adlam'>
            <span>{initiationData.button}</span>
          </button>
        </Link>
      </div>
    </section>
  )
}

export default InitiationSection
