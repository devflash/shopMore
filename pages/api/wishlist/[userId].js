import { firestore } from '../../../utils/firebase';

const wishlist = async (req, res) => {
  const { userId } = req.query;
  try {
    const userCollection = await firestore
      .collection('users')
      .doc(userId)
      .get();
    // .collection('wishlist')
    // .get();
    if (!userCollection.exists) {
      throw new Error('INVALID_USER');
    }
    const response = await userCollection.ref.collection('wishlist').get();
    const userWishlist = response.docs.map((wishlist) => {
      return {
        ...wishlist.data(),
      };
    });
    res.status(200).json({ msg: 'WISHLIST_FETCHED', userWishlist });
  } catch (e) {
    res.status(400).send(`${e.message}`);
  }
};

export default wishlist;
