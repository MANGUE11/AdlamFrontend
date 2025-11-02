import React, { useRef } from 'react'
import { useLanguage } from '../src/providers/LanguageProvider'

// Composant pour chaque bouton d'alphabet
const AlphabetButton = ({ letter, adlam, audioSrc }) => {
  const audioRef = useRef(null)
  const { selectedLanguage } = useLanguage()

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play()
    }
  }

  return (
    <button
      onClick={playAudio}
      className='flex items-center justify-center p-2 md:p-4 rounded-lg border border-[#2c3159] text-[#2c3159] hover:bg-[#2c3159] hover:text-white transition-colors duration-300 min-w-[120px] md:min-w-[160px]'
    >
      {' '}
      <div className='flex items-center space-x-2 md:space-x-4'>
        {' '}
        {selectedLanguage === 'adlam' ? (
          <>
            {' '}
            <span className='font-adlam text-lg md:text-2xl'>{adlam}</span>{' '}
            {/* <span className='font-bold text-lg md:text-2xl'> - {letter}</span>{' '} */}
          </>
        ) : (
          <span className='font-bold text-lg md:text-2xl'>{letter}</span>
        )}{' '}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='lucide lucide-volume'
        >
          <path d='M11 5L6 9H2V15H6L11 19V5Z' />{' '}
        </svg>{' '}
      </div>
      <audio ref={audioRef} src={audioSrc} preload='auto' />{' '}
    </button>
  )
}

// Le composant AlphabetSection
const AlphabetSection = () => {
  const { translations, selectedLanguage } = useLanguage()
  const content = translations[selectedLanguage].initiationPage.alphabet

  return (
    <section className='py-16 bg-gray-50 text-gray-800'>
      {' '}
      <div className='container mx-auto px-4 max-w-7xl'>
        {' '}
        <h2 className='text-3xl md:text-4xl font-extrabold mb-8 font-adlam text-center'>
          {content.title}{' '}
        </h2>{' '}
        <div className='grid grid-cols-2 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-6 gap-3 md:gap-4 justify-items-center'>
          {' '}
          {content.list.map((item, index) => (
            <AlphabetButton
              key={index}
              letter={item.letter}
              adlam={item.adlam}
              audioSrc={item.audio}
            />
          ))}{' '}
        </div>{' '}
      </div>{' '}
    </section>
  )
}

export default AlphabetSection
