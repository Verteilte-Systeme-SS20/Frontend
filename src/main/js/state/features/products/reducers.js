import { combineReducers } from 'redux';
import * as types from './types';
import { createReducer } from '../../utils';

/* State shape
{
    products: [ product ],
}
*/

const productsReducer = createReducer([])({
  [types.FETCH_PRODUCTS_COMPLETED]: (state, action) => action.payload,
  [types.FETCH_PRODUCTS_FAILED]: (state, action) => []
});

export default combineReducers({
  products: productsReducer
});
