import React, { useState } from 'react'
import { useLanguage } from '../src/providers/LanguageProvider'
import { Link } from 'react-router-dom'
import axios from 'axios' // Assure-toi d'avoir installé axios ou utilise fetch

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { translations, selectedLanguage } = useLanguage()
  const currentLang = translations[selectedLanguage]

  // On récupère les traductions (pense à ajouter ces clés dans ton fichier de langue)
  const { emailLabel, emailPlaceholder } = currentLang.auth.login

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setMessage('')

    try {
      // Remplace l'URL par ton point d'entrée API réel
      const response = await axios.post(
        `https://adlambackend-production.up.railway.app/api/auth/forgot-password`,
        { email },
      )
      setMessage(
        'Un lien de réinitialisation a été envoyé à votre adresse e-mail.',
      )
    } catch (err) {
      setError(err.response?.data?.message || 'Une erreur est survenue.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='flex flex-col items-center justify-center p-8 bg-gray-50 min-h-screen'>
      <div className='bg-white p-8 rounded-lg shadow-xl w-full max-w-lg'>
        <h2 className='text-3xl font-bold text-center mb-6 text-gray-800'>
          {/* Tu peux ajouter cette clé dans tes traductions : "Récupération" */}
          𞤸𞤫𞤩𞤼𞤵𞤺𞤮𞤤 𞤼𞤮𞤲𞤺𞤭𞤪𞤣𞤫 𞤲𞤣𞤫𞤲
        </h2>

        {message ? (
          <div className='text-center'>
            <p className='text-green-600 mb-6'>{message}</p>
            <Link
              to='/login'
              className='text-blue-600 hover:underline font-bold'
            >
              𞤒𞤭𞤤𞤼𞤢𞤺𞤮𞤤 𞤳𞤢 𞤯𞤫𞤪𞤮𞤤 𞤧𞤮𞤯𞤢𞤲𞤣𞤫
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <p className='text-gray-600 mb-6 text-center'>
              𞤏𞤢𞤯𞤫𞥅 𞤲𞤭𞤤𞤼𞤭𞥅𞤧𞤵 𞤥𞤮𞥅𞤯𞤮𞤲 𞤲𞤺𞤵𞤲 𞤬𞤭𞥅 𞤸𞤫𞤲𞤣𞤢𞤺𞤮𞤤 𞤶𞤮𞤤𞤳𞤵 𞤸𞤫𞥅𞤯𞤭𞤲𞤼𞤭𞤲𞤢𞤲𞤣𞤫
            </p>

            <div className='mb-6'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='email'
              >
                {emailLabel}
              </label>
              <input
                className='shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='email'
                type='email'
                placeholder={emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {error && (
              <p className='text-red-500 text-sm text-center mb-4'>{error}</p>
            )}

            <div className='flex items-center justify-center'>
              <button
                className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full disabled:opacity-50 disabled:cursor-not-allowed'
                type='submit'
                disabled={isLoading}
              >
                {isLoading ? 'Envoi en cours...' : 'Envoyer le lien'}
              </button>
            </div>

            <div className='mt-6 text-center'>
              <Link
                to='/login'
                className='text-sm text-gray-600 hover:underline'
              >
                𞤒𞤭𞤤𞤼𞤢𞤺𞤮𞤤 𞤳𞤢 𞤯𞤫𞤪𞤮𞤤 𞤧𞤮𞤯𞤢𞤲𞤣𞤫
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default ForgotPassword
