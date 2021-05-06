import axios from 'axios';
//load categories
//add category
//delete category

const LOAD_CATEGORIES = 'LOAD_CATEGORIES';
const ADD_CATEGORY = 'ADD_CATEGORY ';
const DELETE_CATEGORY = 'DELETE_CATEGORY ';

// ACTION CREATORS
const loadAllCategories = (categories) => {
  return { type: LOAD_CATEGORIES, categories };
};

const _addCategory = (category) => {
  return { type: ADD_CATEGORY, category };
};

const _deleteCategory = (categoryId) => {
  return { type: DELETE_CATEGORY, categoryId };
};

//THUNKS
const loadCategories = () => {
  return async (dispatch) => {
    try {
      const { categories } = (await axios.get('/api/categories')).data;
      dispatch(loadAllCategories(categories));
    } catch (err) {
      console.log(err);
    }
  };
};

const addCategory = (category) => {
  return async (dispatch) => {
    try {
      const newCategory = (await axios.post('/api/categories'), category).data;
      dispatch(loadAllCategories(newCategory));
    } catch (err) {
      console.log(err);
    }
  };
};

const deleteCateogry = (categoryId) => {
  return async (dispatch) => {
    try {
      await axios.post(`/api/categories/${categoryId}`);
      dispatch(loadAllCategories(categoryId));
    } catch (err) {
      console.log(err);
    }
  };
};

const categoriesReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_CATEGORIES: {
      return [...action.categories];
    }

    case ADD_CATEGORY: {
      return [...state, action.category];
    }
    case DELETE_CATEGORY: {
      return state.filter((category) => category.id !== action.categoryId);
    }
    default: {
      return state;
    }
  }
};

export { loadCategories, addCategory, deleteCateogry };
export default categoriesReducer;
