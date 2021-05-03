import axios from 'axios';
//delete country
//edit country
//create country

const LOAD_COUNTRIES = 'LOAD_COUNTRIES ';

const loadAllCountries = (countries) => {
  return { type: LOAD_COUNTRIES, countries };
};

const loadCountries = () => {
  return async (dispatch) => {
    try {
      const countries = (await axios.get('/api/countries')).data;
      dispatch(loadAllCountries(countries));
    } catch (err) {
      console.log(err);
    }
  };
};

const countriesReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_COUNTRIES: {
      return [...action.countries];
    }
    default: {
      return state;
    }
  }
};

export default countriesReducer;
