/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Layout from '../../components/layout';
import Product from '../../components/product';
import { server } from '../../config';

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
  const response = await fetch(`${server}/api/product/${productId}`);
  const data = await response.json();
  return {
    props: {
      product: data,
    },
  };
};
