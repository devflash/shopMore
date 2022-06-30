import { useReducer } from 'react';

const useLoader = ({ isLoading = false, isBackdrop = false }) => {
  const [loading, setLoading] = useReducer(
    (state, newState) => {
      return {
        ...state,
        ...newState,
      };
    },
    { isLoading, isBackdrop }
  );
  return [loading, setLoading];
};

export default useLoader;
