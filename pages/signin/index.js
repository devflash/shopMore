/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Layout from '../../components/layout';
import SignIn from '../../components/signIn';
const customLayout = css`
  height: calc(100vh - 62px);
`;

const Signin = () => (
  <Layout layoutStyle={customLayout}>
    <SignIn />
  </Layout>
);

export default Signin;
