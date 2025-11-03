import React, { useState, useEffect, createContext, useContext } from 'react'

// Crée le contexte de la langue
export const LanguageContext = createContext()

// Hook personnalisé pour utiliser le contexte de la langue plus facilement
export const useLanguage = () => {
  return useContext(LanguageContext)
}

// Objet de traduction pour toute l'application, avec les trois langues
const translations = {
  fr: {
    hero: {
      title: 'Denderla Sonre Ublaande',
      description:
        'Découvrez notre association et rejoignez notre noble mission de promouvoir la culture Adlam.',
      button: 'Voir plus',
    },
    header: {
      menu: [
        { name: 'Accueil', href: '/' },
        { name: 'À propos', href: '/a-propos' },
        { name: 'Initiation', href: '/initiation' },
        { name: 'Historique', href: '/history-details' },
        { name: 'Articles', href: '/all-articles' },
        // { name: 'Contact', href: '#' },
      ],
      languageLabel: 'Langue',
      signUp: "S'inscrire",
      signIn: 'Connexion',
      profile: 'Mon profile',
      logouHead: 'Deconnexion',
    },
    offerings: {
      title: 'Ce que nous offrons',
      services: [
        {
          title: 'Initiation à l’écriture',
          description:
            'Des ateliers interactifs pour apprendre à lire et à écrire en Adlam, adaptés à tous les niveaux.',
        },
        {
          title: 'Cours de langue',
          description:
            'Des cours complets pour maîtriser la grammaire, le vocabulaire et la prononciation de la langue Adlam.',
        },
        {
          title: 'Cours de culture',
          description:
            'Une exploration riche de l’histoire, des traditions, de la musique et de l’art de la culture Peul.',
        },
        {
          title: 'Soutien à la recherche',
          description:
            'Mise à disposition de ressources documentaires, archives et accès à des experts pour les chercheurs.',
        },
      ],
    },
    history: {
      title: 'Historique',
      description:
        "Découvrez comment l'alphabet Adlam est né pour préserver et moderniser la langue peule. Créé par deux frères guinéens en 1989, il a permis de transcrire le peul, qui était traditionnellement une langue orale, pour la première fois. Notre association s'engage à faire perdurer cet héritage en enseignant et en promouvant l'usage de cet alphabet unique. Rejoignez-nous pour protéger cette richesse culturelle et linguistique.",
      button: 'Voir plus',
      alphabet: [
        '𞤀',
        '',
        '𞤂',
        '',
        '𞤆',
        '',
        '',
        '𞤉',
        '𞤊',
        '𞤋',
        '𞤌',
        '𞤍',
        '𞤎',
        '𞤏',
        '𞤐',
        '𞤑',
        '𞤒',
        '𞤓',
      ],
    },
    historicDetails: {
      backButton: 'Retour',
      title: "L'histoire complète de l'alphabet Adlam",
      intro:
        "L'alphabet Adlam n'est pas seulement un système d'écriture, c'est une révolution pour la langue peule. Son histoire est celle de deux frères visionnaires, de la détermination et de la reconnaissance d'un héritage millénaire.",
      section1: {
        heading: 'Les frères Barry : Une vision pour le futur',
        text: "La création d'Adlam est l'œuvre de deux jeunes frères guinéens, Ibrahima et Abdoulaye Barry, qui, dans les années 1980, ont senti la nécessité de préserver leur langue maternelle, le Fulfulde, de l'oubli. Alors qu'il n'existait aucun système d'écriture universel pour la langue, ils ont entrepris la tâche colossale de concevoir un alphabet complet, de la phonétique à la typographie, pour permettre au peuple peul de lire et d'écrire dans sa propre langue.",
      },
      section2: {
        text: "Après des années de travail acharné, ils ont finalisé leur alphabet. Le nom Adlam est un acronyme de sa phrase d'introduction en Peul : 'Alkulama lesli dimma naajum' (l'alphabet protège le peuple de l'oppression). Cet alphabet a depuis été adopté par la communauté et utilisé pour l'alphabétisation, la littérature, et la communication numérique. Il est aujourd'hui une fierté pour le peuple peul, symbolisant l'autonomie culturelle et la résilience face à la colonisation linguistique.",
      },
    },
    communityDetails: {
      backButton: 'Retour',
      title: 'La communauté peule',
      intro:
        "Le peuple peul, également connu sous le nom de Fulani, est l'un des groupes ethniques les plus vastes et les plus dispersés d'Afrique. Répartis principalement dans la région du Sahel et en Afrique de l'Ouest, ils sont réputés pour leur riche histoire nomade et leur culture distincte, centrée sur l'élevage de bétail. Ils sont connus pour leur résilience, leurs traditions musicales et poétiques, et leur engagement profond envers leurs coutumes et leur langue, le fulfulde. Cette communauté a joué un rôle clé dans l'histoire de la région, y compris par le biais de la diffusion de l'islam et de la création d'empires majeurs.",
      section1: {
        heading: 'Richesse culturelle et traditions',
        text: "La culture peule est une mosaïque de traditions orales, de musique, de poésie et d'artisanat. Les griots peuls, ou 'gawlo', sont les gardiens de l'histoire, transmettant des épopées et des lignées ancestrales de génération en génération. La musique, souvent accompagnée de l'instrument à corde 'hoddu', et la danse sont des éléments centraux des cérémonies et des célébrations. Les motifs complexes et les couleurs vives de leurs vêtements traditionnels reflètent l'identité et le statut social de l'individu.",
      },
      section2: {
        text: "Au-delà de leurs traditions, les Peuls sont des acteurs importants du développement social et économique de la région. Ils contribuent activement à l'économie locale par leurs activités d'élevage et leur participation au commerce. L'apprentissage de l'alphabet Adlam est une étape supplémentaire pour renforcer cette communauté en lui donnant les outils pour préserver son histoire et sa culture à l'ère du numérique, tout en favorisant l'alphabétisation et la communication à travers les frontières.",
      },
    },
    initiation: {
      title: 'Un parcours de découverte',
      description:
        "Plongez dans les fondamentaux de la culture peule et commencez votre voyage d'apprentissage.",
      tiles: [
        {
          title: 'Discussion culturelle',
          svg: 'lucide-message-circle',
        },
        {
          title: 'Les 7 jours de la semaine',
          svg: 'lucide-calendar',
        },
        {
          title: 'Les 12 mois de année',
          svg: 'lucide-calendar-check',
        },
        {
          title: 'Les chiffres',
          svg: 'lucide-grid',
        },
      ],
      button: 'Voir plus',
    },
    initiationPage: {
      heroTitle: 'Initiation à la culture Adlam',
      heroDescription:
        "Un parcours de découverte des fondements de la culture peule et de l'alphabet Adlam.",
      sections: [
        {
          title: 'Discussion culturelle',
          description:
            "Rejoignez nos discussions animées pour plonger au cœur des traditions, de l'histoire et des défis de la communauté peule.",
        },
        {
          title: 'Événements à venir',
          description:
            'Gardez un œil sur notre calendrier pour ne manquer aucun de nos événements, ateliers et conférences.',
        },
        {
          title: 'Activités et ateliers',
          description:
            "Participez à nos ateliers pratiques pour apprendre l'écriture Adlam, la musique traditionnelle et l'artisanat peul.",
        },
        {
          title: 'Ressources numériques',
          description:
            "Accédez à une bibliothèque de ressources en ligne, y compris des livres, des vidéos et des outils d'apprentissage pour la langue Adlam.",
        },
      ],
      numbers: {
        title: 'Les chiffres en Adlam',
        list: [
          { number: '0', adlam: '𞥐', audio: '/audios/0.ogg' },
          { number: '1', adlam: '𞥑', audio: '/audios/1.ogg' },
          { number: '2', adlam: '𞥒', audio: '/audios/2.ogg' },
          { number: '3', adlam: '𞥓', audio: '/audios/3.ogg' },
          { number: '4', adlam: '𞥔', audio: '/audios/4.ogg' },
          { number: '5', adlam: '𞥕', audio: '/audios/5.ogg' },
          { number: '6', adlam: '𞥖', audio: '/audios/6.ogg' },
          { number: '7', adlam: '𞥗', audio: '/audios/7.ogg' },
          { number: '8', adlam: '𞥘', audio: '/audios/8.ogg' },
          { number: '9', adlam: '𞥙', audio: '/audios/9.ogg' },
        ],
      },
      alphabet: {
        title: "Apprenez l'alphabet",
        list: [
          { letter: 'A', adlam: '𞤀', audio: '/audios/L1.ogg' },
          { letter: 'B', adlam: '𞤁', audio: '/audios/L2.ogg' },
          { letter: 'Ɓ', adlam: '𞤂', audio: '/audios/L3.ogg' },
          { letter: 'C', adlam: '𞤃', audio: '/audios/L4.ogg' },
          { letter: 'D', adlam: '𞤄', audio: '/audios/L5.ogg' },
          { letter: 'Ɗ', adlam: '𞤅', audio: '/audios/L6.ogg' },
          { letter: 'E', adlam: '𞤆', audio: '/audios/L7.ogg' },
          { letter: 'F', adlam: '𞤇', audio: '/audios/L8.ogg' },
          { letter: 'G', adlam: '𞤈', audio: '/audios/L9.ogg' },
          { letter: 'H', adlam: '𞤉', audio: '/audios/L10.ogg' },
          { letter: 'I', adlam: '𞤊', audio: '/audios/L11.ogg' },
          { letter: 'J', adlam: '𞤋', audio: '/audios/L12.ogg' },
          { letter: 'K', adlam: '𞤌', audio: '/audios/L13.ogg' },
          { letter: 'L', adlam: '𞤍', audio: '/audios/L14.ogg' },
          { letter: 'M', adlam: '𞤎', audio: '/audios/L15.ogg' },
          { letter: 'N', adlam: '𞤏', audio: '/audios/L16.ogg' },
          { letter: 'Ñ', adlam: '𞤐', audio: '/audios/L17.ogg' },
          { letter: 'O', adlam: '𞤑', audio: '/audios/L18.ogg' },
          { letter: 'P', adlam: '𞤒', audio: '/audios/L19.ogg' },
          { letter: 'Q', adlam: '𞤓', audio: '/audios/L20.ogg' },
          { letter: 'R', adlam: '𞤔', audio: '/audios/L21.ogg' },
          { letter: 'S', adlam: '𞤕', audio: '/audios/L22.ogg' },
          { letter: 'T', adlam: '𞤖', audio: '/audios/L23.ogg' },
          { letter: 'U', adlam: '𞤗', audio: '/audios/L24.ogg' },
          { letter: 'W', adlam: '𞤘', audio: '/audios/L25.ogg' },
          { letter: 'X', adlam: '𞤙', audio: '/audios/L26.ogg' },
          { letter: 'Y', adlam: '𞤚', audio: '/audios/L27.ogg' },
          { letter: 'Z', adlam: '𞤛', audio: '/audios/L28.ogg' },
        ],
      },
    },

    commentsList: {
      // Liste vide
      none: 'Soyez le premier à commenter cet article !',

      // Suppression Admin (CommentItem)
      confirmDelete: 'Êtes-vous sûr de vouloir supprimer ce commentaire ?',
      deleteError: 'Erreur lors de la suppression:',
      deleteConnectionError:
        'Erreur de connexion au serveur lors de la suppression.',
      deleteButtonTitle: 'Supprimer ce commentaire',

      // Date/Locale (pas un message, mais une indication pour le formatage)
      dateLocale: 'fr-FR',
    },
    // ...

    contactForm: {
      // Section gauche (description)
      title: 'Contactez-nous',
      descriptionLine1:
        "Si vous avez des questions, des suggestions ou si vous souhaitez nous signaler un bug, n'hésitez pas à nous contacter. Nous sommes là pour vous aider et apprécions vos retours.",
      descriptionLine2:
        'Vous pouvez également nous joindre via les réseaux sociaux ci-dessous.',

      // Formulaire
      labelName: 'Nom et Prénom',
      labelTel: 'Téléphone',
      labelEmail: 'Email',
      labelMessage: 'Votre Message',
      buttonSubmit: 'Envoyer',
    },

    commentForm: {
      // État non authentifié
      loginRequiredTitle: 'Connexion requise',
      loginRequiredMessage: 'Veuillez vous ',
      loginLinkText: 'connecter',
      loginRequiredMessageEnd: ' pour laisser un commentaire.',

      // Formulaire de soumission
      label: 'Écrivez votre commentaire :',
      placeholder: 'Votre commentaire...',

      // Messages d'état
      errorEmpty: 'Le commentaire ne peut pas être vide.',
      errorAuthMissing: "Erreur d'authentification: jeton manquant.",
      errorApi: 'Erreur lors de la soumission du commentaire.',
      errorConnection: 'La connexion au serveur a échoué.',
      success: 'Commentaire envoyé avec succès !',

      // Bouton
      buttonSubmit: 'Envoyer le commentaire',
      buttonLoading: 'Envoi...',
    },
    // ...

    about: {
      smallTitle: 'Notre Histoire',
      largeTitle: "Qui Sommes-Nous ? Découvrez l'Association.",
      paragraph1: "L'association a été fondée dans le but de...",
      paragraph2: "Notre mission principale est d'assurer...",
      paragraph3: 'Nous croyons fermement que...',
    },

    community: {
      title: 'La communauté peule',
      description:
        "Le peuple peul, également connu sous le nom de Fulani, est l'un des groupes ethniques les plus vastes et les plus dispersés d'Afrique. Répartis principalement dans la région du Sahel et en Afrique de l'Ouest, ils sont réputés pour leur riche histoire nomade et leur culture distincte, centrée sur l'élevage de bétail. Ils sont connus pour leur résilience, leurs traditions musicales et poétiques, et leur engagement profond envers leurs coutumes et leur langue, le fulfulde. Cette communauté a joué un rôle clé dans l'histoire de la région, y compris par le biais de la diffusion de l'islam et de la création d'empires majeurs.",
      button: 'Lire la suite',
    },
    articlesSection: {
      title: 'Nos articles',
      readMoreButton: 'Lire la suite',
      viewAllButton: 'Voir tous les articles',
    },
    allArticlesPage: {
      heroTitle: 'Tous les articles',
      heroSubtitle: "Découvrez l'intégralité de notre collection d'articles.",
      backButton: 'Retour',
    },
    auth: {
      register: {
        signUp: 'Inscription',
        nameLabel: 'Nom complet',
        emailLabel: 'Email',
        passwordLabel: 'Mot de passe',
        confirmPasswordLabel: 'Confirmer le mot de passe',
        signUpButton: "S'inscrire",
        hasAccount: 'Vous avez déjà un compte ?',
        signInHere: 'Connectez-vous ici',
        passwordMismatchError: 'Les mots de passe ne correspondent pas.',
        registrationError: "Erreur lors de l'inscription.",
        loadingButton: 'Inscription en cours...',
      },
      login: {
        signIn: 'Connexion',
        emailLabel: 'Email',
        emailPlaceholder: 'Votre email',
        passwordLabel: 'Mot de passe',
        passwordPlaceholder: 'Votre mot de passe',
        signInButton: 'Se connecter',
        loadingButton: 'Connexion en cours...',
        noAccount: 'Pas de compte ?',
        signUpHere: 'Inscrivez-vous ici',
        authError: "Erreur d'authentification.",
      },
    },
    userProfile: {
      unauthorizedMessage: 'Veuillez vous connecter pour voir cette page.',
      dashboardTitle: 'Tableau de bord',
      myInfo: 'Mes informations',
      createArticle: 'Créer un article',
      listArticles: 'Liste des articles',
      allUser: 'Liste des utulisateurs',
      logout: 'Se déconnecter',
      updateProfileTitle: 'Mettre à jour mon profil',
      passwordMismatchError: 'Les mots de passe ne correspondent pas.',
      successMessage: 'Profil mis à jour avec succès.',
      errorMessage: 'Échec de la mise à jour du profil.',
      networkError: 'Une erreur réseau est survenue. Veuillez réessayer.',
      nameLabel: 'Nom et prénom',
      emailLabel: 'Adresse Email',
      changePasswordTitle: 'Changer le mot de passe (optionnel)',
      newPasswordLabel: 'Nouveau mot de passe',
      confirmPasswordLabel: 'Confirmer le nouveau mot de passe',
      updatingButton: 'Mise à jour...',
      updateButton: 'Mettre à jour le profil',
    },
  },
  adlam: {
    hero: {
      title: ' 𞤚𞤮𞥅𞤤𞤭 𞤥𞤮𞤲 𞤳𞤢 𞤀𞤳𞤱𞤫𞥅𞤴𞤮. ',
      description: `𞤀𞤳𞤱𞤫𞥅𞤴𞤮: 𞤐𞤮 𞤴𞤫𞤱𞤼𞤢 𞤬𞤭𞥅 𞤨𞤫𞤰𞥆𞤭⹁ 𞤊𞤭𞤲𞤢𞥄 𞤼𞤢𞤱𞤢𞥄⹁ 𞤲𞤢𞥄𞤥𞤵 𞤫 𞤷𞤮𞤧𞤢𞥄𞤲𞤫 𞤊𞤵𞤤𞤩𞤫 𞤫 𞤲𞤮𞤳𞥆𞤵 𞤳𞤢𞤤𞤢 𞤳𞤢 𞤩𞤫 𞤸𞤭𞤳𞥆𞤮𞤪𞤭 𞤫 𞤤𞤢𞥄𞤤𞤢𞤺𞤢𞤤 𞤢𞤣𞤵𞤲𞤢 𞤲𞤺𞤢𞤤. 𞤖𞤭𞤲𞤮 𞤼𞤢𞤱𞤪𞤢𞥄 𞤫 𞤺𞤮𞤤𞥆𞤫 𞤀𞤳𞤱𞤫𞥅𞤴𞤮 𞤶𞤢𞤲𞥆𞤵𞤺𞤮𞤤 𞤬𞤭𞤲𞤣𞤭𞤲𞤢 𞤲𞤺𞤫𞥅𞤼𞤵𞤶𞤭 𞤇𞤭𞤯𞤩𞤫 𞤊𞤵𞤤𞤩𞤫 𞤫 𞤀𞤬𞤭𞤪𞤭𞤳𞤢𞤲𞥆𞤢𞥄𞤩𞤫.

𞤀𞤳𞤱𞤫𞥅𞤴𞤮: 𞤖𞤮𞤤𞥆𞤭𞤪𞤢𞤴 𞤳𞤢𞤤𞤢 𞤳𞤮 𞤬𞤫𞤰𞥆𞤢𞤼𞤢 𞤫 𞤀𞤣𞤵𞤲𞤢𞥄𞤪𞤵 𞤲𞤣𞤵𞤲⹁ 𞤊𞤵𞤯𞤲𞤢𞥄𞤲𞤺𞤫 𞤫 𞤖𞤭𞤪𞤲𞤢𞥄𞤲𞤺𞤫⹁ 𞤙𞤢𞥄𞤥𞤲𞤢𞥄𞤲𞤺𞤫 𞤫 𞤐𞤢𞤲𞥆𞤢𞥄𞤲𞤺𞤫.
𞤀𞤳𞤱𞤫𞥅𞤴𞤮: 𞤐𞤮 𞤀𞤲𞤣𞤭𞤲𞤢 𞤫𞤲 𞤈𞤮𞤱𞤼𞤢𞤼𞤢𞤲𞤭⹁ 𞤈𞤮𞤱𞤼𞤢𞤲𞤭⹁ 𞤈𞤮𞤱𞤢𞤲𞤭⹁ 𞤖𞤭𞤳𞥆𞤢⹁ 𞤃𞤢𞤱𞤪𞤭⹁ 𞤃𞤢𞤱𞤼𞤭𞤪𞤭⹁ 𞤃𞤢𞤱𞤼𞤭𞤼𞤭𞤪𞤭.`,
      button: '𞤚𞤭𞤲𞤵', // "Voir plus"
    },
    header: {
      menu: [
        { name: '𞤘𞤢𞤤𞥆𞤫', href: '/' },
        { name: '𞤊𞤭𞥅 𞤸𞤵𞥅𞤱𞤲𞤣𞤫', href: '/a-propos' },
        { name: '𞤊𞤵𞤯𞥆𞤢𞤲𞤣𞤫', href: '/initiation' },
        { name: '𞤆𞤫𞤰𞥆𞤭𞤲𞤳𞤮', href: '/history-details' },
        { name: '𞤑𞤵𞤯𞤮𞤤', href: '/all-articles' },
        // { name: '𞤔𞤮𞤳𞥆𞤮𞤲𞥋𞤣𞤭𞤪𞤢𞤤', href: '#' },
      ],
      languageLabel: '𞤍𞤫𞤲𞤯𞤫',
      signUp: '𞤖𞤫𞤼𞥆𞤵𞤣𞤫',
      signIn: '𞤚𞤫𞤺𞥆𞤵𞤣𞤫',
      profile: '𞤅𞤫𞥅𞤺𞤮 𞤢𞤥',
      logouHead: '𞤅𞤮𞤯𞤼𞤢𞤲𞤣𞤫',
    },
    offerings: {
      title: '𞤖𞤭𞤥𞤮 𞤳𞤮 𞤯𞤫𞤥𞤯𞤫 𞤥𞤫𞥅𞤯𞤫𞤪𞤼𞤫𞤲',
      services: [
        {
          title: '𞤉𞤥𞤢𞥄𞤲𞤢𞥄𞤶𞤫 𞤫 𞤐𞤭𞤯𞤼𞤵𞤲𞤢',
          description: '𞤃𞤢𞤪𞤢𞤲𞤼𞤢𞥄𞤶𞤫 𞤳𞤮 𞤯𞤭𞤯𞤭 𞤫 𞤲𞤢𞤥𞥆𞤢𞥄𞤶𞤫 𞤫 𞤲𞤫𞤲𞤣𞤵𞤲𞤢 𞤫 𞤲𞤭𞤯𞤭𞤪𞤮𞤱𞤢𞤳𞤭.',
        },
        {
          title: '𞤊𞤭𞤪𞤫𞤼𞤢𞥄𞤶𞤫 𞤫 𞤐𞤭𞤯𞤼𞤵𞤲𞤢',
          description: '𞤖𞤫𞤪𞤣𞤭𞤼𞤢𞤥 𞤲𞤮𞤲 𞤧𞤢𞤪𞤭𞤦𞤭𞤯𞤭 𞤫 𞤲𞤢𞤲𞥆𞤭𞤼𞤢𞤳𞤮 𞤳𞤮 𞤶𞤮𞤳𞥆𞤮𞤲𞤣𞤭𞤪𞤫𞤲.',
        },
        {
          title: '𞤊𞤭𞤪𞤫𞤼𞤢𞥄𞤶𞤫 𞤫 𞤕𞤢𞤪𞤭',
          description: '𞤃𞤢𞤪𞤢𞤲𞤼𞤢𞥄𞤶𞤫 𞤫 𞤲𞤢𞤥𞥆𞤢𞥄𞤶𞤫 𞤫 𞤲𞤫𞤲𞤣𞤵𞤲𞤢 𞤫 𞤲𞤭𞤯𞤭𞤪𞤮𞤱𞤢𞤳𞤭.',
        },
        {
          title: '𞤖𞤫𞤪𞤣𞤭𞤼𞤢𞤥 𞤱𞤢𞤤𞤢 𞤫𞤥𞤢𞥄𞤲𞤢𞥄𞤶𞤫',
          description: '𞤃𞤢𞤪𞤢𞤲𞤼𞤢𞥄𞤶𞤫 𞤳𞤮 𞤯𞤭𞤯𞤭 𞤫 𞤲𞤢𞤥𞥆𞤢𞥄𞤶𞤫 𞤫 𞤲𞤫𞤲𞤣𞤵𞤲𞤢 𞤫 𞤲𞤭𞤯𞤭𞤪𞤮𞤱𞤢𞤳𞤭.',
        },
      ],
    },
    history: {
      title: '𞤆𞤫𞤰𞥆𞤮𞤤 𞤧𞤭𞤲𞤷𞤫𞥅𞤣𞤫 𞤀𞤣𞤤𞤢𞤥',
      description:
        ' 𞤐𞤣𞤫 𞤩𞤫 𞤴𞤮𞤼𞥆𞤭𞤲𞤮𞥅 𞤣𞤵𞥅𞤩𞤭 𞥑𞥐 𞤫𞥑𞥔⹁ 𞤀𞤦𞤣𞤵𞤤𞥆𞤢𞥄𞤸𞤭 𞤫 𞤋𞤦𞤪𞤢𞥄𞤸𞤭𞥅𞤥𞤢 𞤬𞤭𞤩𞤭 𞤧𞤭𞤲𞤷𞤢𞤲𞤺𞤮𞤤 𞤯𞤫𞤥𞤺𞤢𞤤 𞤥𞤢𞤩𞥆𞤫 𞤬𞤵𞤤𞤬𞤵𞤤𞤣𞤫 𞤨𞤵𞤤𞤢𞤪 𞤲𞤺𞤢𞤤⹁ 𞤢𞤤𞤳𞤵𞤤𞤫. 𞤋𞤤𞤢 𞤼𞤫𞥅𞤥𞤭𞤲𞤢𞤲𞤯𞤫 𞤸𞤫𞥅𞤱𞤵𞤯𞤫⹁ 𞤳𞤮 𞤴𞤢𞤱𞤼𞤭 𞤣𞤵𞤦𞤵𞥅𞤶𞤫 𞤣𞤵𞤦𞤵𞥅𞤶𞤫 𞤴𞤭𞤥𞤩𞤫 𞤲𞤮 𞤸𞤢𞥄𞤤𞤢 𞤲𞤺𞤢𞤤 𞤯𞤫𞤲𞤺𞤢𞤤⹁ 𞤳𞤮𞤲𞤮 𞤸𞤢𞤪𞤭 𞤲𞤺𞤢𞤤 𞤢𞤤𞤢𞥄 𞤦𞤭𞤲𞤣𞤭 ',
      button: '𞤚𞤭𞤲𞤵', // "Voir plus"
      alphabet: [
        '𞤀',
        '𞤁',
        '𞤂',
        '𞤄',
        '𞤆',
        '𞤇',
        '𞤈',
        '𞤉',
        '𞤊',
        '𞤋',
        '𞤌',
        '𞤍',
        '𞤎',
        '𞤏',
        '𞤐',
        '𞤑',
        '𞤒',
        '𞤓',
      ],
    },
    historicDetails: {
      backButton: '𞤑𞤮𞤤𞥆𞤮',
      title: '  𞤆𞤫𞤰𞥆𞤮𞤤 𞤧𞤭𞤲𞤷𞤫𞥅𞤣𞤫 𞤀𞤣𞤤𞤢𞤥 ',
      intro:
        '𞤐𞤣𞤫 𞤩𞤫 𞤴𞤮𞤼𞥆𞤭𞤲𞤮𞥅 𞤣𞤵𞥅𞤩𞤭 𞥑𞥐 𞤫𞥑𞥔⹁ 𞤀𞤦𞤣𞤵𞤤𞥆𞤢𞥄𞤸𞤭 𞤫 𞤋𞤦𞤪𞤢𞥄𞤸𞤭𞥅𞤥𞤢 𞤬𞤭𞤩𞤭 𞤧𞤭𞤲𞤷𞤢𞤲𞤺𞤮𞤤 𞤯𞤫𞤥𞤺𞤢𞤤 𞤥𞤢𞤩𞥆𞤫 𞤬𞤵𞤤𞤬𞤵𞤤𞤣𞤫 𞤨𞤵𞤤𞤢𞤪 𞤲𞤺𞤢𞤤⹁ 𞤢𞤤𞤳𞤵𞤤𞤫. 𞤋𞤤𞤢 𞤼𞤫𞥅𞤥𞤭𞤲𞤢𞤲𞤯𞤫 𞤸𞤫𞥅𞤱𞤵𞤯𞤫⹁ 𞤳𞤮 𞤴𞤢𞤱𞤼𞤭 𞤣𞤵𞤦𞤵𞥅𞤶𞤫 𞤣𞤵𞤦𞤵𞥅𞤶𞤫 𞤴𞤭𞤥𞤩𞤫 𞤲𞤮 𞤸𞤢𞥄𞤤𞤢 𞤲𞤺𞤢𞤤 𞤯𞤫𞤲𞤺𞤢𞤤⹁ 𞤳𞤮𞤲𞤮 𞤸𞤢𞤪𞤭 𞤲𞤺𞤢𞤤 𞤢𞤤𞤢𞥄 𞤦𞤭𞤲𞤣𞤭 ',
      section1: {
        heading: ' 𞤙𞤢𞥄𞤤𞤲𞤣𞤫 𞤺𞤮𞥅𞤪𞤫⹁ 𞤀𞤦𞤣𞤵𞤤𞥆𞤢𞥄𞤸𞤭 𞤤𞤢𞤲𞤣𞤭𞥅 𞤦𞤢𞥄𞤦𞤫𞤲 𞤱𞤢𞤳𞥆𞤮: ',
        text: '𞥟𞤖𞤮𞤤 𞤳𞤮 𞤱𞤢𞤯𞤭 𞤴𞤭𞤥𞤩𞤫 𞤥𞤢𞤩𞥆𞤫 𞤩𞤫𞤲 𞤢𞤤𞤢𞤲𞤢𞥄 𞤸𞤮𞥅𞤪𞤫 𞤥𞤵𞤲 𞤦𞤭𞤲𞤣𞤮𞤤؟ 𞤄𞤢𞥄𞤦𞤫𞤲 𞤱𞤢𞤩𞥆𞤫 𞤋𞤧𞤸𞤢𞥄𞤹𞤢 𞤶𞤢𞥄𞤦𞤭𞥅 𞤱𞤮𞤲𞤣𞤫: "𞤦𞤭𞤲𞤣𞤮𞤤 𞤲𞤺𞤮𞤤 𞤩𞤫 𞤢𞤲𞤣𞤭 𞤲𞤺𞤮𞤤 𞤬𞤭𞥅 𞤥𞤵𞥅𞤯𞤵𞤲⹁ 𞤳𞤮 𞤲𞤺𞤮𞤤 𞤯𞤮𞥅 𞤦𞤭𞤲𞤣𞤮𞤤⹁ 𞤢𞥄𞤪𞤢𞤦𞤵𞤱𞤮𞤤". 𞤑𞤮 𞤲𞤣𞤫𞤲 𞤻𞤢𞥄𞤤𞤲𞤣𞤫 𞤀𞤦𞤣𞤵𞤤𞥆𞤢𞥄𞤸𞤭 𞤬𞤮𞤣𞤭 𞤦𞤢𞥄𞤦𞤫𞤲 𞤱𞤢𞤳𞥆𞤮 𞤧𞤭𞤲𞤷𞤢𞤲𞤺𞤮𞤤 𞤬𞤵𞤤𞤬𞤵𞤤𞤣𞤫 𞤨𞤢𞤤𞤢𞤪 𞤲𞤣𞤫𞤲 𞤦𞤭𞤲𞤣𞤮𞤤. 𞤐𞤣𞤫 𞤺𞤮𞤪𞤫𞥅𞤩𞤫 𞤱𞤢𞤩𞥆𞤫 𞤲𞤮 𞤬𞤭𞤶𞤢𞤴𞤲𞤮𞥅 𞤳𞤢 𞤳𞤢𞤱𞤼𞤫⹁ 𞤋𞤦𞤪𞤢𞥄𞤸𞤭𞥅𞤥𞤢⹁ 𞤥𞤢𞤱𞤲𞤭𞤪𞤢𞥄𞤱𞤮 𞤮𞤲⹁ 𞤫 𞤀𞤦𞤣𞤵𞤤𞥆𞤢𞥄𞤸𞤭⹁ 𞤧𞤮𞤳𞤭𞤼𞤮𞤼𞤮𞤲𞤮 𞤳𞤢 𞤲𞤣𞤫𞤪 𞤧𞤵𞥅𞤣𞤵 𞤱𞤢𞤩𞥆𞤫 𞤳𞤢 𞤺𞤢𞤤𞥆𞤫 𞤦𞤢𞥄𞤦𞤢 𞤱𞤢𞤩𞥆𞤫 (𞤟𞤫𞤪𞤫𞤳𞤮𞤪𞤫 𞤤𞤫𞤴𞤣𞤭 𞤘𞤭𞤲𞤫)⹁ 𞤩𞤫 𞤮𞤥𞤦𞤢 𞤺𞤭𞤴𞤼𞤫 𞤱𞤢𞤩𞥆𞤫 𞤯𞤫𞤲 𞤩𞤫 𞤧𞤭𞥅𞤬𞤢 𞤷𞤭𞥅𞤬𞤭 𞤲𞤦𞤢𞤴𞤣𞤭𞥅𞤶𞤭 𞤸𞤢𞥄 𞤯𞤵𞥅𞤯𞤢.',
      },

      section2: {
        text: '𞤅𞤭 𞤺𞤮𞥅𞤼𞤮 𞤫 𞤱𞤢𞤩𞥆𞤫 𞤱𞤭𞤴𞤭𞥅 𞤴𞤮 𞤩𞤫 𞤣𞤢𞤪𞤮, 𞤫 𞤲𞤺𞤵𞤲 𞤸𞤢𞤨𞥆𞤵 𞤩𞤫 𞤵𞤣𞥆𞤭𞤼𞤢 𞤺𞤭𞤴𞤼𞤫 𞤯𞤫𞤲, 𞤩𞤫 𞤲𞤣𞤢𞥄𞤪𞤢 𞤫 𞤲𞤣𞤫𞤪 𞤳𞤮 𞤩𞤫 𞤧𞤭𞥅𞤬𞤭 𞤳𞤮𞤲, 𞤩𞤫 𞤧𞤵𞤩𞤮𞥅 𞤲𞤦𞤢𞤴𞤣𞤭 𞤲𞤣𞤭 𞤩𞤫 𞤴𞤭𞤯𞤭 𞤫 𞤸𞤭𞤼𞤮 𞤴𞤢𞤸𞤣𞤵𞤲𞥋𞤺𞤮 𞤫 𞤲𞤣𞤭𞤲 𞤲𞤦𞤢𞤴𞤣𞤭 𞤯𞤮𞤲. 𞤐𞤫𞥅𞤩𞤢𞥄𞤤𞤭 𞤸𞤢𞤪𞤭 𞤩𞤫 𞤴𞤵𞤩𞥆𞤭𞥅 𞤦𞤭𞤲𞤣𞤮𞤤 𞤢𞤲𞤣𞤭𞤪𞤢𞥄𞤲𞤺𞤮𞤤 𞤸𞤢𞤲𞤣𞤫, "𞤀𞤁𞤂𞤢𞤃 𞤆𞤓𞤂𞤀𞥄𞤈". - 𞤀𞤁𞤂𞤢𞤃 𞤲𞤮 𞤬𞤭𞤪𞤼𞤭𞤪𞤫𞥅: «𞤀𞤤𞤳𞤵𞤤𞤫 𞤁𞤢𞤲𞤣𞤢𞤴𞤯𞤫 𞤂𞤫𞤻𞤮𞤤 𞤃𞤢𞤶𞥆𞤵𞤺𞤮𞤤». - 𞤃𞤢𞥄𞤯𞤵𞤲: «𞤀𞤤𞤤𞤢 𞤁𞤢𞤲𞤣𞤭𞥅 𞤂𞤫𞤻𞤮𞤤 𞤥𞤫𞤲 𞤃𞤵𞤤𞤵𞤺𞤮𞤤». 𞤑𞤢 𞤪𞤢𞤩𞥆𞤭𞤲𞤢𞤺𞤮𞤤, 𞤳𞤮 𞤲𞤭𞥅 𞤥𞤭𞥅𞤶𞤮 𞤬𞤭𞥅 𞤀𞤁𞤂𞤢𞤃 𞤬𞤵𞤯𞥆𞤮𞤪𞤭. 𞤇𞤫 𞤱𞤭𞤴𞤭: "𞤃𞤫𞤲 𞤲𞤣𞤢𞥄𞤪𞤵 𞤥𞤫𞤲 𞤼𞤢𞤱𞤭, 𞤽𞤢𞤳𞥆𞤫𞤪𞤫 𞤲𞤮 𞤱𞤮𞥅𞤣𞤭, 𞤪𞤫𞤬𞤼𞤭 𞤥𞤫𞤲 𞤧𞤭𞤳𞥆𞤭 𞤥𞤫𞤲 𞤱𞤢𞥄𞤱𞤢𞤴𞤲𞤣𞤫 𞤸𞤵𞤥𞤼𞤵𞤣𞤫, 𞤳𞤮 𞤯𞤵𞤲 𞤲𞤢𞥄𞤣𞤭 𞤥𞤫𞤲 𞤫 𞤯𞤵𞤲." 𞤇𞤫𞥅 𞤲𞤫𞥅𞤲𞤫-𞤺𞤮𞥅𞤼𞤮𞥅𞤩𞤫 𞤥𞤮𞤰𞥆𞤭𞤲𞤭 𞤦𞤫𞤦𞤫𞤪𞤫 𞤥𞤮𞤬𞤼𞤵𞤲𞥋𞤣𞤫 𞤢𞤤𞤳𞤵𞤤𞤫 𞥒𞥘 𞤫 𞤤𞤭𞤥𞤮𞥅𞤶𞤫 𞥙 𞤱𞤭𞤲𞤣𞤭𞤪𞤼𞤫𞥅𞤯𞤫 𞤭𞤥𞥆𞤮𞤪𞤣𞤫 𞤳𞤢 𞤻𞤢𞥄𞤥𞤮 𞤴𞤢𞤸𞤪𞤢 𞤳𞤢 𞤲𞤢𞤲𞤮. 𞤘𞤢𞥄𞤲𞤭𞤲𞤼𞤭𞤲 𞤺𞤢𞥄, 𞤩𞤫 𞤩𞤫𞤴𞤣𞤭𞤼𞤭 𞤢𞤤𞤳𞤵𞤤𞤫 𞥖 𞤸𞤫𞥅𞤪𞤢𞤲𞤭𞥅𞤯𞤫 𞤯𞤫𞤴𞤢 𞤯𞤫𞤲𞤯𞤫 𞤢𞤬𞤪𞤭𞤳𞤢𞤲𞤢𞥄𞤶𞤫 𞤫 𞤳𞤮𞤲𞤺𞤭 𞤤𞤵𞤩𞤢𞥄𞤯𞤭 𞤺𞤮𞥅. 𞤇𞤫 𞤢𞤣𞤭𞥅 𞤶𞤢𞤲𞤺𞤭𞤲𞤺𞤮𞤤 𞤲𞤣𞤫𞥅 𞤦𞤫𞤦𞤫𞤪𞤫 𞤥𞤭𞤻𞥆𞤭𞤪𞤢𞥄𞤸𞤮 𞤱𞤢𞤩𞥆𞤫 𞤲𞤮 𞤱𞤭𞤴𞤫𞥅: "𞤀𞤴𞤧𞤢𞤼𞤢 𞤄𞤢𞤪𞤭" 𞤴𞤮 𞤀𞤤𞤤𞤢𞥄𞤸𞤵 𞤌𞤲 𞤴𞤵𞤪𞤥𞤭𞤲 𞤥𞤮𞤸𞤮 𞤌 𞤴𞤢𞥄𞤬𞤮𞥅. 𞤀𞥄𞤥𞤭𞥅𞤲𞤢.',
      },
    },
    communityDetails: {
      backButton: '𞤑𞤮𞤤𞥆𞤮',
      title: ' 𞤊𞤓𞤂𞤇𞤉',
      intro:
        '𞤆𞤓𞤂𞥆𞤌: 𞤸𞤵𞤤𞤢𞤼𞤢𞥄⹁𞤬𞤫𞤲𞤢𞤼𞤢𞥄⹁ 𞤬𞤭𞤪𞤼𞤢𞥄 𞤢𞤸𞤣𞤭⹁ 𞤼𞤮𞥅𞤻𞤢𞤼𞤢𞥄⹁ 𞤶𞤢𞤲𞤬𞤮𞤼𞤢𞥄𞤳𞤮⹁ 𞤱𞤵𞤶𞥆𞤢𞥄𞤼𞤢⹁ 𞤼𞤢𞤰𞤢𞤼𞤢𞥄 𞤫𞤲𞤯𞤢𞤲.',
      section1: {
        heading: '  ',
        text: '𞤂𞤫𞤻𞤮𞤤 𞤬𞤵𞤤𞤩𞤫 𞤲𞤺𞤮𞤤 𞤳𞤮 𞤤𞤫𞤻𞤮𞤤 𞤴𞤢𞥄𞤶𞤵𞤲𞥋𞤺𞤮𞤤⹁ 𞤸𞤭𞤲𞥋𞤺𞤮𞤤 𞤴𞤢𞤸𞤢 𞤼𞤫𞤤𞤫𞤲 𞤣𞤵𞤦𞤵𞤲𞤫 𞥑𞥐𞥐.𞥐𞥐𞥐.𞥐𞥐𞥐 𞤴𞤭𞤥𞤩𞤫 𞤸𞤢𞥄 𞤴𞤫𞥅𞤧𞤮⹁ 𞤸𞤭𞤩𞤫 𞤸𞤢𞤱𞤼𞤭 𞤶𞤭𞤳𞥆𞤵𞥅𞤶𞤭 𞤱𞤢𞤲𞤮 𞤬𞤵𞤲𞤫𞥅𞤩𞤫⹁ 𞤳𞤮 𞤴𞤭𞤥𞤩𞤫 𞤴𞤭𞤯𞤵𞤩𞤫 𞤩𞤵𞥅𞤩𞤼𞤵⁏ 𞤱𞤮𞥅𞤼𞤭𞤯𞤭𞤲𞤩𞤫 𞤺𞤮𞥅𞤼𞤢𞥄𞤳𞤵. ',
      },
      section2: {
        text: '𞤑𞤮 𞤩𞤫 𞤴𞤮𞤲𞤯𞤵𞤩𞤫, 𞤸𞤭𞤲𞤮 𞤫 𞤥𞤢𞤩𞥆𞤫 𞤲𞤫𞤸𞤢𞤩𞤫, 𞤼𞤢𞤬𞤢𞤴𞤩𞤫, 𞤷𞤵𞤦𞥆𞤢𞤤𞥆𞤮𞥅𞤩𞤫, 𞤪𞤫𞤥𞤮𞥅𞤩𞤫, 𞤶𞤢𞤲𞥆𞤮𞥅𞤩𞤫, 𞤴𞤫𞥅𞤴𞤢𞤴𞤩𞤫 𞤫 𞤤𞤢𞥄𞤥𞤩𞤫, 𞤻𞤫𞥅𞤻𞤵𞤩𞤫, 𞤼𞤢𞤧𞤳𞤮𞤼𞤮𞥅𞤩𞤫, 𞤫 𞤱𞤢𞤤𞤭𞤴𞤢𞥄𞤩𞤫 𞤫𞤳𞤲𞤯.........\n𞤇𞤫 𞤬𞤮𞤱 𞤥𞤢𞤩𞥆𞤫 𞤸𞤭𞤩𞤫 𞤸𞤮𞤯𞤭 𞤫 𞤤𞤢𞤱𞤴𞤢𞥄𞤪𞤭 𞤥𞤢𞤤𞥆𞤢 𞤲𞤺𞤫𞤯𞤢𞥄𞤪𞤭 𞤱𞤮𞥅𞤼𞤭𞤪𞤭, 𞤯𞤵𞤲 𞤳𞤮 𞤊𞤵𞥅𞤼𞤢.\n𞤊𞤵𞥅𞤼𞤢 𞤲𞤮𞤲 𞤥𞤢𞤪𞤲𞤮𞥅 𞤣𞤭𞥅𞤱𞤫 𞤥𞤮𞤤𞤢𞤲𞤢𞥄𞤯𞤫 𞤱𞤢𞤲𞤮: 𞤊𞤵𞥅𞤼𞤢𞤔𞤢𞤤𞤮𞥅, 𞤊𞤵𞤤𞤢𞤣𞤵𞥅, 𞤊𞤵𞥅𞤼𞤢 𞤼𞤮𞥅𞤪𞤮, 𞤊𞤵𞥅𞤼𞤢 𞤃𞤢𞥄𞤧𞤭𞤲𞤢, 𞤀𞤣𞤢𞤥𞤢𞤱𞤢 (𞤅𞤮𞤳𞤮𞤼𞤮).',
      },
    },
    initiation: {
      title: ' 𞤑𞤮 𞤼𞤮𞥅𞤤𞤭 𞤥𞤮𞤲 𞤳𞤢 𞤀𞤳𞤱𞤫𞥅𞤴𞤮',
      description:
        '𞤖𞤫𞤱𞤼𞤫𞥅 𞤸𞤵𞤥𞤨𞤭𞤼𞤮𞤯𞤮𞤲 𞤶𞤢𞤲𞤺𞤮𞤲 𞤨𞤭𞤲𞤫⹁ 𞤷𞤮𞤧𞤢𞥄𞤲𞤫⹁ 𞤺𞤢𞤲𞤣𞤫⹁ 𞤴𞤮𞤲𞤯𞤫𞥅𞤲𞤣𞤭 𞤫 𞤺𞤮𞤱𞤢𞥄𞤯𞤭 𞤥𞤫𞤲.',
      tiles: [
        {
          title: '𞤉𞤥𞤢𞥄𞤲𞤢𞥄𞤶𞤫 𞤫 𞤕𞤢𞤪𞤭',
          svg: 'lucide-message-circle',
        },
        {
          title: '𞤙𞤢𞤤𞤯𞤭 𞤴𞤮𞤲𞤼𞤫𞤪𞤫 𞤲𞤣𞤫𞤲 𞥗 ',
          svg: 'lucide-calendar',
        },
        {
          title: '𞤂𞤫𞤦𞥆𞤭 𞤲𞤢𞥄𞤺𞤫𞤴𞤢𞤲𞤳𞤮𞥅𞤶𞤭 𞤯𞤭𞤲 𞥑𞥒',
          svg: 'lucide-calendar-check',
        },
        {
          title: ' 𞤂𞤭𞤥𞤮𞥅𞤪𞤫 𞤲𞤣𞤫𞤲 ',
          svg: 'lucide-grid',
        },
      ],
      button: '𞤚𞤭𞤲𞤵',
    },
    initiationPage: {
      heroTitle: '  𞤂𞤭𞤥𞤳𞤵𞤤𞤫 ',
      heroDescription: '𞤑𞤮 𞤢𞤤𞤳𞤵𞤤𞤫 𞤫 𞤤𞤭𞤥𞤮𞥅𞤪𞤫',
      sections: [
        {
          title: '𞤉𞤥𞤢𞥄𞤲𞤢𞥄𞤶𞤫 𞤫 𞤕𞤢𞤪𞤭',
          description: '𞤘𞤢𞤪𞤼𞤵𞤺𞤮𞤤 𞤫 𞤥𞤢𞤪𞤢𞤲𞤼𞤢𞥄𞤶𞤫 𞤯𞤭𞤯𞤭 𞤫 𞤳𞤵𞤤𞥆𞤮𞤲.',
        },
        {
          title: '𞤐𞤭𞤯𞤫 𞤳𞤮𞤥𞤭𞤴𞤭',
          description:
            '𞤚𞤢𞤪𞤢𞤴 𞤳𞤮 𞤯𞤮𞤵𞤪𞤢𞤲𞤭𞥅𞤥𞤢 𞤫 𞤲𞤮𞤲 𞤲𞤮𞤲 𞤸𞤮𞤯𞤮 𞤳𞤢𞤣𞤭 𞤳𞤮𞤲𞤮 𞤲𞤮𞤲 𞤱𞤮𞤲𞤢 𞤳𞤮 𞤲𞤮𞤲 𞤧𞤭𞤲𞤭𞤲𞤣𞤫𞤪𞤮.',
        },
        {
          title: '𞤀𞤪𞤣𞤭𞥅𞤶𞤫',
          description: '𞤘𞤢𞤪𞤼𞤵𞤺𞤮𞤤 𞤫 𞤥𞤢𞤪𞤢𞤲𞤼𞤢𞥄𞤶𞤫 𞤯𞤭𞤯𞤭 𞤫 𞤳𞤵𞤤𞥆𞤮𞤲.',
        },
        {
          title: '𞤑𞤵𞤯𞤮𞤤 𞤳𞤮 𞤶𞤢𞤦𞤭',
          description: '𞤘𞤢𞤪𞤼𞤵𞤺𞤮𞤤 𞤫 𞤥𞤢𞤪𞤢𞤲𞤼𞤢𞥄𞤶𞤫 𞤯𞤭𞤯𞤭 𞤫 𞤳𞤵𞤤𞥆𞤮𞤲.',
        },
      ],
      numbers: {
        title: ' 𞤂𞤭𞤥𞤮𞥅𞤪𞤫 𞤆𞤵𞤤𞤢𞤪 ',
        list: [
          { number: '0', adlam: '𞥐', audio: '/audios/0.ogg' },
          { number: '1', adlam: '𞥑', audio: '/audios/1.ogg' },
          { number: '2', adlam: '𞥒', audio: '/audios/2.ogg' },
          { number: '3', adlam: '𞥓', audio: '/audios/3.ogg' },
          { number: '4', adlam: '𞥔', audio: '/audios/4.ogg' },
          { number: '5', adlam: '𞥕', audio: '/audios/5.ogg' },
          { number: '6', adlam: '𞥖', audio: '/audios/6.ogg' },
          { number: '7', adlam: '𞥗', audio: '/audios/7.ogg' },
          { number: '8', adlam: '𞥘', audio: '/audios/8.ogg' },
          { number: '9', adlam: '𞥙', audio: '/audios/9.ogg' },
        ],
      },

      alphabet: {
        title: '𞤀𞤤𞤳𞤵𞤤𞤫 𞤢𞤣𞤤𞤢𞤥 .  ',
        list: [
          { letter: '', adlam: '𞤀', audio: '/audios/L1.ogg' },
          { letter: 'B', adlam: '𞤁', audio: '/audios/L2.ogg' },
          { letter: 'Ɓ', adlam: '𞤂', audio: '/audios/L3.ogg' },
          { letter: 'C', adlam: '𞤃', audio: '/audios/L4.ogg' },
          { letter: 'D', adlam: '𞤄', audio: '/audios/L5.ogg' },
          { letter: 'Ɗ', adlam: '𞤅', audio: '/audios/L6.ogg' },
          { letter: 'E', adlam: '𞤆', audio: '/audios/L7.ogg' },
          { letter: 'F', adlam: '𞤇', audio: '/audios/L8.ogg' },
          { letter: 'G', adlam: '𞤈', audio: '/audios/L9.ogg' },
          { letter: 'H', adlam: '𞤉', audio: '/audios/L10.ogg' },
          { letter: 'I', adlam: '𞤊', audio: '/audios/L11.ogg' },
          { letter: 'J', adlam: '𞤋', audio: '/audios/L12.ogg' },
          { letter: 'K', adlam: '𞤌', audio: '/audios/L13.ogg' },
          { letter: 'L', adlam: '𞤍', audio: '/audios/L14.ogg' },
          { letter: 'M', adlam: '𞤎', audio: '/audios/L15.ogg' },
          { letter: 'N', adlam: '𞤏', audio: '/audios/L16.ogg' },
          { letter: 'Ñ', adlam: '𞤐', audio: '/audios/L17.ogg' },
          { letter: 'O', adlam: '𞤑', audio: '/audios/L18.ogg' },
          { letter: 'P', adlam: '𞤒', audio: '/audios/L19.ogg' },
          { letter: 'Q', adlam: '𞤓', audio: '/audios/L20.ogg' },
          { letter: 'R', adlam: '𞤔', audio: '/audios/L21.ogg' },
          { letter: 'S', adlam: '𞤕', audio: '/audios/L22.ogg' },
          { letter: 'T', adlam: '𞤖', audio: '/audios/L23.ogg' },
          { letter: 'U', adlam: '𞤗', audio: '/audios/L24.ogg' },
          { letter: 'W', adlam: '𞤘', audio: '/audios/L25.ogg' },
          { letter: 'X', adlam: '𞤙', audio: '/audios/L26.ogg' },
          { letter: 'Y', adlam: '𞤚', audio: '/audios/L27.ogg' },
          { letter: 'Z', adlam: '𞤛', audio: '/audios/L28.ogg' },
        ],
      },
    },

    commentsList: {
      // Liste vide
      none: '𞤅𞤮𞤳𞥆𞤢𞥄𞤣𞤮 𞤸𞤮𞤲𞥆𞤮 𞤢𞥄𞤥𞤵𞤲 𞤼𞤢𞥄𞤪𞤮𞤼𞤮𞤲 𞤲𞤵𞤤𞤢𞤤 𞤲𞤺𞤢𞤤!', // Sokkaaɗo honno aamun taaroton nulal ngal (Soyez le premier...)

      // Suppression Admin (CommentItem)
      confirmDelete: '𞤉𞤿𞤢𞤲 𞤮𞤲 𞤲𞤢𞤦𞤭 𞤼𞤵𞤤𞤤𞤭𞤣𞤫𞥅 𞤲𞤵𞤤𞤢𞤤 𞤲𞤺𞤢𞤤?', // Ecan on nabi tullide nulal ngal (Êtes-vous sûr de vouloir supprimer...)
      deleteError: '𞤖𞤵𞤥𞤨𞤭𞤼𞤢𞤺𞤮𞤤 𞤼𞤵𞤤𞤤𞤭𞤣𞤫𞥅:', // Humpitaagol tullide (Erreur lors de la suppression)
      deleteConnectionError: '𞤖𞤵𞤥𞤨𞤭𞤼𞤢𞤺𞤮𞤤 𞤲𞤢𞤲𞤣𞤢𞤤 𞤫 𞤧𞤫𞤪𞤾𞤫𞤪 𞤸𞤢𞤳𞥆𞤫 𞤼𞤵𞤤𞤤𞤭𞤣𞤫𞥅.', // Humpitaagol nandal e server hakke tullide (Erreur de connexion au serveur...)
      deleteButtonTitle: '𞤚𞤵𞤤𞤤𞤭𞤣𞤫𞥅 𞤲𞤵𞤤𞤢𞤤 𞤲𞤺𞤢𞤤', // Tullide nulal ngal (Supprimer ce commentaire)

      // Date/Locale
      dateLocale: 'ff-Adlm', // Locale Adlam/Pulaar
    },
    // ...

    contactForm: {
      // Section gauche (description)
      title: "𞤔𞤮𞤳𞥆𞤮𞤲'𞤣𞤭𞤪𞤫𞥅 𞤫 𞤢𞤥𞤫𞤲", // Jokkonɗire e amen (Contactez-nous)
      descriptionLine1:
        '𞤅𞤭 𞤭𞤯𞤮𞤲 𞤥𞤢𞤪𞤭 𞤤𞤢𞤲𞤣𞤢𞤤 𞤥𞤢𞤤𞥆𞤢 𞤬𞤫𞤸𞤪𞤫 𞤲𞤢𞤤𞥆𞤢 𞤧𞤭 𞤭𞤯𞤮𞤲 𞤬𞤢𞥄𞤤𞤢𞥄 𞤸𞤵𞤥𞤨𞤭𞤼𞤢𞤺𞤮𞤤 𞤬𞤭𞥅 𞤥𞤮𞤶𞤮𞤦𞤫𞤪𞤫 𞤀𞤥𞤫𞤲 𞤲𞤣𞤫𞤲⹁ 𞤱𞤮𞤼𞤢 𞤮𞤲 𞤢𞥄𞤥𞤵𞤲 𞤸𞤵𞤥𞤨𞤮𞤲𞥋𞤣𞤭𞤪𞤺𞤮𞤤 𞤫 𞤢𞤥𞤫𞤲⹁ 𞤶𞤢𞥄𞤦𞤮𞤺𞤮𞤤 𞤳𞤢 𞤸𞤢𞥄𞤼𞤭𞤥𞤫𞤪𞤫 𞤤𞤫𞤴 𞤯𞤮𞥅. 𞤺𞤮𞥅𞤼𞤮 𞤲𞤣𞤫𞤪 𞤬𞤫𞤣𞥆𞤫 𞤢𞤥𞤫𞤲 𞤲𞤣𞤫𞤲 𞤶𞤢𞥄𞤦𞤮𞤼𞤮 𞤳𞤮 𞤩𞤵𞤪𞤭 𞤫 𞤴𞤢𞥄𞤱𞤵𞤣𞤫.',
      descriptionLine2:
        '𞤋𞤯𞤮𞤲 𞤱𞤢𞥄𞤱𞤭 𞤳𞤢𞤣𞤭 𞤶𞤮𞤳𞥆𞤢𞥄𞤣𞤫 𞤫 𞤢𞤥𞤫𞤲 𞤳𞤢 𞤱𞤫𞥅𞤴𞤮 𞤬𞤭𞥅 𞤸𞤵𞤥𞤨𞤭𞤼𞤢𞤺𞤮𞤤 𞤺𞤮𞤤𞥆𞤫 𞤫 𞤼𞤵𞤥𞤦𞤮𞤲𞥋𞤣𞤭𞤪𞤫 𞤢𞤥𞤫𞤲.',

      // Formulaire
      labelName: '𞤋𞤲𞤣𞤫 𞤫 𞤴𞤫𞤼𞥆𞤮𞥅𞤪𞤫', // Innde e yettoore (Nom et Prénom)
      labelTel: ' 𞤉𞤏 ', // Nommar foon (Numéro de téléphone) - Modifié légèrement pour être plus clair
      labelEmail: '𞤐𞤭𞤤 ', // Emaail (Email) - Modifié légèrement pour être plus clair
      labelMessage: '𞤐𞤓𞤂𞤀𞤂 ', // Nulal (Votre Message)
      buttonSubmit: '𞤐𞤢𞤩𞤵', // Nabu (Envoyer)
    },

    commentForm: {
      // État non authentifié
      loginRequiredTitle: '𞤅𞤮𞤳𞥆𞤢𞥄𞤺𞤮𞤤 𞤲𞤮𞤣𞥆𞤢𞥄𞤥𞤢', // Sokkaagol noɗɗaama (Connexion requise)
      loginRequiredMessage: '𞤍𞤮𞥅𞤤𞤮 𞤮𞤲 𞤢𞥄𞤥𞤵𞤲 𞤬𞤭𞥅𞤼𞤭𞤣𞤫𞥅 𞤳𞤢', // Ƴoole on aamun fiitide kaa (Veuillez vous)
      loginLinkText: '𞤳𞤮𞤲𞥆𞤫𞥅𞤣𞤭', // konneeɗi (connecter)
      loginRequiredMessageEnd: ' 𞤬𞤭𞥅 𞤮𞤲 𞤢𞥄𞤥𞤵𞤲 𞤼𞤢𞥄𞤪𞤮𞤼𞤮𞤲 𞤲𞤵𞤤𞤢𞤤.', // fi on aamun taaroton nulal (pour laisser un commentaire)

      // Formulaire de soumission
      label: '𞤏𞤭𞤲𞤣𞤵 𞤣𞤫𞤱𞤼𞤢𞤲𞤣𞤫', // Jango nulal makko on (Écrivez votre commentaire)
      placeholder: '𞤁𞤫𞤱𞤼𞤢𞤲𞤣𞤫 𞤥𞤢𞥄...', // Nulal makko (Votre commentaire)

      // Messages d'état
      errorEmpty: '𞤐𞤵𞤤𞤢𞤤 𞤲𞤺𞤢𞤤 𞤬𞤮𞤼𞤢𞥄 𞤱𞤮𞤲𞤣𞤫 𞤥𞤢𞤪𞤢.', // Nulal ngal fotaa wonde mara (Le commentaire ne peut pas être vide)
      errorAuthMissing: '𞤖𞤵𞤥𞤨𞤭𞤼𞤢𞤺𞤮𞤤 𞤤𞤫𞤴𞤣𞤭𞤲𞤭: 𞤼𞤮𞤳𞤮𞤲 𞤥𞤢𞤲𞤳𞤢.', // Humpitaagol leydini: tokon manca (Erreur d'authentification: jeton manquant)
      errorApi: '𞤖𞤵𞤥𞤨𞤭𞤼𞤢𞤺𞤮𞤤 𞤼𞤭𞤥𞥆𞤢𞥄𞤣𞤫 𞤲𞤵𞤤𞤢𞤤.', // Humpitaagol timmaaɗe nulal (Erreur lors de la soumission)
      errorConnection: '𞤐𞤢𞤲𞤣𞤢𞤤 𞤫 𞤧𞤫𞤪𞤾𞤫𞤪 𞤬𞤢𞥄𞤤𞤭.', // Nandal e server faali (Connexion au serveur a échoué)
      success: '𞤐𞤵𞤤𞤢𞤤 𞤱𞤮𞤲𞤭 𞤼𞤭𞤥𞥆𞤢𞥄𞤥𞤢 𞤫 𞤩𞤫𞤧 𞤥𞤢𞤳𞥆𞤮!', // Nulal woni timmaama e bes makko (Commentaire envoyé avec succès)

      // Bouton
      buttonSubmit: '𞤐𞤫𞤤𞤣𞤵 𞤣𞤫𞤱𞤼𞤢𞤲𞤣𞤫 𞤲𞤣𞤫𞤲  ', // Nabu nulal ngal (Envoyer le commentaire)
      buttonLoading: '𞤊𞤫𞤣𞥆𞤫 𞤱𞤮𞤲𞤭...', // Feɗɗe woni (Envoi...)
    },
    // ...

    about: {
      smallTitle: '𞤑𞤫𞤪𞤫𞥅𞤶𞤫', // Traduction : Notre Histoire
      largeTitle: '  𞤆𞤌𞤚𞥆𞤀𞤂-𞤐𞤓𞤐𞤍𞤀𞤂-𞤏𞤀𞤑𞥆𞤋𞤂𞤀𞥄𞤈𞤉 ', // Traduction : Qui Sommes-Nous ? Découvrez l'Association.
      paragraph1:
        '𞤋𞤲𞤣𞤫 𞤲𞤣𞤫𞤲 𞤳𞤮: 𞤑𞤉𞤈𞤉𞥅𞤔𞤉.\n𞤍𞤫𞤥𞤺𞤢𞤤 𞤲𞤺𞤢𞤤 𞤳𞤮: 𞤆𞤓𞤂𞤀𞤈.\n𞤄𞤭𞤲𞤣𞤮𞤤 𞤲𞤺𞤮𞤤 𞤳𞤮: 𞤀𞤁𞤂𞤀𞤃.\n𞤃𞤮𞤶𞤮𞤦𞤫𞤪𞤫 𞤑𞤉𞤈𞤉𞥅𞤔𞤉 𞤳𞤮: 𞤊𞤭𞥅 𞤳𞤢𞤤𞤢 𞤸𞤢𞥄𞤤𞤢𞤴𞤯𞤮 𞤨𞤵𞤤𞤢𞤪.\n𞤑𞤫𞤪𞤫𞥅𞤶𞤫 𞤧𞤭𞤲𞤷𞤢𞤲𞤮 𞤭𞤤𞤢 𞤳𞤢 𞤸𞤭𞤼𞤢𞥄𞤲𞤣𞤫 𞥑𞥕 𞤅𞤭𞥅𞤤𞤮 𞥒𞥐𞥑𞥙.', // Traduction : L'association a été fondée dans le but de...
      paragraph2:
        '𞤑𞤫𞤪𞤫𞥅𞤶𞤫 𞤳𞤮 𞤃𞤮𞤶𞤮𞤦𞤫𞤪𞤫 𞤱𞤭𞤣𞤢𞤴𞤲𞤣𞤫 𞤶𞤢𞤲𞥆𞤢, 𞤫𞤤𞤼𞤢 𞤧𞤢𞥄𞤼𞤮𞥅𞤩𞤫 𞤫 𞤶𞤢𞤲𞥆𞤮𞥅𞤩𞤫, 𞤪𞤫𞤪𞤯𞤭𞤲𞤢, 𞤧𞤵𞥅𞤧𞤭𞤲𞤢, 𞤬𞤭𞤲𞤣𞤭𞤲𞤢, 𞤴𞤮𞤲𞤯𞤭𞤲𞤢 𞤪𞤫𞤲𞤣𞤮 𞤥𞤵𞥅𞤯𞤵𞤲 𞤲𞤺𞤮𞤲. 𞤅𞤭𞤲𞤷𞤢𞤴𞤲𞤣𞤫 𞤺𞤮𞤤𞥆𞤭𞤪𞤯𞤭, 𞤴𞤮𞤲𞤯𞤵𞤲𞥋𞤣𞤫, 𞤬𞤮𞤺𞤮-𞤥𞤢𞤴𞤪𞤫.', // Traduction : Notre mission principale est d'assurer...
      paragraph3:
        '𞤑𞤫𞤪𞤫𞥅𞤶𞤫 𞤳𞤮 𞤥𞤮𞤶𞤮𞤦𞤫𞤪𞤫 𞤊𞤵𞥅𞤼𞤢𞤲𞤳𞤮𞥅𞤩𞤫, 𞤭𞤤𞤢 𞤊𞤵𞤯𞤲𞤢𞥄𞤲𞤺𞤫 𞤸𞤢𞥄 𞤖𞤭𞤪𞤲𞤢𞥄𞤲𞤺𞤫, 𞤙𞤢𞥄𞤥𞤲𞤢𞥄𞤲𞤺𞤫 𞤸𞤢𞥄 𞤐𞤢𞤲𞥆𞤢𞥄𞤲𞤺𞤫. 𞤅𞤭𞤲𞤷𞤵𞤩𞤫 𞤑𞤫𞤪𞤫𞥅𞤶𞤫 𞤯𞤫𞤲 𞤲𞤮 𞤢𞤲𞤣𞤭𞤼𞤭𞤪𞤫𞥅 𞤸𞤵𞤪𞤵𞤲𞤣𞤢𞥄𞤪𞤫, 𞤳𞤵𞤪𞤣𞤢𞥄𞤶𞤫 𞤼𞤢𞤼𞤭 𞤯𞤫 𞤳𞤮𞤸𞤫. 𞤖𞤭𞤲𞤮 𞤳𞤢 𞤲𞤣𞤫𞤪 𞤳𞤮𞤸𞤫 𞤼𞤮𞤲 𞤲𞤵𞤪𞤯𞤵 𞤦𞤢𞤳𞤢.', // Traduction : Nous croyons fermement que...
    },
    community: {
      title: ' 𞤊𞤓𞤂𞤇𞤉',
      description:
        '𞤆𞤓𞤂𞥆𞤌: 𞤸𞤵𞤤𞤢𞤼𞤢𞥄⹁𞤬𞤫𞤲𞤢𞤼𞤢𞥄⹁ 𞤬𞤭𞤪𞤼𞤢𞥄 𞤢𞤸𞤣𞤭⹁ 𞤼𞤮𞥅𞤻𞤢𞤼𞤢𞥄⹁ 𞤶𞤢𞤲𞤬𞤮𞤼𞤢𞥄𞤳𞤮⹁ 𞤱𞤵𞤶𞥆𞤢𞥄𞤼𞤢⹁ 𞤼𞤢𞤰𞤢𞤼𞤢𞥄 𞤫𞤲𞤯𞤢𞤲.',
      button: '𞤚𞤭𞤲𞤵',
    },
    articlesSection: {
      title: '𞤑𞤵𞤯𞤮𞤤 ',
      readMoreButton: '𞤚𞤭𞤲𞤵',
      viewAllButton: '𞤚𞤭𞤲𞤵',
    },
    allArticlesPage: {
      heroTitle: '𞤑𞤵𞤯𞤮𞤤 𞤥𞤢𞤱𞤯𞤫',
      heroSubtitle: '𞤁𞤢𞤳𞤳𞤫𞤪𞤢𞤤𞤢 𞤫 𞤥𞤢𞤤𞤢𞤥 𞤲𞤮𞤲 𞤲𞤮𞤲 𞤳𞤮 𞤶𞤢𞤦𞤭',
      backButton: '𞤑𞤮𞤤𞥆𞤮',
    },
    auth: {
      register: {
        signUp: '𞤖𞤫𞤼𞥆𞤵𞤣𞤫',
        nameLabel: '𞤋𞤲𞤣𞤫 𞤫 𞤴𞤮𞤼𞥆𞤮𞥅𞤪𞤫 ',
        emailLabel: '𞤐𞤭𞤤𞤼𞤭𞤧𞤵',
        passwordLabel: '𞤚𞤮𞤲𞤺𞤭𞤪𞤣𞤫',
        confirmPasswordLabel: ' 𞤔𞤢𞤩𞤵𞤺𞤮𞤤 𞤼𞤮𞤲𞤺𞤭𞤪𞤣𞤫 𞤸𞤫𞤧𞤫𞤪𞤫 ',
        signUpButton: '𞤖𞤫𞤼𞥆𞤵𞤣𞤫',
        hasAccount: '𞤑𞤮𞤲𞥆𞤫 𞤭𞤲𞥆𞤢𞥄𞤥𞤢?',
        signInHere: '𞤖𞤢𞤤𞤢𞤴 𞤶𞤢𞤦𞤭𞤼𞤫',
        passwordMismatchError: '𞤃𞤮𞤼𞥆𞤢𞤳𞤢𞥄𞤯𞤭 𞤯𞤭𞤯𞤭 𞤥𞤢𞥄 𞤳𞤮𞤥𞥆𞤭',
        registrationError: '𞤕𞤢𞥄𞤱𞤲𞤭 𞤫 𞤸𞤫𞤼𞥆𞤵𞤺𞤮𞤤.',
        loadingButton: '𞤘𞤮𞤤𞥆𞤮 𞤫 𞤸𞤫𞤼𞥆𞤵𞤺𞤮𞤤...',
      },
      login: {
        signIn: '𞤘𞤮𞤤𞥆𞤮 𞤫 𞤸𞤫𞤼𞥆𞤵𞤺𞤮𞤤',
        emailLabel: '𞤐𞤭𞤤𞤼𞤭𞤧𞤵',
        emailPlaceholder: '𞤉𞤥𞤢𞤭𞤤 𞤥𞤢𞤳𞥆𞤮',
        passwordLabel: '𞤚𞤮𞤲𞤺𞤭𞤪𞤣𞤫',
        passwordPlaceholder: '𞤃𞤮𞤼𞥆𞤢𞤳𞤢𞥄𞤣𞤭 𞤥𞤢𞤳𞥆𞤮',
        signInButton: '𞤘𞤮𞤤𞥆𞤮',
        loadingButton: '𞤘𞤮𞤤𞥆𞤮 𞤫 𞤸𞤫𞤼𞥆𞤵𞤺𞤮𞤤...',
        noAccount: '𞤃𞤢𞥄 𞤳𞤮𞤲𞥆𞤫 𞤭𞤲𞥆𞤢𞥄𞤥𞤢𞥄?',
        signUpHere: '𞤖𞤫𞤼𞥆𞤵𞤣𞤫',
        authError: '𞤕𞤢𞥄𞤱𞤲𞤭 𞤫 𞤸𞤫𞤼𞥆𞤵𞤺𞤮𞤤.',
      },
    },
    userProfile: {
      unauthorizedMessage: '𞤕𞤢𞥄𞤱𞤲𞤭 𞤫 𞤸𞤫𞤼𞥆𞤵𞤺𞤮𞤤.',
      dashboardTitle: '𞤖𞤢𞥄𞤼𞤭𞤥𞤫𞤪𞤫 𞤧𞤫𞤪𞤢𞥄𞤪𞤫 ',
      myInfo: '𞤅𞤭𞤬𞤢𞥄𞤶𞤭 𞤢𞤥 ',
      createArticle: '𞤅𞤭𞤲𞤷𞤵𞤺𞤮𞤤 𞤳𞤵𞤯𞤮𞤤',
      listArticles: '𞤕𞤭𞤪𞤼𞤮𞤤 𞤳𞤵𞤯𞤭',
      allUser: '𞤕𞤭𞤪𞤼𞤮𞤤 𞤸𞤵𞥅𞤼𞤮𞤪𞤢𞤴𞤩𞤫',
      logout: '𞤅𞤮𞤯𞤼𞤢𞤲𞤣𞤫',
      updateProfileTitle: '𞤖𞤫𞥅𞤯𞤭𞤲𞤼𞤭𞤲 𞤧𞤫𞥅𞤺𞤮',
      passwordMismatchError: '𞤃𞤮𞤼𞥆𞤢𞤳𞤢𞥄𞤯𞤭 𞤯𞤭𞤯𞤭 𞤥𞤢𞥄 𞤳𞤮𞤥𞥆𞤭.',
      successMessage: '𞤘𞤮𞤤𞥆𞤮 𞤫 𞤸𞤫𞤼𞥆𞤵𞤺𞤮𞤤.',
      errorMessage: '𞤕𞤢𞥄𞤱𞤲𞤭 𞤫 𞤸𞤫𞤼𞥆𞤵𞤺𞤮𞤤.',
      networkError: '𞤕𞤢𞥄𞤱𞤲𞤭 𞤫 𞤸𞤫𞤼𞥆𞤵𞤺𞤮𞤤.',
      nameLabel: '𞤋𞤲𞤣𞤫 𞤫 𞤴𞤮𞤼𞥆𞤮𞥅𞤪𞤫 ',
      emailLabel: '𞤐𞤭𞤤𞤼𞤭𞤧𞤵 ',
      changePasswordTitle: '𞤏𞤢𞤴𞤤𞤵𞤺𞤮𞤤 𞤼𞤮𞤲𞤺𞤭𞤪𞤣𞤫',
      newPasswordLabel: '𞤚𞤮𞤲𞤺𞤭𞤪𞤣𞤫 𞤸𞤫𞤧𞤫𞤪𞤫 ',
      confirmPasswordLabel: '𞤔𞤢𞤩𞤵𞤺𞤮𞤤 𞤼𞤮𞤲𞤺𞤭𞤪𞤣𞤫 𞤸𞤫𞤧𞤫𞤪𞤫  ',
      updatingButton: '𞤘𞤮𞤤𝥆𞤮 𞤫 𞤸𞤫𞤼𞥆𞤵𞤺𞤮𞤤...',
      updateButton: ' 𞤖𞤫𞥅𞤯𞤭𞤲𞤼𞤭𞤲 𞤧𞤫𞥅𞤺𞤮 ',
    },
  },
  en: {
    hero: {
      title: 'Denderla Sonre Ublaande',
      description:
        'Discover our association and join our noble mission to promote Adlam culture.',
      button: 'Read more',
    },
    header: {
      menu: [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/a-propos' },
        { name: 'Initiation', href: '/initiation' },
        { name: 'History', href: '#' },
        { name: 'Articles', href: '/all-articles' },
        // { name: 'Contact', href: '#' },
      ],
      languageLabel: 'Language',
      signUp: 'Sign Up',
      signIn: 'Sign In',
      profile: 'My profile',
      logouHead: 'Logout',
    },
    offerings: {
      title: 'What we offer',
      services: [
        {
          title: 'Introduction to writing',
          description:
            'Interactive workshops to learn to read and write in Adlam, adapted to all levels.',
        },
        {
          title: 'Language courses',
          description:
            'Comprehensive courses to master the grammar, vocabulary and pronunciation of the Adlam language.',
        },
        {
          title: 'Cultural courses',
          description:
            'A rich exploration of the history, traditions, music and art of the Fulani culture.',
        },
        {
          title: 'Research support',
          description:
            'Provision of documentary resources, archives and access to experts for researchers.',
        },
      ],
    },
    history: {
      title: 'History',
      description:
        'Discover how the Adlam alphabet was born to preserve and modernize the Fulani language. Created by two Guinean brothers in 1989, it enabled the transcription of Fulani, which was traditionally an oral language, for the first time. Our association is committed to perpetuating this heritage by teaching and promoting the use of this unique alphabet. Join us to protect this cultural and linguistic richness.',
      button: 'Read more',
      alphabet: [
        '𞤀',
        '',
        '𞤂',
        '',
        '𞤆',
        '',
        '',
        '𞤉',
        '𞤊',
        '𞤋',
        '𞤌',
        '𞤍',
        '𞤎',
        '𞤏',
        '𞤐',
        '𞤑',
        '𞤒',
        '𞤓',
      ],
    },
    historicDetails: {
      backButton: 'Back',
      title: 'The full history of the Adlam alphabet',
      intro:
        'The Adlam alphabet is not just a writing system, it is a revolution for the Fulani language. Its history is one of two visionary brothers, determination and recognition of a thousand-year-old heritage.',
      section1: {
        heading: 'The Barry brothers: A vision for the future',
        text: 'The creation of Adlam is the work of two young Guinean brothers, Ibrahima and Abdoulaye Barry, who, in the 1980s, felt the need to preserve their mother tongue, Fulfulde, from oblivion. As there was no universal writing system for the language, they undertook the colossal task of designing a complete alphabet, from phonetics to typography, to enable the Fulani people to read and write in their own language.',
      },
      section2: {
        text: 'After years of hard work, they finalized their alphabet. The name Adlam is an acronym for its introductory phrase in Fulani: "Alkulama lesli dimma naajum" (the alphabet protects the people from oppression). This alphabet has since been adopted by the community and used for literacy, literature, and digital communication. It is today a source of pride for the Fulani people, symbolizing cultural autonomy and resilience in the face of linguistic colonization.',
      },
    },
    communityDetails: {
      backButton: 'Back',
      title: 'The Fulani community',
      intro:
        'The Fulani people, also known as Fulani, are one of the largest and most widespread ethnic groups in Africa. Located mainly in the Sahel region and in West Africa, they are renowned for their rich nomadic history and their distinct culture, centered on livestock farming. They are known for their resilience, their musical and poetic traditions, and their deep commitment to their customs and their language, Fulfulde. This community has played a key role in the history of the region, including through the spread of Islam and the creation of major empires.',
      section1: {
        heading: 'Cultural richness and traditions',
        text: 'Fulani culture is a mosaic of oral traditions, music, poetry and crafts. The Fulani griots, or "gawlo", are the guardians of history, transmitting epics and ancestral lineages from generation to generation. Music, often accompanied by the "hoddu" string instrument, and dance are central elements of ceremonies and celebrations. The complex patterns and vibrant colors of their traditional clothing reflect the identity and social status of the individual.',
      },
      section2: {
        text: 'Beyond their traditions, the Fulani are important players in the social and economic development of the region. They actively contribute to the local economy through their livestock activities and their participation in trade. Learning the Adlam alphabet is an additional step to strengthening this community by giving it the tools to preserve its history and culture in the digital age, while promoting literacy and communication across borders.',
      },
    },
    initiation: {
      title: 'A journey of discovery',
      description:
        'Immerse yourself in the fundamentals of Fulani culture and begin your learning journey.',
      tiles: [
        {
          title: 'Cultural discussion',
          svg: 'lucide-message-circle',
        },
        {
          title: 'Upcoming events',
          svg: 'lucide-calendar',
        },
        {
          title: 'Activities and workshops',
          svg: 'lucide-calendar-check',
        },
        {
          title: 'Digital resources',
          svg: 'lucide-grid',
        },
      ],
      button: 'Read more',
    },

    commentForm: {
      // Unauthenticated state
      loginRequiredTitle: 'Login Required',
      loginRequiredMessage: 'Please ',
      loginLinkText: 'log in',
      loginRequiredMessageEnd: ' to leave a comment.',

      // Submission form
      label: 'Write your comment:',
      placeholder: 'Your comment...',

      // Status Messages
      errorEmpty: 'Comment cannot be empty.',
      errorAuthMissing: 'Authentication error: token missing.',
      errorApi: 'Error submitting comment.',
      errorConnection: 'Server connection failed.',
      success: 'Comment successfully submitted!',

      // Button
      buttonSubmit: 'Submit Comment',
      buttonLoading: 'Sending...',
    },
    // ...

    about: {
      smallTitle: 'Our History',
      largeTitle: 'Who Are We? Discover the Association.',
      paragraph1: 'The association was founded with the aim of...',
      paragraph2: 'Our main mission is to ensure...',
      paragraph3: 'We strongly believe that...',
    },

    initiationPage: {
      heroTitle: 'Initiation to Adlam culture',
      heroDescription:
        'A journey of discovery of the foundations of Fulani culture and the Adlam alphabet.',
      sections: [
        {
          title: 'Cultural discussion',
          description:
            'Join our lively discussions to delve into the heart of the traditions, history and challenges of the Fulani community.',
        },
        {
          title: 'Upcoming events',
          description:
            "Keep an eye on our calendar so you don't miss any of our events, workshops and conferences.",
        },
        {
          title: 'Activities and workshops',
          description:
            'Participate in our practical workshops to learn Adlam writing, traditional music and Fulani crafts.',
        },
        {
          title: 'Digital resources',
          description:
            'Access a library of online resources, including books, videos and learning tools for the Adlam language.',
        },
      ],
      numbers: {
        title: 'Numbers',
        list: [
          { number: '0', adlam: '𞥐', audio: '/audios/0.ogg' },
          { number: '1', adlam: '𞥑', audio: '/audios/1.ogg' },
          { number: '2', adlam: '𞥒', audio: '/audios/2.ogg' },
          { number: '3', adlam: '𞥓', audio: '/audios/3.ogg' },
          { number: '4', adlam: '𞥔', audio: '/audios/4.ogg' },
          { number: '5', adlam: '𞥕', audio: '/audios/5.ogg' },
          { number: '6', adlam: '𞥖', audio: '/audios/6.ogg' },
          { number: '7', adlam: '𞥗', audio: '/audios/7.ogg' },
          { number: '8', adlam: '𞥘', audio: '/audios/8.ogg' },
          { number: '9', adlam: '𞥙', audio: '/audios/9.ogg' },
        ],
      },
      alphabet: {
        title: 'Learn the alphabet',
        list: [
          { letter: 'A', adlam: '𞤀', audio: '/audios/L1.ogg' },
          { letter: 'B', adlam: '𞤁', audio: '/audios/L2.ogg' },
          { letter: 'Ɓ', adlam: '𞤂', audio: '/audios/L3.ogg' },
          { letter: 'C', adlam: '𞤃', audio: '/audios/L4.ogg' },
          { letter: 'D', adlam: '𞤄', audio: '/audios/L5.ogg' },
          { letter: 'Ɗ', adlam: '𞤅', audio: '/audios/L6.ogg' },
          { letter: 'E', adlam: '𞤆', audio: '/audios/L7.ogg' },
          { letter: 'F', adlam: '𞤇', audio: '/audios/L8.ogg' },
          { letter: 'G', adlam: '𞤈', audio: '/audios/L9.ogg' },
          { letter: 'H', adlam: '𞤉', audio: '/audios/L10.ogg' },
          { letter: 'I', adlam: '𞤊', audio: '/audios/L11.ogg' },
          { letter: 'J', adlam: '𞤋', audio: '/audios/L12.ogg' },
          { letter: 'K', adlam: '𞤌', audio: '/audios/L13.ogg' },
          { letter: 'L', adlam: '𞤍', audio: '/audios/L14.ogg' },
          { letter: 'M', adlam: '𞤎', audio: '/audios/L15.ogg' },
          { letter: 'N', adlam: '𞤏', audio: '/audios/L16.ogg' },
          { letter: 'Ñ', adlam: '𞤐', audio: '/audios/L17.ogg' },
          { letter: 'O', adlam: '𞤑', audio: '/audios/L18.ogg' },
          { letter: 'P', adlam: '𞤒', audio: '/audios/L19.ogg' },
          { letter: 'Q', adlam: '𞤓', audio: '/audios/L20.ogg' },
          { letter: 'R', adlam: '𞤔', audio: '/audios/L21.ogg' },
          { letter: 'S', adlam: '𞤕', audio: '/audios/L22.ogg' },
          { letter: 'T', adlam: '𞤖', audio: '/audios/L23.ogg' },
          { letter: 'U', adlam: '𞤗', audio: '/audios/L24.ogg' },
          { letter: 'W', adlam: '𞤘', audio: '/audios/L25.ogg' },
          { letter: 'X', adlam: '𞤙', audio: '/audios/L26.ogg' },
          { letter: 'Y', adlam: '𞤚', audio: '/audios/L27.ogg' },
          { letter: 'Z', adlam: '𞤛', audio: '/audios/L28.ogg' },
        ],
      },
    },

    commentsList: {
      // Empty list
      none: 'Be the first to comment on this article!',

      // Admin Deletion (CommentItem)
      confirmDelete: 'Are you sure you want to delete this comment?',
      deleteError: 'Error during deletion:',
      deleteConnectionError: 'Server connection error during deletion.',
      deleteButtonTitle: 'Delete this comment',

      // Date/Locale
      dateLocale: 'en-US',
    },
    // ...

    contactForm: {
      // Left Section (Description)
      title: 'Contact Us',
      descriptionLine1:
        'If you have any questions, suggestions, or want to report a bug, please feel free to contact us. We are here to help and appreciate your feedback.',
      descriptionLine2:
        'You can also reach us via the social media links below.',

      // Form
      labelName: 'Full Name',
      labelTel: 'Phone Number',
      labelEmail: 'Email Address',
      labelMessage: 'Your Message',
      buttonSubmit: 'Send Message',
    },
    community: {
      title: 'The Fulani community',
      description:
        'The Fulani people, also known as Fulani, are one of the largest and most widespread ethnic groups in Africa. Located mainly in the Sahel region and in West Africa, they are renowned for their rich nomadic history and their distinct culture, centered on livestock farming. They are known for their resilience, their musical and poetic traditions, and their deep commitment to their customs and their language, Fulfulde. This community has played a key role in the history of the region, including through the spread of Islam and the creation of major empires.',
      button: 'Read more',
    },
    articlesSection: {
      title: 'Our articles',
      readMoreButton: 'Read more',
      viewAllButton: 'View all articles',
    },
    allArticlesPage: {
      heroTitle: 'All articles',
      heroSubtitle: 'Discover our entire collection of articles.',
      backButton: 'Back',
    },
    auth: {
      register: {
        signUp: 'Sign Up',
        nameLabel: 'Full name',
        emailLabel: 'Email',
        passwordLabel: 'Password',
        confirmPasswordLabel: 'Confirm password',
        signUpButton: 'Sign Up',
        hasAccount: 'Do you already have an account ?',
        signInHere: 'Login here',
        passwordMismatchError: 'Passwords do not match.',
        registrationError: 'Error during registration.',
        loadingButton: 'Registration in progress...',
      },
      login: {
        signIn: 'Log in',
        emailLabel: 'Email',
        emailPlaceholder: 'Your email',
        passwordLabel: 'Password',
        passwordPlaceholder: 'Your password',
        signInButton: 'Log in',
        loadingButton: 'Login in progress...',
        noAccount: 'No account ?',
        signUpHere: 'Sign up here',
        authError: 'Authentication error.',
      },
    },
    userProfile: {
      unauthorizedMessage: 'Please log in to see this page.',
      dashboardTitle: 'Dashboard',
      myInfo: 'My information',
      createArticle: 'Create article',
      listArticles: 'All articles',
      allUser: 'All users',
      logout: 'Log out',
      updateProfileTitle: 'Update my profile',
      passwordMismatchError: 'Passwords do not match.',
      successMessage: 'Profile updated successfully.',
      errorMessage: 'Profile update failed.',
      networkError: 'A network error has occurred. Please try again.',
      nameLabel: 'Last name and first name',
      emailLabel: 'Email address',
      changePasswordTitle: 'Change password (optional)',
      newPasswordLabel: 'New password',
      confirmPasswordLabel: 'Confirm new password',
      updatingButton: 'Update...',
      updateButton: 'Update profile',
    },
  },
}

export const LanguageProvider = ({ children }) => {
  // Définir la langue par défaut et la direction du texte
  const [selectedLanguage, setSelectedLanguage] = useState('adlam') // J'ai changé 'adlam' en 'fr' pour que le site s'affiche en français par défaut.
  const [textDirection, setTextDirection] = useState('ltr') // Mettre à jour la direction du texte en fonction de la langue sélectionnée

  useEffect(() => {
    if (selectedLanguage === 'adlam') {
      setTextDirection('rtl')
    } else {
      setTextDirection('ltr')
    }
  }, [selectedLanguage])

  const value = {
    selectedLanguage,
    setSelectedLanguage,
    translations,
    textDirection,
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}
