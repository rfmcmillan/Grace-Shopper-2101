import React from 'react';

const Filter = (props) => {
  const { countries, categories, handleChange } = props;
  return (
    <div id="filter">
      <select name="COUNTRY" onChange={handleChange}>
        <option selected>--Select Country--</option>
        {countries.map((country) => {
          return (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          );
        })}
      </select>
      <select name="CATEGORY" onChange={handleChange}>
        <option selected>--Select Category--</option>
        {categories.map((category) => {
          return (
            <option key={category.id} value={category.id}>
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
        max="100"
        onChange={handleChange}
      />
    </div>
  );
};

export default Filter;
