import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useLanguage } from '../src/providers/LanguageProvider'

import CommentForm from '../components/CommentForm'
import CommentsList from '../components/CommentsList'

const ArticlePage = () => {
  const { id } = useParams()
  const { translations, selectedLanguage, textDirection } = useLanguage()
  const currentLang = translations[selectedLanguage] // Accès aux traductions pour les titres/messages

  const [article, setArticle] = useState(null)
  const [comments, setComments] = useState([]) // État pour stocker les commentaires
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fonction utilitaire pour obtenir la traduction d'une clé
  const t = (key, fallback) => currentLang?.[key] || fallback // Fonction pour récupérer l'article ET ses commentaires

  useEffect(() => {
    const fetchArticleAndComments = async () => {
      try {
        // 1. Récupération de l'article
        const articleResponse = await fetch(
          `http://localhost:3000/api/articles/${id}`
        )
        if (!articleResponse.ok) {
          throw new Error(
            t(
              'article_error_not_found',
              'Erreur de réseau ou article non trouvé.'
            )
          )
        }
        const articleData = await articleResponse.json()
        setArticle(articleData) // 2. Récupération des commentaires

        const commentsResponse = await fetch(
          `http://localhost:3000/api/articles/${id}/comments`
        )
        if (!commentsResponse.ok) {
          console.error('Erreur lors de la récupération des commentaires.')
          setComments([])
        } else {
          const commentsData = await commentsResponse.json()
          setComments(commentsData)
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchArticleAndComments()
    }
  }, [id, selectedLanguage]) // Fonction de rappel pour mettre à jour les commentaires après une soumission réussie

  const handleCommentAdded = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment])
  }

  if (loading) {
    return (
      <div className='text-center py-16'>
        {t('article_loading', "Chargement de l'article...")}
      </div>
    )
  }

  if (error) {
    return (
      <div className='text-center py-16 text-red-500'>
        {t('article_error_prefix', 'Erreur')} : {error}
      </div>
    )
  }

  if (!article) {
    return (
      <div className='text-center py-16'>
        {t('article_not_found', 'Article non trouvé.')}
      </div>
    )
  } // Fonctions de sélection de langue inchangées

  const getTitle = () => {
    switch (selectedLanguage) {
      case 'adlam':
        return article.title_adlam
      case 'fr':
        return article.title_french
      case 'en':
        return article.title_english
      default:
        return article.title_french
    }
  }

  const getContent = () => {
    switch (selectedLanguage) {
      case 'adlam':
        return article.content_adlam
      case 'fr':
        return article.content_french
      case 'en':
        return article.content_english
      default:
        return article.content_french
    }
  }

  const formattedDate = new Date(article.createdAt).toLocaleDateString(
    selectedLanguage,
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  )

  return (
    <div className='font-sans pt-16' style={{ direction: textDirection }}>
      {/* Section Hero avec l'image de couverture */}{' '}
      <div
        className='relative h-96 w-full bg-cover bg-center'
        style={{ backgroundImage: `url(${article.coverImageUrl})` }}
      >
        <div className='absolute inset-0 bg-black opacity-50'></div>{' '}
        <div className='relative z-10 flex flex-col items-center justify-center h-full px-4 text-center text-white'>
          {' '}
          <h1 className='text-3xl md:text-5xl font-bold mb-4'>
            {getTitle()}
          </h1>{' '}
          <p className='text-xl md:text-2xl font-semibold'>
            {t('article_by', 'Par')} {article.author.name}{' '}
            {t('article_on', 'le')} {formattedDate}{' '}
          </p>{' '}
        </div>{' '}
      </div>
      {/* Contenu de l'article */}{' '}
      <div className='container mx-auto px-4 py-12 max-w-4xl'>
        {' '}
        <p
          className='text-lg text-gray-700 leading-relaxed text-justify whitespace-pre-wrap'
          style={{ direction: textDirection }}
        >
          {getContent()}{' '}
        </p>
        {/* --- Section des Commentaires --- */}{' '}
        <div
          className='mt-20 pt-8 border-t border-gray-200'
          id='comments-section'
        >
          {' '}
          <h2
            className='text-3xl font-bold mb-8 text-gray-900'
            style={{ direction: textDirection }}
          >
            {t('comments_title', 'Commentaires')} ({comments.length}){' '}
          </h2>
          {/* 1. Formulaire de soumission de commentaire */}{' '}
          <CommentForm articleId={id} onCommentAdded={handleCommentAdded} />
          {/* 2. Liste des commentaires existants */}{' '}
          {/* ⚠️ Ajustement Critique : Passage de setComments pour la suppression Admin */}{' '}
          <CommentsList comments={comments} setComments={setComments} />{' '}
        </div>{' '}
      </div>{' '}
    </div>
  )
}

export default ArticlePage
