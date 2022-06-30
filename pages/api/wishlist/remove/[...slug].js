import { firestore } from '../../../../utils/firebase';
const cancel = async (req, res) => {
  const [userId, productId] = req.query.slug;
  try {
    const item = await firestore
      .collection('users')
      .doc(userId)
      .collection('wishlist')
      .where('id', '==', Number(productId))
      .get();

    item.forEach((cur) => {
      cur.ref.delete();
    });
    res.status(200).json({ msg: 'PRODUCT_REMOVED' });
  } catch (e) {
    res.status(400).send(`${e.message}`);
  }
};

export default cancel;
