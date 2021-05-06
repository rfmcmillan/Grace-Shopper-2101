import React from 'react';

const Filters = (props) => {
  const {
    countries,
    categories,
    filterByPrice,
    filterByCategory,
    filterByCountry,
    reset,
    name,
  } = props;
  return (
    <div id="filter">
      <form onSubmit={reset}>
        <select value={name} name="countries" onChange={filterByCountry}>
          <option value="all">All Countries</option>
          {countries.map((country) => {
            return (
              <option key={country.id} value={country.name}>
                {country.name}
              </option>
            );
          })}
        </select>

        <select
          defaultValue="ALL"
          name="categories"
          onChange={filterByCategory}
        >
          <option value="ALL">All</option>
          {categories.map((category) => {
            return (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            );
          })}
        </select>

        <label htmlFor="price"> Max Price</label>
        <input
          type="range"
          name="price"
          min="0"
          max="45"
          onChange={filterByPrice}
          defaultValue="45"
        />

        <input type="text" placeholder="search" />
        <button type="submit">Reset</button>
      </form>
    </div>
  );
};

export default Filters;
