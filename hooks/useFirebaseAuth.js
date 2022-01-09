import { useState, useEffect } from 'react';
import { auth } from '../utils/firebase';
import nookies from 'nookies';

const useFireBaseAuth = () => {
  const [authUser, setAuthUser] = useState(null);

  const createUser = async (email, password, displayName) => {
    return await auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) =>
        result.user
          .updateProfile({
            displayName,
          })
          .then(() => result)
      );
  };

  const signInUser = async (email, password) => {
    return await auth.signInWithEmailAndPassword(email, password);
  };

  const signOutUser = async () => {
    return await auth.signOut();
  };

  const authChanged = async (user) => {
    if (!user) {
      setAuthUser(null);
      nookies.set(undefined, 'token', '', { path: '/' });
    } else {
      const token = await user.getIdToken();
      setAuthUser(user);
      nookies.set(undefined, 'token', token, { path: '/' });
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged(authChanged);
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    createUser,
    signInUser,
    signOutUser,
  };
};

export default useFireBaseAuth;
