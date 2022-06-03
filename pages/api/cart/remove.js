import { firestore } from '../../../utils/firebase';

const remove = async (req, res) => {
  const cart = req.body;

  try {
    const item = await firestore
      .collection('users')
      .doc(cart.userId)
      .collection('cart')
      .where('id', '==', cart.itemId)
      .get();
    item.forEach((ele) => {
      ele.ref.delete();
    });
    res.status(200).json({ msg: 'PRODUCT_DELETED_CART' });
  } catch (e) {
    throw e;
  }
};

export default remove;