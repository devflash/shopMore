import { firestore } from '../../../utils/firebase';

const cart = async (req, res) => {
  const { userId } = req.query;
  try {
    const collection = await firestore
      .collection('users')
      .doc(userId)
      .collection('cart')
      .get();
    const userCart = collection.docs.map((cart) => {
      return {
        ...cart.data(),
      };
    });
    res.status(200).json({ msg: 'CART_FETCHED', items: userCart });
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: `${e}` });
  }
};

export default cart;
