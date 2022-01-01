import { Global, css } from '@emotion/react';
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Global
        styles={css`
          *,
          ::before,
          ::after {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-size: 16px;
          }
        `}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
