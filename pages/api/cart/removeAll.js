import { firestore } from '../../../utils/firebase';

const removeAll = async (req, res) => {
  const { userId } = req.body;

  try {
    const snapshot = await firestore
      .collection('users')
      .doc(userId)
      .collection('cart')
      .get();

    snapshot.forEach((doc) => doc.ref.delete());
    res.status(200).json({ msg: 'EMPTY_CART' });
  } catch (e) {}
};

export default removeAll;
