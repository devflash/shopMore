/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const label = css`
  font-size: 1rem;
  font-weight: bold;
`;
const input = css`
  border: 1px solid #95a5a6;
  border-radius: 10px;
  padding: 10px;
  width: 100%;
  margin-top: 5px;
  background: #ecf0f1;
`;

const Input = ({ labelTitle, value, onValueChange, customCss }) => (
  <>
    <label css={label}>{labelTitle}</label>
    <input
      id="firstName"
      value={value}
      css={[input, customCss]}
      onChange={onValueChange}
    />
  </>
);

export default Input;
