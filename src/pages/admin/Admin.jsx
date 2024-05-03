import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { ConvertMediaToBase64 } from '../../utils/ConvertFileToBase64'
import { Link } from 'react-router-dom'
import SpinnerSVG from '../../components/spinnersvg/SpinnerSVG'
import { CleanTitle } from '../../utils/CleanTitle'
import './Admin.css'

export default function Admin() {
  let { auth } = useParams()
  
  if (auth === import.meta.env.VITE_SECRET) {
    const [title, setTitle] = useState('')
    const [mediaType, setMediaType] = useState('')
    const [mediaB64, setMediaB64] = useState('')
    const [paragraph, setParagraph] = useState('')
    const [author, setAuthor] = useState('')
    const [response, setReponse] = useState(null)
    const [submitted, setSubmitted] = useState(false)

    const handleFormSubmit = (e) => {
      e.preventDefault()
      
      fetch('https://api.4cnews.fun/article/create', {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          title: title,
          media: [mediaType, mediaB64],
          paragraph: paragraph,
          author: author,
          auth: import.meta.env.VITE_SECRET
        })
      })
        .then(resp => resp.text())
        .then(data => setReponse(data))
    }

    return (
      <div className="admin-content">
        <form onSubmit={handleFormSubmit}>
          <div>
            <h1 style={{ fontFamily: 'Helvetica', fontWeight: 'lighter' }}>CRIAR NOTÍCIA</h1>
            <span style={{ color: 'red', fontSize: 12 }}>Aviso: Tome cuidado com o que será publicado, nós <br />não queremos nenhum problema na justiça!</span>
          </div>

          {/* ---------------------------------------------- */}

          <div className="questions">
            <label>
              TÍTULO DA NOTÍCIA
              <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Digite o título desejado..."
                required
              />
            </label>

            <label>
              QUAL É O TIPO DE MÍDIA?
              <select onChange={(e) => setMediaType(e.target.value)} required>
                <option>Escolha o tipo de mídia...</option>
                <option value="video">Video</option>
                <option value="image">Imagem</option>
              </select>
            </label>

            {mediaType && (
              mediaType === 'video'
              ? <label>
                SELECIONE O VÍDEO DESEJADO
                <input
                  type="file"
                  accept="video/mp4"
                  onChange={async (e) => {
                    const b64 = await ConvertMediaToBase64(e.target.files[0])
                    setMediaB64(b64)
                    // console.log(b64)
                  }}
                  required
                />
              </label>
              : <label>
                SELECIONE A IMAGEM DESEJADA
                <input 
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const b64 = await ConvertMediaToBase64(e.target.files[0])
                    setMediaB64(b64)
                    // console.log(b64)
                  }}
                  required
                />
              </label>
            )}
            
            <label>
              ESCREVA UM PARÁGRAFO
              <textarea
                style={{ padding: 10, fontSize: 16 }}
                rows={6}
                placeholder="Digite aqui um parágrafo para seu artigo..."
                onChange={(e) => setParagraph(e.target.value)}
                required
              ></textarea>
            </label>

            <label>
              POR FIM, QUAL SEU NOME?
              <input
                type="text"
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Aqui seu nome..."
                required
              />
            </label>
           {/* ------------------------------------------------------ */}
          </div>

          <button
            type="submit"
            style={{ fontSize: 16, padding: 10, cursor: 'pointer', width: 150, placeSelf: 'center' }}
            onClick={() => setSubmitted(true)}
          >ENVIAR</button>

          {submitted && (
            response ? <Link to={`/noticia/${CleanTitle(title)}`}>{CleanTitle(title)}</Link>
            : <SpinnerSVG width={32} />
          )}
        </form>
      </div>
    )
  } else return (
    <div className="admin-403-content">
      <h1>Erro: <span>403</span></h1>
      <h2>Você NÃO tem permissão para fazer isso.</h2>
      <span>‼️‼️‼️</span>
    </div>
  )
}
