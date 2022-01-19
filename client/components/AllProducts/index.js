/* eslint-disable react/button-has-type */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Grid, Box } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';
import {
  loadProducts,
  loadFilteredProducts,
  filterByCategory,
  filterByPrice,
  sortByAlpha,
  sortByPrice,
  sortBySearch,
} from '../../store/products/products';
import { loadCountries } from '../../store/countries';
import { loadCategories } from '../../store/categories';
import Filters from './Filters';
import ProductCard from './ProductCard';

const AllProducts = (props) => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const products = useSelector((state) => state.products);
  const categories = useSelector((state) => state.categories);
  const { name } = props.match.params;
  let { filteredProducts } = products;
  const allProducts = products.products;
  const { max, category } = products;

  const theme = useTheme();
  const useStyles = makeStyles({
    filters: { marginTop: 20, paddingRight: 16 },
    productsTitle: {
      marginLeft: 15,
      fontSize: 24,
      fontWeight: 400,
      color: theme.palette.text.primary,
    },
    root: { width: '90vw' },
  });
  const classes = useStyles();

  useEffect(() => {
    dispatch(loadCategories());
    dispatch(loadCountries());
    if (name) {
      dispatch(loadFilteredProducts(name));
    } else {
      loadProducts();
    }
  }, []);

  useEffect(() => {
    if (!name) {
      dispatch(loadProducts());
    } else if (name === 'all') {
      dispatch(loadProducts());
    } else {
      dispatch(loadFilteredProducts(name));
    }
  }, [name]);

  filteredProducts = filterHelper(allProducts, max, category);

  const byCountry = (ev) => {
    const country = ev.target.value;
    if (country === 'all') {
      props.history.push('/products');
    } else {
      props.history.push(`/products/c/${country}`);
    }
  };

  const byCategory = (ev) => {
    const category = ev.target.value;
    dispatch(filterByCategory(category));
  };

  const byPrice = (ev) => {
    const max = ev.target.value;
    dispatch(filterByPrice(max));
  };

  const sortByInput = (ev) => {
    const sortBy = ev.target.value;
    if (sortBy.includes('alpha')) {
      dispatch(sortByAlpha(sortBy));
    } else {
      dispatch(sortByPrice(sortBy));
    }
  };

  const reset = (ev) => {
    const form = ev.target;
    ev.preventDefault();
    form.reset();
    dispatch(filterByPrice(Infinity));
    dispatch(filterByCategory('ALL'));
    dispatch(loadProducts());
    props.history.push('/products');
  };

  if (products.length) {
    return (
      <div className={classes.filters}>
        <Typography className={classes.productsTitle} variant="h1">
          Products
        </Typography>
        <Filters
          countries={countries}
          categories={categories}
          filterByCategory={byCategory}
          filterByPrice={byPrice}
          filterByCountry={byCountry}
          sortByInput={sortByInput}
          filterByValue={sortBySearch}
          reset={reset}
          name={name}
        />

        <div id="allProducts">
          {products.map((product, idx) => {
            return <ProductCard product={product} key={idx} />;
          })}
        </div>
      </div>
    );
  }
  if (filteredProducts.length) {
    return (
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Grid className={classes.root} direction="column" alignItems="center">
          <Grid
            className={classes.filters}
            container
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography className={classes.productsTitle} variant="h1">
                Products
              </Typography>
            </Grid>
            <Grid item>
              <Filters
                countries={countries}
                categories={categories}
                filterByCategory={byCategory}
                filterByPrice={byPrice}
                filterByCountry={byCountry}
                sortByInput={sortByInput}
                filterByValue={sortBySearch}
                reset={reset}
                name={name}
              />
            </Grid>
          </Grid>

          <Grid container justifyContent="space-around">
            {filteredProducts.map((product) => {
              return (
                <Grid item>
                  <ProductCard product={product} />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Box>
    );
  }
  return (
    <div>
      <Filters
        countries={countries}
        categories={categories}
        filterByCategory={byCategory}
        filterByPrice={byPrice}
        filterByCountry={byCountry}
        sortByInput={sortByInput}
        reset={reset}
        name={name}
      />
      <p>No products match that description.</p>
    </div>
  );
};

const filterHelper = (products, max, categoryName) => {
  let results = products.filter((product) => {
    return Number(product.price) < max;
  });

  if (categoryName !== 'ALL') {
    results = results.filter((product) => {
      const includeInFilter = product.categories.some((category) => {
        return category.name === categoryName;
      });
      return includeInFilter;
    });
  }
  return results;
};

export default AllProducts;
