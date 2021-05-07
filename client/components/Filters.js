import React from 'react';
import {
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  Button,
} from '@material-ui/core';
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
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="countries">Countries</InputLabel>
          <Select
            labelId="countries"
            id="countries"
            label="All Countries"
            value={name}
            onChange={filterByCountry}
          >
            <MenuItem value="all">All</MenuItem>
            {countries.map((country) => {
              return (
                <MenuItem key={country.id} value={country.name}>
                  {country.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="categories-label">Categories</InputLabel>
          <Select
            labelId="categories-label"
            id="categories"
            defaultValue="ALL"
            name="categories"
            onChange={filterByCategory}
          >
            <MenuItem value="ALL">All</MenuItem>
            {categories.map((category) => {
              return (
                <MenuItem key={category.id} value={category.name}>
                  {category.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <label htmlFor="price"> Max Price</label>
        <input
          type="range"
          name="price"
          min="0"
          max="45"
          onChange={filterByPrice}
          defaultValue="45"
        />

        <TextField variant="outlined" type="text" placeholder="search" />
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="sort-by-label" htmlFor="sorting">
            Sort By:{' '}
          </InputLabel>
          <Select
            labelId="sort-by-label"
            id="sort-by"
            defaultValue={'sort'}
            name="sorting"
            onChange={sortByInput}
          >
            <MenuItem value="default">--Sort--</MenuItem>
            <MenuItem value="alpha_asc">A-Z</MenuItem>
            <MenuItem value="alpha_des">Z-A</MenuItem>
            <MenuItem value="price_asc">Low-High</MenuItem>
            <MenuItem value="price_des">High-Low</MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" color="primary" type="submit">
          Reset
        </Button>
      </form>
    </div>
  );
};

export default Filters;
