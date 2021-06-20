import React, { useState, useEffect } from 'react';
import DescpriptionModal from './DescpriptionModal';
import ReimbursementRecordEmployee from './ReimbursementRecordEmployee';
import CloseIcon from '../svg-icons/close';

const ReimbursementTableEmployee = ({ view, requests }) => {
  const [modalText, setModalText] = useState(null);
  const [filtered, setFiltered] = useState([]);
  const [receiptImageSrc, setReceiptImageSrc] = useState(null);
  const resolved = view === 'resolved';

  useEffect(() => {
    function filterRequestsByView() {
      if (view === 'pending') {
        const filteredRequests = requests.filter((request) => {
          return request.status === 'PENDING';
        });
        setFiltered(filteredRequests);
      } else if (view !== 'pending') {
        const filteredRequests = requests.filter((request) => {
          return request.status !== 'PENDING';
        });
        setFiltered(filteredRequests);
      }
    }
    filterRequestsByView();
  }, [view, requests]);

  function closeModal() {
    setModalText(null);
  }

  function makeDescriptionModal(text) {
    setModalText(text);
  }

  return (
    <div
      className={`container mx-auto px-4 sm:px-8 ${
        resolved ? 'max-w-5xl' : 'max-w-3xl'
      }`}
    >
      <div className='py-8'>
        <div className='flex flex-row mb-1 sm:mb-0 justify-between w-full'>
          <h2 className='text-xl leading-tight'>
            {resolved ? 'Resolved Requests' : 'Pending Requests'}
          </h2>
          {/* <div className='text-end'>
            <form
              onSubmit={handleSubmit}
              className='flex w-full max-w-sm space-x-3'
            >
              <div className=' relative '>
                <input
                  onChange={handleSearchChange}
                  value={searchForm}
                  type='text'
                  name='search-form'
                  id='"form-subscribe-Filter'
                  className=' block appearance-none w-full bg-white border border-gray-200 hover:border-gray-500 px-4 py-2 pr-8 shadow-sm text-sm leading-tight focus:outline-none focus:shadow-outline'
                  placeholder={'search by description'}
                />
              </div>
              <div className='flex justify-center'>
                <input
                  className='shadow form-btn focus:shadow-outline focus:outline-none text-white text-xs font-bold py-2 px-4'
                  type='submit'
                  value='Search'
                />
              </div>
              <button
                onClick={() => filterRequestsByView()}
                className='flex flex-col justify-center cursor-pointer'
              >
                <RefreshIcon />
              </button>
            </form>
          </div> */}
        </div>
        <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
          <div className='inline-block min-w-full shadow overflow-hidden'>
            <table
              className='min-w-full leading-normal'
              style={{ overflowY: 'auto' }}
            >
              <thead>
                <tr>
                  <th
                    scope='col'
                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm text-left uppercase font-normal'
                  >
                    ID
                  </th>
                  {resolved && (
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm text-left uppercase font-normal'
                    >
                      Status
                    </th>
                  )}

                  <th
                    scope='col'
                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm text-left uppercase font-normal'
                  >
                    amount
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm text-left uppercase font-normal'
                  >
                    type
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                  >
                    submitted
                  </th>
                  {resolved && (
                    <>
                      <th
                        scope='col'
                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                      >
                        resolved
                      </th>
                      <th
                        scope='col'
                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                      >
                        manager
                      </th>
                    </>
                  )}
                  <th
                    scope='col'
                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800   text-sm uppercase font-normal'
                  >
                    desc.
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800   text-sm uppercase font-normal'
                  >
                    receipt
                  </th>
                </tr>
              </thead>
              <tbody className='relative'>
                {modalText && (
                  <DescpriptionModal
                    callback={() => closeModal()}
                    text={[modalText]}
                  />
                )}
                {receiptImageSrc && (
                  <div className='absolute flex flex-wrap justify-center shadow-lg transform translate-x-1/2 right-1/2 -translate-y-1/2'>
                    <button
                      className='absolute right-2 top-2 action-text bg-indigo-200 rounded-full hover:bg-indigo-800 hover:text-gray-300 duration-300 '
                      onClick={() => setReceiptImageSrc(null)}
                    >
                      <CloseIcon />
                    </button>
                    <div className='w-12/12'>
                      <img
                        src={receiptImageSrc}
                        alt='receipt'
                        className='rounded max-w-full h-auto align-middle border-none'
                      />
                    </div>
                  </div>
                )}
                {filtered &&
                  filtered.map(({ ...props }) => (
                    <ReimbursementRecordEmployee
                      {...props}
                      makeDescriptionModal={makeDescriptionModal}
                      showImage={setReceiptImageSrc}
                      view={view}
                      key={props.id}
                    />
                  ))}
              </tbody>
            </table>
            <div className='px-5 bg-white py-5 flex flex-col xs:flex-row items-center xs:justify-between'>
              <div className='flex items-center'>
                {/* TODO pagination
                <button
                  type='button'
                  className='w-full p-4 border text-base rounded-l-xl text-gray-600 bg-white hover:bg-gray-100'
                >
                  <svg
                    width='9'
                    fill='currentColor'
                    height='8'
                    className=''
                    viewBox='0 0 1792 1792'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z'></path>
                  </svg>
                </button>
                <button
                  type='button'
                  className='w-full px-4 py-2 border-t border-b text-base text-indigo-500 bg-white hover:bg-gray-100 '
                >
                  1
                </button>
                <button
                  type='button'
                  className='w-full px-4 py-2 border text-base text-gray-600 bg-white hover:bg-gray-100'
                >
                  2
                </button>
                <button
                  type='button'
                  className='w-full px-4 py-2 border-t border-b text-base text-gray-600 bg-white hover:bg-gray-100'
                >
                  3
                </button>
                <button
                  type='button'
                  className='w-full px-4 py-2 border text-base text-gray-600 bg-white hover:bg-gray-100'
                >
                  4
                </button>
                <button
                  type='button'
                  className='w-full p-4 border-t border-b border-r text-base  rounded-r-xl text-gray-600 bg-white hover:bg-gray-100'
                >
                  <svg
                    width='9'
                    fill='currentColor'
                    height='8'
                    className=''
                    viewBox='0 0 1792 1792'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z'></path>
                  </svg>
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReimbursementTableEmployee;
