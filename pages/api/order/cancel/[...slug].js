import { firestore } from '../../../../utils/firebase';
const cancel = async (req, res) => {
  const [userId, orderRef] = req.query.slug;
  try {
    const item = await firestore
      .collection('users')
      .doc(userId)
      .collection('orders')
      .where('orderRef', '==', Number(orderRef))
      .get();

    item.forEach((cur) => {
      cur.ref.delete();
    });
    res.status(200).json({ msg: 'ORDER_CANCELLED' });
  } catch (e) {
    console.log(e);
  }
};

export default cancel;
