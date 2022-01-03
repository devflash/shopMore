/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Layout from '../../components/layout';
import SignUp from '../../components/signUp';
const customLayout = css`
  height: calc(100vh - 62px);
`;

const Signup = () => (
  <Layout layoutStyle={customLayout}>
    <SignUp />
  </Layout>
);

export default Signup;
