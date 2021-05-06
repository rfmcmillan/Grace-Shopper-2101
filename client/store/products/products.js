import axios from 'axios';

const LOAD_PRODUCTS = 'LOAD_PRODUCTS ';
const DELETE_PRODUCT = 'DELETE_PRODUCT';
const POST_PRODUCT = 'POST_PRODUCT';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
const SET_MAX_FILTER = 'SET_MAX_FILTER';

const productReducer = (state = { products: [], max: Infinity }, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS: {
      return { ...state, products: [...action.products] };
    }
    case POST_PRODUCT: {
      return { ...state, products: [...state.products, action.product] };
    }
    case DELETE_PRODUCT: {
      const products = state.products.filter(
        (product) => product.id !== action.productId
      );
      return { ...state, products };
    }

    case UPDATE_PRODUCT: {
      const products = state.products.map((product) => {
        return product.id === action.product.id ? action.product : product;
      });
      return { ...state, products };
    }

    case SET_MAX_FILTER: {
      return { ...state, max: action.max };
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

const setMax = (max) => {
  return {
    type: SET_MAX_FILTER,
    max,
  };
};

// The put for product might need to updated...
// If a location is passed through it will be added.
const updateProduct = (updatedProduct, history) => {
  return async (dispatch) => {
    const product = (
      await axios.put(`/api/products/${updatedProduct.id}`, updatedProduct)
    ).data;
    dispatch(updatingProduct(product));
    history.push('/manage-products');
  };
};

export { loadProducts, postProduct, deleteProduct, updateProduct, setMax };
export default productReducer;
