// src/components/ArticleList.js
import React from 'react';
import { Link } from 'react-router-dom';

const ArticleList = ({ articles }) => {
  return (
    <div className="article-list">
      {articles.map(article => (
        <Link to={`/article/${article.id}`} key={article.id}>
          <div className="article-summary">
            <h2>{article.title}</h2>
            <img src={article.image_url} alt={article.title} />
            <p>{article.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ArticleList;
