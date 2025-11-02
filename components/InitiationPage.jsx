import React from 'react'
import { useLanguage } from '../src/providers/LanguageProvider'
import NumbersSection from '../components/NumbersSection'
import AlphabetSection from '../components/AlphabetSection '
import AdlamTableDouzMois from '../components/AdlamTableDouzMois'
import AdlamTableDouzMois2 from '../components/AdlamTableDouzMois2'
import AdlamSemaine from '../components/AdlamSemaine'

// Un composant pour chaque section de la page
const CulturalDiscussionSection = ({ content }) => (
  <section className='py-16 bg-white text-gray-800'>
    {' '}
    <div className='container mx-auto px-4 max-w-7xl'>
      {' '}
      <h2 className='text-3xl md:text-4xl font-extrabold mb-4 font-adlam text-center'>
        {content.title}{' '}
      </h2>{' '}
      <p className='text-lg text-center leading-relaxed max-w-3xl mx-auto'>
        {content.description}{' '}
      </p>{' '}
    </div>{' '}
  </section>
)

const CalendarSection = ({ content }) => (
  <section className='py-16 bg-gray-100 text-gray-800'>
    {' '}
    <div className='container mx-auto px-4 max-w-7xl'>
      {' '}
      <h2 className='text-3xl md:text-4xl font-extrabold mb-4 font-adlam text-center'>
        {content.title}{' '}
      </h2>{' '}
      <p className='text-lg text-center leading-relaxed max-w-3xl mx-auto'>
        {content.description}{' '}
      </p>{' '}
    </div>{' '}
  </section>
)

// Répétez le même schéma pour les autres sections (CalendarCheck, Grid)

const InitiationPage = () => {
  const { translations, selectedLanguage, textDirection } = useLanguage()
  const pageContent = translations[selectedLanguage].initiationPage

  if (!pageContent) {
    return <div>Loading...</div>
  }

  return (
    <div className='font-sans pt-40' style={{ direction: textDirection }}>
      {/* Section Héro */}{' '}
      <div className='relative h-96 flex items-center justify-center text-center text-white overflow-hidden bg-[#2c3159] '>
        {/* Image de fond ou overlay sombre */}{' '}
        <div
          className='absolute inset-0 bg-cover bg-center'
          style={{
            backgroundImage: "url('/votre-image-de-fond.jpg')",
            filter: 'brightness(50%)',
            zIndex: -1,
          }}
        ></div>{' '}
        <div className='relative z-10 px-4'>
          {' '}
          <h1 className='text-4xl md:text-6xl font-extrabold font-adlam'>
            {pageContent.heroTitle}{' '}
          </h1>{' '}
          <p className='text-xl md:text-2xl mt-4 max-w-2xl mx-auto'>
            {pageContent.heroDescription}{' '}
          </p>{' '}
        </div>{' '}
      </div>
      <NumbersSection />
      <AlphabetSection />
      <AdlamSemaine />
      <AdlamTableDouzMois />
      <AdlamTableDouzMois2 />
      {/* Sections dynamiques basées sur les données */}
      {/* <CulturalDiscussionSection content={pageContent.sections[0]} />
      <CalendarSection content={pageContent.sections[1]} />{' '} */}
      {/* Ajoutez les autres sections ici */}{' '}
    </div>
  )
}

export default InitiationPage
