/* eslint-disable jsx-a11y/accessible-emoji */
import './App.scss';
import classNames from 'classnames';
import { useState } from 'react';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

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
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p className="panel-tabs has-text-weight-bold">
              <a
                className={classNames({ 'is-active': filterByUser === null })}
                data-cy="FilterAllUsers"
                href="#/"
                onClick={() => setFilterByUser(null)}
              >
                All
              </a>
              {USERS_LIST.map(user => (
                <a
                  className={classNames({ 'is-active': filterByUser === user })}
                  key={user}
                  data-cy="FilterUser"
                  href="#/"
                  onClick={() => setFilterByUser(user)}
                >
                  {user}
                </a>
              ))}
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={query}
                  onChange={event => setQuery(event.target.value.trimStart())}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                <span className="icon is-right">
                  {query && (
                    <button
                      data-cy="ClearButton"
                      type="button"
                      className="delete"
                      onClick={() => resetAllFilters()}
                    />
                  )}
                </span>
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className={classNames('button is-success mr-6', {
                  'is-outlined': selectedCategories.length !== 0,
                })}
                onClick={() => setSelectedCategories([])}
              >
                All
              </a>
              {CATEGORIES_LIST.map(category => (
                <a
                  key={category}
                  data-cy="Category"
                  className={classNames('button mr-2 my-1', {
                    'is-info': selectedCategories.includes(category),
                  })}
                  href="#/"
                  onClick={() => toggleCategory(category)}
                >
                  {category}
                </a>
              ))}
            </div>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
                onClick={() => resetAllFilters()}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {filteredProducts.length === 0 ? (
            <p data-cy="NoMatchingMessage">
              No products matching selected criteria
            </p>
          ) : (
            <table
              data-cy="ProductTable"
              className="table is-striped is-narrow is-fullwidth"
            >
              <thead>
                <tr>
                  {TABLE_HEADERS.map(table => (
                    <th key={table}>
                      <span className="is-flex is-flex-wrap-nowrap">
                        {table}
                        <a href="#/">
                          <span className="icon">
                            <i data-cy="SortIcon" className="fas fa-sort" />
                          </span>
                        </a>
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filteredProducts.map(product => (
                  <tr key={product.id} data-cy="Product">
                    <td className="has-text-weight-bold" data-cy="ProductId">
                      {product.id}
                    </td>

                    <td data-cy="ProductName">{product.name}</td>
                    <td data-cy="ProductCategory">
                      {product.category.icon} - {product.category.title}
                    </td>

                    <td
                      data-cy="ProductUser"
                      className={classNames(
                        product.user.sex === 'm'
                          ? 'has-text-link'
                          : 'has-text-danger',
                      )}
                    >
                      {product.user.name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
