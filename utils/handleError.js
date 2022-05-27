import { errors } from '../config/strings';
export const getErrorMessage = (error) => {
  const code = error.code.slice(error.code.indexOf('/') + 1);
  console.log(code);
  return errors[code] || 'Something went wrong';
};
