/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Layout from '../../components/layout';
import Card from '../../components/card';
import { firestore } from '../../utils/firebase';
import { useAuth } from '../../context';
import nookies from 'nookies';
import { server } from '../../config';

const customLayout = css`
  height: 100vh;
  padding: 10px;
`;

const wrapper = css`
  width: 90%;
  margin: 20px auto 0;
  max-width: 450px;
`;

const userName = css`
  font-size: 1.2rem;
`;

const Wishlist = ({ wishlist }) => {
  const { authUser } = useAuth();
  return (
    <Layout layoutStyle={customLayout}>
      {authUser && (
        <h1 css={userName}>{`${authUser.displayName}'s wishlist`}</h1>
      )}
      <div css={wrapper}>
        {wishlist.length > 0 ? (
          wishlist.map((cur) => <Card key={cur.id} data={cur} />)
        ) : (
          <h3>Your wishlist is empty</h3>
        )}
      </div>
    </Layout>
  );
};

export const getServerSideProps = async (context) => {
  console.log('Server side props');
  let wishlist = [];
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
      .collection('wishlist')
      .get();
    wishlist = collection.docs.map((wishlist) => {
      return {
        ...wishlist.data(),
      };
    });
  } else {
    const { res } = context;
    res.setHeader('location', '/signin');
    res.statusCode = 302;
    res.end();
    return;
  }

  return {
    props: {
      wishlist,
    },
  };
};

export default Wishlist;
