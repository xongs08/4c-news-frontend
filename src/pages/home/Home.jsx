import { useState, useEffect } from 'react'
import SpinnerSVG from '../../components/spinnersvg/SpinnerSVG'
import Header from '../../components/header/Header'
import Article from '../../components/article/Article'
import './Home.css'
import { useParams } from 'react-router-dom'

export default function Home() {
  let { articleId } = useParams()

  if (articleId) {
    const [article, setArticle] = useState({})

    console.log(articleId)

    useEffect(() => {
      fetch(`https://api.4cnews.fun/article/${articleId}`)
        .then(resp => resp.json())
        .then(data => setArticle(data))
    }, [])

    return (
      article
      ? (
        <div className="home-content">
          <header>
            <Header />
          </header>
          <main>
            <Article article={article} /> 
          </main>
        </div>
      )
      : <SpinnerSVG width={64} />  
    )
  }
  
  const [articles, setArticles] = useState({})

  useEffect(() => {
    fetch(`https://api.4cnews.fun/articles/loadall/${import.meta.env.VITE_SECRET}`)
      .then(resp => resp.json())
      .then(data => setArticles(data))
  }, [])

  const findArticleWithMaxViews = () => {
    if (!Array.isArray(articles) || articles.length === 0) return null

    let maxViews = -1
    let articleWithMaxViews = null

    articles.forEach(article => {
      if (article.views > maxViews) {
        maxViews = article.views
        articleWithMaxViews = article
      }
    })
  
    return articleWithMaxViews
  }
  
  const mostViewedArticle = findArticleWithMaxViews()

  return (
    mostViewedArticle === null
    ? <SpinnerSVG width={64} />
    : (
      <div className="home-content">
        <header>
          <Header />
        </header>
        <main>
          {articles.map(article => (<Article article={article} />))}
        </main>
      </div>
    )
  )
}
