// src/pages/AboutPage/AboutPage.jsx
import React from 'react'
import { useLanguage } from '../src/providers/LanguageProvider'

const AboutPage = () => {
  const { translations, selectedLanguage, textDirection } = useLanguage()
  const currentLang = translations[selectedLanguage]

  // IMPORTANT: Séparer le titre pour appliquer des couleurs différentes
  const largeTitleParts = currentLang.about.largeTitle.split('-')

  // Couleurs Tailwind CSS (vous pouvez les ajuster)
  const colors = [
    'text-green-600', // Vert pour la 1ère partie
    'text-orange-500', // Orange pour la 2ème partie
    'text-gray-900', // Noir pour la 3ème partie
  ]

  // Assurez-vous d'avoir au moins 3 parties (Pottal, Nunɗaŋ, Wakkihaaɓere)
  if (largeTitleParts.length < 3) {
    // Fallback au titre normal si la structure n'est pas celle attendue
    console.error(
      "Le largeTitle n'a pas la structure attendue pour le dégradé de couleurs."
    )
  }

  // LOGIQUE MISE À JOUR : Diviser le paragraphe 1 par le point (et autres ponuations fortes)
  // pour insérer des sauts de ligne APRÈS la ponctuation.
  const paragraph1Lines = currentLang.about.paragraph1
    // Diviser autour des ponuations fortes, tout en les gardant dans le tableau
    .split(/([\.!\?])/)
    .filter((segment) => segment.trim() !== '')

  return (
    <div className='mt-40 py-12 px-4 sm:px-6 lg:px-8 bg-white min-h-screen'>
      <div className='max-w-4xl mx-auto'>
        {/* LOGO DE L'ASSOCIATION (Image unique) */}
        <div className='flex justify-center mb-10'>
          <img
            src='/images/logo.png'
            alt={currentLang.contact_image_alt || 'Logo de l’Association'}
            className='h-32 w-auto object-contain'
          />
        </div>

        {/* Petit Titre (Centré) */}
        <p
          className='text-center text-sm uppercase tracking-widest text-[#2c3159] font-bold mb-2'
          style={{ direction: textDirection }}
        >
          {currentLang.about.smallTitle}
        </p>

        {/* Grand Titre (Centré) avec COULEURS MULTIPLES */}
        <h3
          className='text-center text-2xl sm:text-3xl md:text-4xl font-extrabold mb-8 font-adlam'
          style={{ direction: textDirection }}
        >
          {largeTitleParts.length >= 3 ? (
            largeTitleParts.map((part, index) => (
              <React.Fragment key={index}>
                <span className={colors[index] || 'text-gray-900'}>{part}</span>
                {/* Ajouter le tiret de séparation, sauf après la dernière partie */}
                {index < largeTitleParts.length - 1 && <span>-</span>}
              </React.Fragment>
            ))
          ) : (
            // Affichage simple si la division échoue
            <span className='text-gray-900'>
              {currentLang.about.largeTitle}
            </span>
          )}
        </h3>

        {/* Paragraphes de Contenu */}
        <div
          className='text-gray-700 text-lg leading-relaxed space-y-6'
          style={{ direction: textDirection }}
        >
          <p>
            {/* RENDU DU PARAGRAPHE 1 AVEC SAUTS DE LIGNE après la ponctuation */}
            {paragraph1Lines.map((segment, index) => {
              // Vérifie si le segment est une ponctuation forte
              const isPunctuation =
                segment === '.' || segment === '!' || segment === '?'

              return (
                <React.Fragment key={index}>
                  {segment}
                  {/* Si c'est un point de fin de phrase, on ajoute un saut de ligne */}
                  {isPunctuation && <br />}

                  {/* Si le segment n'est pas une ponctuation et n'est pas le dernier,
                      on ajoute un espace simple (pour séparer le texte de la ponctuation suivante) */}
                  {!isPunctuation && index < paragraph1Lines.length - 1 && (
                    <>&nbsp;</>
                  )}
                </React.Fragment>
              )
            })}
          </p>
          <p>{currentLang.about.paragraph2}</p>
          <p>{currentLang.about.paragraph3}</p>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
