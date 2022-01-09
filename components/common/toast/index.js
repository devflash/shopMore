/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const box = css`
  position: fixed;
  background-color: #c0392b;
  color: #fff;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px;
  border-radius: 10px;
  bottom: 10px;
  transition: all 1s ease-in-out;
`;

const Toast = ({ error }) => {
  return <div css={[box]}>{error}</div>;
};

export default Toast;
