import { Global, css } from '@emotion/react';

import AuthContextProvider from '../context';

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
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </>
  );
}

export default MyApp;
