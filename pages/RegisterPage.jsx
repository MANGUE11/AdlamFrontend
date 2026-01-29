import React, { useState } from 'react'
import { useLanguage } from '../src/providers/LanguageProvider'

// Composant de la page d'inscription
const RegisterPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Utilisation du hook de langue pour les traductions
  const { translations, selectedLanguage } = useLanguage()
  const currentLang = translations[selectedLanguage]
  const {
    signUp,
    nameLabel,
    emailLabel,
    passwordLabel,
    confirmPasswordLabel,
    signUpButton,
    hasAccount,
    signInHere,
    passwordMismatchError,
    registrationError,
    loadingButton,
  } = currentLang.auth.register

  /**
   * Gère la soumission du formulaire d'inscription.
   * @param {object} e - L'événement de soumission du formulaire.
   */
  const handleSubmit = async (e) => {
    e.preventDefault()
    // Utilise la clé de traduction pour l'erreur de mot de passe
    if (password !== confirmPassword) {
      setMessage({
        type: 'error',
        text: passwordMismatchError,
      })
      return
    }

    setIsLoading(true)
    setMessage(null)

    try {
      // Simulation d'une requête API pour l'inscription
      const response = await fetch(
        'https://adlambackend-production.up.railway.app/api/auth/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, password }),
        },
      )

      const data = await response.json()

      if (response.ok) {
        setMessage({ type: 'success', text: data.message })
        setIsSuccess(true)
      } else {
        // Utilise la clé de traduction pour l'erreur de connexion
        setMessage({
          type: 'error',
          text: data.message || registrationError,
        })
      }
    } catch (error) {
      console.error('Erreur:', error)
      setMessage({ type: 'error', text: 'Erreur de connexion au serveur.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='flex flex-col items-center justify-center p-8 bg-gray-50 min-h-screen'>
      <div className='bg-white p-8 rounded-lg shadow-xl w-full max-w-lg'>
        <h2 className='text-3xl font-bold text-center mb-6 text-gray-800'>
          {signUp}
        </h2>
        <form onSubmit={handleSubmit}>
          {[
            {
              id: 'name',
              type: 'text',
              label: nameLabel,
              value: name,
              onChange: setName,
            },
            {
              id: 'email',
              type: 'email',
              label: emailLabel,
              value: email,
              onChange: setEmail,
            },
            {
              id: 'password',
              type: 'password',
              label: passwordLabel,
              value: password,
              onChange: setPassword,
            },
            {
              id: 'confirmPassword',
              type: 'password',
              label: confirmPasswordLabel,
              value: confirmPassword,
              onChange: setConfirmPassword,
            },
          ].map((field) => (
            <div className='mb-4' key={field.id}>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor={field.id}
              >
                {field.label}
              </label>
              <input
                className='shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id={field.id}
                type={field.type}
                placeholder={field.label}
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                required
              />
            </div>
          ))}

          {message && (
            <p
              className={`text-sm text-center mb-4 ${
                message.type === 'success' ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {message.text}
            </p>
          )}

          <div className='flex items-center justify-center'>
            <button
              className='bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full disabled:opacity-50 disabled:cursor-not-allowed'
              type='submit'
              disabled={isLoading || isSuccess}
            >
              {/* Utilise la clé de traduction pour le texte du bouton */}
              {isLoading ? loadingButton : signUpButton}
            </button>
          </div>
        </form>
        <p className='mt-4 text-center text-gray-600'>
          {hasAccount}{' '}
          <a href='/login' className='text-blue-600 hover:underline font-bold'>
            {signInHere}
          </a>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
