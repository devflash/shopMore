/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Layout from '../../components/layout';
import OrderAddress from '../../components/OrderAddress';
const customLayout = css`
  min-height: calc(100vh - 78px);
  padding: 10px;
`;
const Address = () => (
  <Layout layoutStyle={customLayout}>
    <OrderAddress />
  </Layout>
);

export default Address;
