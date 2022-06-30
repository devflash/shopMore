/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Button from '../../common/button';
import { server } from '../../../config';
import axios from 'axios';

const wrapper = css`
  p {
    font-size: 16px;
    font-weight: bold;
  }
`;

const addressBox = css`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const address = css`
  border: none;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  padding: 10px 8px;
  margin-bottom: 5px;
  box-shadow: 1px 1px 6px 1px rgba(0, 0, 0, 0.5);
  align-items: center;
`;
const addressText = css`
  margin: 0 8px;
  span {
    font-size: 14px;
  }
`;

const radio = css`
  font-size: 20px;
  color: #2c3e50;
`;
const bold = css`
  font-weight: 600;
`;

const deleteBtn = css`
  border: none;
  background-color: #fff;
  cursor: pointer;
`;

const deleteIcon = css`
  font-size: 20px;
  color: #c0392b;
`;

const noAddressWrapper = css`
  font-weight: bold;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SavedAddresses = ({
  addresses,
  userId,
  dispatch,
  navigateToPreview,
  setLoading,
}) => {
  const handleRemoveAddress = async (id) => {
    const address = {
      userId,
      id,
    };
    try {
      setLoading({ isLoading: true, isBackdrop: true });

      const { data } = await axios.delete(`${server}/api/address/remove`, {
        data: address,
      });
      const { msg } = data;

      if (msg === 'ADDRESS_REMOVED') {
        dispatch({
          userAddresses: addresses.filter((cur) => cur.id !== id),
          success: 'Address has been removed',
        });
      }
    } catch (e) {
      const error_code = e?.response?.data;
      const serviceError = getErrorMessage(error_code);
      dispatch({ serviceError });
    }
    setLoading({ isLoading: false, isBackdrop: false });
  };

  const changeAddress = (id) => {
    const newAddresses = addresses.map((address) => {
      if (address.id === id) address.selected = true;
      else address.selected = false;

      return address;
    });

    dispatch({ userAddresses: newAddresses });
  };

  const handleContinue = () => {
    const address = addresses.find((cur) => cur.selected);
    navigateToPreview(address);
  };

  if (addresses.length === 0) {
    return (
      <div css={noAddressWrapper}>
        <p>You have no saved addresses.</p>
      </div>
    );
  }
  return (
    <div css={wrapper}>
      <p>Please select one address for delivery.</p>
      <div css={addressBox}>
        {addresses.map((cur) => (
          <button
            key={cur.id}
            css={address}
            onClick={() => changeAddress(cur.id)}
          >
            <div>
              {cur.selected ? (
                <MdRadioButtonChecked css={radio} />
              ) : (
                <MdRadioButtonUnchecked css={radio} />
              )}
            </div>
            <div css={addressText}>
              <span>
                <span css={bold}>{cur.fullName} </span> {cur.addressLine1},{' '}
                {cur.addressLine2}, {cur.town}, {cur.postCode}, {cur.country},{' '}
                Phone number: {cur.phoneNumber}
              </span>
            </div>
            <button
              type="button"
              css={deleteBtn}
              onClick={() => handleRemoveAddress(cur.id)}
            >
              <RiDeleteBin6Line css={deleteIcon} />
            </button>
          </button>
        ))}
      </div>
      <Button label="Continue" onClick={handleContinue}></Button>
    </div>
  );
};

export default SavedAddresses;
