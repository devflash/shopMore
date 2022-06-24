/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Button from '../../common/button';
const wrapper = css`
  p {
    font-size: 18px;
    text-align: center;
    margin-bottom: 10px;
    color: #7f8c8d;
  }
`;

const bold = css`
  color: #000;
  font-weight: 600;
`;

const ConfirmPaymentDialog = ({ orderRef }) => {
  return (
    <div css={wrapper}>
      <p>
        Your order ref <span css={bold}>{orderRef}</span> has been placed. Thank
        you for shopping with us.
      </p>
      <Button label="My orders" />
    </div>
  );
};

export default ConfirmPaymentDialog;
