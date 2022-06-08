/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useReducer } from 'react';
import Input from '../common/input';
import Button from '../common/button';
const wrapper = css`
  width: 90%;
  max-width: 550px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
`;

const topText = css`
  text-align: center;
  h1 {
    font-size: 18px;
    color: #2c3e50;
    margin-bottom: 10px;
  }
  p {
    font-size: 14px;
    color: #2c3e50;
    font-weight: 500;
  }
`;

const addressBox = css`
  padding: 10px;
`;

const row = css`
  margin-bottom: 10px;
`;

const buttonGroup = css`
  display: flex;
  justify-content: center;
`;

const buttonCss = css`
  margin: 0 10px 0 0;
`;

const errorCss = css`
  color: #c0392b;
  font-size: 0.7rem;
`;

const inputCSS = (isError) => css`
  border-color: ${isError && '#c0392b'};
  color: ${isError && '#c0392b'};
`;

const initialState = {
  inputs: {
    fullName: {
      id: 'fullName',
      value: '',
      label: 'Full Name',
      type: 'text',
      max: 20,
      error: '',
    },
    phoneNumber: {
      id: 'phoneNumber',
      value: '',
      label: 'Phone number',
      type: 'number',
      max: 20,
      error: '',
    },
    postCode: {
      id: 'postCode',
      value: '',
      label: 'Postcode',
      type: 'text',
      max: 6,
      error: '',
    },
    addressLine1: {
      id: 'addressLine1',
      value: '',
      label: 'Address Line 1',
      type: 'text',
      max: 30,
      error: '',
    },
    addressLine2: {
      id: 'addressLine2',
      value: '',
      label: 'Address Line 2',
      type: 'text',
      max: 30,
      error: '',
    },
    town: {
      id: 'town',
      value: '',
      label: 'Town/City',
      type: 'text',
      max: 20,
      error: '',
    },
    country: {
      id: 'country',
      value: '',
      label: 'Country',
      type: 'text',
      max: 20,
      error: '',
    },
  },
};
const OrderAddress = () => {
  const [state, dispatch] = useReducer((state, newState) => {
    return { ...state, ...newState };
  }, initialState);

  const handleStateChange = (updatedState) => {
    let newState = { ...state };
    updatedState.forEach(({ id, field, value }) => {
      newState = {
        ...newState,
        inputs: {
          ...newState.inputs,
          [id]: {
            ...newState.inputs[id],
            [field]: value,
          },
        },
      };
    });
    dispatch(newState);
  };

  const handleValidation = () => {
    let isValid = true;
    for (const input of Object.values(state.inputs)) {
      if (input.id === 'fullName') {
        if (!input.value) {
          handleStateChange([
            { id: input.id, field: 'error', value: 'Please enter your name' },
          ]);
          isValid = false;
          break;
        }
      }
      if (input.id === 'phoneNumber') {
        if (!input.value) {
          handleStateChange([
            {
              id: input.id,
              field: 'error',
              value: 'Please enter your phone number',
            },
          ]);
          isValid = false;
          break;
        } else if (input.value.length < 10) {
          handleStateChange([
            {
              id: input.id,
              field: 'error',
              value: 'Please enter a valid phone number',
            },
          ]);
          isValid = false;
          break;
        }
      }
      if (input.id === 'postCode') {
        if (!input.value) {
          handleStateChange([
            {
              id: input.id,
              field: 'error',
              value: 'Please enter your postcode',
            },
          ]);
          isValid = false;
          break;
        } else if (input.value.length < 6) {
          handleStateChange([
            {
              id: input.id,
              field: 'error',
              value: 'Please enter a valid postcode',
            },
          ]);
          isValid = false;
          break;
        }
      }
      if (input.id === 'addressLine1') {
        if (!input.value) {
          handleStateChange([
            {
              id: input.id,
              field: 'error',
              value: 'Please enter your address',
            },
          ]);
          isValid = false;
          break;
        }
      }
      if (input.id === 'town') {
        if (!input.value) {
          handleStateChange([
            { id: input.id, field: 'error', value: 'Please enter your town' },
          ]);
          isValid = false;
          break;
        }
      }
      if (input.id === 'country') {
        if (!input.value) {
          handleStateChange([
            {
              id: input.id,
              field: 'error',
              value: 'Please enter your country',
            },
          ]);
          isValid = false;
          break;
        }
      }
    }
    return isValid;
  };

  const handleInputChange = (id, value) => {
    if (state.inputs[id].error) {
      handleStateChange([
        { id, field: 'value', value },
        { id, field: 'error', value: '' },
      ]);
    } else handleStateChange([{ id, field: 'value', value }]);
  };

  const handleClearInput = () => {
    const newState = {
      ...state,
      inputs: {
        ...initialState.inputs,
      },
    };
    dispatch(newState);
  };

  const handleProceed = () => {
    if (handleValidation()) {
      alert('Valid input');
    } else {
      alert('Invalid input');
    }
  };
  return (
    <div css={wrapper}>
      <div css={topText}>
        <h1>Checkout 3 Items</h1>
        <p>Enter a address for the delivery</p>
      </div>
      <div css={addressBox}>
        {Object.values(state.inputs).map(
          ({ id, value, label, type, max, error }) => (
            <div key={id} css={row}>
              <Input
                value={value}
                labelTitle={label}
                type={type}
                onValueChange={(e) => handleInputChange(id, e.target.value)}
                maxLength={max}
                customCss={inputCSS(error)}
              />
              {error && <span css={errorCss}>{error}</span>}
            </div>
          )
        )}

        <div css={buttonGroup}>
          <Button
            label="Proceed"
            customCss={buttonCss}
            onClick={handleProceed}
          />
          <Button
            label="Clear"
            customCss={buttonCss}
            onClick={handleClearInput}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderAddress;
