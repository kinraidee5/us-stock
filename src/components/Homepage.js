import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'GET',
        url: 'https://bloomberg-market-and-financial-news.p.rapidapi.com/news/list',
        params: { id: 'markets' },
        headers: {
          'X-RapidAPI-Key': '5a577095f9msh3fa29dd93e04d75p158707jsn37a73f83df3b',
          'X-RapidAPI-Host': 'bloomberg-market-and-financial-news.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        console.log(response.data.data);
        setData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Market News</h1>
      {data && data.length > 0(
        console.log(data),
        data.map((newsItem) => (
          <div key={newsItem.id}>
            <h2>{newsItem.title}</h2>
            <p>{newsItem.summary}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
