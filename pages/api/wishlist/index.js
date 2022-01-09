import { firestore } from '../../../utils/firebase';
const wishlist = async (req, res) => {
  const wishlist = req.body;
  try {
    const existing = await firestore
      .collection('users')
      .doc(wishlist.userId)
      .collection('wishlist')
      .where('id', '==', wishlist.id)
      .get();
    if (!existing.empty) {
      throw new Error('WISHLIST_ALREADY_EXIST');
    }
    await firestore
      .collection('users')
      .doc(wishlist.userId)
      .collection('wishlist')
      .add(wishlist);

    res.status(200).json({ msg: 'WISHLIST_SUCCESS' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: `${error}` });
  }
};

export default wishlist;
