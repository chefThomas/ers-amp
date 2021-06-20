import React from 'react';

const Message = ({ type, text }) => {
  console.log(type, text);
  return type === 'info' ? (
    <div className='text-blue-400 font-semibold border rounded absolute left-0 right-0  px-2 py-1  bg-blue-100 border-blue-500 ml-auto mr-auto text-center w-1/2'>
      {text}
    </div>
  ) : (
    <div className='text-red-400 w-1/2 font-semibold border rounded absolute left-0 right-0  px-2 py-1 text-xl bg-red-100 border-red-500 ml-auto mr-auto text-center'>
      {text}
    </div>
  );
};

export default Message;
