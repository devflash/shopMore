/** @jsxImportSource @emotion/react */
import { useReducer } from 'react';
import { css } from '@emotion/react';
import Input from '../common/input';
const flex = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const wrapper = css`
  max-width: 450px;
  width: 100%;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  h1 {
    text-align: center;
    font-size: 1.5rem;
  }
`;

const container = css``;

const row = css`
  margin-bottom: 20px;
`;

const note = css`
  font-size: 0.7rem;
`;

const createBtn = css`
  border: none;
  background-color: #ffd814;
  border-color: #fcd200;
  border-radius: 10px;
  padding: 12px 20px;
  cursor: pointer;
  margin: 0 auto;
`;

const alignCenter = css`
  text-align: center;
`;

const inputCSS = (isError) => css`
  border-color: ${isError && '#c0392b'};
`;

const errorCss = css`
  color: #c0392b;
  font-size: 0.7rem;
`;

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  firstNameError: null,
  lastNameError: null,
  emailError: null,
  passwordError: null,
};

const SignUp = () => {
  const [state, dispatch] = useReducer((state, newState) => {
    return { ...state, ...newState };
  }, initialState);

  const onFirstNameChanged = (firstName) => {
    dispatch({ firstName, firstNameError: null });
  };
  const onLastNameChanged = (lastName) => {
    dispatch({ lastName, lastNameError: null });
  };
  const onEmailChanged = (email) => {
    dispatch({ email, emailError: null });
  };
  const onPasswordChanged = (password) => {
    dispatch({ password, passwordError: null });
  };
  const validateInput = () => {
    let isValid = true;
    if (!state.firstName) {
      dispatch({ firstNameError: 'Please Enter your first name' });
      isValid = false;
    }
    if (!state.lastName) {
      dispatch({ lastNameError: 'Please Enter your last name' });
      isValid = false;
    }
    if (!state.email) {
      dispatch({ emailError: 'Please Enter your first name' });
      isValid = false;
    }
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(state.email)) {
      dispatch({ emailError: 'Please Enter a valid email address' });
      isValid = false;
    }
    if (state.password.length < 8) {
      dispatch({ passwordError: true });
      isValid = false;
    }
    return isValid;
  };
  const handleCreateAccount = (event) => {
    event.preventDefault();
    if (validateInput()) {
      alert('Account created successfully');
    }
  };
  return (
    <div css={flex}>
      <div css={wrapper}>
        <h1>ShopMore</h1>
        <div css={container}>
          <form>
            <div css={row}>
              <Input
                labelTitle="First name"
                value={state.firstName}
                onValueChange={(e) => onFirstNameChanged(e.target.value)}
                customCss={inputCSS(state.firstNameError)}
              />
              <span css={errorCss}>{state.firstNameError}</span>
            </div>
            <div css={row}>
              <Input
                labelTitle="Last name"
                value={state.lastName}
                onValueChange={(e) => onLastNameChanged(e.target.value)}
                customCss={inputCSS(state.lastNameError)}
              />
              <span css={errorCss}>{state.lastNameError}</span>
            </div>
            <div css={row}>
              <Input
                labelTitle="Email address"
                value={state.email}
                onValueChange={(e) => onEmailChanged(e.target.value)}
                customCss={inputCSS(state.emailError)}
              />
              <span css={errorCss}>{state.emailError}</span>
            </div>
            <div css={row}>
              <Input
                labelTitle="Password"
                value={state.password}
                onValueChange={(e) => onPasswordChanged(e.target.value)}
                customCss={inputCSS(state.passwordError)}
              />
              <span css={[note, state.passwordError && errorCss]}>
                Password must be atleast 8 characters
              </span>
            </div>
            <div css={alignCenter}>
              <button css={createBtn} onClick={(e) => handleCreateAccount(e)}>
                Create account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
