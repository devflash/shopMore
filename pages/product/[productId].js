const ProductPage = ({ product }) => (
  <>
    <h1>Product page</h1>
    <p>{product.title}</p>
  </>
);

export default ProductPage;

export const getServerSideProps = async (context) => {
  const {
    params: { productId },
  } = context;
  const response = await fetch(
    `https://fakestoreapi.com/products/${productId}`
  );
  const data = await response.json();
  return {
    props: {
      product: data,
    },
  };
};
