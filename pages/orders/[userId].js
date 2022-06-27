/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Layout from '../../components/layout';
import OrdersComp from '../../components/orders';
import { useRouter } from 'next/router';

const layoutStyle = css`
  min-height: calc(100vh - 62px);
  padding-top: 30px;
  padding-bottom: 30px;
  height: auto;
`;

const Orders = () => {
  const router = useRouter();
  const { userId } = router.query;
  return (
    <Layout layoutStyle={layoutStyle}>
      <OrdersComp userId={userId} />
    </Layout>
  );
};

export default Orders;
