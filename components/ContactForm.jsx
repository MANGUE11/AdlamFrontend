import React from 'react'
import { Facebook, Youtube, Instagram } from 'lucide-react'
import { useLanguage } from '../src/providers/LanguageProvider'

const ContactForm = () => {
  const { translations, selectedLanguage, textDirection } = useLanguage()
  const currentLang = translations[selectedLanguage].contactForm

  return (
    <section className='bg-white py-16 font-sans'>
      <div className='container mx-auto px-4 max-w-5xl'>
        <div className='flex flex-col md:flex-row bg-white rounded-3xl shadow-lg overflow-hidden'>
          {/* Section gauche (description et réseaux sociaux) */}
          <div className='flex-1 bg-[#2c3159] text-white p-8 md:p-12 flex flex-col justify-between rounded-l-3xl'>
            <div style={{ direction: textDirection }}>
              <h2 className='text-3xl font-bold mb-4'>{currentLang.title}</h2>
              <p className='text-gray-300'>{currentLang.descriptionLine1}</p>
              <br />
              <p className='text-gray-300'>{currentLang.descriptionLine2}</p>
            </div>

            <div className='flex justify-start mt-6 space-x-4'>
              <a
                href='https://www.facebook.com/share/1CRioYs2WX/'
                aria-label='Facebook'
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-300 hover:text-white transition duration-300'
              >
                <Facebook size={28} />
              </a>
              <a
                href='https://youtube.com/@akweeyo?feature=shared'
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-300 hover:text-white transition duration-300'
              >
                <Youtube size={28} />
              </a>
              <a
                href='https://www.instagram.com/akweeyo?igsh=MXBoZDZ5cGZ6OW9uZw=='
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-300 hover:text-white transition duration-300'
              >
                <Instagram size={28} />
              </a>
            </div>
          </div>

          {/* Section droite (formulaire) */}
          <div className='flex-1 p-8 md:p-12 bg-gray-50 rounded-r-3xl'>
            {/* FORMULAIRE MIS À JOUR AVEC FORMSFREE */}
            <form
              action='https://formspree.io/f/xgvrkwlv' // COLLER TON VRAI LIEN ICI
              method='POST'
            >
              {/* Champ Nom */}
              <div className='mb-6'>
                <label
                  htmlFor='name'
                  className='block text-sm font-medium text-gray-700 mb-2'
                  dir={textDirection}
                >
                  {currentLang.labelName}
                </label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  required
                  className='w-full px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#2c3159] focus:border-transparent transition duration-300'
                  dir={textDirection}
                />
              </div>

              {/* Champ Téléphone */}
              <div className='mb-6'>
                <label
                  htmlFor='tel'
                  className='block text-sm font-medium text-gray-700 mb-2'
                  dir={textDirection}
                >
                  {currentLang.labelTel}
                </label>
                <input
                  type='tel'
                  id='tel'
                  name='tel'
                  className='w-full px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#2c3159] focus:border-transparent transition duration-300'
                  dir='ltr'
                />
              </div>

              {/* Champ Email */}
              <div className='mb-6'>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-gray-700 mb-2'
                  dir={textDirection}
                >
                  {currentLang.labelEmail}
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  required
                  className='w-full px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#2c3159] focus:border-transparent transition duration-300'
                  dir='ltr'
                />
              </div>

              {/* Champ Message */}
              <div className='mb-6'>
                <label
                  htmlFor='message'
                  className='block text-sm font-medium text-gray-700 mb-2'
                  dir={textDirection}
                >
                  {currentLang.labelMessage}
                </label>
                <textarea
                  id='message'
                  name='message'
                  rows='4'
                  required
                  className='w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#2c3159] focus:border-transparent transition duration-300'
                  dir={textDirection}
                ></textarea>
              </div>

              {/* Bouton d'envoi */}
              <div style={{ direction: textDirection }}>
                <button
                  type='submit'
                  className='bg-[#2c3159] text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-[#1a1e3a] transition duration-300'
                >
                  {currentLang.buttonSubmit}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactForm
