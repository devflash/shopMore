/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const btnCSS = css`
  border: none;
  background-color: #ffd814;
  border-color: #fcd200;
  border-radius: 10px;
  padding: 12px 20px;
  cursor: pointer;
  margin: 0 auto;
`;

const Button = ({ onClick, customCss, label }) => (
  <button type="button" css={[btnCSS, customCss]} onClick={(e) => onClick(e)}>
    {label}
  </button>
);

export default Button;
