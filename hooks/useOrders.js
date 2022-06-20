import { useReducer } from 'react';

const initialState = {
  cart: {
    items: [],
    totalCost: null,
  },
  address: null,
};
const useOrders = () => {
  const [state, dispatch] = useReducer((state, newState) => {
    return {
      ...state,
      ...newState,
    };
  }, initialState);

  const updateCart = (newCart) => dispatch(newCart);

  const updateAddress = (newAddress) => dispatch({ address: newAddress });

  return {
    cart: state.cart,
    address: state.address,
    updateCart,
    updateAddress,
  };
};

export default useOrders;
