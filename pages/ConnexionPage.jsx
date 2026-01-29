import React, { useState } from 'react'
import { useLanguage } from '../src/providers/LanguageProvider' // Assurez-vous que le chemin est correct
import { useAuth } from '../src/providers/AuthProvider'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom' // Importer Link pour la navigation interne

const ConnexionPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, isLoading, error } = useAuth()
  const { translations, selectedLanguage } = useLanguage()
  const currentLang = translations[selectedLanguage]

  // Déstructuration des clés de traduction de manière plus claire
  const {
    signIn,
    emailLabel,
    emailPlaceholder,
    passwordLabel,
    passwordPlaceholder,
    signInButton,
    loadingButton,
    noAccount,
    signUpHere,
  } = currentLang.auth.login

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const success = await login(email, password)
    if (success) {
      navigate('/')
    }
  }

  return (
    <div className='flex flex-col items-center justify-center p-8 bg-gray-50 min-h-screen'>
      <div className='bg-white p-8 rounded-lg shadow-xl w-full max-w-lg'>
        <h2 className='text-3xl font-bold text-center mb-6 text-gray-800'>
          {signIn}
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Champ email */}
          <div className='mb-4'>
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

          {/* Champ mot de passe (UN SEUL ICI) */}
          <div className='mb-6'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='password'
            >
              {passwordLabel}
            </label>
            <input
              className='shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline'
              id='password'
              type='password'
              placeholder={passwordPlaceholder}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Lien mot de passe oublié bien placé sous le champ */}
            <div className='flex justify-end'>
              <Link
                to='/forgot-password'
                className='text-sm text-blue-600 hover:underline'
              >
                Mot de passe oublié ?
              </Link>
            </div>
          </div>

          {/* Affichage du message d'erreur */}
          {error && (
            <p className='text-red-500 text-sm text-center mb-4'>{error}</p>
          )}

          <div className='flex items-center justify-center'>
            <button
              className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full disabled:opacity-50 disabled:cursor-not-allowed'
              type='submit'
              disabled={isLoading}
            >
              {isLoading ? loadingButton : signInButton}
            </button>
          </div>
        </form>

        {/* Lien vers la page d'inscription */}
        <p className='mt-4 text-center text-gray-600'>
          {noAccount}{' '}
          <Link
            to='/register'
            className='text-green-600 hover:underline font-bold'
          >
            {signUpHere}
          </Link>
        </p>
      </div>
    </div>
  )
}

export default ConnexionPage
