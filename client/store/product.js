import axios from 'axios';

const productsActionTypes = {
  LOAD_PRODUCTS: 'LOAD_PRODUCTS ',
  DELETE_PRODUCT: 'DELETE_PRODUCT',
  POST_PRODUCT: 'POST_PRODUCT',
  UPDATE_PRODUCT: 'UPDATE_PRODUCT',
};

export const productReducer = (state = [], action) => {
  switch (action.type) {
    case productActionTypes.LOAD_PRODUCTS:
      return action.payload;
    case productActionTypes.POST_PRODUCT:
      return [...state, action.product];
    case productActionTypes.DELETE_PRODUCT:
      return state.filter((product) => product.id !== action.product.id);
    case productActionTypes.UPDATE_PRODUCT:
      return state.map((product) => {
        return product.id === action.product.id ? action.product : product;
      });
    default:
      return state;
  }
};

const loadingProducts = (data) => ({
  type: productsActionTypes.LOAD_PRODUCTS,
  payload: data,
});

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
  return {type: productsActionTypes.POST_PRODUCT,product,};
};

const postProduct = ( title,brand,description,price,inventory,imageUrl,location) => {
  return async (dispatch) => {
    const product = (
      await axios.post('/api/products', {title,brand,description,price,inventory,imageUrl,location})
    ).data;
    dispatch(postingProduct(product));
    history.push('/products');
  };
};

const deletingProduct = (product) => {
  return {productsActionTypes.DELETE_PRODUCT,product,
  };
};

const deleteProduct = (product, history) => {
  return async (dispatch) => {
    await axios.delete(`/api/products/${product.id}`);
    dispatch(deletingProduct(product));
    history.push('/products');
  };
};
const updatingProduct = (product) => {
  return {type:productsActionTypes.UPDATE_PRODUCT,product,
  };
};

//Sould I add id as one of the parameters???
const updateProduct = ( title,brand,description,price,inventory,imageUrl,location,history) => {
  return async (dispatch) => {
    const product = (
      await axios.put(`/api/products/${id}`,{title,brand,description,price,inventory,imageUrl,location,
      })
    ).data;
    dispatch(updatingProduct(product));
    history.push('/products');
  };
};

export { loadProducts, postProduct, deleteProduct, updateProduct };
