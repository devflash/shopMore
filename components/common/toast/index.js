/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import { useEffect } from 'react';

const box = (isError) => css`
  position: fixed;
  background-color: ${isError ? '#c0392b' : '#2ecc71'};
  color: #fff;
  left: 50%;
  transform: translateX(-50%) scale(0);
  padding: 10px;
  border-radius: 5px;
  top: 80px;
  transition: all 1s ease-in;
  min-width: 250px;
  width: auto;
  text-align: center;
  z-index: 999;
`;

const show = css`
  transform: translateX(-50%) scale(1);
`;

const hide = css`
  display: none;
`;

const Toast = ({ open, text, isError, callback }) => {
  useEffect(() => {
    if (open) {
      if (interval) {
        clearInterval(interval);
      }
      let interval = setTimeout(() => {
        callback();
      }, 5000);
    }
  }, [open]);
  return <div css={[box(isError), open ? show : hide]}>{text}</div>;
};

export default Toast;
