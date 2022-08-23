/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Layout from '../../components/layout';
import Product from '../../components/product';
import { useRouter } from 'next/router';

const layoutStyle = css`
  background-color: #fff;
`;

const ProductPage = ({ product }) => {
  const router = useRouter();
  const { productId } = router.query;
  return (
    <Layout layoutStyle={layoutStyle}>
      <Product productId={productId} />
    </Layout>
  );
};

export default ProductPage;
