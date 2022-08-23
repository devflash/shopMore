import Head from 'next/head';
import Layout from '../components/layout';
import Products from '../components/products';

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
