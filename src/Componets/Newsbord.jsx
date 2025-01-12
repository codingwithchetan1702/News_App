import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';

const Newsbord = ({ category }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchNews = async () => {
      const Api_key = import.meta.env.VITE_API_KEY
      const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${Api_key}`;

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Failed to fetch news. Status: ${response.status}`);
        }

        const data = await response.json();
        setNews(data.articles || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category]);

  if (loading) {
    return <h1 className="text-center text-primary">Loading News...</h1>;
  }

  if (error) {
    return (
      <h1 className="text-center text-danger">
        Error: {error}. Please check your internet connection or API key.
      </h1>
    );
  }

  return (
    <div>
      <h2 className="text-center my-3">
        Latest <span className="badge bg-danger">News: {category || 'General'}</span>
      </h2>
      <div className="row">
        {news.length > 0 ? (
          news.map((article, index) => (
            <div className="col-md-4 mb-3" key={index}>
              <NewsItem
                title={article.title || 'No Title Available'}
                desc={article.description || 'No Description Available'}
                src={article.urlToImage || 'https://via.placeholder.com/150'}
                url={article.url || '#'}
              />
            </div>
          ))
        ) : (
          <p className="text-center">No news articles available.</p>
        )}
      </div>
    </div>
  );
};

export default Newsbord;
