/** @jsxImportSource @emotion/react */
import { useReducer } from 'react';
import { css } from '@emotion/react';
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from 'react-icons/md';
import { usePaymentInputs } from 'react-payment-inputs';
import images from 'react-payment-inputs/images';
import Button from '../common/button';
import Input from '../common/input';
import { useOrderContext, useAuth } from '../../context';
import { server } from '../../config';
import Dialog from '../common/dialog';
import ConfirmPaymentDialog from './confirmPaymentDialog';
import axios from 'axios';
import { getErrorMessage } from '../../utils/handleError';
import Toast from '../common/toast';
import { useRouter } from 'next/router';

const wrapper = css`
  width: 90%;
  max-width: 500px;
  background-color: #fff;
  border-radius: 10px;
  margin: 0 auto;
  padding: 20px 10px;
  h1 {
    text-align: center;
    font-size: 20px;
    margin-bottom: 10px;
  }
  & > p {
    text-align: center;
    color: #7f8c8d;
    font-size: 14px;
  }
`;

const paymentBox = css`
  margin-top: 20px;
`;

const paymentMethod = css`
  padding: 20px;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.5);
`;

const paymentHead = css`
  display: flex;
`;

const radio = css`
  font-size: 20px;
  color: #2c3e50;
`;
const methodTitle = css`
  color: #34495e;
  font-size: 18px;
  text-align: left;
  margin-left: 20px;
`;

const paymentBody = css`
  margin-top: 20px;
`;

const inputCss = css`
  background-color: #fff;
`;

const payBtn = css`
  margin-top: 20px;
`;

const errorCss = css`
  color: #c0392b;
  font-size: 0.7rem;
`;

const row = css`
  margin-bottom: 10px;
`;

const radioBtn = css`
  height: 20px;
  width: 20px;
  border: none;
  background-color: #fff;
`;

const cardInputs = css`
  display: inline-flex;
  flex-direction: column;
`;

const fieldWrapper = css`
  align-items: center;
  background-color: white;
  border: 1px solid #bdbdbd;
  box-shadow: inset 0px 1px 2px #e5e5e5;
  border-radius: 0.2em;
  display: flex;
  height: 2.5em;
  padding: 0.4em 0.6em;
  margin-bottom: 5px;
  & input {
    border: unset;
    margin: unset;
    padding: unset;
    outline: unset;
    font-size: inherit;
    margin-left: 10px;
  }
  & input#cardNumber {
    width: 60%;
  }
  & input#expiryDate {
    width: 20%;
  }
  & input#cvc {
    width: 20%;
  }
`;

const initialState = {
  paymentMethods: {
    COD: {
      id: 'COD',
      title: 'Cash on delivery',
      selected: true,
      body: false,
    },
    CARD: {
      id: 'CARD',
      title: 'Credit / Debit card',
      selected: false,
      body: true,
      holderName: '',
      cardNumber: '',
      expiryDate: '',
      csv: '',
      holderNameErr: null,
      cardErr: null,
    },
  },
  showConfirmation: false,
  orderRef: null,
  serviceError: null,
  success: null,
};

