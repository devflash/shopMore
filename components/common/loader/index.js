/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import ClipLoader from 'react-spinners/PropagateLoader';

const container = (isBackdrop) => css`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${isBackdrop ? 'rgba(0, 0, 0, 0.5)' : '#fff'};
  width: 100%;
  z-index: 9999;
`;

const Loader = ({ isLoading, isBackdrop }) => {
  return (
    <>
      {isLoading ? (
        <div css={container(isBackdrop)}>
          <ClipLoader size="30" color="#ffd814" />
        </div>
      ) : null}
    </>
  );
};

export default Loader;
