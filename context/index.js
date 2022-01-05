import { createContext } from 'react';
import { useContext } from 'react';
import useFireBaseAuth from '../hooks/useFirebaseAuth';

const authContext = createContext({
  createUser: async () => {},
  signInUser: async () => {},
  signOutUser: async () => {},
  authUser: null,
});
const AuthContextProvider = ({ children }) => {
  const auth = useFireBaseAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => useContext(authContext);

export default AuthContextProvider;
