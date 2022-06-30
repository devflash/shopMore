import { firestore } from '../../../utils/firebase';

const orders = async (req, res) => {
  const { userId } = req.query;
  console.log(userId);
  try {
    const userCollection = await firestore
      .collection('users')
      .doc(userId)
      .get();
    // .collection('orders')
    // .get();
    if (!userCollection.exists) {
      throw new Error('INVALID_USER');
    }
    const response = await userCollection.ref.collection('orders').get();
    const orders = response.docs.map((cur) => {
      return { ...cur.data() };
    });

    res.status(200).json({ msg: 'ORDERS_FETCHED', orders });
  } catch (e) {
    res.status(400).send(`${e.message}`);
  }
};

export default orders;
