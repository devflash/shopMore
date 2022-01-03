import { auth } from '../utils/firebase';

const useFireBaseAuth = () => {
  // const [authUser, setAuthUser] = useState(null);

  const createUser = async (email, password) => {
    return await auth.createUserWithEmailAndPassword(email, password);
  };

  return {
    createUser,
  };
};

export default useFireBaseAuth;
