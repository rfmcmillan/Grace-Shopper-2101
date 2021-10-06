/* eslint-disable react/button-has-type */
import React, { Component, useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { Button, Typography, Paper, Link } from '@material-ui/core';
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
import { addToCart } from '../../store/cart';
import { loadCountries } from '../../store/countries';
import { loadCategories } from '../../store/categories';

import Filters from '../Filters';
import ProductCard from './ProductCard';

const AllProducts = (props) => {
  const { name } = props.match.params;
  // const name = this.props.match.params.name || 'default';
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const products = useSelector((state) => state.products);
  const login = useSelector((state) => state.login);
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const categories = useSelector((state) => state.categories);
  let { filteredProducts } = products;
  const allProducts = products.products;
  const { max, category } = products;

  const theme = useTheme();
  const useStyles = makeStyles({
    productsTitle: {
      marginLeft: 15,
      fontSize: 24,
      fontWeight: 400,
    },
  });
  const classes = useStyles();

  console.log('props:', props);
  console.log('login:', login);

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

  const handleClick = (product) => {
    let cart = null;
    if (props.login.cart) {
      cart = props.login.cart;
    }
    props.addItem(product, cart);
  };

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
      <div>
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
        <Typography className={classes.productsTitle} variant="h1">
          Products
        </Typography>

        <div id="allProducts">
          {products.map((product, idx) => {
            console.log('ProductCard yay');
            return <ProductCard product={product} key={idx} />;
            // return (
            //   <Paper key={product.id} className="product">
            //     <Link href={`/#/products/${product.id}`}>
            //       <Typography id="product-link">{`${product.title}`}</Typography>
            //     </Link>
            //     <Typography>
            //       {product.country.name}
            //       <i className={`em ${product.country.flag}`} />
            //     </Typography>
            //     <span id="item-category">
            //       {product.categories
            //         .map((category) => {
            //           return category.name;
            //         })
            //         .join(', ')}
            //     </span>
            //     <span id="price">${product.price}</span>
            //     <br />
            //     <img
            //       className="allProductImage"
            //       src={product.imageUrl}
            //       alt={product.description}
            //     />
            //     <br />
            //     <Button
            //       id="quick-add"
            //       variant="contained"
            //       onClick={() => {
            //         handleClick(product);
            //       }}
            //     >
            //       Add Product
            //     </Button>
            //   </Paper>
            // );
          })}
        </div>
        {/* <productCreate history={history} /> */}
      </div>
    );
  }
  if (filteredProducts.length) {
    return (
      <div id="main">
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
        <Typography className={classes.productsTitle} variant="h1">
          Products
        </Typography>

        <div id="allProducts">
          {filteredProducts.map((product) => {
            return <ProductCard product={product} />;
            // return (
            //   <Paper key={product.id} className="product">
            //     <Link href={`/#/products/${product.id}`}>
            //       <Typography>{`${product.title}`}</Typography>
            //     </Link>
            //     <Typography>
            //       {product.country.name}
            //       <i className={`em ${product.country.flag}`} />
            //     </Typography>
            //     <Typography id="item-category">
            //       {product.categories
            //         .map((category) => {
            //           return category.name;
            //         })
            //         .join(', ')}
            //     </Typography>
            //     <Typography id="price">${product.price}</Typography>
            //     <br />
            //     <img
            //       className="allProductImage"
            //       src={product.imageUrl}
            //       alt={product.description}
            //     />
            //     <br />
            //     <Button
            //       id="quick-add"
            //       variant="contained"
            //       onClick={() => {
            //         handleClick(product);
            //       }}
            //     >
            //       Add Product
            //     </Button>
            //   </Paper>
            // );
          })}
        </div>
        {/* <productCreate history={history} /> */}
      </div>
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
