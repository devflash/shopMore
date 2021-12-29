/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';

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

const Products = ({ products }) => (
  <div css={wrapper}>
    {products.map((cur) => (
      <Link href={`/product/${cur.id}`} key={cur.id} passHref>
        <a css={productLink}>
          <div css={card}>
            <div css={imageWrapper}>
              <Image src={cur.image} alt={cur.title} layout="fill" />
            </div>

            <h3>{cur.title}</h3>
            <div css={productinfo}>
              <span>Cost: {cur.price}</span>
              <span>Rating: {cur.rating.rate}</span>
            </div>
          </div>
        </a>
      </Link>
    ))}
  </div>
);

export default Products;
