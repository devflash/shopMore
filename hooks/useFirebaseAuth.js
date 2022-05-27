import { useState, useEffect } from 'react';
import { auth } from '../utils/firebase';
import nookies from 'nookies';

const useFireBaseAuth = () => {
  const [authUser, setAuthUser] = useState(null);

  const createUser = async (email, password, displayName) => {
    try {
      const result = await auth.createUserWithEmailAndPassword(email, password);
      await result.user.updateProfile({ displayName });
      debugger;
      return result;
    } catch (e) {
      throw e;
    }
  };

  const signInUser = async (email, password) => {
    try {
      return await auth.signInWithEmailAndPassword(email, password);
    } catch (e) {
      throw e;
    }
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
      nookies.set(undefined, 'token', token, {
        maxAge: 5 * 60,
        path: '/',
      });
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
