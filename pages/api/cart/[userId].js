import { firestore } from '../../../utils/firebase';

const cart = async (req, res) => {
  const { userId } = req.query;
  try {
    const collection = await firestore.collection('users').doc(userId).get();

    if (!collection.exists) {
      throw new Error('INVALID_USER');
    }
    const cartCollection = await collection.ref.collection('cart').get();

    const userCart = cartCollection.docs.map((cart) => {
      return {
        ...cart.data(),
      };
    });
    res.status(200).json({ msg: 'CART_FETCHED', items: userCart });
  } catch (e) {
    console.log(e);
    res.status(400).send(`${e.message}`);
  }
};

export default cart;
