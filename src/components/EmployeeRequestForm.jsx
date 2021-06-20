import React, { useState, useContext } from 'react';
import { MessageContext } from '../context/MessageContext';
import { Storage } from 'aws-amplify';
import { v4 as uuid } from 'uuid';

const typeOptions = ['-', 'Lodging', 'Travel', 'Food', 'Other'];

const initVals = {
  description: '',
  amount: 0,
  type: '-',
  imageUrl: '',
};

function EmployeeRequestForm({ addRequest }) {
  const { handleSetMessage } = useContext(MessageContext);
  const [form, setForm] = useState(initVals);

  function handleRequestSubmit(e) {
    e.preventDefault();
    // validate that all fields are required
    const missingFields = getMissingFormFields();
    if (missingFields.length) {
      const prettyList = missingFields.join(', ');
      handleSetMessage('error', `Please include ${prettyList}`);
      return;
    }

    // addRequest(form);
    setForm(initVals);
  }

  function getMissingFormFields() {
    const { description, amount, type, imageUrl } = form;
    const missingFields = [];
    if (!description) {
      missingFields.push('description');
    }
    if (!amount) {
      missingFields.push('amount');
    }
    if (type === '-') {
      missingFields.push('type');
    }
    if (!imageUrl) {
      missingFields.push('image file');
    }
    return missingFields;
  }

  function handleReqFormChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleFileUpload(e) {
    const image = e.target.files[0];
    // get file type
    const filetype = image.name.split('.')[image.name.split.length - 1];
    // add unique id to avoid name collisions
    const fileName = `${uuid()}.${filetype}`;
    try {
      const { key } = await Storage.put(fileName, image);
      setForm({ ...form, imageUrl: key });
    } catch (error) {
      console.log(error);
    }
  }

  const { description, amount, type } = form;

  return (
    <div className='w-full max-w-xs text-sm'>
      <h2 className='text-2xl action-text form-title text-center mb-3'>
        Reimbursement Request
      </h2>
      <form
        onSubmit={handleRequestSubmit}
        className='bg-gray menu-card relative px-8 pt-6 pb-8 mb-4'
        action='emp-request'
      >
        <div className='text-xs absolute top-2 right-2 text-gray-700'>
          Required*
        </div>
        <label
          className='block text-gray-700 text-sm font-bold mb-2'
          htmlFor='type'
        >
          Type*
        </label>
        <select
          required
          value={type}
          name='type'
          onChange={handleReqFormChange}
          className='block appearance-none w-full bg-white border border-gray-200 hover:border-gray-500 px-4 py-2 pr-8 mb-6 shadow-sm leading-tight focus:outline-none focus:shadow-outline'
        >
          {typeOptions.map((expense_type, idx) => (
            <option value={expense_type.toUpperCase()} key={idx}>
              {expense_type}
            </option>
          ))}
        </select>
        <label
          className='block text-gray-700 text-sm font-bold mb-2'
          htmlFor='amount'
        >
          Amount*
        </label>
        <input
          onChange={handleReqFormChange}
          className='block appearance-none w-full bg-white border border-gray-200 hover:border-gray-500 px-4 py-2 pr-8 shadow-sm mb-6 text-sm leading-tight focus:outline-none focus:shadow-outline'
          type='number'
          name='amount'
          value={amount}
          required
        />
        <label
          className='block text-gray-700 text-sm font-bold mb-2'
          htmlFor='amount'
        >
          Description*
        </label>
        <textarea
          name='description'
          value={description}
          onChange={handleReqFormChange}
          className='hover:border-gray-500 form-textarea mt-1 block w-full border border-gray-200 px-2 py-2 mb-5'
          rows='3'
          placeholder='Additional information'
          required
        ></textarea>

        <label
          className={
            !form.imageUrl
              ? 'action-text flex justify-center mb-4'
              : 'flex justify-center mb-4'
          }
        >
          <span className='text-base leading-normal cursor-pointer'>
            {!form.imageUrl ? 'Attach receipt image file*' : `File attached`}
          </span>
          <input onChange={handleFileUpload} type='file' className='hidden' />
        </label>

        <div className='flex justify-center'>
          <input
            onClick={handleRequestSubmit}
            className='shadow form-btn focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4'
            type='submit'
            value='Submit Request'
          />
        </div>
      </form>
    </div>
  );
}

export default EmployeeRequestForm;
