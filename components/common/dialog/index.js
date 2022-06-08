/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { MdCancel } from 'react-icons/md';
const wrapper = css`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: scale(0);
  transition: all 0.5s ease-in-out;
`;

const showDialog = css`
  transform: scale(1);
`;

const dialogBox = css`
  background: #fff;
  border-radius: 10px;
  width: 90%;
  max-width: 450px;
  min-height: 100px;
`;

const header = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  border-bottom: 1px solid #7f8c8d;
  h1 {
    font-size: 25px;
    color: #000;
  }
`;

const crossIcon = css`
  color: #2c3e50;
  font-size: 20px;
`;

const dialogBody = css`
  padding: 20px;
`;

const Dialog = ({ show, dialogCss }) => (
  <div css={[wrapper, show && showDialog]}>
    <div css={dialogBox}>
      <div css={header}>
        <h1>Dialog header</h1>
        <MdCancel css={crossIcon} />
      </div>
      <div css={[dialogBody, dialogCss]}>
        <h1>Dialog body</h1>
      </div>
    </div>
  </div>
);
export default Dialog;
