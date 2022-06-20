/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Image from 'next/image';
import Button from '../common/button';
import { useOrderContext } from '../../context';

const wrapper = css`
  width: 90%;
  margin: 0 auto 20px;
  max-width: 500px;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  h1 {
    font-size: 20px;
    text-align: center;
    margin-bottom: 10px;
  }
  p {
    color: #7f8c8d;
    text-align: center;
    font-size: 14px;
  }
`;

const confirmationBox = css`
  margin-bottom: 10px;
`;
const row = css`
  border: 1px solid #95a5a6;
  border-radius: 5px;
  padding: 8px;
  margin-top: 15px;
  p {
    text-align: left;
    color: #000;
    font-size: 17px;
  }
`;

const rowTop = css`
  display: flex;
  justify-content: space-between;
`;

const productBox = css`
  display: flex;
  margin-top: 10px;
`;

const imageWrapper = css`
  position: relative;
  height: 40px;
  width: 40px;
`;

const productInfo = css`
  display: flex;
  justify-content: space-between;
  flex: 1 1 auto;
  align-items: center;
  padding: 0 10px 0 10px;
`;

const bold = css`
  color: #2c3e50;
  font-weight: 600;
`;

const addressText = css`
  margin: 10px 8px 0;
  text-align: center;
  span {
    font-size: 14px;
  }
`;

const boldBlack = css`
  color: #000;
  font-weight: 600;
`;

const editButton = css`
  font-size: 12px;
  padding: 10px 15px;
  margin: unset;
  color: #fff;
  background-color: #34495e;
`;

const costSummary = css``;
const summary = css`
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  span {
    display: block;
    &:first-child {
      color: #2c3e50;
      font-weight: 600;
    }
  }
`;

const Preview = () => {
  const { cart, address } = useOrderContext();

  return (
    <div css={wrapper}>
      <h1>Order confirmation</h1>
      <p>
        Please confirm your order and address before continue with the payment.
      </p>
      <div css={confirmationBox}>
        <div css={row}>
          <p>Products</p>
          {cart?.items.length > 0 &&
            cart.items.map((item) => (
              <div key={item.id} css={productBox}>
                <div css={imageWrapper}>
                  <Image src={item.image} alt={item.title} layout="fill" />
                </div>
                <div css={productInfo}>
                  <div>
                    <span>{item.title}</span>
                  </div>

                  <div>
                    <span css={bold}>Quantity: </span>
                    <span>{item.count}</span>
                  </div>
                  <div>
                    <span css={bold}>Cost: </span>
                    <span>{item.price}</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div css={row}>
          <div css={rowTop}>
            <p>Address</p>
            <Button label="Edit" customCss={editButton}></Button>
          </div>
          <div css={addressText}>
            <span css={boldBlack}>{address?.fullName} </span>
            {address?.addressLine1}, {address?.addressLine2}, {address?.town},{' '}
            {address?.postcode}, {address?.country}, Phone number:{' '}
            {address?.phoneNumber}
          </div>
        </div>
        <div css={row}>
          <p>Cost Summary</p>
          <div css={costSummary}>
            <div css={summary}>
              <span>SubTotal: </span>
              <span>{cart.totalCost}</span>
            </div>
            <div css={summary}>
              <span>Delivery: </span>
              <span>5</span>
            </div>
            <div css={summary}>
              <span>Total: </span>
              <span>{cart.totalCost + 5}</span>
            </div>
          </div>
        </div>
      </div>
      <Button label="Make payment" />
    </div>
  );
};

export default Preview;
