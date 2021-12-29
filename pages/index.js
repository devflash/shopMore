import Head from 'next/head';
import Layout from '../components/layout';
import { Global, css } from '@emotion/react';
import Products from '../components/products';
export default function Home({ products }) {
  console.log(products);
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
      <Global
        styles={css`
          *,
          ::before,
          ::after {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-size: 16px;
          }
        `}
      />
      <Layout>{<Products products={products} />}</Layout>
    </div>
  );
}

export const getServerSideProps = async () => {
  const response = await fetch('https://fakestoreapi.com/products');
  const data = await response.json();
  console.log(data);
  return {
    props: {
      products: data.slice(10),
    },
  };
};
