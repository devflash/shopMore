import { firestore } from '../../../../utils/firebase';

const all = async (req, res) => {
  const { userId } = req.query;
  const addresses = [];
  try {
    const userCollection = await firestore
      .collection('users')
      .doc(userId)
      .get();
    // .collection('addresses')
    // .get();

    if (!userCollection.exists) {
      throw new Error('INVALID_USER');
    }
    const response = await userCollection.ref.collection('addresses').get();
    response.docs.forEach((address, i) => {
      addresses.push({
        id: address.id,
        ...address.data(),
        selected: i === 0,
      });
    });
    res.status(200).json({ msg: 'ADDRESSES_FETCHED', addresses });
  } catch (e) {
    res.status(400).send(`${e.message}`);
  }
};

export default all;
