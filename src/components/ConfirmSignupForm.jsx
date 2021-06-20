import React, { useState } from 'react';

const ConfirmSignupForm = ({ confirm, setFormView }) => {
  const initialValues = { confirmationCode: '' };

  const [form, setForm] = useState(initialValues);
  // const [loggedIn, setLoggedIn] = useState(false);

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    confirm(form);
  }

  return (
    <div className='font-sans login bg-cover'>
      <div className='container mx-auto h-full flex flex-1 justify-center items-center'>
        <div className='leading-loose' style={{ width: '300px' }}>
          <form
            onSubmit={handleFormSubmit}
            className='bg-gray menu-card relative px-8 pt-6 pb-8 mb-4'
          >
            <p className='text-gray-600 font-medium text-center text-lg mb-5'>
              Confirmation Code
            </p>
            <div className=''>
              <input
                onChange={onChange}
                name='confirmationCode'
                className='block appearance-none w-full bg-white border border-gray-200 hover:border-gray-500 px-4 py-2 pr-8 shadow-sm mb-6 leading-tight focus:outline-none focus:shadow-outline'
                value={form.confirmationCode}
                aria-label='confirmation code'
                required
              />
            </div>

            <div className='mt-4 items-center flex justify-center'>
              <button
                onClick={() => confirm(form)}
                type='submit'
                className='px-4 py-1 text-white tracking-wider form-btn mb-4'
              >
                Confirm
              </button>
            </div>
            <div className='flex justify-center action-text'>
              <button onClick={() => setFormView('signup')}>
                Back to Signup
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmSignupForm;
