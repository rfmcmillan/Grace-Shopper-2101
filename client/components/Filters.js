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
          <option value="default">--Select Country--</option>
          {countries.map((country) => {
            return (
              <option key={country.id} value={country.name}>
                {country.name}
              </option>
            );
          })}
        </select>

        <select name="categories" onChange={filterByCategory}>
          <option value="default">--Select Category--</option>
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
          max="50"
          onChange={filterByPrice}
          defaultValue="50"
        />

        <input type="text" placeholder="search" />
        <button type="submit">Reset</button>
      </form>
    </div>
  );
};

export default Filters;
