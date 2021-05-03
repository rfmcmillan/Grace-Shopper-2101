import axios from 'axios';

const GET_PRODUCT = 'GET_PRODUCT';

const _getSingleProduct = (product) => {
  return {
    type: GET_PRODUCT,
    product,
  };
};

export const getSingleProduct = (id) => {
  return async (dispatch) => {
    try {
      const product = (await axios.get(`/api/products/${id}`)).data;
      dispatch(_getSingleProduct(product));
    } catch (error) {
      console.log(error);
    }
  };
};

export default (state = {}, action) => {
  switch (action.type) {
    case GET_PRODUCT: {
      return { ...action.product };
    }
    default: {
      return state;
    }
  }
};
