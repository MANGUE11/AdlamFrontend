import React, { useState, useEffect } from 'react'

import { useAuth } from '../src/providers/AuthProvider'

import { useLanguage } from '../src/providers/LanguageProvider'

import CreateArticleForm from '../components/CreateArticleForm'

import UserList from '../components/UserList'
import ArticleList from '../components/ArticleList'

const UserProfile = () => {
  const { isAuthenticated, user, logout, token } = useAuth()
  const { translations, selectedLanguage, textDirection } = useLanguage()
  const currentLang = translations[selectedLanguage].userProfile
  const authTrans = translations[selectedLanguage].auth // État pour gérer la section active

  const [activeSection, setActiveSection] = useState('my-info')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('') // 'success' or 'error'
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    // Load the current user's information if available
    if (user) {
      setName(user.name || '')
      setEmail(user.email || '')
    }
  }, [user])

  const handleUpdate = async (e) => {
    e.preventDefault()
    setMessage('')
    setMessageType('')

    if (password !== confirmPassword) {
      setMessage(currentLang.passwordMismatchError)
      setMessageType('error')
      return
    }

    setIsUpdating(true)

    const updateData = {
      name: name,
      email: email,
      password: password || undefined,
    }
    console.log('Token being sent:', token)
    try {
      const response = await fetch(
        'https://adlambackend-production.up.railway.app/api/users/profile',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updateData),
        }
      )

      const result = await response.json()

      if (response.ok) {
        setMessage(result.message || currentLang.successMessage)
        setMessageType('success')
        setPassword('')
        setConfirmPassword('')
      } else {
        setMessage(result.message || currentLang.errorMessage)
        setMessageType('error')
      }
    } catch (error) {
      setMessage(currentLang.networkError)
      setMessageType('error')
      console.error('Update error:', error)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleLogout = () => {
    logout()
  } // Rendu du contenu en fonction de la section active

  const renderContent = () => {
    switch (activeSection) {
      case 'my-info':
        return (
          <main className='w-full md:w-3/4 bg-white rounded-2xl shadow-lg p-6'>
            {' '}
            <h1 className='text-2xl font-bold text-[#2c3159] mb-6'>
              {currentLang.updateProfileTitle}{' '}
            </h1>{' '}
            <form onSubmit={handleUpdate} className='space-y-6'>
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
              )}{' '}
              <div>
                {' '}
                <label
                  htmlFor='name'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  {currentLang.nameLabel}{' '}
                </label>{' '}
                <input
                  type='text'
                  id='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className='w-full p-3 rounded-xl border border-gray-300 focus:ring focus:ring-[#2c3159] focus:ring-opacity-50'
                />{' '}
              </div>{' '}
              <div>
                {' '}
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  {currentLang.emailLabel}{' '}
                </label>{' '}
                <input
                  type='email'
                  id='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='w-full p-3 rounded-xl border border-gray-300 focus:ring focus:ring-[#2c3159] focus:ring-opacity-50'
                />{' '}
              </div>{' '}
              <div className='pt-4'>
                {' '}
                <h3 className='text-lg font-bold text-[#2c3159] mb-4'>
                  {currentLang.changePasswordTitle}{' '}
                </h3>{' '}
                <div className='space-y-4'>
                  {' '}
                  <div>
                    {' '}
                    <label
                      htmlFor='password'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      {currentLang.newPasswordLabel}{' '}
                    </label>{' '}
                    <input
                      type='password'
                      id='password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className='w-full p-3 rounded-xl border border-gray-300 focus:ring focus:ring-[#2c3159] focus:ring-opacity-50'
                    />{' '}
                  </div>{' '}
                  <div>
                    {' '}
                    <label
                      htmlFor='confirm-password'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      {currentLang.confirmPasswordLabel}{' '}
                    </label>{' '}
                    <input
                      type='password'
                      id='confirm-password'
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className='w-full p-3 rounded-xl border border-gray-300 focus:ring focus:ring-[#2c3159] focus:ring-opacity-50'
                    />{' '}
                  </div>{' '}
                </div>{' '}
              </div>{' '}
              <div className='flex justify-end'>
                {' '}
                <button
                  type='submit'
                  className='bg-[#2c3159] text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-opacity-90 transition-all duration-300'
                  disabled={isUpdating}
                >
                  {' '}
                  {isUpdating
                    ? currentLang.updatingButton
                    : currentLang.updateButton}{' '}
                </button>{' '}
              </div>{' '}
            </form>{' '}
          </main>
        )
      case 'create-article':
        return (
          <main className='w-full md:w-3/4 bg-white rounded-2xl shadow-lg p-6'>
            {' '}
            <h1 className='text-2xl font-bold text-[#2c3159] mb-6'>
              {currentLang.createArticle}{' '}
            </h1>
            <CreateArticleForm />{' '}
          </main>
        )
      case 'articles-list':
        return (
          <main className='w-full md:w-3/4 bg-white rounded-2xl shadow-lg p-6'>
            {' '}
            <h1 className='text-2xl font-bold text-[#2c3159] mb-6'>
              {currentLang.listArticles}{' '}
            </h1>
            <ArticleList />{' '}
          </main>
        )
      case 'users-list':
        return (
          <main className='w-full md:w-3/4 bg-white rounded-2xl shadow-lg p-6'>
            {' '}
            <h1 className='text-2xl font-bold text-[#2c3159] mb-6'>
              {' '}
              {currentLang.usersListTitle ||
                'Liste des utilisateurs (Admin)'}{' '}
            </h1>
            <UserList />{' '}
          </main>
        )
      default:
        return null
    }
  }

  if (!isAuthenticated) {
    return (
      <div className='flex justify-center items-center h-screen text-lg text-gray-700'>
        {currentLang.unauthorizedMessage}{' '}
      </div>
    )
  }

  return (
    <div
      className='font-sans bg-gray-100 min-h-screen pt-24'
      dir={textDirection}
    >
      {' '}
      <div className='container mx-auto max-w-7xl px-4 py-8 flex flex-col md:flex-row gap-8'>
        {/* Sidebar */}{' '}
        <aside className='w-full md:w-1/4 bg-white rounded-2xl shadow-lg p-6 flex flex-col space-y-4 h-fit'>
          {' '}
          <h2 className='text-xl font-bold text-[#2c3159] mb-4'>
            {currentLang.dashboardTitle}{' '}
          </h2>{' '}
          <button
            onClick={() => setActiveSection('my-info')}
            className={`flex items-center gap-3 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
              activeSection === 'my-info'
                ? 'text-white bg-[#2c3159]'
                : 'text-gray-700 bg-gray-200 hover:bg-gray-300'
            }`}
          >
            <i className='fas fa-user-circle'></i>{' '}
            <span>{currentLang.myInfo}</span>{' '}
          </button>
          {/* Liens spécifiques aux administrateurs */}{' '}
          {user && user.role === 'admin' && (
            <>
              {' '}
              <button
                onClick={() => setActiveSection('create-article')}
                className={`flex items-center gap-3 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                  activeSection === 'create-article'
                    ? 'text-white bg-[#2c3159]'
                    : 'text-gray-700 bg-gray-200 hover:bg-gray-300'
                }`}
              >
                <i className='fas fa-plus-circle'></i>
                <span>{currentLang.createArticle}</span>{' '}
              </button>{' '}
              <button
                onClick={() => setActiveSection('articles-list')}
                className={`flex items-center gap-3 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                  activeSection === 'articles-list'
                    ? 'text-white bg-[#2c3159]'
                    : 'text-gray-700 bg-gray-200 hover:bg-gray-300'
                }`}
              >
                <i className='fas fa-file-alt'></i>
                <span>{currentLang.listArticles}</span>{' '}
              </button>{' '}
              <button
                onClick={() => setActiveSection('users-list')}
                className={`flex items-center gap-3 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                  activeSection === 'users-list'
                    ? 'text-white bg-[#2c3159]'
                    : 'text-gray-700 bg-gray-200 hover:bg-gray-300'
                }`}
              >
                <i className='fas fa-users'></i>{' '}
                <span>{currentLang.allUser}</span>{' '}
              </button>{' '}
            </>
          )}{' '}
          <button
            onClick={handleLogout}
            className='flex items-center gap-3 py-3 px-4 rounded-xl font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 transition-all duration-300'
          >
            <i className='fas fa-sign-out-alt'></i>{' '}
            <span>{currentLang.logout}</span>{' '}
          </button>{' '}
        </aside>
        {/* Main Content - Contenu dynamique */} {renderContent()}{' '}
      </div>{' '}
    </div>
  )
}

export default UserProfile
