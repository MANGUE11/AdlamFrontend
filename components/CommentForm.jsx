import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// IMPORTANT: Assurez-vous que ce chemin est correct pour votre application
import { useAuth } from '../src/providers/AuthProvider'
import { useLanguage } from '../src/providers/LanguageProvider'

const CommentForm = ({ articleId, onCommentAdded }) => {
  // Utilisation de votre hook d'authentification
  const { isAuthenticated, token } = useAuth() // Récupération de la direction du texte et des traductions

  const { textDirection, translations, selectedLanguage } = useLanguage()
  const currentLang = translations[selectedLanguage].commentForm // Accès direct aux traductions du formulaire

  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    setLoading(true)

    if (!content.trim()) {
      setError(currentLang.errorEmpty) // Utilisation de la traduction
      setLoading(false)
      return
    } // Vérification de sécurité supplémentaire

    if (!token) {
      setError(currentLang.errorAuthMissing) // Utilisation de la traduction
      setLoading(false)
      return
    }

    try {
      const response = await fetch(
        `https://adlambackend-production.up.railway.app/api/articles/${articleId}/comments`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.error || currentLang.errorApi // Utilisation de la traduction
        )
      } // Succès

      setSuccess(true)
      setContent('') // Réinitialiser le champ après succès // Mettre à jour la liste dans ArticlePage

      onCommentAdded(data.comment)
    } catch (err) {
      console.error('Erreur API:', err)
      setError(err.message || currentLang.errorConnection) // Utilisation de la traduction
    } finally {
      setLoading(false)
    }
  } // Si l'utilisateur n'est PAS connecté

  if (!isAuthenticated) {
    return (
      <div
        className='bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-8'
        role='alert'
        style={{ direction: textDirection }}
      >
        <p className='font-bold'>{currentLang.loginRequiredTitle}</p>{' '}
        <p>
          {currentLang.loginRequiredMessage}{' '}
          <Link to='/login' className='font-semibold underline'>
            {currentLang.loginLinkText}{' '}
          </Link>{' '}
          {currentLang.loginRequiredMessageEnd}{' '}
        </p>{' '}
      </div>
    )
  } // Affichage du formulaire de commentaire pour les utilisateurs connectés

  return (
    <form
      onSubmit={handleSubmit}
      className='mb-12 p-6 bg-gray-50 rounded-lg shadow-inner'
      style={{ direction: textDirection }}
    >
      {' '}
      <div className='mb-4'>
        {' '}
        <label
          htmlFor='comment-content'
          className='block text-lg font-medium text-gray-700 mb-2'
          style={{ textAlign: textDirection === 'rtl' ? 'right' : 'left' }}
        >
          {currentLang.label}{' '}
        </label>{' '}
        <textarea
          id='comment-content'
          rows='4'
          className='w-full p-3 border border-gray-300 rounded-md focus:ring-[#2c3159] focus:border-[#2c3159] transition'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={currentLang.placeholder}
          disabled={loading}
          dir={textDirection}
          style={{ textAlign: textDirection === 'rtl' ? 'right' : 'left' }}
        />{' '}
      </div>
      {/* Messages d'état */}{' '}
      {error && (
        <p
          className='text-red-500 mb-4 font-medium'
          style={{ textAlign: textDirection === 'rtl' ? 'right' : 'left' }}
        >
          Erreur: {error}{' '}
        </p>
      )}{' '}
      {success && (
        <p
          className='text-green-600 mb-4 font-medium'
          style={{ textAlign: textDirection === 'rtl' ? 'right' : 'left' }}
        >
          {currentLang.success}{' '}
        </p>
      )}{' '}
      <button
        type='submit'
        className='bg-[#2c3159] text-white font-bold py-2 px-6 rounded-full shadow-md hover:bg-indigo-700 transition duration-300 disabled:opacity-50'
        disabled={loading}
      >
        {loading ? currentLang.buttonLoading : currentLang.buttonSubmit}{' '}
      </button>{' '}
    </form>
  )
}

export default CommentForm
