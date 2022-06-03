/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Layout from '../../components/layout';
import CartItems from '../../components/cartItems';
import nookies from 'nookies';
import { firestore } from '../../utils/firebase';
const customLayout = css`
  height: calc(100vh - 78px);
  padding: 10px;
`;

const Cart = ({ items }) => (
  <Layout layoutStyle={customLayout}>
    <CartItems items={items} />
  </Layout>
);

export const getServerSideProps = async (context) => {
  let items = [];
  const {
    params: { userId },
  } = context;
  const cookies = nookies.get(context);
  console.log('cookies', cookies);
  const response = await fetch(`http://localhost:3000/api/verifyAuth`, {
    method: 'POST',
    body: JSON.stringify({ cookies }),
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await response.json();
  const { uid } = data;

  if (uid) {
    const collection = await firestore
      .collection('users')
      .doc(userId)
      .collection('cart')
      .get();
    items = collection.docs.map((cart) => {
      return {
        ...cart.data(),
      };
    });
  }
  console.log(items);
  return {
    props: {
      items,
    },
  };
};

export default Cart;
