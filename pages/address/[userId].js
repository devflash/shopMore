/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Layout from '../../components/layout';
import OrderAddress from '../../components/OrderAddress';
import { useRouter } from 'next/router';
const customLayout = css`
  min-height: calc(100vh - 78px);
  padding: 10px;
`;
const Address = () => {
  const router = useRouter();
  const { userId } = router.query;
  return (
    <Layout layoutStyle={customLayout}>
      <OrderAddress userId={userId} />
    </Layout>
  );
};

export default Address;
