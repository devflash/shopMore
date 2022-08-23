/** @jsxImportSource @emotion/react */
import { useEffect, useReducer } from 'react';
import { css } from '@emotion/react';
// import Image from 'next/image';
import Link from 'next/link';
import Currency from '../common/currency';
import axios from 'axios';
import { server } from '../../config';
import Loader from '../common/loader';
import useLoader from '../../hooks/useLoader';
import { getErrorMessage } from '../../utils/handleError';

const wrapper = css`
  width: 90vw;
  margin: 0px auto;
  padding-top: 50px;
  @media screen and (min-width: 376px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  @media screen and (min-width: 1200px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;
const productLink = css`
  display: block;
  text-decoration: none;
  color: #000000;
  margin-bottom: 20px;
`;

const card = css`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  padding: 20px 10px;
  background-color: #fff;
  box-shadow: 4px 2px 10px 0px #95a5a6;
  h3 {
    font-size: 1.2rem;
    margin-top: 12px;
  }
`;
const imageWrapper = css`
  height: 200px;
  width: 200px;
  margin: 0 auto;
  position: relative;
`;

const productinfo = css`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  width: 80%;
  margin: 15px auto;
  span {
    font-size: 1.1rem;
  }
`;

const cost = css`
  display: flex;
  align-items: center;
`;

const imageStyle = css`
  height: 100%;
  width: 100%;
`;

const initialState = {};

const Products = () => {
  const [state, dispatch] = useReducer((state, newState) => {
    return {
      ...state,
      ...newState,
    };
  }, initialState);

  const [{ isLoading, isBackdrop }, setLoading] = useLoader({});

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading({ isLoading: true, isBackdrop: false });

      try {
        const { data } = await axios.get(`${server}/api/products`);
        dispatch({ products: data });
      } catch (e) {
        const error_code = e.response.data;
        const serviceError = getErrorMessage(error_code);
        dispatch({ serviceError });
      }
      setLoading({ isLoading: false, isBackdrop: false });
    };
    fetchProducts();
  }, []);

  return (
    <>
      <Loader isLoading={isLoading} isBackdrop={isBackdrop} />

      {state?.products?.length > 0 && (
        <div css={wrapper}>
          {state.products.map((cur) => (
            <Link href={`/product/${cur.productId}`} key={cur.id} passHref>
              <a css={productLink}>
                <div css={card}>
                  <div css={imageWrapper}>
                    <img src={cur.image} alt={cur.title} css={imageStyle} />
                  </div>

                  <h3>{cur.title}</h3>
                  <div css={productinfo}>
                    <span css={cost}>
                      Cost: <Currency />
                      {cur.price}
                    </span>
                    <span>Rating: {cur.rating}</span>
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Products;
