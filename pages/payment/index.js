/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Layout from '../../components/layout';
import PaymentComp from '../../components/payment';

const layoutStyle = css`
  min-height: calc(100vh - 62px);
  padding-top: 30px;
  padding-bottom: 30px;
  height: auto;
`;

const Payment = () => (
  <Layout layoutStyle={layoutStyle}>
    <PaymentComp />
  </Layout>
);

export default Payment;
