import { Component } from 'react'
import { src } from './ViewsIcon'
import './Article.css'

export default class Article extends Component {
  render() {
    const article = this.props.article

    // ARTICLE EXAMPLE
    // {
    //   "date": "27/04/2024, 15:08",
    //   "title": "🚨 URGENTE: XONGS ANUNCIADO COMO PROGRAMADOR MAIS FODA DE JAPARATINGA, SOROCABA E REGIÃO!",
    //   "author": "Léo Pias",
    //   "views": 1,
    //   "likes": 0,
    //   "media": ["image", "https://example.com/image.png"],
    //   "paragraph": "Xongs foi premiado com o TBPOBA (The Best Programmer Of Brazil Award) esta noite, realmente, um premio muito merecido, ele sabe o que faz."
    // }

    return (
      <div className="article-container">
        <article>
          <h1>{article.title}</h1>
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
          <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', fontFamily: 'Arial', fontWeight: 'lighter', fontSize: 16 }}>
            {/*---------------------------*/}

           <h1><img src={src} width={16} /> {article.views}</h1>
           <h1><a style={{ cursor: 'pointer' }} id="article-like"><i className="fa-regular fa-thumbs-up"></i></a> {article.likes}</h1>

           {/*---------------------------*/}
          </div>
        </article>
      </div>
    )
  }
}
