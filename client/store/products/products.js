import axios from 'axios';

const LOAD_PRODUCTS = 'LOAD_PRODUCTS ';
const DELETE_PRODUCT = 'DELETE_PRODUCT';
const POST_PRODUCT = 'POST_PRODUCT';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

export const productReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_PRODUCTS: {
      return [...action.products];
    }
    case POST_PRODUCT: {
      return [...state, action.product];
    }
    case DELETE_PRODUCT: {
      return state.filter((product) => product.id !== action.product.id);
    }
    case UPDATE_PRODUCT: {
      return state.map((product) => {
        return product.id === action.product.id ? action.product : product;
      });
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
    const product = (
      await axios.post('/api/products', {
        newProduct,
      })
    ).data;
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
      await axios.put(`/api/products/${updatedProduct.id}`, {
        updatedProduct,
      })
    ).data;
    dispatch(updatingProduct(product));
    history.push('/products');
  };
};

export { loadProducts, postProduct, deleteProduct, updateProduct };
