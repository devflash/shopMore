/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Layout from '../../components/layout';
import OrdersComp from '../../components/orders';
import { server } from '../../config';

const layoutStyle = css`
  min-height: calc(100vh - 62px);
  padding-top: 30px;
  padding-bottom: 30px;
  height: auto;
`;

const Orders = ({ orders }) => (
  <Layout layoutStyle={layoutStyle}>
    <OrdersComp orders={orders} />
  </Layout>
);

export const getServerSideProps = async (context) => {
  const {
    params: { userId },
  } = context;
  const response = await fetch(`${server}/api/orders/${userId}`, {
    method: 'GET',
  });

  const orders = await response.json();

  return {
    props: {
      orders,
    },
  };
};

export default Orders;
