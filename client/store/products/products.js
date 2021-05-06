import axios from 'axios';

const LOAD_PRODUCTS = 'LOAD_PRODUCTS ';
const DELETE_PRODUCT = 'DELETE_PRODUCT';
const POST_PRODUCT = 'POST_PRODUCT';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
const FILTER_BY_PRICE = 'FILTER_BY_PRICE';
const FILTER_BY_CATEGORY = 'FILTER_BY_CATEGORY';
const FILTER_BY_RATING = 'FILTER_BY_RATING';
const SORT_BY_ALPHA = 'SORT_BY_ALPHA';
const SORT_BY_PRICE = 'SORT_BY_PRICE';

function sortAscAlpha(arr, field) {
  return arr.sort((a, b) => {
    return a[field] > b[field] ? 1 : -1;
  });
}

function sortDesAlpha(arr, field) {
  return arr.sort((a, b) => {
    return a[field] < b[field] ? 1 : -1;
  });
}

function sortAscPrice(arr, field) {
  return arr.sort((a, b) => {
    return parseFloat(a[field]) > parseFloat(b[field]) ? 1 : -1;
  });
}

function sortDesPrice(arr, field) {
  return arr.sort((a, b) => {
    return parseFloat(a[field]) < parseFloat(b[field]) ? 1 : -1;
  });
}

const productReducer = (
  state = { products: [], max: Infinity, category: 'ALL' },
  action
) => {
  switch (action.type) {
    case LOAD_PRODUCTS: {
      const { products } = action;
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

    case SORT_BY_ALPHA: {
      const products = action.direction.includes('asc')
        ? sortAscAlpha(state.products, 'title')
        : sortDesAlpha(state.products, 'title');
      return { ...state, products };
    }

    case SORT_BY_PRICE: {
      const products = action.direction.includes('asc')
        ? sortAscPrice(state.products, 'price', true)
        : sortDesPrice(state.products, 'price', true);
      return { ...state, products };
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
      products = products.filter((product) => {
        return product.country.name === country;
      });
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

// #region Filtering
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

const sortByAlpha = (direction) => {
  return {
    type: SORT_BY_ALPHA,
    direction,
  };
};
const sortByPrice = (direction) => {
  return {
    type: SORT_BY_PRICE,
    direction,
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
  sortByAlpha,
  sortByPrice,
};
export default productReducer;
