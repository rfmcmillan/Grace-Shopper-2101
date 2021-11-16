import React from 'react';
import {
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  Button,
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { sortBySearch } from '../../store/products/products';

const useStyles = makeStyles((theme) => {
  return {
    formControl: {
      margin: '0px 5px 0px 5px',
      minWidth: 120,
    },
    reset: { marginTop: 10, marginLeft: 5 },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  };
});

const Filters = (props) => {
  const {
    countries,
    categories,
    filterByCategory,
    filterByCountry,
    sortByInput,
    reset,
    name,
    filterByValue,
  } = props;
  const dispatch = useDispatch();

  const classes = useStyles();
  function handleChange(e) {
    const input = e.target.value;
    dispatch(sortBySearch(input));
  }

  return (
    <Grid
      direction="row"
      justifyContent="flex-end"
      alignItems="baseline"
      container
    >
      <form onSubmit={reset}>
        <FormControl className={classes.formControl}>
          <InputLabel id="countries">Countries</InputLabel>
          <Select
            labelId="countries"
            id="countries"
            defaultValue="all"
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
        <FormControl className={classes.formControl}>
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
        <FormControl className={classes.formControl}>
          <InputLabel id="sort-by-label" htmlFor="sorting">
            Sort By:{' '}
          </InputLabel>
          <Select
            labelId="sort-by-label"
            id="sort-by"
            defaultValue="default"
            name="sorting"
            onChange={sortByInput}
          >
            <MenuItem value="default">None</MenuItem>
            <MenuItem value="alpha_asc">A-Z</MenuItem>
            <MenuItem value="alpha_des">Z-A</MenuItem>
            <MenuItem value="price_asc">Low-High</MenuItem>
            <MenuItem value="price_des">High-Low</MenuItem>
          </Select>
        </FormControl>
        <Button
          className={classes.reset}
          variant="contained"
          color="default"
          type="submit"
        >
          Reset
        </Button>
      </form>
    </Grid>
  );
};

export default Filters;
