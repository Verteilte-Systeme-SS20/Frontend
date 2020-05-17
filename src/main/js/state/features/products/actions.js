import * as types from './types';

export const fetchProducts = () => ({
  type: types.FETCH_PRODUCTS,
  meta: {
    path: '/products',
    method: 'GET'
  }
});