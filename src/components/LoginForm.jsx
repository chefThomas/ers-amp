import React, { useState } from 'react';

const LoginForm = ({ login, setDisplayForm }) => {
  const initialValues = { username: '', password: '' };

  const [form, setForm] = useState(initialValues);
  // const [loggedIn, setLoggedIn] = useState(false);

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    login(form);
  }

  return (
    <div className='font-sans login bg-cover'>
      <div className='container mx-auto h-full flex flex-1 justify-center items-center'>
        <div className='leading-loose' style={{ width: '300px' }}>
          <form
            onSubmit={handleFormSubmit}
            className='bg-gray menu-card relative px-8 pt-6 pb-8 mb-4'
          >
            <p className='text-gray-600 text-center text-lg mb-5 font-bold uppercase'>
              Login
            </p>
            <div className=''>
              <input
                onChange={onChange}
                name='username'
                className='block appearance-none w-full bg-white border border-gray-200 hover:border-gray-500 px-4 py-2 pr-8 shadow-sm mb-6 leading-tight focus:outline-none focus:shadow-outline'
                value={form.username}
                placeholder='username'
                aria-label='username'
                required
              />
            </div>
            <div className='mt-2'>
              <input
                onChange={onChange}
                className='block appearance-none w-full bg-white border border-gray-200 hover:border-gray-500 px-4 py-2 pr-8 shadow-sm mb-6 leading-tight focus:outline-none focus:shadow-outline'
                name='password'
                id='password'
                type='password'
                placeholder='password'
                arial-label='password'
                required
              />
            </div>
            <div className='mt-4 mb-3 items-center flex justify-center'>
              <button
                type='submit'
                className='px-4 py-1 text-white tracking-wider form-btn '
              >
                Submit
              </button>
            </div>
            <div className='flex justify-center'>
              <button
                className='action-text'
                onClick={() => setDisplayForm('signup')}
              >
                Signup
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
