/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Header from '../header';

const wrapper = css`
  height: 100%;
  background-color: #ecf0f1;
`;
const Layout = ({ children, layoutStyle }) => (
  <>
    <Header />
    <div css={[wrapper, layoutStyle]}>{children}</div>
  </>
);
export default Layout;
