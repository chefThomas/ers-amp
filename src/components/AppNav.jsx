import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';

const AppNav = () => {
  const { user, logout } = useContext(UserContext);

  return (
    <header className='border-b md:flex md:items-center md:justify-between p-4 pb-0 md:pb-4'>
      <div className='flex items-center justify-between mb-4 md:mb-0'>
        <h1 className='leading-none text-2xl text-grey-darkest'>
          <Link to='/'>
            <button
              className='no-underline text-grey-darkest hover:text-black'
              href='#'
            >
              ERS
            </button>
          </Link>
        </h1>

        <button className='text-black hover:text-orange md:hidden' href='#'>
          <i className='fa fa-2x fa-bars'></i>
        </button>
      </div>

      <nav>
        <ul className='list-reset md:flex md:items-center'>
          {user && user.username ? (
            <>
              <li className='md:ml-4'>
                <button
                  className='border-t block no-underline hover:underline py-2 text-grey-darkest hover:text-black md:border-none md:p-0'
                  onClick={() => logout()}
                >
                  Logout
                </button>
              </li>
            </>
          ) : null}
        </ul>
      </nav>
    </header>
  );
};

export default AppNav;
