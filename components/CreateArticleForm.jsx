import React, { useState } from 'react'
import { useAuth } from '../src/providers/AuthProvider'
import { useLanguage } from '../src/providers/LanguageProvider'

const CreateArticleForm = () => {
  const { token } = useAuth()
  const { translations, selectedLanguage } = useLanguage()
  const currentLang = translations[selectedLanguage].createArticle
  const sharedLang = translations[selectedLanguage].shared // Nouveaux états pour les titres multilingues

  const [titleAdlam, setTitleAdlam] = useState('')
  const [titleFrench, setTitleFrench] = useState('')
  const [titleEnglish, setTitleEnglish] = useState('') // Anciens états pour le contenu et l'image

  const [contentAdlam, setContentAdlam] = useState('')
  const [contentFrench, setContentFrench] = useState('')
  const [contentEnglish, setContentEnglish] = useState('')
  const [coverImage, setCoverImage] = useState(null)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')
    setMessageType('')
    console.log('Token:', token)

    try {
      let coverImageUrl = null // Étape 1: Uploader l'image si elle existe

      if (coverImage) {
        const formData = new FormData()
        formData.append('image', coverImage)

        const uploadResponse = await fetch(
          'https://adlambackend-production.up.railway.app/api/upload',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        )

        const uploadResult = await uploadResponse.json()
        if (!uploadResponse.ok) {
          throw new Error(
            uploadResult.message || "Erreur lors du téléchargement de l'image."
          )
        }
        coverImageUrl = uploadResult.imageUrl
      } // Étape 2: Créer l'article avec l'URL de l'image

      const articleData = {
        // Nouveaux champs de titre
        title_adlam: titleAdlam,
        title_french: titleFrench,
        title_english: titleEnglish, // Champs de contenu existants
        content_adlam: contentAdlam,
        content_french: contentFrench,
        content_english: contentEnglish,
        coverImageUrl,
      }

      const articleResponse = await fetch(
        'https://adlambackend-production.up.railway.app/api/articles',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
          body: JSON.stringify(articleData),
        }
      )

      const articleResult = await articleResponse.json()
      if (!articleResponse.ok) {
        throw new Error(
          articleResult.message || "Erreur lors de la création de l'article."
        )
      }

      setMessage('Article créé avec succès !')
      setMessageType('success') // Réinitialiser le formulaire
      setTitleAdlam('')
      setTitleFrench('')
      setTitleEnglish('')
      setContentAdlam('')
      setContentFrench('')
      setContentEnglish('')
      setCoverImage(null)
    } catch (error) {
      console.error('Error creating article:', error)
      setMessage(error.message || 'Une erreur est survenue.')
      setMessageType('error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='w-full'>
      {' '}
      <form onSubmit={handleSubmit} className='space-y-6'>
        {' '}
        {message && (
          <div
            className={`p-4 rounded-xl font-medium ${
              messageType === 'success'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {message}{' '}
          </div>
        )}
        {/* Champs de titre multilingues */}{' '}
        <div>
          {' '}
          <label
            htmlFor='title-adlam'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Titre (Adlam){' '}
          </label>{' '}
          <input
            type='text'
            id='title-adlam'
            value={titleAdlam}
            onChange={(e) => setTitleAdlam(e.target.value)}
            required
            className='w-full p-3 rounded-xl border border-gray-300 focus:ring focus:ring-[#2c3159] focus:ring-opacity-50'
          />{' '}
        </div>{' '}
        <div>
          {' '}
          <label
            htmlFor='title-french'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Titre (Français){' '}
          </label>{' '}
          <input
            type='text'
            id='title-french'
            value={titleFrench}
            onChange={(e) => setTitleFrench(e.target.value)}
            required
            className='w-full p-3 rounded-xl border border-gray-300 focus:ring focus:ring-[#2c3159] focus:ring-opacity-50'
          />{' '}
        </div>{' '}
        <div>
          {' '}
          <label
            htmlFor='title-english'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Titre (Anglais){' '}
          </label>{' '}
          <input
            type='text'
            id='title-english'
            value={titleEnglish}
            onChange={(e) => setTitleEnglish(e.target.value)}
            required
            className='w-full p-3 rounded-xl border border-gray-300 focus:ring focus:ring-[#2c3159] focus:ring-opacity-50'
          />{' '}
        </div>
        {/* Champs de contenu existants */}{' '}
        <div>
          {' '}
          <label
            htmlFor='content-adlam'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Contenu (Adlam){' '}
          </label>{' '}
          <textarea
            id='content-adlam'
            value={contentAdlam}
            onChange={(e) => setContentAdlam(e.target.value)}
            required
            className='w-full p-3 rounded-xl border border-gray-300 focus:ring focus:ring-[#2c3159] focus:ring-opacity-50 h-32'
          />{' '}
        </div>{' '}
        <div>
          {' '}
          <label
            htmlFor='content-french'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Contenu (Français){' '}
          </label>{' '}
          <textarea
            id='content-french'
            value={contentFrench}
            onChange={(e) => setContentFrench(e.target.value)}
            required
            className='w-full p-3 rounded-xl border border-gray-300 focus:ring focus:ring-[#2c3159] focus:ring-opacity-50 h-32'
          />{' '}
        </div>{' '}
        <div>
          {' '}
          <label
            htmlFor='content-english'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Contenu (Anglais){' '}
          </label>{' '}
          <textarea
            id='content-english'
            value={contentEnglish}
            onChange={(e) => setContentEnglish(e.target.value)}
            required
            className='w-full p-3 rounded-xl border border-gray-300 focus:ring focus:ring-[#2c3159] focus:ring-opacity-50 h-32'
          />{' '}
        </div>
        {/* Champ de l'image de couverture */}{' '}
        <div>
          {' '}
          <label
            htmlFor='cover-image'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Image de couverture{' '}
          </label>{' '}
          <input
            type='file'
            id='cover-image'
            accept='image/*'
            onChange={(e) => setCoverImage(e.target.files[0])}
            className='w-full p-3 rounded-xl border border-gray-300 focus:ring focus:ring-[#2c3159] focus:ring-opacity-50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#2c3159] file:text-white hover:file:bg-[#1a1d35]'
          />{' '}
        </div>
        {/* Bouton de soumission */}{' '}
        <div className='flex justify-end'>
          {' '}
          <button
            type='submit'
            className='bg-[#2c3159] text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
            disabled={isLoading}
          >
            {isLoading ? 'Création en cours...' : "Créer l'article"}{' '}
          </button>{' '}
        </div>{' '}
      </form>{' '}
    </div>
  )
}

export default CreateArticleForm
