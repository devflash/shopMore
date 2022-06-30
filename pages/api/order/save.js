import { firestore } from '../../../utils/firebase';

const save = async (req, res) => {
  try {
    const order = req.body;
    const response = await firestore
      .collection('users')
      .doc(order.userId)
      .collection('orders')
      .add(order);

    res.status(200).json({ msg: 'ORDER_PLACED' });
  } catch (e) {
    res.status(400).send(`${e.message}`);
  }
};

export default save;
