import { FaShoppingCart, FaBars } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import MenuItems from '../utils/MenuItems';
import { useRouter } from 'next/router';

function Header() {
  const router = useRouter();

  return (
    <header className='sticky top-0 z-50 shadow-md flex w-full bg-black justify-center items-center text-white py-2 px-3'>
      <div className='grid w-full max-w-5xl grid-cols-3 text-center'>
        <div className='hidden md:flex justify-start text-left items-center'>
          {MenuItems.map((item, index) => (
            <Link key={index} href={item.url}>
              <a
                className={`text-gray-200 hover:text-white py-3 mr-3 border-b-2 font-medium text-xl ${
                  router.asPath === item.url ? 'border-red-600' : 'border-black'
                }`}
              >
                {item.label.toUpperCase()}
              </a>
            </Link>
          ))}
        </div>
        <div className='flex md:hidden justify-start items-center'>
          <button className='w-12 h-12 rounded-md flex justify-center items-center border-2 border-gray-200 text-gray-300 hover:border-white md:hidden hover:text-white'>
            <FaBars className='text-2xl text-white' />
          </button>
        </div>
        <div>
          <Link href='/'>
            <Image
              className='cursor-pointer'
              src='/logo.png'
              height={90}
              width={90}
            />
          </Link>
        </div>
        <div className='flex justify-end items-center cursor-pointer snipcart-checkout text-gray-200 hover:text-white'>
          <FaShoppingCart className='text-3xl' />
          <p className='ml-2'>
            <span className='snipcart-items-count'>0</span>
          </p>
        </div>
      </div>
    </header>
  );
}

export default Header;
