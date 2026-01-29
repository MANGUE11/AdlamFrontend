import React from 'react'
import { LanguageProvider } from './providers/LanguageProvider'
import { AuthProvider } from './providers/AuthProvider'
import Header from '../components/Header/Header'
import HeroSection from '../components/HeroSection/HeroSection'
import HistorySection from '../components/HistorySection'
import Footer from '../components/Footer'
import InitiationSection from '../components/InitiationSection'
import CommunitySection from '../components/CommunitySection'
import ArticlesSection from '../components/ArticlesSection'
import ContactForm from '../components/ContactForm'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RegisterPage from '../pages/RegisterPage'
import ConnexionPage from '../pages/ConnexionPage'
import ResetPassword from '../pages/ResetPassword'
import ForgotPassword from '../pages/ForgotPassword'
import UserProfile from '../pages/UserProfile'
import ArticlePage from '../components/ArticlePage'
import AllArticlesPage from '../components/AllArticlesPage'
import HistoryDetailPage from '../components/HistoryDetailPage'
import CommunityDetailPage from '../components/CommunityDetailPage'
import InitiationPage from '../components/InitiationPage'
import AboutPage from '../components/AboutPage'
import AdlamTexteEtImages from '../components/AdlamTexteEtImages'

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AuthProvider>
          <Header />
          <main>
            <Routes>
              {/* Route pour la page d'accueil avec tous les composants actuels */}
              <Route
                path='/'
                element={
                  <>
                    <HeroSection />
                    <HistorySection />
                    <InitiationSection />
                    <CommunitySection />
                    {/* <AdlamTexteEtImages /> */}
                    <ArticlesSection />
                    <ContactForm />
                  </>
                }
              />
              {/* Route pour la page d'inscription */}
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/login' element={<ConnexionPage />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
              <Route
                path='/reset-password/:token'
                element={<ResetPassword />}
              />
              {/* Route pour la page de profil. Le chemin "/profile" correspond au composant UserProfile */}
              <Route path='/profile' element={<UserProfile />} />
              {/* Nouvelle route pour un article unique */}
              <Route path='/articles/:id' element={<ArticlePage />} />
              {/* La nouvelle route pour la page de tous les articles */}
              <Route path='/all-articles' element={<AllArticlesPage />} />
              <Route
                path='/history-details'
                element={<HistoryDetailPage />}
              />{' '}
              {/* Nouvelle route */}
              <Route path='/community' element={<CommunityDetailPage />} />{' '}
              {/* Ajoute la nouvelle route */}
              <Route path='/initiation' element={<InitiationPage />} />
              {/* Ajoute la nouvelle route */}
              <Route path='/a-propos' element={<AboutPage />} />
            </Routes>
          </main>
          <Footer />
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  )
}

export default App
