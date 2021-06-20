import React, { useContext } from 'react';
import { MessageContext } from '../context/MessageContext';
import Message from './Message';
const Page = (props) => {
  const { message } = useContext(MessageContext);

  // the basic container for every page.
  return (
    <div className='page p-8 bg-gray-50'>
      {message.type && <Message {...message} />}
      {props.children}
    </div>
  );
};

export default Page;
