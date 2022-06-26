import { firestore } from '../../../utils/firebase';

const orders = async (req, res) => {
  const { userId } = req.query;
  console.log(userId);
  try {
    const response = await firestore
      .collection('users')
      .doc(userId)
      .collection('orders')
      .get();
    const orders = response.docs.map((cur) => {
      return { ...cur.data() };
    });

    res.status(200).json({ msg: 'ORDERS_FETCHED', orders });
  } catch (e) {
    res.status(400).json({ e });
  }
};

export default orders;
