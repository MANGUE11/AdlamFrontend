import React from 'react'
import { MessageCircle, Trash } from 'lucide-react'
import { useAuth } from '../src/providers/AuthProvider'
import { useLanguage } from '../src/providers/LanguageProvider'

// Fonction utilitaire pour obtenir la locale Adlam
const getLocale = (lang) => {
  if (lang === 'adlam') return 'ff-Adlm' // Locale Adlam/Pulaar
  if (lang === 'en') return 'en-US'
  return 'fr-FR'
}

// =========================================================================
// Composant pour afficher un seul commentaire (Maintenant avec suppression Admin)
// =========================================================================
const CommentItem = ({
  comment,
  textDirection,
  t,
  selectedLanguage,
  onCommentDeleted,
}) => {
  // Récupère l'utilisateur connecté et le token
  const { user, token } = useAuth() // Vérifie si l'utilisateur est administrateur (role === 'admin')

  const isAdmin = user && user.role === 'admin'

  // Formatage de la date dynamique
  const formattedDate = new Date(comment.createdAt).toLocaleDateString(
    getLocale(selectedLanguage), // Utilisation de la locale dynamique
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }
  )

  const handleDelete = async () => {
    if (
      !window.confirm(
        t(
          'confirmDelete', // Clé traduite
          'Êtes-vous sûr de vouloir supprimer ce commentaire ?'
        )
      )
    ) {
      return
    }

    try {
      const response = await fetch(
        `https://adlambackend-production.up.railway.app/api/comments/${comment.id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )

      if (response.ok) {
        onCommentDeleted(comment.id)
      } else {
        const data = await response.json()
        alert(
          t('deleteError', 'Erreur lors de la suppression:') +
            ' ' +
            (data.error || data.message || response.statusText)
        )
      }
    } catch (error) {
      console.error('Erreur de connexion DELETE:', error)
      alert(
        t(
          'deleteConnectionError', // Clé traduite
          'Erreur de connexion au serveur lors de la suppression.'
        )
      )
    }
  }

  return (
    <div
      className='flex items-start space-x-4 p-4 border-b border-gray-100 last:border-b-0' // Ajustement de la disposition pour RTL (Adlam)
      style={{
        direction: textDirection,
        flexDirection: textDirection === 'rtl' ? 'row-reverse' : 'row',
      }}
    >
      {/* Icône / Avatar de l'utilisateur */}{' '}
      <div
        className={`flex-shrink-0 w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-bold ${
          textDirection === 'rtl' ? 'ml-4' : 'mr-4'
        }`}
      >
        {comment.author.name.charAt(0).toUpperCase()}{' '}
      </div>{' '}
      <div className='flex-1 min-w-0'>
        {' '}
        <div className='flex justify-between items-center'>
          {' '}
          <p className='text-sm font-semibold text-gray-900 truncate'>
            {comment.author.name}{' '}
          </p>{' '}
          <div className='flex items-center space-x-2'>
            {/* Date */}{' '}
            <p className='text-xs text-gray-500 flex-shrink-0'>
              {formattedDate}{' '}
            </p>
            {/* Bouton de suppression conditionnel pour l'Admin */}{' '}
            {isAdmin && (
              <button
                onClick={handleDelete}
                className='text-red-500 hover:text-red-700 transition duration-150 p-1 rounded-full'
                title={t(
                  'deleteButtonTitle', // Clé traduite
                  'Supprimer ce commentaire'
                )}
              >
                <Trash size={14} />{' '}
              </button>
            )}{' '}
          </div>{' '}
        </div>{' '}
        <p className='mt-1 text-gray-700 whitespace-pre-wrap'>
          {comment.content}{' '}
        </p>{' '}
      </div>{' '}
    </div>
  )
}

// =========================================================================
// Composant principal pour la liste des commentaires
// =========================================================================
const CommentsList = ({ comments, setComments }) => {
  // Récupération des données multilingues
  const { textDirection, translations, selectedLanguage } = useLanguage()
  const commentsLang = translations[selectedLanguage].commentsList || {} // Gère la fonction de traduction locale (adaptée pour l'objet commentsList)

  const t = (key, fallback) => commentsLang[key] || fallback // Gère la mise à jour de la liste après la suppression

  const handleCommentDeleted = (deletedCommentId) => {
    if (setComments) {
      setComments((prevComments) =>
        prevComments.filter((c) => c.id !== deletedCommentId)
      )
    }
  }

  if (!comments || comments.length === 0) {
    return (
      <div
        className='p-6 bg-white rounded-lg shadow-md text-center text-gray-500'
        style={{ direction: textDirection }}
      >
        <MessageCircle className='mx-auto mb-3' size={32} />{' '}
        <p className='text-lg'>
          {t('none', 'Soyez le premier à commenter cet article !')}{' '}
        </p>{' '}
      </div>
    )
  }

  return (
    <div
      className='bg-white rounded-lg shadow-md divide-y divide-gray-100 mt-8'
      style={{ direction: textDirection }}
    >
      {' '}
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          textDirection={textDirection}
          t={t} // Passage de la fonction de traduction
          selectedLanguage={selectedLanguage} // Passage de la langue pour le formatage de date
          onCommentDeleted={handleCommentDeleted}
        />
      ))}{' '}
    </div>
  )
}

export default CommentsList
