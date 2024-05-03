import { Component } from 'react'
import { Link } from 'react-router-dom'
import './Article.css'

export default class Article extends Component {
  render() {
    const article = this.props.article

    return (
      <div className="article-container">
        <article>
          <h1>{article.title}</h1>
          <Link to={`/noticia/${article.id}`}>{article.id}</Link>
          <br />
          {article.media[0] ? (
            article.media[0] === 'video' ? (
              <video width={250} controls>
                <source src={article.media[1]} type="video/mp4" />
              </video>
            ) : (
              <>
                <img src={article.media[1]} width={250} />
                <br />
                <br />
              </>
            )
          ) : <span>Sem mídia disponível.</span>}
          <p>{article.paragraph}</p>
          <br />
          <span>De: <span id="author">{article.author}</span>, {article.date}</span>
          <br />
          <br />
          <br />
        </article>
      </div>
    )
  }
}
