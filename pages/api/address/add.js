import { firestore } from '../../../utils/firebase';

const add = async (req, res) => {
  const address = req.body;
  try {
    await firestore
      .collection('users')
      .doc(address.userId)
      .collection('addresses')
      .add(address);
    res.status(200).json({ msg: 'ADDRESS_ADDED' });
  } catch (e) {
    res.status(400).json({ error: `${e}` });
  }
};

export default add;
