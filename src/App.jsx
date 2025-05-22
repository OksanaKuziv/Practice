/* eslint-disable jsx-a11y/accessible-emoji */
import './App.scss';
import { useState } from 'react';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';
import { FiltersPanel } from './components/FiltersPanel/FiltesrPanel';
import { ProductTable } from './components/ProductTable/ProductTable';

const products = productsFromServer.map(product => {
  const category =
    categoriesFromServer.find(cat => cat.id === product.categoryId) || null;

  const user = usersFromServer.find(us => us.id === category.ownerId) || null;

  return {
    ...product,
    category,
    user,
  };
});

const USERS_LIST = ['Roma', 'Anna', 'Max', 'John'];

const CATEGORIES_LIST = [
  'Grocery',
  'Drinks',
  'Fruits',
  'Electronics',
  'Clothes',
];

const TABLE_HEADERS = ['ID', 'Product', 'Category', 'User'];

const getFilteredProducts = (list, filters) => {
  let filteredProducts = [...list];

  if (filters.query) {
    const normalizedQuery = filters.query.trim().toLowerCase();

    filteredProducts = filteredProducts.filter(product => {
      return product.name.toLowerCase().includes(normalizedQuery);
    });
  }

  if (filters.filterByUser) {
    filteredProducts = filteredProducts.filter(
      product => product.user.name === filters.filterByUser,
    );
  }

  if (filters.selectedCategories.length > 0) {
    filteredProducts = filteredProducts.filter(product => {
      return filters.selectedCategories.includes(product.category.title);
    });
  }

  return filteredProducts;
};

export const App = () => {
  const [filterByUser, setFilterByUser] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [query, setQuery] = useState('');

  const filteredProducts = getFilteredProducts(products, {
    filterByUser,
    selectedCategories,
    query,
  });

  const toggleCategory = category => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(prev => prev.filter(c => c !== category));
    } else {
      setSelectedCategories(prev => [...prev, category]);
    }
  };

  const resetAllFilters = () => {
    setFilterByUser(null);
    setSelectedCategories([]);
    setQuery('');
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <FiltersPanel
            USERS_LIST={USERS_LIST}
            CATEGORIES_LIST={CATEGORIES_LIST}
            filterByUser={filterByUser}
            setFilterByUser={setFilterByUser}
            query={query}
            setQuery={setQuery}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            toggleCategory={toggleCategory}
            resetAllFilters={resetAllFilters}
          />
        </div>

        <div className="box table-container">
          <ProductTable
            TABLE_HEADERS={TABLE_HEADERS}
            filteredProducts={filteredProducts}
          />
        </div>
      </div>
    </div>
  );
};
