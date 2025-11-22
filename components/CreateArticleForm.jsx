import React, { useState, useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import { useAuth } from '../src/providers/AuthProvider'
import { useLanguage } from '../src/providers/LanguageProvider'

// === EXTENSION IMAGE REDIMENSIONNABLE ===
const ResizableImage = Image.extend({
  name: 'image',

  addAttributes() {
    return {
      ...this.parent?.(),
      width: { default: null },
      height: { default: null },
    }
  },

  addNodeView() {
    return ({ node, updateAttributes, editor }) => {
      const img = document.createElement('img')
      img.src = node.attrs.src
      img.style.maxWidth = '500px'
      img.style.height = 'auto'
      img.style.cursor = 'default'
      img.style.display = 'block'
      img.style.margin = '1rem auto'
      img.className = 'rounded-lg shadow-sm'

      if (node.attrs.width) {
        img.style.width = `${node.attrs.width}px`
      }

      const wrapper = document.createElement('div')
      wrapper.style.display = 'inline-block'
      wrapper.style.position = 'relative'
      wrapper.style.margin = '0.5rem 0'
      wrapper.appendChild(img)

      const resizer = document.createElement('div')
      resizer.style.position = 'absolute'
      resizer.style.bottom = '0'
      resizer.style.right = '0'
      resizer.style.width = '16px'
      resizer.style.height = '16px'
      resizer.style.background = '#2c3159'
      resizer.style.borderRadius = '4px'
      resizer.style.cursor = 'se-resize'
      resizer.style.opacity = '0'
      resizer.style.transition = 'opacity 0.2s'
      resizer.title = 'Redimensionner'
      wrapper.appendChild(resizer)

      let isResizing = false
      let startX, startWidth

      const startResize = (e) => {
        if (!editor.isEditable) return
        e.preventDefault()
        e.stopPropagation()
        isResizing = true
        startX = e.clientX
        startWidth = img.offsetWidth
        document.addEventListener('mousemove', resize)
        document.addEventListener('mouseup', stopResize)
      }

      const resize = (e) => {
        if (!isResizing) return
        const diff = e.clientX - startX
        const newWidth = Math.max(100, Math.min(700, startWidth + diff))
        img.style.width = `${newWidth}px`
      }

      const stopResize = () => {
        if (!isResizing) return
        isResizing = false
        const finalWidth = img.offsetWidth
        updateAttributes({ width: finalWidth })
        document.removeEventListener('mousemove', resize)
        document.removeEventListener('mouseup', stopResize)
      }

      resizer.addEventListener('mousedown', startResize)

      wrapper.addEventListener('mouseenter', () => {
        if (editor.isEditable) resizer.style.opacity = '1'
      })
      wrapper.addEventListener('mouseleave', () => {
        if (!isResizing) resizer.style.opacity = '0'
      })

      return {
        dom: wrapper,
        update: (updatedNode) => {
          if (updatedNode.attrs.src !== node.attrs.src) {
            img.src = updatedNode.attrs.src
          }
          if (updatedNode.attrs.width) {
            img.style.width = `${updatedNode.attrs.width}px`
          }
          return true
        },
      }
    }
  },
})

// === NETTOYAGE ET RE-UPLOAD DES IMAGES BLOB ===
const cleanAndReuploadImages = async (html, token, editor) => {
  if (!html) return ''

  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  const allImgs = doc.querySelectorAll('img')

  for (const img of allImgs) {
    const src = img.getAttribute('src')

    // Si c'est une URL blob, la supprimer ou la remplacer
    if (src && src.startsWith('blob:')) {
      console.warn('Image blob détectée et supprimée:', src)
      img.remove() // Supprimer l'image blob car elle est invalide
    }
  }

  return doc.body.innerHTML
}

// === COMPOSANT ÉDITEUR ===
const RichTextEditor = ({ content, onUpdate, label, isEditMode = false }) => {
  const { token } = useAuth()
  const [isInitialized, setIsInitialized] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      ResizableImage.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: { class: 'max-w-full h-auto rounded-lg' },
      }),
    ],
    content: '', // Vide au départ
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      onUpdate(html)
    },
    editorProps: {
      attributes: {
        class:
          'prose prose-sm max-w-none min-h-32 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring focus:ring-[#2c3159] focus:ring-opacity-50',
      },
    },
  })

  // === INITIALISATION DU CONTENU (UNE SEULE FOIS) ===
  useEffect(() => {
    if (editor && !isInitialized) {
      if (content) {
        // Nettoyer le contenu avant de le charger
        cleanAndReuploadImages(content, token, editor).then((cleanHtml) => {
          editor.commands.setContent(cleanHtml, false)
          setIsInitialized(true)
        })
      } else {
        setIsInitialized(true)
      }
    }
  }, [editor, content, token, isInitialized])

  const addImageFromPC = async () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = async (e) => {
      const file = e.target.files[0]
      if (!file || !editor) return

      try {
        // Upload immédiat sans passer par blob
        const formData = new FormData()
        formData.append('image', file)

        // Afficher un loader
        const loadingImg =
          'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyNSIgY3k9IjI1IiByPSIyMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMmMzMTU5IiBzdHJva2Utd2lkdGg9IjQiPjxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InN0cm9rZS1kYXNoYXJyYXkiIGR1cj0iMnMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiB2YWx1ZXM9IjAgMTI1OzEyNSAwIi8+PC9jaXJjbGU+PC9zdmc+'
        editor.chain().focus().setImage({ src: loadingImg }).run()

        const uploadResponse = await fetch(
          'https://adlambackend-production.up.railway.app/api/upload',
          {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
          }
        )

        const result = await uploadResponse.json()
        if (!uploadResponse.ok)
          throw new Error(result.message || "Erreur d'upload")

        const finalUrl = result.imageUrl

        // Remplacer le loader par l'image finale
        const currentContent = editor.getHTML()
        const updatedContent = currentContent.replace(loadingImg, finalUrl)
        editor.commands.setContent(updatedContent, false)
      } catch (error) {
        alert('Erreur upload : ' + error.message)
        // Supprimer l'image en cas d'erreur
        editor.chain().focus().deleteSelection().run()
      }
    }
    input.click()
  }

  if (!editor) return null

  return (
    <div>
      <label className='block text-sm font-medium text-gray-700 mb-1'>
        {label}
      </label>
      <div className='border border-gray-300 rounded-xl overflow-hidden'>
        <div className='bg-gray-50 p-2 border-b border-gray-300 flex gap-1 flex-wrap'>
          <button
            type='button'
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 rounded transition ${
              editor.isActive('bold')
                ? 'bg-[#2c3159] text-white'
                : 'bg-white hover:bg-gray-100'
            }`}
          >
            <strong>B</strong>
          </button>
          <button
            type='button'
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 rounded transition ${
              editor.isActive('italic')
                ? 'bg-[#2c3159] text-white'
                : 'bg-white hover:bg-gray-100'
            }`}
          >
            <em>I</em>
          </button>
          <button
            type='button'
            onClick={addImageFromPC}
            className='p-2 rounded bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-1'
          >
            📷 Image
          </button>
        </div>
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}

