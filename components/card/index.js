/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Image from 'next/image';
import Button from '../common/button';

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

const cost = css`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const customCss = css`
  float: right;
  margin-top: 10px;
`;

const productTitle = css`
  font-size: 1.2rem;
  font-weight: 800;
`;

const Card = ({ data }) => (
  <div css={box}>
    <div css={imageWrapper}>
      <Image src={data.image} alt={data.title} layout="fill" />
    </div>
    <div css={info}>
      <p css={productTitle}>{data.title}</p>
      <p>Category: {data.category}</p>
      <p css={cost}>
        <span>Cost: {data.price}</span>
        <span css={data.stock > 0 ? inStock : outOfStock}>
          {data.stock > 0 ? 'In stock' : 'Out of stock'}
        </span>
      </p>
      <Button
        onClick={(e) => {}}
        customCss={customCss}
        label="Add to cart"
      ></Button>
    </div>
  </div>
);

export default Card;
