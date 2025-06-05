import { legacy_createStore, combineReducers } from 'redux';

const initialState = {
  countries: [],
  region: 'All',
  loading: false,
  error: null,
};

const countriesReducer = (state = initialState.countries, action: any) => {
  switch (action.type) {
    case 'SET_COUNTRIES':
      return action.countries;
    default:
      return state;
  }
};

const regionReducer = (state = initialState.region, action: any) => {
  switch (action.type) {
    case 'SET_REGION':
      return action.region;
    default:
      return state;
  }
};

const loadingReducer = (state = initialState.loading, action: any) => {
  switch (action.type) {
    case 'SET_LOADING':
      return action.loading;
    default:
      return state;
  }
};

const errorReducer = (state = initialState.error, action: any) => {
  switch (action.type) {
    case 'SET_ERROR':
      return action.error;
    default:
      return state;
  }
};

// Combine the reducers
const rootReducer = combineReducers({
  countries: countriesReducer,
  region: regionReducer,
  loading: loadingReducer,
  error: errorReducer,
});

// Create the store
const store = legacy_createStore(rootReducer, initialState);

export default store;