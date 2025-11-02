import React, { useState } from 'react'
import { useLanguage } from '../../src/providers/LanguageProvider'
import { useAuth } from '../../src/providers/AuthProvider'
import { Link } from 'react-router-dom' // Importez Link de react-router-dom

// Le composant Header mis à jour
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { translations, selectedLanguage, setSelectedLanguage, textDirection } =
    useLanguage()
  const currentLang = translations[selectedLanguage]
  const { isAuthenticated, logout } = useAuth()

  const languages = [
    { value: 'fr', label: 'Français' },
    { value: 'en', label: 'Anglais' },
    { value: 'adlam', label: '𞤆𞤵𞤤𞤢𞤪' },
  ]

  // Fonction pour ouvrir/fermer le menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Fonction pour fermer le menu (utile pour les clics de lien et l'overlay)
  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value)
  }

  const handleLogout = () => {
    logout()
    closeMenu() // Ferme le menu après la déconnexion
  }

  return (
    <>
      <header className='bg-white shadow-sm font-sans fixed top-0 w-full z-50'>
        {/* Barre supérieure (Top bar) */}
        <div className='bg-gray-100 py-2'>
          <div className='container mx-auto max-w-7xl px-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600'>
            <div className='flex flex-col md:flex-row items-center gap-2 md:gap-4 mb-2 md:mb-0'>
              <span className='flex items-center gap-1'>
                <i className='fa-solid fa-phone'></i> +224 123 456 789
              </span>
              <span className='flex items-center gap-1'>
                <i className='fa-solid fa-location-dot'></i> le nom de la
                localisation
              </span>
              <span className='flex items-center gap-1'>
                <i className='fa-solid fa-envelope'></i> adlam@gmail.com
              </span>
            </div>
            <div className='flex items-center gap-4'>
              <div className='relative flex items-center gap-2'>
                <i className='fa-solid fa-globe'></i>
                <span>{currentLang.header.languageLabel}</span>
                <select
                  value={selectedLanguage}
                  onChange={handleLanguageChange}
                  className='bg-transparent text-gray-600 font-bold border-none outline-none cursor-pointer'
                >
                  {languages.map((lang) => (
                    <option key={lang.value} value={lang.value}>
                      {lang.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className='flex items-center gap-3'>
                <a
                  href='https://www.facebook.com/share/1CRioYs2WX/'
                  aria-label='Facebook'
                >
                  <i className='fa-brands fa-facebook text-gray-700 hover:text-blue-600'></i>
                </a>
                <a
                  href='https://youtube.com/@akweeyo?feature=shared'
                  aria-label='Youtube'
                >
                  <i className='fa-brands fa-youtube text-gray-700 hover:text-red-500'></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Barre de navigation principale */}
        <div className='bg-[#2c3159] py-4 relative'>
          <div className='container mx-auto max-w-7xl px-4 flex justify-between items-center text-white'>
            {/* Logo et Nom cliquables */}
            <Link to='/' className='flex items-center gap-4 cursor-pointer'>
              <img
                src='/images/logo.png'
                alt="Logo de l'association"
                className='rounded-full w-12 h-12'
              />
              <h1 className='text-xl font-bold'>𞤀𞤳𞤱𞤫𞥅𞤴𞤮</h1>
            </Link>

            {/* Bouton Hamburger - Visible uniquement sur mobile */}
            <button
              onClick={toggleMenu}
              className='md:hidden text-white text-2xl focus:outline-none'
            >
              <i className='fa-solid fa-bars'></i>
            </button>

            {/* Menu de navigation - Version desktop avec séparateurs */}
            <div className='hidden md:flex flex-row items-center gap-4'>
              <nav
                className='flex flex-row items-center gap-4 text-sm md:text-base font-adlam'
                style={{ direction: textDirection }}
              >
                {currentLang.header.menu.map((item, index) => (
                  <React.Fragment key={index}>
                    <Link
                      to={item.href}
                      className='hover:text-gray-300 transition'
                    >
                      <span style={{ direction: textDirection }}>
                        {item.name}
                      </span>
                    </Link>
                    {index < currentLang.header.menu.length - 1 && (
                      <span className='w-px h-5 bg-white opacity-50'></span>
                    )}
                  </React.Fragment>
                ))}
              </nav>

              {/* Boutons d'inscription */}
              <div className='flex items-center space-x-4 ml-6'>
                {isAuthenticated ? (
                  <>
                    <Link
                      to='/profile'
                      className='bg-[#fff2cd] text-[#2c3159] font-bold py-2 px-4 rounded-full shadow-lg hover:bg-yellow-500 transition duration-300 font-adlam'
                      style={{ direction: textDirection }}
                    >
                      <span> {currentLang.header.profile}</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className='bg-transparent border border-white text-white font-bold py-2 px-4 rounded-full hover:bg-white hover:text-[#2c3159] transition duration-300 font-adlam'
                      style={{ direction: textDirection }}
                    >
                      <span>{currentLang.header.logouHead} </span>
                    </button>
                  </>
                ) : (
                  <>
                    {/* Lien vers la page d'inscription */}
                    <Link
                      to='/register'
                      className='bg-[#fff2cd] text-[#2c3159] font-bold py-2 px-4 rounded-full shadow-lg hover:bg-yellow-500 transition duration-300 font-adlam'
                      style={{ direction: textDirection }}
                    >
                      <span>{currentLang.header.signUp}</span>
                    </Link>
                    {/* Lien vers la page de connexion */}
                    <Link
                      to='/login'
                      className='bg-transparent border border-white text-white font-bold py-2 px-4 rounded-full hover:bg-white hover:text-[#2c3159] transition duration-300 font-adlam'
                      style={{ direction: textDirection }}
                    >
                      <span>{currentLang.header.signIn}</span>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* ✅ NOUVEAUTÉ 1 : OVERLAY (Fond noir semi-transparent) */}
        {/* ------------------------------------------------------------- */}
        {isMenuOpen && (
          <div
            className='fixed inset-0 bg-black opacity-50 z-40 md:hidden'
            onClick={closeMenu} // Ferme le menu si l'utilisateur clique en dehors
          ></div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* ✅ NOUVEAUTÉ 2 : Barre latérale du menu - Mise à jour des liens */}
        {/* ------------------------------------------------------------- */}
        <div
          className={`fixed top-0 left-0 w-64 h-full bg-[#2c3159] text-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className='flex justify-end p-4'>
            <button
              onClick={closeMenu} // Utilise la fonction simple pour fermer
              className='text-white text-2xl focus:outline-none'
            >
              <i className='fa-solid fa-xmark'></i>
            </button>
          </div>
          <nav
            className='flex flex-col p-4 gap-4'
            style={{ direction: textDirection }}
          >
            {currentLang.header.menu.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                onClick={closeMenu} // <--- Fermeture automatique du menu au clic sur un lien
                className='hover:text-gray-300 transition w-full text-center py-2'
              >
                <span>{item.name}</span>
              </Link>
            ))}

            {/* Boutons d'inscription pour mobile */}
            <div className='flex flex-col gap-4 mt-4 px-4'>
              {isAuthenticated ? (
                <>
                  <Link
                    to='/profile'
                    onClick={closeMenu} // <--- Fermeture automatique du menu
                    className='bg-[#fff2cd] text-[#2c3159] font-bold py-2 px-4 rounded-full shadow-lg hover:bg-yellow-500 transition duration-300'
                    style={{ direction: textDirection }}
                  >
                    <span>Mon profil</span>
                  </Link>
                  <button
                    onClick={handleLogout} // handleLogout gère la déconnexion ET la fermeture du menu
                    className='bg-transparent border border-white text-white font-bold py-2 px-4 rounded-full hover:bg-white hover:text-[#2c3159] transition duration-300'
                    style={{ direction: textDirection }}
                  >
                    <span>Déconnexion</span>
                  </button>
                </>
              ) : (
                <>
                  {/* Lien vers la page d'inscription pour mobile */}
                  <Link
                    to='/register'
                    onClick={closeMenu} // <--- Fermeture automatique du menu
                    className='bg-[#fff2cd] text-[#2c3159] font-bold py-2 px-4 rounded-full shadow-lg hover:bg-yellow-500 transition duration-300'
                    style={{ direction: textDirection }}
                  >
                    <span>{currentLang.header.signUp}</span>
                  </Link>
                  {/* Lien vers la page de connexion pour mobile */}
                  <Link
                    to='/login'
                    onClick={closeMenu} // <--- Fermeture automatique du menu
                    className='bg-transparent border border-white text-white font-bold py-2 px-4 rounded-full hover:bg-white hover:text-[#2c3159] transition duration-300'
                    style={{ direction: textDirection }}
                  >
                    <span>{currentLang.header.signIn}</span>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </header>
    </>
  )
}

export default Header
