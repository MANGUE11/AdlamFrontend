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
  }

  // === FONCTION : SUPPRIMER LE HTML, GARDER LE TEXTE BRUT ===
  const stripHtml = (html) => {
    const div = document.createElement('div')
    div.innerHTML = html
    return div.textContent || div.innerText || ''
  }

  // === FONCTION : EXTRAIT PROPRE (100 caractères max) ===
  const getCleanExcerpt = (article) => {
    const fullText = getArticleContent(article)
    const plainText = stripHtml(fullText)
    return plainText.length > 100 ? plainText.slice(0, 100) + '...' : plainText
  }

  // === PAGINATION ===
  const indexOfLastArticle = currentPage * articlesPerPage
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage
  const currentArticles = articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  )
  const totalPages = Math.ceil(articles.length / articlesPerPage)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  if (loading) {
    return (
      <div className='text-center py-16 text-lg'>
        Chargement des articles...
      </div>
    )
  }

  if (error) {
    return (
      <div className='text-center py-16 text-red-500'>Erreur : {error}</div>
    )
  }

  return (
    <div className='font-sans min-h-screen'>
      {/* === HERO SECTION === */}
      <section className='bg-[#2c3159] text-white py-20 px-4 text-center pt-48 md:pt-36'>
        <div className='container mx-auto max-w-7xl'>
          <h1 className='text-5xl md:text-6xl font-extrabold mb-4 leading-tight'>
            {articlesPageLang.heroTitle}
          </h1>
          <p className='text-xl md:text-2xl font-light opacity-80 max-w-3xl mx-auto'>
            {articlesPageLang.heroSubtitle}
          </p>
        </div>
      </section>

      {/* === LISTE DES ARTICLES === */}
      <section className='bg-gray-100 py-16'>
        <div className='container mx-auto px-4 max-w-7xl'>
          {articles.length === 0 ? (
            <p className='text-gray-600 text-center text-lg'>
              Aucun article trouvé.
            </p>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
              {currentArticles.map((article) => (
                <div
                  key={article.id}
                  className='bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 duration-300'
                >
                  {/* Image de couverture */}
                  <img
                    src={article.coverImageUrl}
                    alt={
                      getArticleTitle(article) ||
                      `Image de l'article ${article.id}`
                    }
                    className='w-full h-48 object-cover'
                    onError={(e) => {
                      e.target.src = '/placeholder.jpg' // Optionnel : image par défaut
                    }}
                  />

                  {/* Contenu */}
                  <div className='p-6 text-center'>
                    <h3 className='text-xl font-bold text-[#2c3159] mb-2 line-clamp-2'>
                      {getArticleTitle(article)}
                    </h3>
                    <p
                      className='text-gray-500 mb-4 line-clamp-3 text-sm leading-relaxed'
                      style={{ direction: textDirection }}
                    >
                      {getCleanExcerpt(article)}
                    </p>
                    <Link
                      to={`/articles/${article.id}`}
                      className='inline-block bg-[#2c3159] text-white font-bold py-2 px-6 rounded-full shadow-md hover:bg-[#1a1e3a] transition duration-300'
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

      {/* === PAGINATION === */}
      {articles.length > articlesPerPage && (
        <div className='container mx-auto px-4 py-8 max-w-7xl'>
          <div className='flex justify-center items-center space-x-2 flex-wrap gap-2'>
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className='bg-white text-[#2c3159] font-bold py-2 px-4 rounded-full shadow-md hover:bg-gray-100 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              Précédent
            </button>

            {/* Numéros de page (optionnel : afficher 1 à 5) */}
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = i + 1
              return (
                <button
                  key={pageNum}
                  onClick={() => paginate(pageNum)}
                  className={`px-4 py-2 rounded-full font-semibold transition ${
                    currentPage === pageNum
                      ? 'bg-[#2c3159] text-white'
                      : 'bg-white text-[#2c3159] hover:bg-gray-100'
                  }`}
                >
                  {pageNum}
                </button>
              )
            })}

            {totalPages > 5 && (
              <span className='px-3 py-2 text-gray-600'>...</span>
            )}

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className='bg-white text-[#2c3159] font-bold py-2 px-4 rounded-full shadow-md hover:bg-gray-100 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              Suivant
            </button>
          </div>

          <p className='text-center mt-4 text-sm text-gray-600'>
            Page {currentPage} sur {totalPages}
          </p>
        </div>
      )}
    </div>
  )
}

export default AllArticlesPage
