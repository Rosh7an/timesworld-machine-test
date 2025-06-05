import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;