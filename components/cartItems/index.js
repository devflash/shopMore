/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useReducer, useEffect } from 'react';
import Image from 'next/image';
import { FaMinus, FaPlus } from 'react-icons/fa';
import Button from '../common/button';
import { server } from '../../config/index';
import { useAuth } from '../../context';
import Link from 'next/link';
import { BiArrowBack } from 'react-icons/bi';
import { useRouter } from 'next/router';
const wrapper = css`
  width: 90%;
  margin: 20px auto 0;
  max-width: 500px;
`;
const cartMain = css`
  background-color: #fff;
  border: 1px solid #95a5a6;
  border-radius: 10px;
  padding: 10px 12px;
`;

const flex = css`
  display: flex;
`;

const rightSection = css`
  flex: 1;
  margin-left: 10px;
  @media screen and (min-width: 600px) {
    display: flex;
  }
`;

const productDesc = css``;
const quantitySec = css`
  display: flex;
  align-items: center;
`;

const imageWrapper = css`
  position: relative;
  height: 50px;
  width: 50px;
`;

const bold = css`
  font-weight: bold;
`;

const primary = css`
  color: #000;
  font-size: 12px;
`;

const secondary = css`
  color: #95a5a6;
  font-size: 10px;
`;

const icon = css`
  height: 25px;
  width: 25px;
  border-radius: 50%;
  background-color: #bdc3c7;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
`;
const qantity = css`
  margin: 0 12px;
`;

const fs12 = css`
  font-size: 12px;
`;

const cartbtn = css`
  margin: 10px 0 0 auto;
`;

const btnCss = css`
  font-size: 12px;
  padding: 10px 5px;
`;

const mgRight5 = css`
  margin-right: 5px;
`;

const productSection = css`
  display: flex;
  justify-content: space-between;
  @media screen and (min-width: 600px) {
    flex: 2 1 auto;
    margin-right: 20px;
  }
`;
const buttonSection = css`
  display: flex;
`;

const danger = css`
  background-color: #e74c3c;
  color: #fff;
`;
const footerWrapper = css`
  position: fixed;
  bottom: 0;
  padding: 20px 0;
  border-top: 1px solid #2c3e50;
  width: 100%;
`;

const footer = css`
  width: 90%;
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const link = css`
  display: flex;
  color: #2c3e50;
  font-weight: 600;
  text-decoration: none;
`;

const checkoutBtn = css`
  background-color: #2c3e50;
  color: #fff;
  padding: 8px 20px;
`;

const footerCost = css`
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    display: inline-block;
    color: #2c3e50;
    :last-child {
      margin-left: 10px;
      font-size: 25px;
    }
  }
`;

const removeBtn = css`
  display: block;
  background-color: #ecf0f1;
  padding: 0;
  color: #e74c3c;
  border: none;
  border-bottom: 1px solid #e74c3c;
  border-radius: 0;
  margin: 0 0 0 auto;
  font-size: 14px;
`;

const noCart = css`
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
}
`;

const noCartBox = css`
  text-align: center;
  h3 {
    margin-bottom: 20px;
  }
