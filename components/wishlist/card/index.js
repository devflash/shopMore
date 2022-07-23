/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Image from 'next/image';
import Button from '../../common/button';
import Currency from '../../common/currency';

const box = css`
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 4px 2px 10px 0px #95a5a6;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const imageWrapper = css`
  height: 80px;
  width: 100px;
  position: relative;
  @media screen and (min-width: 600px) {
    height: 100px;
    width: 100px;
  }
`;
const info = css`
  margin-left: 10px;
`;

const inStock = css`
  color: #27ae60;
  font-weight: bold;
`;

const outOfStock = css`
  color: #c0392b;
  font-weight: bold;
`;

const productInfo = css`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const wishlistBtn = css`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;
const cartBtn = css`
  margin-right: 5px;
`;
const removeBtn = css`
  background-color: #e74c3c;
`;

const productTitle = css`
  font-size: 1.2rem;
  font-weight: 800;
`;

const cost = css`
  display: flex;
  align-items: center;
`;

const Card = ({ data, handleAddToCart, handleRemove }) => (
  <div css={box}>
    <div css={imageWrapper}>
      <Image src={data.image} alt={data.title} layout="fill" />
    </div>
    <div css={info}>
      <p css={productTitle}>{data.title}</p>
      <p>Category: {data.category}</p>
      <p css={productInfo}>
        <span css={cost}>
          Cost: <Currency />
          {data.price}
        </span>
        <span css={data.stock > 0 ? inStock : outOfStock}>
          {data.stock > 0 ? 'In stock' : 'Out of stock'}
        </span>
      </p>
      <div css={wishlistBtn}>
        <Button
          onClick={(e) => handleAddToCart(data)}
          customCss={cartBtn}
          label="Add to cart"
        ></Button>
        <Button
          label="Remove"
          customCss={removeBtn}
          onClick={() => handleRemove(data.id)}
        ></Button>
      </div>
    </div>
  </div>
);

export default Card;
