import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
} from 'react'

// --- 1. CONFIGURATION ET CONTEXTES ---

// Création des Contextes
const AuthContext = createContext(null)
const LanguageContext = createContext(null)
const API_BASE_URL = 'https://adlambackend-production.up.railway.app/api'

// Définition des traductions (MODIFIÉ : ajout de searchPlaceholder)
const translations = {
  fr: {
    dashboard: {
      title: 'Tableau de bord administrateur',
      loading: 'Chargement...',
      error: 'Erreur de chargement des données.',
      articles: 'Articles',
      users: 'Utilisateurs',
      createArticle: 'Créer un article',
      logout: 'Déconnexion',
    },
    articleList: {
      title: '𞤕𞤭𞤪𞤼𞤮 𞤳𞤵𞤯𞤭',
      tableHeaders: ['𞤅𞤫𞤪𞤭𞤲𞤣𞤫', '𞤎𞤢𞤱𞤲𞤵𞤯𞤮', '𞤏𞤫𞤲𞤺𞤫𞥅 𞤳𞤵𞤯𞤮𞤤 𞤲𞤺𞤮𞤤', '𞤚𞤮𞤲𞥋𞤣𞤭𞤪𞤫'],
      loading: 'Chargement des articles...',
      noArticles: 'Aucun article trouvé.',
      editButton: '𞤏𞤀𞤴𞤤𞤵',
      deleteButton: '𞤃𞤮𞤲𞤼𞤵',
      deleteConfirm: 'Êtes-vous sûr de vouloir supprimer cet article ?',
      deleteSuccess: 'Article supprimé avec succès.',
      deleteError: "Erreur lors de la suppression de l'article.",
      updateSuccess: 'Article mis à jour avec succès.', // Nouveau message
      page: 'Page',
      // NOUVEAU: Texte pour la barre de recherche
      searchPlaceholder: '𞤏𞤭𞤯𞤮𞤪𞤣𞤫',
    },
    createArticle: {
      title: 'Créer un nouvel article',
      successMessage: 'Article créé avec succès.',
      errorMessage: "Erreur lors de la création de l'article.",
      networkError: 'Erreur de connexion au serveur.',
      createButton: 'Créer',
    },
    editArticle: {
      title: "Modifier l'article",
      successMessage: 'Article mis à jour avec succès.',
      errorMessage: "Erreur lors de la mise à jour de l'article.",
      updateButton: 'Mettre à jour',
      uploadNewImage: 'Télécharger une nouvelle image',
      uploading: 'Téléchargement en cours...',
      uploadSuccess: 'Image téléchargée avec succès.',
      uploadError: "Erreur lors du téléchargement de l'image.",
      currentImage: 'Image actuelle :',
    },
    userList: {
      title: 'Liste des utilisateurs',
      tableHeaders: ['Nom', 'Email', 'Rôle', 'Actions'],
      loading: 'Chargement des utilisateurs...',
      noUsers: 'Aucun utilisateur trouvé.',
      editButton: 'Modifier',
      deleteButton: 'Supprimer',
      deleteConfirm: 'Êtes-vous sûr de vouloir supprimer cet utilisateur ?',
      deleteSuccess: 'Utilisateur supprimé avec succès.',
      deleteError: "Erreur lors de la suppression de l'utilisateur.",
    },
    modal: {
      closeButton: 'Fermer',
    },
    titles: {
      adlam: 'Titre (Adlam)',
      french: 'Titre (Français)',
      english: 'Titre (Anglais)',
      content: {
        adlam: 'Contenu (Adlam)',
        french: 'Contenu (Français)',
        english: 'Contenu (Anglais)',
      },
      imageUrl: "URL de l'image de couverture",
    },
  },
}

