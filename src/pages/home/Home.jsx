import { useState, useEffect } from 'react'
import SpinnerSVG from '../../components/spinnersvg/SpinnerSVG'
import Header from '../../components/header/Header'
import Article from '../../components/article/Article'
import './Home.css'
import { useParams } from 'react-router-dom'

export default function Home() {
  let { articleId } = useParams()

  if (articleId) {
    const [article, setArticle] = useState(null) // Inicializa com null

    useEffect(() => {
      fetch(`https://api.4cnews.fun/article/${articleId}`)
        .then(resp => resp.json())
        .then(data => setArticle(data))
    }, [articleId]) // Adiciona articleId como uma dependência do useEffect

    return (
      article
      ? (
        <div className="home-content">
          <header>
            <Header />
          </header>
          <main>
            <Article key={article.id} article={article} /> 
          </main>
        </div>
      )
      : <SpinnerSVG width={64} />  
    )
  } else {
    const [articles, setArticles] = useState([])

    useEffect(() => {
      fetch(`https://api.4cnews.fun/articles/loadall/${import.meta.env.VITE_SECRET}`)
        .then(resp => resp.json())
        .then(data => setArticles(data))
    }, [])

    return (
      <div className="home-content">
        <header>
          <Header />
        </header>
        <main>
          {articles.map(article => <Article key={article.id} article={article} />)}
        </main>
      </div>
    )
  }
}
