import React from 'react';

import { Route, Routes } from 'react-router-dom';
import {} from './scss/app.scss';

import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';

export const SearchContext = React.createContext('');

// import pizzas from './assets/pizzas.json';

function App() {
  const [searchValue, setSearchValue] = React.useState('');

  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
      <div className="wrapper">
        <Header searchValue={searchValue} setSearchValue={setSearchValue} />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </SearchContext.Provider>
  );
}

export default App;
