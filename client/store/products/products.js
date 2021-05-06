import axios from 'axios';

const LOAD_PRODUCTS = 'LOAD_PRODUCTS ';
const DELETE_PRODUCT = 'DELETE_PRODUCT';
const POST_PRODUCT = 'POST_PRODUCT';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
const FILTER_BY_PRICE = 'FILTER_BY_PRICE';
const FILTER_BY_CATEGORY = 'FILTER_BY_CATEGORY';
const FILTER_BY_RATING = 'FILTER_BY_RATING';

const productReducer = (
  state = { products: [], max: Infinity, category: 'ALL' },
  action
) => {
  switch (action.type) {
    case LOAD_PRODUCTS: {
      const products = action.products;
      return { ...state, products };
    }
    case POST_PRODUCT: {
      const products = [...state.products, action.product];
      return { ...state, products };
    }
    case DELETE_PRODUCT: {
      const products = state.products.filter((product) => {
        return product.id !== action.product.id;
      });
      return { ...state, products };
    }

    case UPDATE_PRODUCT: {
      const products = state.products.map((product) => {
        return product.id === action.product.id ? action.product : product;
      });
      return { ...state, products };
    }

    case FILTER_BY_PRICE: {
      return { ...state, max: action.max };
    }
    case FILTER_BY_RATING: {
      return state;
    }

    case FILTER_BY_CATEGORY: {
      return { ...state, category: action.category };
    }

    default: {
      return state;
    }
  }
};

const _loadFilteredProducts = (products) => {
  return { type: LOAD_PRODUCTS, products };
};

const loadFilteredProducts = (country) => {
  return async (dispatch) => {
    try {
      let products = (await axios.get('/api/products')).data;
      products = products.filter((product) => product.country.name === country);
      dispatch(_loadFilteredProducts(products));
    } catch (err) {
      console.log(err);
    }
  };
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

const postProduct = (newProduct) => {
  return async (dispatch) => {
    const product = (await axios.post('/api/products', newProduct)).data;
    dispatch(postingProduct(product));
  };
};

const deletingProduct = (productId) => {
  return { type: DELETE_PRODUCT, productId };
};

const deleteProduct = (productId, history) => {
  return async (dispatch) => {
    await axios.delete(`/api/products/${productId}`);
    dispatch(deletingProduct(productId));
    history.push('/manage-products');
  };
};
const updatingProduct = (product) => {
  return { type: UPDATE_PRODUCT, product };
};

const updateProduct = (updatedProduct, history) => {
  return async (dispatch) => {
    const product = (
      await axios.put(`/api/products/${updatedProduct.id}`, updatedProduct)
    ).data;
    dispatch(updatingProduct(product));
    history.push('/manage-products');
  };
};

//#region Filtering
const filterByPrice = (max) => {
  return {
    type: FILTER_BY_PRICE,
    max,
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
  loadFilteredProducts,
  postProduct,
  deleteProduct,
  updateProduct,
  filterByCategory,
  filterByRating,
  filterByPrice,
};
export default productReducer;
