/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Image from 'next/image';
import Button from '../common/button';
import { useAuth } from '../../context';
import { server } from '../../config';
import { useReducer, useEffect } from 'react';

const wrapper = css`
  width: 90%;
  max-width: 500px;
  background-color: #fff;
  border-radius: 10px;
  margin: 0 auto;
  padding: 20px 10px;
  & > h1 {
    font-size: 20px;
    text-align: center;
  }
`;

const ordersBox = css`
  margin: 20px 10px;
`;

const order = css`
  border: 1px solid #7f8c8d;
  border-radius: 10px;
  overflow: auto;
  margin-bottom: 10px;
`;

const imageWrapper = css`
  position: relative;
  height: 50px;
  width: 50px;
`;

const productDetails = css`
  margin-left: 10px;

  p {
    color: #2c3e50;
    margin-bottom: 10px;
    font-weight: bold;
  }
`;

const buyBtn = css`
  font-size: 12px;
  padding: 8px 20px;
  margin: 0 auto 0 0;
`;

const cancelBtn = css`
  background-color: #e74c3c;
  color: #fff;
  border: 1px solid #e74c3c;
  font-size: 12px;
  padding: 10px 18px;
  margin: 0;
`;

const orderTop = css`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #7f8c8d;
  padding: 10px;
  background-color: #f0f2f2;
`;
const orderBody = css`
  display: flex;
  padding: 10px;
`;

const orderBottom = css`
  border-top: 1px solid #7f8c8d;
  padding: 10px;
  display: flex;
  flex-direction: column;
`;
const row = css`
  display: flex;
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }
`;
const leftColumn = css`
  flex: 1 1 50%;
  & > p {
    font-size: 14px;
    color: #000;
    &:first-child {
      color: #7f8c8d;
    }
  }
`;
const rightColumn = css`
  flex: 1 1 50%;
  text-align: right;
  & > p {
    font-size: 14px;
    color: #000;
    &:first-child {
      color: #7f8c8d;
    }
  }
`;

const initialState = {
  orders: [],
};

const Orders = ({ userId }) => {
  const { authUser } = useAuth();
  const [state, dispatch] = useReducer((state, newState) => {
    return {
      ...state,
      ...newState,
    };
  }, initialState);

  useEffect(() => {
    const fetchData = async () => {
      //start loader
      try {
        const response = await fetch(`${server}/api/orders/${userId}`, {
          method: 'GET',
        });
        const data = await response.json();
        if (data.msg === 'ORDERS_FETCHED') {
          dispatch({ orders: data.orders.slice() });
        }
      } catch (e) {
        console.log(e);
      }
      //stop loader
    };
    fetchData();
  }, []);

  const cancelOrder = async (orderRef) => {
    try {
      const response = await fetch(
        `${server}/api/order/cancel/${authUser.uid}/${orderRef}`,
        {
          method: 'DELETE',
        }
      );
      const data = await response.json();
      if (data.msg === 'ORDER_CANCELLED') {
        //show success toast
        const newOrders = state.orders.filter(
          (cur) => cur.orderRef !== orderRef
        );
        debugger;
        dispatch({ orders: newOrders.slice() });
        alert('Order cencelled');
      }
    } catch (e) {}
  };

  const handleBuyAgain = async (item) => {
    const payload = {
      ...item,
    };
    try {
      const response = await fetch(`${server}/api/cart/add`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (data.msg === 'PRODUCT_ADDED_CART') {
        // alert('Product added to cart');
      }
    } catch (e) {}
  };

  return (
    <div css={wrapper}>
      <h1>Track your orders</h1>
      <div css={ordersBox}>
        {state.orders.length > 0 &&
          state.orders.map((cur) => (
            <>
              <div key={cur.orderRef} css={order}>
                <div css={orderTop}>
                  <div>
                    <p>Order reference</p>
                    <p>{cur.orderRef}</p>
                  </div>
                  {new Date(cur.deliveryDate) > new Date(cur.orderDate) && (
                    <Button
                      label="Cancel Order"
                      customCss={cancelBtn}
                      onClick={() => cancelOrder(cur.orderRef)}
                    />
                  )}
                </div>
                {cur.items.length > 0 &&
                  cur.items.map((item) => (
                    <div key={item.id} css={orderBody}>
                      <div css={imageWrapper}>
                        <Image
                          src={item.image}
                          alt={item.title}
                          layout="fill"
                        />
                      </div>
                      <div css={productDetails}>
                        <p>{item.title}</p>
                        <Button
                          label="Buy again"
                          onClick={() => handleBuyAgain(item)}
                          customCss={buyBtn}
                        ></Button>
                      </div>
                    </div>
                  ))}
                <div css={orderBottom}>
                  <div css={row}>
                    <div css={leftColumn}>
                      <p>Customer Name</p>
                      <p>{cur?.address?.fullName}</p>
                    </div>
                    <div css={rightColumn}>
                      <p>Order placed</p>
                      <p>{cur.orderDate}</p>
                    </div>
                  </div>
                  <div css={row}>
                    <div css={leftColumn}>
                      <p>Payment Status</p>
                      <p>{cur.paymentStatus}</p>
                    </div>
                    <div css={rightColumn}>
                      <p>Order Status</p>
                      <p>
                        {new Date(cur.deliveryDate) > new Date(cur.orderDate)
                          ? 'In-progress'
                          : 'Delivered'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))}
      </div>
    </div>
  );
};

export default Orders;
