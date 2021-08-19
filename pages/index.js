import Script from 'next/script';
import Head from 'next/head';
import Link from 'next/link';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export default function Home({ products }) {
  return (
    <>
      <div className='flex flex-col min-h-screen items-center justify-center bg-gray-100'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto w-full flex-1 px-16 text-center bg-gray-100'>
          {products.map((product) => {
            return (
              <Link key={product._id} href={`/product/${product._id}`}>
                <div
                  className='cursor-pointer flex flex-col items-center justify-center max-w-sm mx-auto m-5 hover:scale-105 transition
     transform duration-200 ease-out'
                >
                  <div
                    className='w-80 h-80 bg-gray-300 bg-center bg-cover rounded-lg shadow-md'
                    style={{
                      backgroundImage: `url(${product.images[0]})`,
                    }}
                  ></div>

                  <div className='w-64 -mt-10 overflow-hidden bg-white rounded-lg shadow-lg md:w-64 dark:bg-gray-800'>
                    <h3 className=' h-12 py-2 font-bold leading-none text-lg tracking-wide text-center flex justify-center items-center text-gray-800 uppercase dark:text-white'>
                      {product.title}
                    </h3>

                    <div className='flex items-center justify-between px-3 py-2 bg-gray-200 dark:bg-gray-700'>
                      <span className='font-bold text-gray-800 dark:text-gray-200'>
                        ${product.price}
                      </span>
                      <button className='px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-200 transform bg-gray-800 rounded hover:bg-gray-700 dark:hover:bg-gray-600 focus:bg-gray-700 dark:focus:bg-gray-600 focus:outline-none'>
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: 'https://barbells-server.herokuapp.com/',
    cache: new InMemoryCache(),
  });

  const response = await client.query({
    query: gql`
      query {
        getProducts {
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
    `,
  });

  const products = response.data.getProducts;

  return {
    props: {
      products,
    },
  };
}
