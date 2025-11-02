import React, { useState, useEffect } from 'react'
import { useLanguage } from '../src/providers/LanguageProvider'
import { Link } from 'react-router-dom'

const AllArticlesPage = () => {
  const { translations, selectedLanguage, textDirection } = useLanguage()
  const currentLang = translations[selectedLanguage]
  const articlesPageLang = currentLang.allArticlesPage
  const articlesData = currentLang.articlesSection

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const articlesPerPage = 10

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          'https://adlambackend-production.up.railway.app/api/articles'
        )
        if (!response.ok) {
          throw new Error('Erreur de réseau ou de serveur.')
        }
        const data = await response.json()
        const sortedArticles = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
        setArticles(sortedArticles)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [selectedLanguage])

  const getArticleTitle = (article) => {
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

  const getArticleContent = (article) => {
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
  } // Logique de pagination

  const indexOfLastArticle = currentPage * articlesPerPage
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage
  const currentArticles = articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  )
  const totalPages = Math.ceil(articles.length / articlesPerPage)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  if (loading) {
    return <div className='text-center py-16'>Chargement des articles...</div>
  }

  if (error) {
    return (
      <div className='text-center py-16 text-red-500'>Erreur : {error}</div>
    )
  }

  return (
    <div className='font-sans'>
      {/* Hero Section CORRIGÉE pour l'espacement mobile */}
      <section
        className='bg-[#2c3159] text-white py-20 px-4 text-center 
                   pt-48 md:pt-35' // <-- pt-40 (160px) sur mobile pour compenser le header fixe
      >
        <div className='container mx-auto max-w-7xl'>
          <h1 className='text-5xl md:text-6xl font-extrabold mb-4'>
            {articlesPageLang.heroTitle}
          </h1>
          <p className='text-xl md:text-2xl font-light opacity-80'>
            {articlesPageLang.heroSubtitle}
          </p>
        </div>
      </section>

      <section className='bg-gray-100 py-16'>
        <div className='container mx-auto px-4 max-w-7xl'>
          {articles.length === 0 ? (
            <p className='text-gray-600 text-center'>Aucun article trouvé.</p>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
              {currentArticles.map((article) => (
                <div
                  key={article.id}
                  className='bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105'
                >
                  <img
                    src={article.coverImageUrl}
                    alt={
                      getArticleTitle(article) ||
                      `Image de l'article ${article.id}`
                    }
                    className='w-full h-48 object-cover'
                  />
                  <div className='p-6 text-center'>
                    <h3 className='text-xl font-bold text-[#2c3159] mb-2 line-clamp-2'>
                      {getArticleTitle(article)}
                    </h3>
                    <p
                      className='text-gray-400 mb-4 line-clamp-3'
                      style={{ direction: textDirection }}
                    >
                      {getArticleContent(article).slice(0, 100) + '...'}
                    </p>
                    <Link
                      to={`/articles/${article.id}`}
                      className='bg-[#2c3159] text-white font-bold py-2 px-6 rounded-full shadow-md hover:bg-[#1a1e3a] transition duration-300'
                    >
                      {articlesData.readMoreButton}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Pagination Controls */}
      {articles.length > articlesPerPage && (
        <div className='container mx-auto px-4 py-8 max-w-7xl flex justify-center items-center space-x-2'>
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className='bg-white text-[#2c3159] font-bold py-2 px-4 rounded-full shadow-md hover:bg-gray-200 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            Précédent
          </button>
          <span className='text-lg font-semibold text-gray-700'>
            Page {currentPage} de {totalPages}
          </span>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className='bg-white text-[#2c3159] font-bold py-2 px-4 rounded-full shadow-md hover:bg-gray-200 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            Suivant
          </button>
        </div>
      )}
    </div>
  )
}

export default AllArticlesPage
