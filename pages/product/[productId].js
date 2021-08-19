import { useState } from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import Script from 'next/script';
import Head from 'next/head';

function Product({ product }) {
  const images = product.images;

  const [activeImage, setActiveImage] = useState(images[0]);
  const [variantId, setVariantId] = useState(product.variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [disable, setDisable] = useState(quantity > variantId.quantity);

  return (
    <>
      <Head>
        <title>{product.title}</title>
        <link rel='icon' href='/favicon.ico' />
        <link rel='preconnect' href='https://app.snipcart.com' />
        <link rel='preconnect' href='https://cdn.snipcart.com' />
        <link
          rel='stylesheet'
          href='https://cdn.snipcart.com/themes/v3.2.1/default/snipcart.css'
        />
      </Head>
      <div className='flex bg-gray-50 w-full items-start justify-center'>
        <div className='flex flex-col md:flex-row max-w-full lg:max-w-6xl'>
          <div className='flex flex-col'>
            <img
              src={activeImage}
              alt='product image'
              className='rounded h-1/3 w-auto max-w-2xl m-4 lg:h-4/5 shadow-md'
            />
            <div className='flex m-4'>
              {images.map((image) => {
                return (
                  <img
                    key={image}
                    className='rounded mr-2 w-24 h-auto cursor-pointer'
                    src={image}
                    onClick={() => setActiveImage(image)}
                  />
                );
              })}
            </div>
          </div>
          <div className='flex flex-col justify-start mx-4'>
            <h1 className='p-2 md:py-4 font-bold text-left text-2xl border-b-2'>
              {product.title}
            </h1>
            <span />
            <p className='text-lg font-medium px-2 py-4'>${product.price}</p>
            {product.variants.length > 1 && (
              <div className='flex m-2'>
                <div className='text-lg mr-2 font-medium flex items-center'>
                  Size:{' '}
                </div>
                {product.variants.map((variant) => {
                  return (
                    <div
                      key={variant.variantId}
                      className={`cursor-pointer rounded-full w-12 border p-2 m-2 flex justify-center items-center ${
                        variantId.size == variant.size ? 'border-black' : ' '
                      }`}
                      onClick={() => {
                        setVariantId(variant);
                        if (quantity > variantId.quantity) {
                          setDisable(true);
                        } else {
                          setDisable(false);
                        }
                      }}
                    >
                      {variant.size}
                    </div>
                  );
                })}
              </div>
            )}
            <div className='flex flex-col m-2'>
              <label htmlFor='quantity' className='text-lg font-medium'>
                Quantity:
              </label>
              <div className='flex h-10 w-28 rounded-lg relative mt-2'>
                <button
                  onClick={() => {
                    if (quantity > 1) setQuantity(quantity - 1);
                    if (quantity > variantId.quantity) {
                      setDisable(true);
                    } else {
                      setDisable(false);
                    }
                  }}
                  className='bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none'
                >
                  <span className='m-auto text-2xl font-thin'>-</span>
                </button>
                <p className='outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex justify-center items-center text-gray-700'>
                  {quantity}
                </p>
                <button
                  onClick={() => {
                    if (quantity < 5) setQuantity(quantity + 1);
                    if (quantity > variantId.quantity) {
                      setDisable(true);
                    } else {
                      setDisable(false);
                    }
                  }}
                  className='bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer outline-none'
                >
                  <span className='m-auto text-2xl font-thin'>+</span>
                </button>
              </div>
              <button
                className='flex w-40 mt-8 text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg snipcart-add-item'
                data-item-id={product._id}
                data-item-price={product.price}
                data-item-url={`/product/${product._id}`}
                data-item-description={product.description}
                data-item-image={images[0]}
                data-item-name={product.title}
                data-item-custom1-name='variantId'
                data-item-custom1-type='hidden'
                data-item-custom1-value={variantId.variantId}
                data-item-custom2-name='Size'
                data-item-custom2-type='readonly'
                data-item-custom2-value={variantId.size}
                disabled={variantId.quantity < quantity}
              >
                {disable && 'Sold Out'}
                {!disable && 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ query }) {
  const productId = query.productId;
  const client = new ApolloClient({
    uri: 'https://barbells-server.herokuapp.com/',
    cache: new InMemoryCache(),
  });

  const getProduct = gql`
    query ($productId: String!) {
      getProduct(productId: $productId) {
        _id
        slug
        title
        description
        price
        images
        variants {
          variantId
          size
          quantity
        }
      }
    }
  `;

  const response = await client.query({
    query: getProduct,
    variables: { productId: productId },
  });
  const product = response.data.getProduct;
  return {
    props: {
      product,
    },
  };
}

export default Product;
