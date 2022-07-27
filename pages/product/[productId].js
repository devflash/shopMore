/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Layout from '../../components/layout';
import Product from '../../components/product';
import { server } from '../../config';
import axios from 'axios';

const layoutStyle = css`
  background-color: #fff;
`;

const ProductPage = ({ product }) => (
  <Layout layoutStyle={layoutStyle}>
    <Product product={product} />
  </Layout>
);

export default ProductPage;

export const getServerSideProps = async (context) => {
  const {
    params: { productId },
  } = context;
  const { data } = await axios.get(
    `http://localhost:3001/api/product/${productId}`
  );

  return {
    props: {
      product: data,
    },
  };
};
