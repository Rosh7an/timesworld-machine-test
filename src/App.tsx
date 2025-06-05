import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import { Provider } from 'react-redux';
import store from './store';

const App: React.FC = () => {

  return (
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login/>} />
      </Routes>
    </BrowserRouter>
    </Provider>
  );
};

export default App;