`;

const initialState = {
  totalCost: 0,
};

const CartItems = ({ items }) => {
  const { authUser } = useAuth();
  const router = useRouter();
  const [state, dispatch] = useReducer((state, newState) => {
    return {
      ...state,
      ...newState,
    };
  }, initialState);

  const calculateTotalCost = (items) => {
    const total = items.reduce((prev, cur) => {
      prev = prev + cur.count * cur.price;
      return prev;
    }, 0);
    return total;
  };

  useEffect(() => {
    let totalCost = calculateTotalCost(items);
    dispatch({ items, totalCost });
  }, []);

  const handleWishList = async (item) => {
    delete item.count;
    const payload = {
      ...item,
    };
    try {
      const response = await fetch(`${server}/api/wishlist`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (data.msg === 'success') {
        console.log('Added to wishlist');
      }
      if (data.error) {
        console.log(data.error);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const removeFromCart = async (itemId) => {
    const confirm = window.confirm(
      'Are you sure you want to remove the item from the cart?'
    );
    if (confirm) {
      const payload = {
        itemId,
        userId: authUser.uid,
      };
      console.log(payload);
      const response = await fetch(`${server}/api/cart/remove`, {
        method: 'DELETE',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (data.msg === 'PRODUCT_DELETED_CART') {
        alert('Product is removed from the cart');
        const items = state.items.filter((cur) => cur.id !== itemId);
        let totalCost = calculateTotalCost(items);
        dispatch({ items, totalCost });
      }
    }
  };

  const removeAllFromCart = async () => {
    const confirm = window.confirm('Are you sure you want to empty the cart?');
    if (confirm) {
      const payload = {
        userId: authUser.uid,
      };
      try {
        const response = await fetch(`${server}/api/cart/removeAll`, {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        if (data.msg === 'EMPTY_CART') {
          alert('Cart is successfuly emptied');
          const items = [];
          const totalCost = calculateTotalCost(items);
          dispatch({ items, totalCost });
        }
      } catch (e) {}
    }
  };

  const changeQuantity = (id, op) => {
    const items = state.items.map((cur) => {
      if (cur.id === id) {
        if (op === '+' && cur.count < cur.stock) cur.count++;
        else if (op === '-' && cur.count > 0) cur.count--;
      }
      return cur;
    });
    let totalCost = calculateTotalCost(items);
    dispatch({ items, totalCost });
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    router.replace('/');
  };

  return (
    <>
      {state.items && state.items.length > 0 ? (
        <>
          <div css={wrapper}>
            <Button
              label="Remove All"
              customCss={removeBtn}
              onClick={removeAllFromCart}
            ></Button>
          </div>
          {state.items.map((item) => (
            <div key={item.id} css={wrapper}>
              <div css={cartMain}>
                <div css={flex}>
                  <div css={imageWrapper}>
                    <Image src={item.image} alt={item.title} layout="fill" />
                  </div>

                  <div css={rightSection}>
                    <div css={productSection}>
                      <div css={productDesc}>
                        <p css={[primary, bold]}>{item.title}</p>
                        <p>
                          <span>Cost: </span>
                          <span>{item.price}</span>
                        </p>
                      </div>
                      <div css={quantitySec}>
                        <button
                          type="button"
                          css={icon}
                          onClick={() => changeQuantity(item.id, '-')}
                        >
                          <FaMinus css={fs12} />
                        </button>
                        <div css={qantity}>
                          <span>{item.count}</span>
                        </div>
                        <button
                          type="button"
                          css={icon}
                          onClick={() => changeQuantity(item.id, '+')}
                        >
                          <FaPlus css={fs12} />
                        </button>
                      </div>
                    </div>
                    <div css={buttonSection}>
                      <div css={cartbtn}>
                        <Button
                          label="Add to wishlist"
                          customCss={[btnCss, mgRight5]}
                          onClick={() => handleWishList(item)}
                        />
                        <Button
                          label="Remove"
                          customCss={[btnCss, danger]}
                          onClick={() => removeFromCart(item.id)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div css={footerWrapper}>
            <div css={footer}>
              <Link href="/" passHref>
                <a css={link}>
                  <BiArrowBack css={mgRight5} />
                  <span>Continue shopping</span>
                </a>
              </Link>
              <div>
                <div css={footerCost}>
                  <span>Total:</span>
                  <span>{state.totalCost}</span>
                </div>
                <Button label="Checkout" customCss={checkoutBtn}></Button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div css={[wrapper, noCart]}>
          <div css={noCartBox}>
            <h3>You have no products in your cart</h3>
            <Button
              label="Continue shopping"
              onClick={handleContinueShopping}
            ></Button>
          </div>
        </div>
      )}
    </>
  );
};
export default CartItems;
