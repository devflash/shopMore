/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Image from 'next/image';
import Button from '../common/button';
import { useAuth } from '../../context';
import { server } from '../../config';
import { useReducer, useEffect } from 'react';
import axios from 'axios';
import { getErrorMessage } from '../../utils/handleError';
import Toast from '../common/toast';
import { useRouter } from 'next/router';
import Loader from '../common/loader';
import useLoader from '../../hooks/useLoader';

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

const noOrderBox = css`
  text-align: center;
  h3 {
    margin-bottom: 20px;
  }
`;

const initialState = {
  orders: [],
};

const Orders = ({ userId }) => {
  const { authUser } = useAuth();
  const router = useRouter();

  const [state, dispatch] = useReducer((state, newState) => {
    return {
      ...state,
      ...newState,
    };
  }, initialState);

  const [{ isLoading, isBackdrop }, setLoading] = useLoader({});

  useEffect(() => {
    const fetchData = async () => {
      //start loader
      try {
        setLoading({ isLoading: true, isBackdrop: false });

        const { data } = await axios.get(`${server}/api/orders/${userId}`);
        const { msg } = data;

        if (msg === 'ORDERS_FETCHED') {
          dispatch({ orders: data.orders.slice() });
        }
      } catch (e) {
        const error_code = e?.response?.data;
        const serviceError = getErrorMessage(error_code);
        dispatch({ serviceError });
      }
      //stop loader
      setLoading({ isLoading: false, isBackdrop: false });
    };
    userId && fetchData();
  }, [userId]);

  const cancelOrder = async (orderRef) => {
    try {
      setLoading({ isLoading: true, isBackdrop: true });

      const { data } = await axios.delete(
        `${server}/api/order/cancel/${authUser.uid}/${orderRef}`
      );
      const { msg } = data;
      if (msg === 'ORDER_CANCELLED') {
        //show success toast
        const newOrders = state.orders.filter(
          (cur) => cur.orderRef !== orderRef
        );
        dispatch({
          orders: newOrders.slice(),
          success: 'Order has been cancelled',
        });
      }
    } catch (e) {
      const error_code = e?.response?.data;
      const serviceError = getErrorMessage(error_code);
      dispatch({ serviceError });
    }
    setLoading({ isLoading: false, isBackdrop: false });
  };

  const handleBuyAgain = async (item) => {
    const payload = {
      ...item,
    };
    try {
      setLoading({ isLoading: true, isBackdrop: true });

      const { data } = await axios.post(`${server}/api/cart/add`, payload);
      const { msg } = data;
      if (msg === 'PRODUCT_ADDED_CART') {
        dispatch({ success: 'Product has been added to the cart' });
      }
    } catch (e) {
      const error_code = e?.response?.data;
      const serviceError = getErrorMessage(error_code);
      dispatch({ serviceError });
    }
    setLoading({ isLoading: false, isBackdrop: false });
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    router.replace(`/`);
  };

  return (
    <>
      <Toast
        open={state.serviceError || state.success}
        text={state.serviceError || state.success}
        callback={() => dispatch({ serviceError: '', success: '' })}
        isError={state.serviceError ? true : false}
      />
      <Loader isLoading={isLoading} isBackdrop={isBackdrop} />

      <div css={wrapper}>
        <h1>Track your orders</h1>
        <div css={ordersBox}>
          {state.orders.length === 0 && (
            <div css={noOrderBox}>
              <h3>You have no previous orders to show</h3>
              <Button
                label="Continue shopping"
                onClick={handleContinueShopping}
              ></Button>
            </div>
          )}
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
    </>
  );
};

export default Orders;
