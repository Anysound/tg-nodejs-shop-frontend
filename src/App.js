import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Header } from './components/header/Header';
import { ProductList } from './components/productList/ProductList';
import Form  from './components/form/Form';

function App() {

  useEffect(() => {
    process.env.TG_API.ready();
  }, [process.env.TG_API]);

  return (
    <div className="App">
      <header className="App-header">
        <Header/>
        <Routes>
          <Route index element={<ProductList/>} />
          <Route path='form' element={<Form/>} /> 
        </Routes>
      </header>
    </div>
  );
}

export default App;
