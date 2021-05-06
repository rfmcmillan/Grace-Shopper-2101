import axios from 'axios';

const LOAD_PRODUCTS = 'LOAD_PRODUCTS ';
const DELETE_PRODUCT = 'DELETE_PRODUCT';
const POST_PRODUCT = 'POST_PRODUCT';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
const FILTER_BY_PRICE = 'FILTER_BY_PRICE';
const FILTER_BY_COUNTRY = 'FILTER_BY_COUNTRY';
const FILTER_BY_CATEGORY = 'FILTER_BY_CATEGORY';
const FILTER_BY_RATING = 'FILTER_BY_RATING';

const productReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_PRODUCTS: {
      return action.products;
    }
    case POST_PRODUCT: {
      return [...state, action.product];
    }
    case DELETE_PRODUCT: {
      return state.filter((product) => {
        return product.id !== action.product.id;
      });
    }
    case UPDATE_PRODUCT: {
      return state.map((product) => {
        return product.id === action.product.id ? action.product : product;
      });
    }

    case FILTER_BY_PRICE: {
      const filtered = state.filter((product) => product.price <= action.max);
      return filtered;
    }
    case FILTER_BY_RATING: {
      return state;
    }
    case FILTER_BY_COUNTRY: {
      const filtered = state.filtered(
        (product) => product.country.name === action.country
      );
      return filtered;
    }
    case FILTER_BY_CATEGORY: {
      console.log(state, 'LINE 45');
      return state;
    }

    default: {
      return state;
    }
  }
};

const loadingProducts = (products) => {
  return { type: LOAD_PRODUCTS, products };
};

const loadProducts = () => {
  return async (dispatch) => {
    try {
      const products = (await axios.get('/api/products')).data;
      dispatch(loadingProducts(products));
    } catch (err) {
      console.log(err);
    }
  };
};

const postingProduct = (product) => {
  return { type: POST_PRODUCT, product };
};

const postProduct = (newProduct, history) => {
  return async (dispatch) => {
    const product = (await axios.post('/api/products', newProduct)).data;
    dispatch(postingProduct(product));
    history.push('/products');
  };
};

const deletingProduct = (product) => {
  return { type: DELETE_PRODUCT, product };
};

const deleteProduct = (product, history) => {
  return async (dispatch) => {
    await axios.delete(`/api/products/${product.id}`);
    dispatch(deletingProduct(product));
    history.push('/products');
  };
};
const updatingProduct = (product) => {
  return { type: UPDATE_PRODUCT, product };
};

// The put for product might need to updated...
// If a location is passed through it will be added.
const updateProduct = (updatedProduct, history) => {
  return async (dispatch) => {
    const product = (
      await axios.put(`/api/products/${updatedProduct.id}`, updatedProduct)
    ).data;
    dispatch(updatingProduct(product));
  };
};

//#region Filtering
const filterByPrice = (max) => {
  return {
    type: FILTER_BY_PRICE,
    max,
  };
};

const filterByCountry = (country) => {
  return {
    type: FILTER_BY_COUNTRY,
    country,
  };
};

const filterByCategory = (category) => {
  return {
    type: FILTER_BY_CATEGORY,
    category,
  };
};

const filterByRating = (rating) => {
  return {
    type: FILTER_BY_RATING,
    rating,
  };
};

export {
  loadProducts,
  postProduct,
  deleteProduct,
  updateProduct,
  filterByCategory,
  filterByCountry,
  filterByRating,
  filterByPrice,
};
export default productReducer;
