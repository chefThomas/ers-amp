import React from 'react';

const Modal = ({ title, text = [], callback }) => {
  return (
    <div className=' absolute right-10 bg-gray-50 pt-10 pb-8 px-6 flex border border-indigo-300 text-gray-800 my-4 shadow-2xl'>
      <div className='px-3'>
        <h3 className=' absolute top-2 left-2 tracking-wider action-text'>
          {title}
        </h3>
        {text.map((p, i) => (
          <div key={i} className='text-left'>
            {p}
          </div>
        ))}
        <div className='space-x-6 text-right'>
          {/* <button
            onClick={() => callback()}
            className='font-semibold tracking-wider hover:underline focus:outline-none absolute top-2 right-2'
          >
            <Close />
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Modal;
