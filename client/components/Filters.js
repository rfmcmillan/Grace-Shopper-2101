import React from 'react';
import { Select, FormControl, InputLabel, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Filters = (props) => {
  const classes = useStyles();
  const {
    countries,
    categories,
    filterByPrice,
    filterByCategory,
    filterByCountry,
    sortByInput,
    reset,
    name,
  } = props;

  return (
    <div id="filter">
      <form onSubmit={reset}>
        <FormControl variant="outlined">
          <InputLabel>All Countries</InputLabel>
          <Select
            label="All Countries"
            value={name}
            name="countries"
            onChange={filterByCountry}
          >
            <option value="all">All Countries</option>
            {countries.map((country) => {
              return (
                <option key={country.id} value={country.name}>
                  {country.name}
                </option>
              );
            })}
          </Select>
        </FormControl>

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

        <label htmlFor="sorting">Sory By: </label>
        <select defaultValue={'sort'} name="sorting" onChange={sortByInput}>
          <option value="default">--Sort--</option>
          <option value="alpha_asc">A-Z</option>
          <option value="alpha_des">Z-A</option>
          <option value="price_asc">Low-High</option>
          <option value="price_des">High-Low</option>
        </select>

        <button type="submit">Reset</button>
      </form>
    </div>
  );
};

export default Filters;
