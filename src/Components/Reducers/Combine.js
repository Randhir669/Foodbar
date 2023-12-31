import { combineReducers } from 'redux';
import cartReducer from './CartReducers';

const rootReducer = combineReducers({
  cart: cartReducer,
  // Add other reducers if needed
});

export default rootReducer;