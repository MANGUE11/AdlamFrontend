import React, { useState, useEffect } from 'react'
import { useLanguage } from '../src/providers/LanguageProvider'
import { Link } from 'react-router-dom'

const AllArticlesPage = () => {
  const { translations, selectedLanguage, textDirection } = useLanguage()
  const currentLang = translations[selectedLanguage]
  const articlesPageLang = currentLang.allArticlesPage
  const articlesData = currentLang.articlesSection // États pour les données et le chargement

  const [articles, setArticles] = useState([]) // Tous les articles bruts
  const [filteredArticles, setFilteredArticles] = useState([]) // Articles après filtrage/recherche
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null) // État pour la recherche
  const [searchTerm, setSearchTerm] = useState('') // États pour la pagination

  const [currentPage, setCurrentPage] = useState(1)
  const articlesPerPage = 10 // Fonction utilitaire pour obtenir le titre localisé

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
  } // Fonction utilitaire pour obtenir le contenu localisé

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
  } // === FONCTION : SUPPRIMER LE HTML, GARDER LE TEXTE BRUT ===

  const stripHtml = (html) => {
    const div = document.createElement('div')
    div.innerHTML = html
    return div.textContent || div.innerText || ''
  } // === FONCTION : EXTRAIT PROPRE (100 caractères max) ===

  const getCleanExcerpt = (article) => {
    const fullText = getArticleContent(article)
    const plainText = stripHtml(fullText)
    return plainText.length > 100 ? plainText.slice(0, 100) + '...' : plainText
  } // === EFFET 1 : CHARGEMENT DES ARTICLES (au montage ou changement de langue) ===

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
  }, []) // La langue est déjà gérée dans getArticleTitle/Content // === EFFET 2 : FILTRAGE DES ARTICLES (au changement de articles ou searchTerm) ===

  useEffect(() => {
    setCurrentPage(1) // Réinitialiser à la première page lors du filtrage

    if (searchTerm.trim() === '') {
      setFilteredArticles(articles)
      return
    }

    const lowercasedSearchTerm = searchTerm.toLowerCase()

    const filtered = articles.filter((article) => {
      // Filtre sur les titres dans toutes les langues pour une recherche complète
      const titleAdlam = article.title_adlam?.toLowerCase() || ''
      const titleFrench = article.title_french?.toLowerCase() || ''
      const titleEnglish = article.title_english?.toLowerCase() || ''
      const authorName = article.author?.name?.toLowerCase() || ''
      return (
        titleAdlam.includes(lowercasedSearchTerm) ||
        titleFrench.includes(lowercasedSearchTerm) ||
        titleEnglish.includes(lowercasedSearchTerm) ||
        authorName.includes(lowercasedSearchTerm)
      )
    })
    setFilteredArticles(filtered)
  }, [searchTerm, articles]) // Gestion du changement dans la barre de recherche

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  } // === PAGINATION ===

  const indexOfLastArticle = currentPage * articlesPerPage
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage // La pagination utilise maintenant la liste filtrée
  const currentArticles = filteredArticles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  )
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage)

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
                Chargement des articles...      {' '}
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
            {/* === HERO SECTION === */}     {' '}
      <section className='bg-[#2c3159] text-white py-20 px-4 text-center pt-48 md:pt-36'>
               {' '}
        <div className='container mx-auto max-w-7xl'>
                   {' '}
          <h1 className='text-5xl md:text-6xl font-extrabold mb-4 leading-tight'>
                        {articlesPageLang.heroTitle}         {' '}
          </h1>
                   {' '}
          <p className='text-xl md:text-2xl font-light opacity-80 max-w-3xl mx-auto'>
                        {articlesPageLang.heroSubtitle}         {' '}
          </p>
                 {' '}
        </div>
             {' '}
      </section>
            {/* === LISTE DES ARTICLES AVEC BARRE DE RECHERCHE === */}     {' '}
      <section className='bg-gray-100 py-16'>
               {' '}
        <div className='container mx-auto px-4 max-w-7xl'>
                    {/* === BARRE DE RECHERCHE AJOUTÉE ICI === */}         {' '}
          <div className='mb-10'>
                       {' '}
            <input
              type='text'
              placeholder={
                articlesPageLang.searchPlaceholder ||
                'Rechercher des articles...'
              }
              value={searchTerm}
              onChange={handleSearchChange}
              className='w-full p-4 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-[#2c3159] focus:border-transparent transition duration-200'
              style={{ direction: textDirection }}
            />
                     {' '}
          </div>
                   {' '}
          {filteredArticles.length === 0 && searchTerm !== '' ? (
            <p className='text-gray-600 text-center text-lg'>
                            Aucun résultat trouvé pour "{searchTerm}".          
               {' '}
            </p>
          ) : filteredArticles.length === 0 && searchTerm === '' ? (
            <p className='text-gray-600 text-center text-lg'>
                            Aucun article trouvé.            {' '}
            </p>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
                           {' '}
              {currentArticles.map((article) => (
                <div
                  key={article.id}
                  className='bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 duration-300'
                >
                                    {/* Image de couverture */}                 {' '}
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
                                    {/* Contenu */}                 {' '}
                  <div className='p-6 text-center'>
                                       {' '}
                    <h3 className='text-xl font-bold text-[#2c3159] mb-2 line-clamp-2'>
                                            {getArticleTitle(article)}         
                               {' '}
                    </h3>
                                       {' '}
                    <p
                      className='text-gray-500 mb-4 line-clamp-3 text-sm leading-relaxed'
                      style={{ direction: textDirection }}
                    >
                                            {getCleanExcerpt(article)}         
                               {' '}
                    </p>
                                       {' '}
                    <Link
                      to={`/articles/${article.id}`}
                      className='inline-block bg-[#2c3159] text-white font-bold py-2 px-6 rounded-full shadow-md hover:bg-[#1a1e3a] transition duration-300'
                    >
                                            {articlesData.readMoreButton}       
                                 {' '}
                    </Link>
                                     {' '}
                  </div>
                                 {' '}
                </div>
              ))}
                         {' '}
            </div>
          )}
                 {' '}
        </div>
             {' '}
      </section>
            {/* === PAGINATION === */}     {' '}
      {/* La pagination s'affiche uniquement s'il y a plus d'articles filtrés que d'articles par page */}
           {' '}
      {filteredArticles.length > articlesPerPage && (
        <div className='container mx-auto px-4 py-8 max-w-7xl'>
                   {' '}
          <div className='flex justify-center items-center space-x-2 flex-wrap gap-2'>
                       {' '}
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className='bg-white text-[#2c3159] font-bold py-2 px-4 rounded-full shadow-md hover:bg-gray-100 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
            >
                            𞤒𞤭𞤤𞤼𞤮            {' '}
            </button>
                        {/* Numéros de page */}           {' '}
            {Array.from({ length: totalPages }, (_, i) => {
              const pageNum = i + 1 // Logique pour n'afficher qu'un sous-ensemble des pages (simplifié ici pour afficher toutes les pages) // Si vous avez beaucoup de pages, vous pouvez réintégrer la logique Math.min(5, totalPages)
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
                                    {pageNum}               {' '}
                </button>
              )
            })}
                       {' '}
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className='bg-white text-[#2c3159] font-bold py-2 px-4 rounded-full shadow-md hover:bg-gray-100 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
            >
                            𞤔𞤮𞤳𞥆𞤫𞥅            {' '}
            </button>
                     {' '}
          </div>
                   {' '}
          <p className='text-center mt-4 text-sm text-gray-600'>
                        𞤖𞤫𞤤𞥆𞤮 {currentPage} sur {totalPages}         {' '}
          </p>
                 {' '}
        </div>
      )}
         {' '}
    </div>
  )
}

export default AllArticlesPage
