import { firestore } from '../../../utils/firebase';
const product = async (req, res) => {
  const { productId } = req.query;
  console.log(productId);
  try {
    const product = await firestore.collection('products').doc(productId).get();

    res.status(200).json(product.data());
  } catch (error) {
    res.status(400).json({ error });
  }
};

export default product;