const Payment = () => {
  const [state, dispatch] = useReducer((state, newState) => {
    return {
      ...state,
      ...newState,
    };
  }, initialState);
  const { cart, address } = useOrderContext();
  const { authUser } = useAuth();
  const router = useRouter();

  const {
    meta,
    getCardImageProps,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
  } = usePaymentInputs();

  const handleCardInput = (id, field, value) => {
    if (state.paymentMethods.CARD.selected) {
      const newState = {
        ...state,
        paymentMethods: {
          ...state.paymentMethods,
          [id]: {
            ...state.paymentMethods[id],
            [field]: value,
            holderNameErr: field !== 'holderNameErr' ? null : value,
            cardErr: field !== 'cardErr' ? null : value,
          },
        },
      };
      dispatch(newState);
    }
  };

  const handleChangeMethod = (id) => {
    const newState = { ...state, paymentMethods: { ...state.paymentMethods } };
    Object.values(newState.paymentMethods).forEach((cur) => {
      if (cur.id === id) cur.selected = true;
      else cur.selected = false;
    });
    dispatch(newState);
  };

  const validateInput = () => {
    if (state.paymentMethods.CARD.selected) {
      const value = state.paymentMethods.CARD.holderName;
      if (value === '') {
        handleCardInput(
          'CARD',
          'holderNameErr',
          'Please enter card holder name'
        );
        return false;
      } else if (!/^[A-Za-z\s]*$/.test(value)) {
        handleCardInput(
          'CARD',
          'holderNameErr',
          'Please enter a valid card holder name'
        );
        return false;
      } else if (meta.error) {
        handleCardInput('CARD', 'cardErr', meta.error);
        return false;
      }
    }
    return true;
  };

  const handlePay = async () => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'Auguest',
      'September',
      'October',
      'November',
      'December',
    ];
    const expectedDate = new Date(
      new Date().getTime() + 5 * 24 * 60 * 60 * 1000
    );
    if (validateInput()) {
      if (state.orderRef) {
        //show error toast
        dispatch({ success: 'Your order has been processed' });
        return;
      }
      const orderRef = Date.now();
      const order = {
        ...cart,
        address: {
          ...address,
        },
        userId: authUser.uid,
        totalCost: cart.totalCost + 5,
        orderDate: `${new Date().getDate()} ${
          months[new Date().getMonth()]
        } ${new Date().getFullYear()}`,
        deliveryDate: `${expectedDate.getDate()} ${
          months[expectedDate.getMonth()]
        } ${expectedDate.getFullYear()}`,
        paymentStatus: state.paymentMethods.COD.selected ? 'COD' : 'Paid',
        orderRef,
      };
      try {
        const { data } = await axios.post(`${server}/api/order/save`, order);
        const { msg } = data;
        if (msg === 'ORDER_PLACED') {
          //SHOW DIALOG
          const payload = {
            userId: authUser.uid,
          };
          await axios.delete(`${server}/api/cart/removeAll`, { data: payload });
          dispatch({ showConfirmation: true, orderRef });
        }
      } catch (e) {
        const error_code = e?.response?.data;
        const serviceError = getErrorMessage(error_code);
        dispatch({ serviceError });
      }
    }
  };

  const handleMyOrderClick = () => {
    router.push(`/order/${authUser.uid}`);
  };

  return (
    <>
      <Toast
        open={state.serviceError || state.success}
        text={state.serviceError || state.success}
        callback={() => dispatch({ serviceError: '', success: '' })}
        isError={state.serviceError ? true : false}
      />
      <div css={wrapper}>
        <h1>Checkout</h1>
        <p>Please select payment method and enter payment details.</p>
        {Object.values(state.paymentMethods).map((cur) => (
          <div key={cur.id} css={paymentBox}>
            <div css={paymentMethod}>
              <div css={paymentHead}>
                <button
                  type="button"
                  css={radioBtn}
                  onClick={() => handleChangeMethod(cur.id)}
                >
                  {cur.selected ? (
                    <MdRadioButtonChecked css={radio} />
                  ) : (
                    <MdRadioButtonUnchecked css={radio} />
                  )}
                </button>

                <p css={methodTitle}>{cur.title}</p>
              </div>

              {cur.body && (
                <div css={paymentBody}>
                  <div css={row}>
                    <Input
                      value={cur.holderName}
                      placeholder="Card holder name"
                      customCss={inputCss}
                      onValueChange={(e) =>
                        handleCardInput(cur.id, 'holderName', e.target.value)
                      }
                    />
                    {cur.holderNameErr && (
                      <span css={errorCss}>{cur.holderNameErr}</span>
                    )}
                  </div>
                  <div css={row}>
                    <div css={cardInputs}>
                      <div css={fieldWrapper}>
                        <svg {...getCardImageProps({ images })} />

                        <input
                          id="cardNumber"
                          {...getCardNumberProps({
                            onChange: (e) =>
                              handleCardInput(
                                cur.id,
                                'cardNumber',
                                e.target.value
                              ),
                          })}
                          value={state.paymentMethods.CARD.cardNumber}
                        />
                        <input
                          id="expiry"
                          {...getExpiryDateProps({
                            onChange: (e) =>
                              handleCardInput(
                                cur.id,
                                'expiryDate',
                                e.target.value
                              ),
                          })}
                          value={state.paymentMethods.CARD.expiryDate}
                        />
                        <input
                          {...getCVCProps({
                            onChange: (e) =>
                              handleCardInput(cur.id, 'csv', e.target.value),
                          })}
                          value={state.paymentMethods.CARD.csv}
                        />
                      </div>
                      {cur.cardErr && <span css={errorCss}>{cur.cardErr}</span>}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        <Button label="Pay" customCss={payBtn} onClick={handlePay}></Button>
        <Dialog
          show={state.showConfirmation}
          onClose={() => {
            dispatch({ showConfirmation: false });
          }}
        >
          <ConfirmPaymentDialog
            orderRef={state.orderRef}
            handleMyOrderClick={handleMyOrderClick}
          />
        </Dialog>
      </div>
    </>
  );
};

export default Payment;
