import axios from 'axios';

const getProducts = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:5000/api/products');
    dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_PRODUCTS_FAILURE', payload: error.message });
  }
};

export {getProducts};
