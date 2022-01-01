import { firestore } from '../../utils/firebase';
const products = async (req, res) => {
  try {
    const collection = await firestore.collection('products').get();
    const products = collection.docs.map((product) => {
      return {
        productId: product.id,
        ...product.data(),
      };
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error });
  }
};

export default products;
