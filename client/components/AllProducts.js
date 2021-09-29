/* eslint-disable react/button-has-type */
import React, { Component, useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Card, Typography } from '@material-ui/core';
import {
  loadProducts,
  loadFilteredProducts,
  filterByCategory,
  filterByPrice,
  filterByRating,
  sortByAlpha,
  sortByPrice,
  sortBySearch,
} from '../store/products/products';
import { addToCart } from '../store/cart';
import { loadCountries } from '../store/countries';
import { loadCategories } from '../store/categories';
import Filters from './Filters';

const AllProducts = (props) => {
  const { name } = props.match.params;
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const products = useSelector((state) => state.products);
  const login = useSelector((state) => state.login);
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const categories = useSelector((state) => state.categories);

  // constructor(props) {
  //   super(props);
  //   this.state = {};
  // this.byCategory = this.byCategory.bind(this);
  // this.byPrice = this.byPrice.bind(this);
  // this.byCountry = this.byCountry.bind(this);
  // this.sortByInput = this.sortByInput.bind(this);
  // this.reset = this.reset.bind(this);
  // }

  console.log('name:', name);
  useEffect(() => {
    dispatch(loadCategories());
    dispatch(loadCountries());
    if (name) {
      dispatch(loadFilteredProducts(name));
    } else {
      loadProducts();
    }
  }, []);

  // componentDidMount() {
  //   const {
  //     loadAllProducts,
  //     loadAllCountries,
  //     loadAllCategories,
  //     loadFilteredProducts,
  //   } = this.props;
  //   const { name } = this.props.match.params;
  //   loadAllCategories();
  //   loadAllCountries();
  //   if (name) {
  //     loadFilteredProducts(name);
  //   } else {
  //     loadAllProducts();
  //   }
  // }

  const { filteredProducts } = products;

  useEffect(() => {
    console.log('filteredProducts:', filteredProducts);
    console.log('products.products:', products.products);
  }, [products]);

  useEffect(() => {
    if (!name) {
      dispatch(loadProducts());
    } else if (name === 'all') {
      dispatch(loadProducts());
    } else {
      dispatch(loadFilteredProducts(name));
    }
  }, [name]);

  // componentDidUpdate(prevProps) {
  //   const prev = prevProps.match.params.name;
  //   const curr = this.props.match.params.name;
  //   if (!curr && prev !== curr) {
  //     this.props.loadAllProducts();
  //   } else if (prev !== curr) {
  //     if (curr === 'all') {
  //       this.props.loadAllProducts();
  //     } else {
  //       this.props.loadFilteredProducts(curr);
  //     }
  //   }
  // }

  const handleClick = (product) => {
    let cart = null;
    if (props.login.cart) {
      cart = props.login.cart;
    }
    props.addItem(product, cart);
  };

  // byRating(ev) {}

  const byCountry = (ev) => {
    const country = ev.target.value;
    if (country === 'all') {
      props.history.push('/products');
    } else {
      props.history.push(`/products/c/${country}`);
    }
  };

  const byCategory = (ev) => {
    console.log('value', ev.target.value);
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
  console.log('products before return:', products.products);

  if (products.products.length) {
    return (
      <div id="main">
        <Filters
          countries={countries}
          categories={categories}
          filterByCategory={byCategory}
          // filterByRating={this.byRating}
          filterByPrice={byPrice}
          filterByCountry={byCountry}
          sortByInput={sortByInput}
          filterByValue={sortBySearch}
          reset={reset}
          name={name}
        />
        <h1 id="products-title">Products</h1>

        <div id="allProducts">
          {products.products.map((product) => {
            return (
              <div key={product.id} className="product">
                <Link to={`/products/${product.id}`}>
                  <h2 id="product-link">{`${product.title}`}</h2>
                </Link>

                <span>
                  {product.country.name}
                  <i className={`em ${product.country.flag}`} />
                </span>
                <span id="item-category">
                  {product.categories
                    .map((category) => {
                      return category.name;
                    })
                    .join(', ')}
                </span>

                <span id="price">${product.price}</span>

                <br />
                <img
                  className="allProductImage"
                  src={product.imageUrl}
                  alt={product.description}
                />
                <br />
                <Button
                  id="quick-add"
                  variant="contained"
                  onClick={() => {
                    handleClick(product);
                  }}
                >
                  Add Product
                </Button>
              </div>
            );
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
        // filterByRating={this.byRating}
        filterByPrice={byPrice}
        filterByCountry={byCountry}
        sortByInput={sortByInput}
        reset={reset}
        name={name}
      />
      <p>No products match that description.</p>;
    </div>
  );
};

const filterHelper = (products, max, categoryName) => {
  let results = products.filter((product) => {
    return Number(product.price) < max;
  });

  if (categoryName !== 'ALL') {
    results = results.filter((product) => {
      return product.categories.some((category) => {
        return category.name === categoryName;
      });
    });
  }
  return results;
};
const mapStateToProps = (state) => {
  const {
    products: { max, category },
    login,
    countries,
    categories,
    cart,
    user,
  } = state;
  let products = state.products.filteredProducts;
  products = filterHelper(products, max, category);
  if (!products) {
    return "There's no products now...";
  }
  return {
    countries,
    products,
    login,
    cart,
    user,
    categories,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   // const { history } = ownProps;
//   return {
//     loadAllProducts: () => {
//       dispatch(loadProducts());
//     },
//     loadFilteredProducts: (country) => {
//       dispatch(loadFilteredProducts(country));
//     },

//     loadAllCountries: () => {
//       dispatch(loadCountries());
//     },
//     loadAllCategories: () => {
//       dispatch(loadCategories());
//     },
//     addItem: (productId, cart) => {
//       dispatch(addToCart(productId, cart, 1));
//     },

//     filterByRating: (rating) => {
//       return dispatch(filterByRating(rating));
//     },

//     filterByPrice: (max) => {
//       dispatch(filterByPrice(max));
//     },
//     filterByCategory: (category) => {
//       dispatch(filterByCategory(category));
//     },

//     sortByPrice: (direction) => {
//       return dispatch(sortByPrice(direction));
//     },
//     sortByAlpha: (direction) => {
//       return dispatch(sortByAlpha(direction));
//     },
//     filterByValue: (input) => {
//       return dispatch(sortBySearch({ value: input }));
//     },
//   };
// };
export default connect(mapStateToProps)(AllProducts);
