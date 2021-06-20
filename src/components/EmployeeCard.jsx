import React from 'react';

const EmployeeCard = ({ id, email, firstName, lastName, type, imageUrl }) => {
  function handleCopyEmail() {
    navigator.clipboard.writeText(email);
    alert(`${email} copied to clipboard`);
  }

  return (
    <div className='relative  custom-w-18 shadow hover:shadow-lg overflow-hidden mr-8'>
      <div className='flex flex-col'>
        <header className='flex justify-between p-4 z-20 '>
          <div className='flex flex-col'>
            <div className='h-20 w-20'>
              <img src={imageUrl} alt='staff' />
            </div>
          </div>
          <div className='flex flex-col text-black-100 z-30 mb-4'>
            <div className='flex flex-col items-end'>
              <div className='tracking-widest font-semibold'>{`${type[0]}${type
                .slice(1)
                .toLowerCase()}`}</div>
              <div>
                {firstName} {lastName}
              </div>
            </div>
          </div>
        </header>
        <div className='flex items-center justify-between px-4 h-16 z-30 text-black bg-gray-100'>
          <button onClick={handleCopyEmail} className='action-text flex'>
            {email}
          </button>
          <div className='flex flex-col items-end'>
            <span>
              {' '}
              ID <span className='font-thin text-sm'>{id.slice(0, 6)}</span>
            </span>
          </div>
        </div>
        <div className='absolute opacity-90 top-0 left-0 h-full blur w-full bg-gray-100'></div>
      </div>
    </div>
  );
};

export default EmployeeCard;
