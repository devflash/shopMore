/** @jsxImportSource @emotion/react */
import { useEffect } from 'react';
import { css } from '@emotion/react';
import { MdCancel } from 'react-icons/md';
const wrapper = css`
  position: fixed;
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

const dialogBox = (maxWidth) => css`
  overflow: auto;
  background: #fff;
  border-radius: 10px;
  width: 90%;
  max-width: ${maxWidth || '450px'};
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
    color: #2c3e50;
  }
`;

const crossbtn = css`
  color: #2c3e50;
  border: none;
  background-color: #fff;
  cursor: pointer;
`;

const crossIcon = css`
  font-size: 20px;
`;
const dialogBody = css`
  padding: 20px;
`;

const Dialog = ({
  show,
  dialogCss,
  headerText,
  children,
  maxWidth,
  onClose,
}) => {
  useEffect(() => {
    if (show) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
  }, [show]);
  return (
    <div css={[wrapper, show && showDialog]}>
      <div css={dialogBox(maxWidth)}>
        <div css={header}>
          <h1>{headerText}</h1>
          <button css={crossbtn} type="button" onClick={onClose}>
            <MdCancel css={crossIcon} />
          </button>
        </div>
        <div css={[dialogBody, dialogCss]}>{children}</div>
      </div>
    </div>
  );
};
export default Dialog;
