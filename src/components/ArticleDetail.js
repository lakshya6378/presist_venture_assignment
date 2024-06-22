// src/components/ArticleDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticleById } from '../services/api';

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const getArticle = async () => {
      try {
        const data = await fetchArticleById(id);
        setArticle(data);
      } catch (error) {
        console.error('Error fetching article', error);
      }
    };
    getArticle();
  }, [id]);

  if (!article) return <p>Loading...</p>;

  return (
    <div className="article-detail">
      <h1>{article.title}</h1>
      <img src={article.urlToImage} alt={article.title} />
      <p>{article.content}</p>
    </div>
  );
};

export default ArticleDetail;
