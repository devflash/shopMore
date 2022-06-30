import { errors } from '../config/strings';
export const getErrorMessage = (error) => {
  let code = null;
  if (typeof error === 'object') {
    code = error.code.slice(error.code.indexOf('/') + 1);
  }
  return errors[code] || errors[error] || 'Something went wrong';
};
