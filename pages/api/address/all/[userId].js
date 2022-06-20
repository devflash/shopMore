import { firestore } from '../../../../utils/firebase';

const all = async (req, res) => {
  const { userId } = req.query;
  const addresses = [];
  try {
    const response = await firestore
      .collection('users')
      .doc(userId)
      .collection('addresses')
      .get();

    response.forEach((address) => {
      addresses.push({
        id: address.id,
        ...address.data(),
      });
    });
    res.status(200).json(addresses);
  } catch (e) {
    res.status(400).json({ error: `${e}` });
  }
};

export default all;
