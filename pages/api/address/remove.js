import { firestore } from '../../../utils/firebase';

const remove = async (req, res) => {
  try {
    const address = req.body;
    const addressRef = await firestore
      .collection('users')
      .doc(address.userId)
      .collection('addresses')
      .doc(address.id)
      .get();

    addressRef.ref.delete();
    res.status(200).json({ msg: 'ADDRESS_REMOVED' });
  } catch (e) {
    throw e;
  }
};

export default remove;