// === FORMULAIRE PRINCIPAL (CRÉATION + MODIFICATION) ===
const CreateArticleForm = ({ article }) => {
  const { token } = useAuth()
  const { translations, selectedLanguage } = useLanguage()

  const isEditMode = !!article

  const [titleAdlam, setTitleAdlam] = useState(article?.title_adlam || '')
  const [titleFrench, setTitleFrench] = useState(article?.title_french || '')
  const [titleEnglish, setTitleEnglish] = useState(article?.title_english || '')
  const [contentAdlam, setContentAdlam] = useState(article?.content_adlam || '')
  const [contentFrench, setContentFrench] = useState(
    article?.content_french || ''
  )
  const [contentEnglish, setContentEnglish] = useState(
    article?.content_english || ''
  )
  const [coverImage, setCoverImage] = useState(null)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')
    setMessageType('')

    try {
      let coverImageUrl = article?.coverImageUrl || null
      if (coverImage) {
        const formData = new FormData()
        formData.append('image', coverImage)
        const uploadResponse = await fetch(
          'https://adlambackend-production.up.railway.app/api/upload',
          {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
          }
        )
        const uploadResult = await uploadResponse.json()
        if (!uploadResponse.ok)
          throw new Error(uploadResult.message || "Erreur d'upload")
        coverImageUrl = uploadResult.imageUrl
      }

      const articleData = {
        title_adlam: titleAdlam,
        title_french: titleFrench,
        title_english: titleEnglish,
        content_adlam: contentAdlam,
        content_french: contentFrench,
        content_english: contentEnglish,
        coverImageUrl,
      }

      const url = isEditMode
        ? `https://adlambackend-production.up.railway.app/api/articles/${article.id}`
        : 'https://adlambackend-production.up.railway.app/api/articles'

      const method = isEditMode ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(articleData),
      })

      const result = await response.json()
      if (!response.ok) throw new Error(result.message || 'Erreur sauvegarde')

      setMessage(
        isEditMode
          ? 'Article modifié avec succès !'
          : 'Article créé avec succès !'
      )
      setMessageType('success')

      // Recharger la page après 1.5 secondes pour afficher les modifications
      if (isEditMode) {
        setTimeout(() => {
          window.location.reload()
        }, 1500)
      }
    } catch (error) {
      setMessage(error.message || 'Une erreur est survenue.')
      setMessageType('error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='w-full'>
      <form onSubmit={handleSubmit} className='space-y-6'>
        {message && (
          <div
            className={`p-4 rounded-xl font-medium ${
              messageType === 'success'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {message}
          </div>
        )}

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            𞤅𞤫𞤪𞤭𞤲𞤣𞤫 𞤆𞤵𞤢𞤤𞤪
          </label>
          <input
            type='text'
            value={titleAdlam}
            onChange={(e) => setTitleAdlam(e.target.value)}
            required
            className='w-full p-3 rounded-xl border border-gray-300 focus:ring focus:ring-[#2c3159] focus:ring-opacity-50'
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            𞤅𞤫𞤪𞤭𞤲𞤣𞤫 𞤊𞤢𞤪𞤢𞤲𞤧𞤭
          </label>
          <input
            type='text'
            value={titleFrench}
            onChange={(e) => setTitleFrench(e.target.value)}
            required
            className='w-full p-3 rounded-xl border border-gray-300 focus:ring focus:ring-[#2c3159] focus:ring-opacity-50'
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            𞤅𞤫𞤪𞤭𞤲𞤣𞤫 𞤉𞤲𞤺𞤫𞤤𞤫
          </label>
          <input
            type='text'
            value={titleEnglish}
            onChange={(e) => setTitleEnglish(e.target.value)}
            required
            className='w-full p-3 rounded-xl border border-gray-300 focus:ring focus:ring-[#2c3159] focus:ring-opacity-50'
          />
        </div>

        <RichTextEditor
          content={contentAdlam}
          onUpdate={setContentAdlam}
          label='𞤏𞤢𞤯𞤮𞤪𞤢𞤤 𞤆𞤵𞤤𞤢𞤪'
          isEditMode={isEditMode}
        />
        <RichTextEditor
          content={contentFrench}
          onUpdate={setContentFrench}
          label='𞤏𞤢𞤯𞤮𞤪𞤢𞤤 𞤊𞤢𞤪𞤢𞤲𞤧𞤭'
          isEditMode={isEditMode}
        />
        <RichTextEditor
          content={contentEnglish}
          onUpdate={setContentEnglish}
          label='𞤏𞤢𞤯𞤮𞤪𞤢𞤤 𞤉𞤲𞤺𞤫𞤤𞤫'
          isEditMode={isEditMode}
        />

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            𞤐𞤢𞤼𞤢𞤤 𞤦𞤵𞥅𞤥𞤵𞤲𞥋𞤲𞤺𞤢𞤤
          </label>
          {article?.coverImageUrl && !coverImage && (
            <div className='mb-2'>
              <img
                src={article.coverImageUrl}
                alt='Cover actuelle'
                className='w-32 h-32 object-cover rounded-lg'
              />
            </div>
          )}
          <input
            type='file'
            accept='image/*'
            onChange={(e) => setCoverImage(e.target.files[0])}
            className='w-full p-3 rounded-xl border border-gray-300 focus:ring focus:ring-[#2c3159] focus:ring-opacity-50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#2c3159] file:text-white hover:file:bg-[#1a1d35]'
          />
        </div>

        <div className='flex justify-end'>
          <button
            type='submit'
            disabled={isLoading}
            className='bg-[#2c3159] text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {isLoading
              ? 'Sauvegarde en cours...'
              : isEditMode
              ? '𞤅𞤭𞤲𞤷𞤵 𞤯𞤮𞤲𞤳𞤮𞤤'
              : '𞤅𞤭𞤲𞤷𞤵 𞤳𞤵𞤯𞤮𞤤'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateArticleForm
