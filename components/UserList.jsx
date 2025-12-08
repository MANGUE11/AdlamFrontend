import React, { useState, useEffect } from 'react'
import { useAuth } from '../src/providers/AuthProvider'
import { useLanguage } from '../src/providers/LanguageProvider'

const UserList = () => {
  const { token } = useAuth()
  const { translations, selectedLanguage } = useLanguage()
  const currentLang = translations[selectedLanguage].userList || {} // Assurez-vous d'avoir des traductions pour ce composant

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')

  const [currentPage, setCurrentPage] = useState(1)
  const USERS_PER_PAGE = 15 // Nombre d'utilisateurs par page // Fonction pour récupérer la liste des utilisateurs

  const fetchUsers = async () => {
    setLoading(true)
    setError(null)

    if (!token) {
      setError('Token manquant. Veuillez vous connecter.')
      setLoading(false)
      return
    }

    try {
      const response = await fetch(
        'https://adlambackend-production.up.railway.app/api/users',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des utilisateurs.')
      }

      const data = await response.json()
      setUsers(data)
    } catch (err) {
      console.error("Erreur de l'API :", err)
      setError(
        currentLang.fetchError || 'Impossible de charger les utilisateurs.'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) {
      fetchUsers()
    }
  }, [token]) // Fonctions pour la pagination

  const indexOfLastUser = currentPage * USERS_PER_PAGE
  const indexOfFirstUser = indexOfLastUser - USERS_PER_PAGE
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser)
  const totalPages = Math.ceil(users.length / USERS_PER_PAGE)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  } // Fonction pour mettre à jour le rôle d'un utilisateur

  const handleRoleChange = async (userId, newRole) => {
    try {
      const response = await fetch(
        `https://adlambackend-production.up.railway.app/api/users/${userId}/role`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ newRole }),
        }
      )

      const result = await response.json()

      if (response.ok) {
        // Mettre à jour l'état local pour refléter le changement
        setUsers(
          users.map((user) =>
            user.id === userId ? { ...user, role: newRole } : user
          )
        )
        setMessage(
          currentLang.roleUpdateSuccess || 'Rôle mis à jour avec succès.'
        )
        setMessageType('success')
      } else {
        setMessage(
          result.message ||
            currentLang.roleUpdateError ||
            'Erreur lors de la mise à jour du rôle.'
        )
        setMessageType('error')
      }
    } catch (err) {
      console.error('Erreur lors de la mise à jour du rôle :', err)
      setMessage(
        currentLang.networkError || 'Erreur réseau lors de la mise à jour.'
      )
      setMessageType('error')
    }
  } // Fonction pour supprimer un utilisateur

  const handleDelete = async (userId) => {
    if (
      window.confirm(
        currentLang.confirmDelete ||
          'Êtes-vous sûr de vouloir supprimer cet utilisateur ?'
      )
    ) {
      try {
        const response = await fetch(
          `https://adlambackend-production.up.railway.app/api/users/${userId}`,
          {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        if (response.ok) {
          // Mettre à jour l'état local en filtrant l'utilisateur supprimé
          setUsers(users.filter((user) => user.id !== userId))
          setMessage(
            currentLang.deleteSuccess || 'Utilisateur supprimé avec succès.'
          )
          setMessageType('success')
        } else {
          const result = await response.json()
          setMessage(
            result.message ||
              currentLang.deleteError ||
              'Erreur lors de la suppression.'
          )
          setMessageType('error')
        }
      } catch (err) {
        console.error('Erreur lors de la suppression :', err)
        setMessage(
          currentLang.networkError || 'Erreur réseau lors de la suppression.'
        )
        setMessageType('error')
      }
    }
  }

  if (loading)
    return <p>{currentLang.loading || 'Chargement des utilisateurs...'}</p>
  if (error) return <p className='text-red-600'>{error}</p>

  return (
    <div className='p-6 bg-white rounded-2xl shadow-lg'>
           {' '}
      <h2 className='text-2xl font-bold text-[#2c3159] mb-6'>
                {currentLang.title || '𞤕𞤭𞤪𞤼𞤮𞤤 𞤸𞤵𞥅𞤼𞤢𞤪𞤢𞤴𞤩𞤫 ( 𞤼𞤢𞤱𞤼𞤵𞤩𞤫)'}     {' '}
      </h2>
           {' '}
      {message && (
        <div
          className={`p-4 rounded-xl font-medium mb-4 ${
            messageType === 'success'
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
                    {message}       {' '}
        </div>
      )}
      {/* Conteneur pour gérer le débordement horizontal sur les petits écrans */}
           {' '}
      <div className='overflow-x-auto'>
               {' '}
        <table className='min-w-full bg-white rounded-xl shadow-md overflow-hidden'>
                   {' '}
          <thead className='bg-gray-200'>
                       {' '}
            <tr>
                           {' '}
              <th className='py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider min-w-[100px]'>
                                𞤋𞤲𞤣𞤫              {' '}
              </th>
                           {' '}
              <th className='py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider min-w-[150px]'>
                                𞤐𞤭𞤤𞤼𞤭𞤧𞤵              {' '}
              </th>
                           {' '}
              <th className='py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider min-w-[100px]'>
                                𞤘𞤮𞤤𞥆𞤢𞤤              {' '}
              </th>
                           {' '}
              <th className='py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider min-w-[150px]'>
                                𞤚𞤮𞤲𞥋𞤣𞤭𞤯𞤫              {' '}
              </th>
                         {' '}
            </tr>
                     {' '}
          </thead>
                   {' '}
          <tbody>
                       {' '}
            {currentUsers.map((user) => (
              <tr
                key={user.id}
                className='border-b border-gray-200 hover:bg-gray-50'
              >
                               {' '}
                <td className='py-3 px-4 text-sm text-gray-800'>
                                    {user.name}               {' '}
                </td>
                               {' '}
                <td className='py-3 px-4 text-sm text-gray-800'>
                  {user.email}
                </td>
                               {' '}
                <td className='py-3 px-4 text-sm text-gray-800'>
                                   {' '}
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    className='bg-white border border-gray-300 rounded-lg p-1.5 focus:outline-none focus:ring-2 focus:ring-[#2c3159] transition-all duration-300'
                  >
                                        <option value='visitor'>Visitor</option>
                                        <option value='admin'>Admin</option>   
                                 {' '}
                  </select>
                                 {' '}
                </td>
                               {' '}
                <td className='py-3 px-4 text-sm'>
                                   {' '}
                  <button
                    onClick={() => handleDelete(user.id)}
                    className='bg-red-500 text-white font-semibold py-1 px-3 rounded-full hover:bg-red-600 transition-all duration-300'
                  >
                                        𞤃𞤮𞤲𞤼𞤵                  {' '}
                  </button>
                                 {' '}
                </td>
                             {' '}
              </tr>
            ))}
                     {' '}
          </tbody>
                 {' '}
        </table>
             {' '}
      </div>
            {/* Pagination */}     {' '}
      {users.length > USERS_PER_PAGE && (
        <div className='flex justify-center space-x-2 mt-6'>
                   {' '}
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-300 ${
                currentPage === i + 1
                  ? 'bg-[#2c3159] text-white shadow-md'
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
    </div>
  )
}

export default UserList
