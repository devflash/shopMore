/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useReducer } from 'react';
import { useAuth } from '../../context';
import Card from './card';
import { server } from '../../config';
import Button from '../common/button';
import { useRouter } from 'next/router';

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

  useEffect(() => {
    const fetchData = async () => {
      //start loader
      try {
        const response = await fetch(`${server}/api/wishlist/${userId}`, {
          method: 'GET',
        });
        const data = await response.json();
        if (data.msg === 'WISHLIST_FETCHED') {
          dispatch({ wishlist: data.userWishlist.slice() });
        }
        //stop loader
      } catch (e) {
        console.log(e);
        //show error toast
      }
    };
    userId && fetchData();
  }, [userId]);

  const handleAddToCart = async (product) => {
    try {
      const payload = {
        ...product,
      };
      const response = await fetch(`${server}/api/cart/add`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (data.msg === 'PRODUCT_ADDED_CART') {
        alert('Product added to cart');
        //show success toast
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleRemove = async (id) => {
    try {
      const response = await fetch(
        `${server}/api/wishlist/remove/${userId}/${id}`,
        {
          method: 'DELETE',
        }
      );
      const data = await response.json();
      if (data.msg === 'PRODUCT_REMOVED') {
        //show success toast;
        const userWishlist = state.wishlist.filter((cur) => cur.id !== id);
        dispatch({ wishlist: userWishlist.slice() });
      }
    } catch (e) {}
  };

  return (
    <>
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
