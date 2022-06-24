import { firestore } from '../../../../utils/firebase';

const validate = async (req, res) => {
  const [userId, orderRef] = req.body.slug;
  try {
    const response = await firestore
      .collection('users')
      .doc(userId)
      .collection('orders')
      .where('orderRef', '==', orderRef)
      .get();
    if (!response.empty) {
      throw new Error('WISHLIST_ALREADY_EXIST');
    }
    res.status(200).json({ msg: 'ORDER_VALID' });
  } catch (e) {
    res.status(400).json({ error: `${e}` });
  }
};

export default validate;
