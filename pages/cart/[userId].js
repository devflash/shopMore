/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Layout from '../../components/layout';
import CartItems from '../../components/cartItems';
import { useRouter } from 'next/router';

const customLayout = css`
  height: calc(100vh - 78px);
  padding: 10px;
`;

const Cart = ({ items }) => {
  const router = useRouter();
  const { userId } = router.query;
  return (
    <Layout layoutStyle={customLayout}>
      <CartItems userId={userId} />
    </Layout>
  );
};

export default Cart;
