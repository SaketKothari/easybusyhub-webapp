import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from '@heroicons/react/outline';

import Sidebar from './Sidebar';
import { selectItems } from '../slices/basketSlice';

function Header(props) {
  const router = useRouter();
  const { data: session } = useSession();

  const items = useSelector(selectItems);
  const [sidebar, setSidebar] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setSidebar(false);
    setIsMounted(true);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50">
        {/* Top Nav */}
        <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
          <div className="mr-5 mt-2 flex items-center flex-grow sm:flex-grow-0">
            <img
              src="/EasyBusyHub.png"
              onClick={() => router.push('/')}
              width={110}
              height={40}
              alt="logo"
              className="object-cover cursor-pointer active:transform active:scale-90"
            />
          </div>

          {/* Custom search bar */}
          <div className="hidden sm:flex items-center h-10 rounded-md bg-yellow-400 hover:bg-yellow-500 flex-grow cursor-pointer">
            <input
              type="text"
              className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none"
              placeholder={
                router.route === '/'
                  ? '🔎 Search in products listed below…'
                  : ''
              }
              onInput={(event) =>
                router.route === '/' && props.onSearchValue(event.target.value)
              }
            />
            <SearchIcon className="h-12 p-4" />
          </div>

          {/* Right */}
          <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
            <div
              onClick={!session ? signIn : signOut}
              className="link cursor-pointer"
            >
              <p className="hover:underline">
                {session ? `Hello, ${session.user.name}` : 'Sign In'}
              </p>
              <p className="font-extrabold md:text-sm">Account & Lists</p>
            </div>
            <div className="link" onClick={() => router.push('/orders')}>
              <p>Returns</p>
              <p className="font-extrabold md:text-sm">& Orders</p>
            </div>
            <div
              onClick={() => router.push('/checkout')}
              className="relative link flex items-center"
            >
              <span
                className={`absolute top-0 right-0 md:right-10 h-4 ${
                  items.length >= 10 ? 'w-6' : 'w-4'
                } bg-yellow-400 text-center rounded-full text-black font-bold`}
              >
                {isMounted ? items?.length : 0}
              </span>
              <ShoppingCartIcon className="h-10" />
              <p className="hidden md:inline font-extrabold md:text-sm mt-2">
                Basket
              </p>
            </div>
          </div>
        </div>

        {/* Bottom nav */}
        <div className="flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm">
          <p
            className="link flex items-center"
            onClick={() => (sidebar ? setSidebar(false) : setSidebar(true))}
          >
            <MenuIcon className="h-6 mr-1" />
            All
          </p>
          <p className="link">Prime Video</p>
          <p className="link">Easybusyhub Business</p>
          <p className="link">Today's Deals</p>
          <p className="link hidden lg:inline-flex">Electronics</p>
          <p className="link hidden lg:inline-flex">Foods & Grocery</p>
          <p className="link hidden lg:inline-flex">Prime</p>
          <p className="link hidden lg:inline-flex">Buy Again</p>
        </div>
      </header>

      {sidebar ? <Sidebar /> : null}
    </>
  );
}

export default Header;
