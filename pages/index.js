import Head from 'next/head';
import Layout from '../components/layout';
import Products from '../components/products';
import { server } from '../config';
import axios from 'axios';

export default function Home({ products }) {
  return (
    <div>
      <Head>
        <title>Shop More</title>
        <meta
          name="description"
          content="Shopping site project created with Next.js"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>{<Products products={products} />}</Layout>
    </div>
  );
}

export const getServerSideProps = async () => {
  const { data } = await axios.get(`http://localhost:3001/api/products`);

  return {
    props: {
      products: data,
    },
  };
};
