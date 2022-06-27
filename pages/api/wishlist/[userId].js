import { firestore } from '../../../utils/firebase';

const wishlist = async (req, res) => {
  const { userId } = req.query;
  try {
    const collection = await firestore
      .collection('users')
      .doc(userId)
      .collection('wishlist')
      .get();
    const userWishlist = collection.docs.map((wishlist) => {
      return {
        ...wishlist.data(),
      };
    });
    res.status(200).json({ msg: 'WISHLIST_FETCHED', userWishlist });
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: `${e}` });
  }
};

export default wishlist;
