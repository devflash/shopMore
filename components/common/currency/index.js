/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { BiEuro } from 'react-icons/bi';

const currencyCss = css`
  font-size: 16px;
`;

const Currency = () => <BiEuro css={currencyCss} />;

export default Currency;
