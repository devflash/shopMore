import { firebaseAdmin } from '../../../utils/firebaseAdmin';
const verifyAuth = async (req, res) => {
  const {
    cookies: { token },
  } = req.body;
  console.log('token ->>>>>>>>>>>>>>>>>', token);
  try {
    const response = await firebaseAdmin.auth().verifyIdToken(token);
    console.log('response----------->', response);
    res.status(200).json(response);
  } catch (error) {
    console.log('error token validation');
    res.status(400).json({ msg: 'AUTH_FAILED' });
  }
};

export default verifyAuth;
