import { createContext } from 'react';
import { useContext } from 'react';
import useFireBaseAuth from '../hooks/useFirebaseAuth';
import useOrders from '../hooks/useOrders';
const authContext = createContext({
  createUser: async () => {},
  signInUser: async () => {},
  signOutUser: async () => {},
  authUser: null,
});

const orderContext = createContext({
  cart: null,
  address: null,
  updateCart: () => {},
  updateAddress: () => {},
});

const AuthContextProvider = ({ children }) => {
  const auth = useFireBaseAuth();
  const order = useOrders();

  return (
    <authContext.Provider value={auth}>
      <orderContext.Provider value={order}>{children}</orderContext.Provider>
    </authContext.Provider>
  );
};

export const useAuth = () => useContext(authContext);
export const useOrderContext = () => useContext(orderContext);
export default AuthContextProvider;
