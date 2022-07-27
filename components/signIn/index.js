/** @jsxImportSource @emotion/react */
import { useReducer } from 'react';
import { css } from '@emotion/react';
import Input from '../common/input';
import { useAuth } from '../../context';
import { useRouter } from 'next/router';
import { getErrorMessage } from '../../utils/handleError';
import Toast from '../common/toast';
import Loader from '../common/loader';
import useLoader from '../../hooks/useLoader';
import axios from 'axios';

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
  email: '',
  password: '',
  emailError: '',
  passwordError: '',
  serviceError: '',
};

const SignIn = () => {
  const [state, dispatch] = useReducer((state, newState) => {
    return { ...state, ...newState };
  }, initialState);

  const { signInUser } = useAuth();
  console.log(signInUser);
  const router = useRouter();
  const [{ isLoading, isBackdrop }, setLoading] = useLoader({});

  const onEmailChanged = (email) => {
    dispatch({ email, emailError: null });
  };
  const onPasswordChanged = (password) => {
    dispatch({ password, passwordError: null });
  };

  const validateInput = () => {
    let isValid = true;
    if (!state.email) {
      dispatch({ emailError: 'Please Enter your email address' });
      isValid = false;
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(state.email)) {
      dispatch({ emailError: 'Please Enter a valid email address' });
      isValid = false;
    }
    if (!state.password) {
      dispatch({ passwordError: 'Please enter password' });
      isValid = false;
    }
    return isValid;
  };

  const handleUserLogin = async (e) => {
    e.preventDefault();
    if (validateInput()) {
      setLoading({ isLoading: true, isBackdrop: true });

      try {
        debugger;
        console.log(signInUser);
        const data = await signInUser(state.email, state.password);
        if (data.msg === 'SIGNED_IN_SUCCESS') router.push('/');
      } catch (e) {
        debugger;
        const serviceError = getErrorMessage(e);
        dispatch({ serviceError });
      }
    }
    setLoading({ isLoading: false, isBackdrop: false });
  };

  return (
    <div css={flex}>
      <Toast
        open={state.serviceError}
        text={state.serviceError}
        callback={() => dispatch({ serviceError: '' })}
        isError={true}
      />
      <Loader isLoading={isLoading} isBackdrop={isBackdrop} />

      <div css={wrapper}>
        <h1>ShopMore</h1>
        <div css={container}>
          <form>
            <div css={row}>
              <Input
                id="email"
                type="email"
                labelTitle="Email address"
                value={state.email}
                onValueChange={(e) => onEmailChanged(e.target.value)}
                customCss={inputCSS(state.emailError)}
              />
              <span css={errorCss}>{state.emailError}</span>
            </div>
            <div css={row}>
              <Input
                id="password"
                type="password"
                labelTitle="Password"
                value={state.password}
                onValueChange={(e) => onPasswordChanged(e.target.value)}
                customCss={inputCSS(state.passwordError)}
              />
              <span css={errorCss}>{state.passwordError}</span>
            </div>
            <div css={alignCenter}>
              <button css={createBtn} onClick={(e) => handleUserLogin(e)}>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
