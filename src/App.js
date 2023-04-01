import React from 'react';
import {} from './scss/app.scss';

import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';
import Skeleton from './components/PizzaBlock/Skeleton';

// import pizzas from './assets/pizzas.json';

function App() {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('https://64275101161067a83bf97ade.mockapi.io/items')
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setItems(json);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {isLoading
              ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
              : items.map((obj, i) => <PizzaBlock key={i} {...obj} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
