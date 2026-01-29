import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const ResetPassword = () => {
  const { token } = useParams() // Récupère le token de l'URL
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      return setMessage('Les mots de passe ne correspondent pas.')
    }

    try {
      // On envoie le nouveau mot de passe au backend
      const response = await axios.post(
        `https://adlambackend-production.up.railway.app/api/auth/reset-password/${token}`,
        {
          password: password,
        },
      )

      setMessage('Mot de passe réinitialisé avec succès ! Redirection...')
      setTimeout(() => navigate('/login'), 3000)
    } catch (error) {
      setMessage('Le lien est invalide ou a expiré.')
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh', // Prend presque toute la hauteur de l'écran
        paddingTop: '100px', // AJUSTE ICI : Augmente si ta barre menu est haute
        width: '100%',
      }}
    >
      <div
        style={{
          maxWidth: '400px',
          width: '90%', // Responsive pour mobile
          padding: '30px',
          borderRadius: '10px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)', // Un petit effet de relief
          backgroundColor: '#fff',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
          Réinitialiser le mot de passe
        </h2>

        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
        >
          <input
            style={{
              padding: '12px',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
            type='password'
            placeholder='Nouveau mot de passe'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            style={{
              padding: '12px',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
            type='password'
            placeholder='Confirmer le mot de passe'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type='submit'
            style={{
              padding: '12px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Mettre à jour
          </button>
        </form>

        {message && (
          <p
            style={{
              marginTop: '15px',
              textAlign: 'center',
              color: message.includes('succès') ? 'green' : 'red',
              fontWeight: '500',
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  )
}

export default ResetPassword
