import React from 'react';

const Filter = (props) => {
  const { countries, categories, handleChange, handleQueryChange } = props;
  return (
    <div id="filter">
      <select name="countries" onChange={handleQueryChange}>
        <option selected>--Select Country--</option>
        {countries.map((country) => {
          return (
            <option key={country.id} value={country.name}>
              {country.name}
            </option>
          );
        })}
      </select>
      <select name="categories">
        <option selected>--Select Category--</option>
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
        onChange={handleChange}
      />

      <input type="text" placeholder="search" />
    </div>
  );
};

export default Filter;
