import classNames from 'classnames';

export const FiltersPanel = ({
  USERS_LIST,
  CATEGORIES_LIST,
  filterByUser,
  setFilterByUser,
  query,
  setQuery,
  selectedCategories,
  setSelectedCategories,
  toggleCategory,
  resetAllFilters,
}) => {
  return (
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
  );
};
