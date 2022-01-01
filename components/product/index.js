/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Image from 'next/image';

const wrapper = css`
  padding-top: 50px;
  padding-bottom: 100px;
  max-width: 800px;
  margin: 0 auto;
  @media screen and (min-width: 600px) {
    display: flex;
    padding: 50px 25px 0;
  }
`;
const imageWrapper = css`
  height: 200px;
  width: 200px;
  margin: 0 auto;
  position: relative;
  @media screen and (min-width: 600px) {
    height: 300px;
    width: 300px;
  }
`;

const info = css`
  padding: 0 20px;
  margin-top: 25px;
  h2 {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }
  @media screen and (min-width: 600px) {
    flex: 1 1 60%;
    margin-top: 0;
  }
`;

const productinfo = css`
  margin-bottom: 20px;
`;

const fixedCartBtn = css`
  width: 100%;
  position: fixed;
  bottom: 0;
  padding: 15px 10px;
  border: none;
  outline: none;
  background-color: #ffd814;
  border-color: #fcd200;
  @media screen and (min-width: 600px) {
    display: none;
  }
`;

const row = css`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const inStock = css`
  color: #27ae60;
  font-weight: bold;
`;

const outOfStock = css`
  color: #c0392b;
  font-weight: bold;
`;

const btnContainer = css`
  display: flex;
  justify-content: space-between;
  width: 300px;
  margin: 20px auto 0;
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const productBtn = css`
  border: none;
  background-color: #ffd814;
  border-color: #fcd200;
  border-radius: 10px;
  padding: 12px 20px;
  cursor: pointer;
`;

const greyback = css`
  background-color: #95a5a6;
  color: #fff;
`;

const Product = ({ product }) => (
  <>
    <div css={wrapper}>
      <div css={imageWrapper}>
        <Image src={product.image} alt={product.title} layout="fill" />
      </div>
      <div css={info}>
        <h2>{product.title}</h2>
        <div css={productinfo}>
          <div css={row}>
            <span>Price: {product.price}</span>
            <span>Rating: {product.rating}</span>
          </div>
          <div css={row}>
            <span>Category: {product.category}</span>
            <span>
              Status:{' '}
              <span css={product.stock > 0 ? inStock : outOfStock}>
                In stock
              </span>
            </span>
          </div>
        </div>
        <p>{product.description}</p>
        <div css={btnContainer}>
          <button type="button" css={productBtn}>
            Add to wishlist
          </button>
          <button
            type="button"
            disabled={product.stock <= 0}
            css={[productBtn, product.stock <= 0 && greyback]}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
    <button type="button" css={fixedCartBtn}>
      Add to cart
    </button>
  </>
);

export default Product;
