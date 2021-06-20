import React from 'react';

const Card = ({ icon, title, desc, action }) => {
  function handleClick() {
    // console.log('hello');
    action();
  }

  return (
    <button
      onClick={handleClick}
      className='menu-card pt-6 px-7 custom-w-260p pb-4 mb-5 hover:shadow'
      name='cust-request-new'
      id='custRequestNew'
    >
      <div className='card-header card-subheader-container'>
        <h3 className='fs-6 tertiary-color flex-baseline-custom mb-3'>
          <span className='mr-2'>{icon()}</span>
          <span className='action-text'>{title}</span>
        </h3>
        <p>{desc}</p>
      </div>
    </button>
  );
};

export default Card;
