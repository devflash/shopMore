/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useReducer } from 'react';
import { useAuth } from '../../context';
import Card from './card';
import { server } from '../../config';
import Button from '../common/button';
import { useRouter } from 'next/router';
import axios from 'axios';
import { getErrorMessage } from '../../utils/handleError';
import Toast from '../common/toast';
import Loader from '../common/loader';
import useLoader from '../../hooks/useLoader';

const wrapper = css`
  width: 90%;
  margin: 20px auto 0;
  max-width: 500px;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  h1 {
    font-size: 20px;
    margin-bottom: 10px;
  }
`;

const userName = css`
  font-size: 1.2rem;
`;

const noWishlistBox = css`
  text-align: center;
  margin-top: 20px;
  h3 {
    margin-bottom: 10px;
  }
`;

const initialState = {
  wishlist: [],
  serviceError: null,
  success: null,
};

const Wishlist = ({ userId }) => {
  const { authUser } = useAuth();
  const router = useRouter();

  const [state, dispatch] = useReducer((state, newState) => {
    return {
      ...state,
      ...newState,
    };
  }, initialState);

  const [{ isLoading, isBackdrop }, setLoading] = useLoader({});

  useEffect(() => {
    const fetchData = async () => {
      //start loader
      setLoading({ isLoading: true, isBackdrop: false });

      try {
        const { data } = await axios.get(`${server}/api/wishlist/${userId}`);
        const { msg } = data;
        if (msg === 'WISHLIST_FETCHED') {
          dispatch({ wishlist: data.userWishlist.slice() });
        }
        //stop loader
      } catch (e) {
        const error_code = e?.response?.data;
        const serviceError = getErrorMessage(error_code);
        dispatch({ serviceError });
        //show error toast
      }
      setLoading({ isLoading: false, isBackdrop: false });
    };
    userId && fetchData();
  }, [userId]);

  const handleAddToCart = async (product) => {
    try {
      setLoading({ isLoading: true, isBackdrop: true });

      const payload = {
        ...product,
      };
      const { data } = await axios.post(`${server}/api/cart/add`, payload);
      const { msg } = data;
      if (msg === 'PRODUCT_ADDED_CART') {
        dispatch({ success: 'Product has been added to your cart' });
        //show success toast
      }
    } catch (e) {
      const error_code = e?.response?.data;
      const serviceError = getErrorMessage(error_code);
      dispatch({ serviceError });
    }
    setLoading({ isLoading: false, isBackdrop: false });
  };

  const handleRemove = async (id) => {
    try {
      setLoading({ isLoading: true, isBackdrop: true });

      const { data } = await axios.delete(
        `${server}/api/wishlist/remove/${authUser.uid}/${id}`
      );
      const { msg } = data;
      if (msg === 'PRODUCT_REMOVED') {
        //show success toast;
        const userWishlist = state.wishlist.filter((cur) => cur.id !== id);
        dispatch({
          wishlist: userWishlist.slice(),
          success: 'Product has been removed from your wishlist',
        });
      }
    } catch (e) {
      const error_code = e?.response?.data;
      const serviceError = getErrorMessage(error_code);
      dispatch({ serviceError });
    }
    setLoading({ isLoading: false, isBackdrop: false });
  };

  return (
    <>
      <Toast
        open={state.serviceError || state.success}
        text={state.serviceError || state.success}
        callback={() => dispatch({ serviceError: '', success: '' })}
        isError={state.serviceError ? true : false}
      />
      <Loader isLoading={isLoading} isBackdrop={isBackdrop} />

      <div css={wrapper}>
        {authUser && (
          <h1 css={userName}>{`${authUser.displayName}'s wishlist`}</h1>
        )}
        {state.wishlist?.length > 0 ? (
          state.wishlist.map((cur) => (
            <Card
              key={cur.id}
              data={cur}
              handleAddToCart={handleAddToCart}
              handleRemove={handleRemove}
            />
          ))
        ) : (
          <div css={noWishlistBox}>
            <h3>You have no products in the wishlist.</h3>
            <Button
              customCss={{ fontSize: '14px' }}
              label="Go to products"
              onClick={() => router.push('/')}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Wishlist;
