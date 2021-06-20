import React, { useState } from 'react';

const SignupForm = ({ setDisplayForm, signup }) => {
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
  };

  const [form, setForm] = useState(initialValues);

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    signup(form);
  }

  return (
    <div className='font-sans login bg-cover'>
      <div className='container mx-auto h-full flex flex-1 justify-center items-center'>
        <div className='leading-loose' style={{ width: '300px' }}>
          <form
            onSubmit={handleFormSubmit}
            className='bg-gray menu-card relative px-8 pt-6 pb-8 mb-4'
          >
            <p className='text-gray-600 uppercase text-center text-lg mb-5 font-bold'>
              Signup
            </p>
            <div className=''>
              <input
                onChange={onChange}
                name='firstName'
                className='block appearance-none w-full bg-white border border-gray-200 hover:border-gray-500 px-4 py-2 pr-8 shadow-sm mb-6 leading-tight focus:outline-none focus:shadow-outline'
                value={form.firstName}
                placeholder='first name'
                aria-label='first name'
                required
              />
            </div>
            <div className='mt-2'>
              <input
                onChange={onChange}
                name='lastName'
                className='block appearance-none w-full bg-white border border-gray-200 hover:border-gray-500 px-4 py-2 pr-8 shadow-sm mb-6 leading-tight focus:outline-none focus:shadow-outline'
                value={form.lastName}
                placeholder='last name'
                aria-label='last name'
                required
              />
            </div>
            <div className='mt-2'>
              <input
                onChange={onChange}
                name='email'
                className='block appearance-none w-full bg-white border border-gray-200 hover:border-gray-500 px-4 py-2 pr-8 shadow-sm mb-6 leading-tight focus:outline-none focus:shadow-outline'
                value={form.email}
                placeholder='email'
                aria-label='email'
                required
              />
            </div>
            <div className='mt-2'>
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
                name='password'
                className='block appearance-none w-full bg-white border border-gray-200 hover:border-gray-500 px-4 py-2 pr-8 shadow-sm mb-6 leading-tight focus:outline-none focus:shadow-outline'
                value={form.password}
                placeholder='password'
                aria-label='password'
                required
              />
            </div>
            <div className='mt-4 items-center flex justify-center'>
              <button
                type='submit'
                className='px-4 py-1 text-white tracking-wider form-btn mb-2'
              >
                Signup
              </button>
            </div>
            <div className='flex justify-center action-text'>
              <button onClick={() => setDisplayForm('login')}>Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
