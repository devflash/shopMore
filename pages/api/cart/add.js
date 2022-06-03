import { firestore } from '../../../utils/firebase';

const add = async (req, res) => {
  const cart = req.body;
  //   console.log(cart);
  try {
    const existing = await firestore
      .collection('users')
      .doc(cart.userId)
      .collection('cart')
      .where('id', '==', cart.id)
      .get();

    if (!existing.empty) {
      existing.docs.forEach(async (doc) => {
        const count = doc.data().count + 1;
        await firestore
          .collection('users')
          .doc(cart.userId)
          .collection('cart')
          .doc(doc.id)
          .set({ count }, { merge: true });
      });
    } else {
      cart.count = 1;
      const response = await firestore
        .collection('users')
        .doc(cart.userId)
        .collection('cart')
        .add(cart);
    }

    res.status(200).json({ msg: 'PRODUCT_ADDED_CART' });
  } catch (e) {
    res.status(400).json({ error: `${e}` });
  }
};

export default add;
