import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './News.css';

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const options = {
            method: 'GET',
            url: 'https://mboum-finance.p.rapidapi.com/ne/news',
            headers: {
              'X-RapidAPI-Key': '5a577095f9msh3fa29dd93e04d75p158707jsn37a73f83df3b',
              'X-RapidAPI-Host': 'mboum-finance.p.rapidapi.com'
            }
          };
  
        const response = await axios.request(options);
        setNews(response.data);
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch news');
      }
    };

    fetchNews();
  }, []);

  return (
    <>
      <div className="container">
        <div className="topic">
          <div>News</div>
          {/* <div className="topic-right">
            <input type="text" />
            <button className="btn-click">Search</button>
          </div> */}
        </div>
        <div className="card-container">
          {news.map((item, index) => (
            <div className="card" key={index}>
              <div className="card-title">{item.title}</div>
              <div className='bottom-card'>
                <div className='bottom-card-right'>
                    <div className="card-source">{item.source}</div>
                    <div className='card-date'>{item.pubDate}</div>
                </div>
                <a href={`${item.link}`} target="_blank" rel="noreferrer"><div className="card-link">Click</div></a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default News;
