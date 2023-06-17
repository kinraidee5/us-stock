import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Stock from './pages/Stock';
import News from './pages/News';
import Market from './pages/Market';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/market" element={<Market />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/news" element={<News />} />
        </Routes>
      </div>
    </BrowserRouter>

  );
};

export default App;
