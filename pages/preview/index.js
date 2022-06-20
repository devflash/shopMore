/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Layout from '../../components/layout';
import PreviewComp from '../../components/preview';

const layoutStyle = css`
  min-height: calc(100vh - 62px);
  padding-top: 30px;
`;

const Preview = () => (
  <Layout layoutStyle={layoutStyle}>
    <PreviewComp />
  </Layout>
);

export default Preview;