// Fournisseur du contexte d'authentification
const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('token')
  )
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('user')
      return storedUser ? JSON.parse(storedUser) : null
    } catch (e) {
      console.error(
        'Erreur lors du parsing des données utilisateur depuis localStorage',
        e
      )
      return null
    }
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }

    if (token) {
      localStorage.setItem('token', token)
    } else {
      localStorage.removeItem('token')
    }
  }, [user, token])

  const login = async (email, password) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(
        'https://adlambackend-production.up.railway.app/api/auth/login',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        }
      )
      if (!response.ok) {
        const errData = await response.json()
        throw new Error(
          errData.message ||
            'Échec de la connexion. Veuillez vérifier vos informations.'
        )
      }
      const data = await response.json()
      setToken(data.token)
      setUser(data.user)
      setIsAuthenticated(true)
      return true
    } catch (err) {
      setError(err.message)
      setIsAuthenticated(false)
      setUser(null)
      setToken(null)
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  const value = {
    isAuthenticated,
    user,
    isLoading,
    error,
    token,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Fournisseur du contexte de langue
const LanguageProvider = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('fr')
  const value = {
    translations,
    selectedLanguage,
    setSelectedLanguage,
  }
  return (
    <LanguageContext.Provider value={value}>
            {children}   {' '}
    </LanguageContext.Provider>
  )
}

// Hook personnalisé pour utiliser le contexte d'authentification
const useAuth = () => useContext(AuthContext)

// Hook personnalisé pour utiliser le contexte de langue
const useLanguage = () => useContext(LanguageContext)

// --- 2. MODALS ET COMPOSANTS UTILITAIRES ---

// Composant de modal de confirmation personnalisé
const ConfirmModal = ({ message, onConfirm, onCancel }) => (
  <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-50'>
       {' '}
    <div className='relative bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm text-center'>
            <p className='text-lg font-semibold mb-4'>{message}</p>     {' '}
      <div className='flex justify-center gap-4'>
               {' '}
        <button
          onClick={onCancel}
          className='bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full hover:bg-opacity-80 transition-all duration-300'
        >
                    Annuler        {' '}
        </button>
               {' '}
        <button
          onClick={onConfirm}
          className='bg-red-500 text-white font-bold py-2 px-4 rounded-full hover:bg-red-600 transition-all duration-300'
        >
                    Confirmer        {' '}
        </button>
             {' '}
      </div>
         {' '}
    </div>
     {' '}
  </div>
)

// Composant de modal pour l'édition d'article
const EditArticleModal = ({ article, onClose, onUpdate }) => {
  const { translations, selectedLanguage } = useLanguage()
  const { token } = useAuth()
  const currentLang = translations[selectedLanguage].editArticle
  const commonLang = translations[selectedLanguage].modal
  const titleLang = translations[selectedLanguage].titles

  const fileInputRef = useRef(null)

  const [form, setForm] = useState({
    title_adlam: article.title_adlam,
    title_french: article.title_french,
    title_english: article.title_english,
    content_adlam: article.content_adlam,
    content_french: article.content_french,
    content_english: article.content_english,
    coverImageUrl: article.coverImageUrl,
  })
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [loading, setLoading] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false) // Effet pour créer et nettoyer l'URL de l'aperçu

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null)
      return
    }

    const url = URL.createObjectURL(selectedFile)
    setPreviewUrl(url) // Fonction de nettoyage pour libérer la mémoire

    return () => {
      URL.revokeObjectURL(url)
    }
  }, [selectedFile])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0])
  }

  const handleButtonClick = () => {
    fileInputRef.current.click()
  }

  const uploadImage = async () => {
    if (!selectedFile) {
      return null
    }

    setUploadingImage(true)
    const formData = new FormData()
    formData.append('image', selectedFile)

    try {
      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })
      if (!response.ok) {
        throw new Error(currentLang.uploadError)
      }
      const data = await response.json()
      return data.imageUrl
    } catch (error) {
      console.error(error) // Ne pas afficher de message ici, la gestion globale se fait dans le handleSubmit
      return null
    } finally {
      setUploadingImage(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    let newImageUrl = form.coverImageUrl

    if (selectedFile) {
      newImageUrl = await uploadImage()
      if (!newImageUrl) {
        onUpdate({ type: 'error', text: currentLang.uploadError })
        setLoading(false)
        onClose()
        return
      }
    }

    try {
      const response = await fetch(`${API_BASE_URL}/articles/${article.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...form, coverImageUrl: newImageUrl }),
      })

      const data = await response.json()
      if (response.ok) {
        // Appelle la fonction de mise à jour du parent et lui passe le message
        onUpdate({ type: 'success', text: currentLang.successMessage })
      } else {
        // Appelle la fonction de mise à jour du parent avec un message d'erreur
        onUpdate({
          type: 'error',
          text: data.message || currentLang.errorMessage,
        })
      }
    } catch (error) {
      onUpdate({ type: 'error', text: currentLang.errorMessage })
    } finally {
      setLoading(false)
      onClose() // Ferme la modal dans tous les cas
    }
  }

  return (
    <div className='fixed inset-0 z-50 flex items-start justify-center overflow-y-auto pt-10 pb-10'>
           {' '}
      <div className='relative bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl'>
                <h2 className='text-2xl font-bold mb-4'>{currentLang.title}</h2>
               {' '}
        <form onSubmit={handleSubmit} className='space-y-4'>
                   {' '}
          <div>
                       {' '}
            <label className='block text-sm font-medium text-gray-700'>
                            {titleLang.adlam}           {' '}
            </label>
                       {' '}
            <input
              type='text'
              name='title_adlam'
              value={form.title_adlam}
              onChange={handleChange}
              className='w-full mt-1 p-2 border rounded-xl'
            />
                     {' '}
          </div>
                   {' '}
          <div>
                       {' '}
            <label className='block text-sm font-medium text-gray-700'>
                            {titleLang.french}           {' '}
            </label>
                       {' '}
            <input
              type='text'
              name='title_french'
              value={form.title_french}
              onChange={handleChange}
              className='w-full mt-1 p-2 border rounded-xl'
            />
                     {' '}
          </div>
                   {' '}
          <div>
                       {' '}
            <label className='block text-sm font-medium text-gray-700'>
                            {titleLang.english}           {' '}
            </label>
                       {' '}
            <input
              type='text'
              name='title_english'
              value={form.title_english}
              onChange={handleChange}
              className='w-full mt-1 p-2 border rounded-xl'
            />
                     {' '}
          </div>
                   {' '}
          <div>
                       {' '}
            <label className='block text-sm font-medium text-gray-700'>
                            {titleLang.content.adlam}           {' '}
            </label>
                       {' '}
            <textarea
              name='content_adlam'
              value={form.content_adlam}
              onChange={handleChange}
              rows='5'
              className='w-full mt-1 p-2 border rounded-xl'
            ></textarea>
                     {' '}
          </div>
                   {' '}
          <div>
                       {' '}
            <label className='block text-sm font-medium text-gray-700'>
                            {titleLang.content.french}           {' '}
            </label>
                       {' '}
            <textarea
              name='content_french'
              value={form.content_french}
              onChange={handleChange}
              rows='5'
              className='w-full mt-1 p-2 border rounded-xl'
            ></textarea>
                     {' '}
          </div>
                   {' '}
          <div>
                       {' '}
            <label className='block text-sm font-medium text-gray-700'>
                            {titleLang.content.english}           {' '}
            </label>
                       {' '}
            <textarea
              name='content_english'
              value={form.content_english}
              onChange={handleChange}
              rows='5'
              className='w-full mt-1 p-2 border rounded-xl'
            ></textarea>
                     {' '}
          </div>
                   {' '}
          <div>
                       {' '}
            <label className='block text-sm font-medium text-gray-700 mb-2'>
                            {currentLang.currentImage}           {' '}
            </label>
                       {' '}
            {(previewUrl || form.coverImageUrl) && (
              <img
                src={previewUrl || form.coverImageUrl}
                alt='Aperçu'
                className='w-full h-auto rounded-xl shadow-md mb-4'
              />
            )}
                       {' '}
            <input
              type='file'
              ref={fileInputRef}
              onChange={handleFileChange}
              className='hidden'
            />
                       {' '}
            <button
              type='button'
              onClick={handleButtonClick}
              disabled={uploadingImage}
              className='w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-600 transition-all duration-300'
            >
                           {' '}
              {uploadingImage
                ? currentLang.uploading
                : currentLang.uploadNewImage}
                         {' '}
            </button>
                     {' '}
          </div>
                   {' '}
          <div className='flex justify-end gap-4'>
                       {' '}
            <button
              type='button'
              onClick={onClose}
              className='bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full'
            >
                            {commonLang.closeButton}           {' '}
            </button>
                       {' '}
            <button
              type='submit'
              disabled={loading || uploadingImage}
              className='bg-[#2c3159] text-white font-bold py-2 px-4 rounded-full hover:bg-opacity-90 transition-all duration-300'
            >
                           {' '}
              {loading ? 'Mise à jour...' : currentLang.updateButton}           {' '}
            </button>
                     {' '}
          </div>
                 {' '}
        </form>
             {' '}
      </div>
         {' '}
    </div>
  )
}

// --- 3. COMPOSANT PRINCIPAL (ArticleList) AVEC RECHERCHE ---

const ArticleList = () => {
  const { token } = useAuth()
  const { translations, selectedLanguage } = useLanguage()
  const currentLang = translations[selectedLanguage].articleList // États de la source de vérité et de filtrage

  const [allArticles, setAllArticles] = useState([]) // Tous les articles non filtrés
  const [filteredArticles, setFilteredArticles] = useState([]) // Articles affichés (filtrés)
  const [searchTerm, setSearchTerm] = useState('') // NOUVEAU: Terme de recherche // États d'UI et d'opération

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [articlesPerPage] = useState(15)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [currentArticle, setCurrentArticle] = useState(null)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [articleToDeleteId, setArticleToDeleteId] = useState(null)
  const [message, setMessage] = useState(null) // Fonction pour récupérer les articles et formater les titres

  const fetchArticles = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${API_BASE_URL}/articles`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des articles.')
      }

      const data = await response.json()
      const formattedArticles = data.map((article) => ({
        ...article,
        displayTitle:
          article[`title_${selectedLanguage}`] ||
          article.title_french ||
          article.title_english,
      }))
      setAllArticles(formattedArticles) // Met à jour la source de vérité
    } catch (err) {
      console.error("Erreur de l'API :", err)
      setError('Erreur de connexion au serveur.')
    } finally {
      setLoading(false)
    }
  } // Logique de filtrage (useEffect)

  useEffect(() => {
    setCurrentPage(1) // Réinitialiser à la première page lors du filtrage

    if (searchTerm.trim() === '') {
      setFilteredArticles(allArticles)
      return
    }

    const lowercasedSearchTerm = searchTerm.toLowerCase()
    const filtered = allArticles.filter((article) => {
      // Recherche dans le titre Adlam et Français
      const titleAdlam = article.title_adlam?.toLowerCase() || ''
      const titleFrench = article.title_french?.toLowerCase() || ''
      return (
        titleAdlam.includes(lowercasedSearchTerm) ||
        titleFrench.includes(lowercasedSearchTerm)
      )
    })
    setFilteredArticles(filtered)
  }, [searchTerm, allArticles]) // Effect pour le chargement initial et le changement de langue

  useEffect(() => {
    if (token) {
      fetchArticles()
    }
  }, [token, selectedLanguage])

  const handleDelete = (articleId) => {
    setArticleToDeleteId(articleId)
    setIsConfirmModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    setIsConfirmModalOpen(false)
    setMessage(null)
    try {
      const response = await fetch(
        `${API_BASE_URL}/articles/${articleToDeleteId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || currentLang.deleteError)
      } // Mise à jour de la source de vérité localement après suppression

      setAllArticles((prevArticles) =>
        prevArticles.filter((a) => a.id !== articleToDeleteId)
      )
      setMessage({ type: 'success', text: currentLang.deleteSuccess })
    } catch (err) {
      console.error("Erreur de l'API :", err)
      setMessage({
        type: 'error',
        text: err.message || currentLang.deleteError,
      })
    } finally {
      setArticleToDeleteId(null)
      setTimeout(() => setMessage(null), 3000)
    }
  }

  const handleEdit = (article) => {
    setCurrentArticle(article)
    setIsEditModalOpen(true)
  } // Fonction pour gérer la mise à jour et le message de succès

  const handleArticleUpdate = (message) => {
    setMessage(message)
    setIsEditModalOpen(false)
    fetchArticles() // Re-fetch les articles après modification pour mettre à jour la liste
    setTimeout(() => setMessage(null), 3000)
  } // Logique de pagination

  const indexOfLastArticle = currentPage * articlesPerPage
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage // Pagine sur la liste FILTRÉE
  const articlesToDisplay = filteredArticles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  )
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  if (loading) return <p className='text-center py-4'>{currentLang.loading}</p>
  if (error) return <p className='text-red-600 text-center py-4'>{error}</p>

  return (
    <div className='bg-white p-6 rounded-2xl shadow-lg'>
           {' '}
      <h2 className='text-2xl font-bold text-[#2c3159] mb-6'>
                {currentLang.title}     {' '}
      </h2>
           {' '}
      {message && (
        <div
          className={`p-3 mb-4 rounded-xl font-bold ${
            message.type === 'success'
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
                    {message.text}       {' '}
        </div>
      )}
      {/* NOUVEAU: BARRE DE RECHERCHE */}     {' '}
      <div className='mb-4'>
               {' '}
        <input
          type='text'
          placeholder={currentLang.searchPlaceholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='w-full p-3 border border-gray-300 rounded-xl focus:ring-[#2c3159] focus:border-[#2c3159] transition-all duration-300'
        />
             {' '}
      </div>
           {' '}
      <div className='overflow-x-auto'>
               {' '}
        <table className='min-w-full bg-white rounded-xl shadow-md overflow-hidden'>
                   {' '}
          <thead className='bg-gray-200'>
                       {' '}
            <tr>
                           {' '}
              {currentLang.tableHeaders.map((header, index) => (
                <th
                  key={index}
                  className='py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'
                >
                                    {header}               {' '}
                </th>
              ))}
                         {' '}
            </tr>
                     {' '}
          </thead>
                   {' '}
          <tbody>
                       {' '}
            {articlesToDisplay.length > 0 ? (
              articlesToDisplay.map((article) => (
                <tr
                  key={article.id}
                  className='border-b border-gray-200 hover:bg-gray-50'
                >
                                   {' '}
                  <td className='py-3 px-4 text-sm text-gray-800'>
                                        {article.displayTitle}                 {' '}
                  </td>
                                   {' '}
                  <td className='py-3 px-4 text-sm text-gray-800'>
                                       {' '}
                    {article.author?.name || 'Auteur inconnu'}                 {' '}
                  </td>
                                   {' '}
                  <td className='py-3 px-4 text-sm text-gray-800'>
                                       {' '}
                    {new Date(article.createdAt).toLocaleDateString()}         
                           {' '}
                  </td>
                                   {' '}
                  <td className='py-3 px-4 text-sm text-gray-800 flex gap-2'>
                                       {' '}
                    <button
                      onClick={() => handleEdit(article)}
                      className='bg-blue-500 text-white py-1 px-3 rounded-full hover:bg-blue-600 transition-colors duration-200'
                    >
                                            {currentLang.editButton}           
                             {' '}
                    </button>
                                       {' '}
                    <button
                      onClick={() => handleDelete(article.id)}
                      className='bg-red-500 text-white py-1 px-3 rounded-full hover:bg-red-600 transition-colors duration-200'
                    >
                                            {currentLang.deleteButton}         
                               {' '}
                    </button>
                                     {' '}
                  </td>
                                 {' '}
                </tr>
              ))
            ) : (
              <tr>
                               {' '}
                <td
                  colSpan='4'
                  className='py-3 px-4 text-center text-sm text-gray-500'
                >
                                    {currentLang.noArticles}               {' '}
                </td>
                             {' '}
              </tr>
            )}
                     {' '}
          </tbody>
                 {' '}
        </table>
             {' '}
      </div>
            {/* Pagination */}     {' '}
      {totalPages > 1 && (
        <div className='flex justify-center items-center gap-2 mt-4'>
                   {' '}
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`py-2 px-4 rounded-full font-bold ${
                currentPage === i + 1
                  ? 'bg-[#2c3159] text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
                            {i + 1}           {' '}
            </button>
          ))}
                 {' '}
        </div>
      )}
           {' '}
      {isEditModalOpen && (
        <EditArticleModal
          article={currentArticle}
          onClose={() => setIsEditModalOpen(false)}
          onUpdate={handleArticleUpdate}
        />
      )}
           {' '}
      {isConfirmModalOpen && (
        <ConfirmModal
          message={currentLang.deleteConfirm}
          onConfirm={handleConfirmDelete}
          onCancel={() => setIsConfirmModalOpen(false)}
        />
      )}
         {' '}
    </div>
  )
}

// --- 4. COMPOSANT RACINE (App) ---

const App = () => (
  <LanguageProvider>
       {' '}
    <AuthProvider>
           {' '}
      <div className='p-8 bg-gray-100 min-h-screen font-sans antialiased'>
                <ArticleList />     {' '}
      </div>
         {' '}
    </AuthProvider>
     {' '}
  </LanguageProvider>
)

export default App
