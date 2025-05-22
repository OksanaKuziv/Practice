import classNames from 'classnames';

export const ProductTable = ({ filteredProducts, TABLE_HEADERS }) => {
  if (filteredProducts.length === 0) {
    return (
      <p data-cy="NoMatchingMessage">No products matching selected criteria</p>
    );
  }

  return (
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
                product.user.sex === 'm' ? 'has-text-link' : 'has-text-danger',
              )}
            >
              {product.user.name}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
