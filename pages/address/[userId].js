/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Layout from '../../components/layout';
import OrderAddress from '../../components/OrderAddress';
import { server } from '../../config';

const customLayout = css`
  min-height: calc(100vh - 78px);
  padding: 10px;
`;
const Address = ({ addresses = [] }) => (
  <Layout layoutStyle={customLayout}>
    <OrderAddress addresses={addresses} />
  </Layout>
);

export default Address;

export const getServerSideProps = async (context) => {
  const {
    params: { userId },
  } = context;
  const data = await fetch(`${server}/api/address/all/${userId}`);
  const addresses = await data.json();
  return {
    props: {
      addresses,
    },
  };
};
