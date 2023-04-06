import React from 'react';
import qs from 'qs';

import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import Categories from '../components/Categories.tsx';
import Sort, { sortList } from '../components/Sort.tsx';
import PizzaBlock from '../components/PizzaBlock/index.tsx';
import Skeleton from '../components/PizzaBlock/Skeleton.tsx';
import Pagination from '../components/Pagination/index.tsx';
import { fetchPizzas } from '../redux/slices/pizzaSlice';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { items, status } = useSelector((state: any) => state.pizza);
  const { categoryId, sort, currentPage, searchValue } = useSelector((state: any) => state.filter);
  const sortType = sort.sortProperty;

  const onChangeCategory = (idx: number) => {
    dispatch(setCategoryId(idx));
  };

  const onChangePage = (value: number) => {
    dispatch(setCurrentPage(value));
  };

  const getPizzas = async () => {
    const sortBy = sortType.replace('-', '');
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      // @ts-ignore
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage,
      }),
    );

    window.scrollTo(0, 0);
  };

  //если изменили параметры и уже был первый рендер
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, currentPage]);

  //если был первый рендер, то проверяем url-параметры и сохраняем их в редаксе
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);

  //если был первый рендер, то запрашиваем пиццы
  React.useEffect(() => {
    // window.scrollTo(0, 0);
    // if (!isSearch.current) {
    getPizzas();
    // }
    // isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzas = items.map((obj: any, i: number) => (
    <Link key={i} to={`/pizza/${obj.id}`}>
      <PizzaBlock {...obj} />
    </Link>
  ));
  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
