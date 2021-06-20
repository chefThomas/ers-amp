import React from 'react';
import ReadIcon from '../svg-icons/readDesc';
import PhotoIcon from '../svg-icons/photo';
import CheckIcon from '../svg-icons/check';
import RejectIcon from '../svg-icons/reject';
import formatDate from '../utils/formatDate';

const Record = ({
  id,
  amount,
  reimbursementType,
  createdAt,
  updatedAt,
  description,
  makeDescriptionModal,
  resolvedBy,
  status,
  showImage,
  imageUrl,
}) => {
  const resolved = status !== 'PENDING';

  return (
    <tr className='w-100'>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <div className='flex-shrink-0'></div>
        <div className='ml-1'>
          <p className='text-gray-900 whitespace-no-wrap'>{id.slice(0, 5)}</p>
        </div>
      </td>
      {resolved && (
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <p className='text-gray-900 whitespace-no-wrap  pr-10'>
            {status === 'APPROVED' ? <CheckIcon /> : <RejectIcon />}
          </p>
        </td>
      )}
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap text-left pr-10'>
          ${(Math.round(amount * 100) / 100).toFixed(2)}
        </p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap pr-10'>
          {reimbursementType}
        </p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>
          {formatDate(createdAt)}
        </p>
      </td>
      {resolved && (
        <>
          <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
            <p className='text-gray-900 whitespace-no-wrap'>
              {formatDate(updatedAt)}
            </p>
          </td>
          <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
            <p className='text-gray-900 whitespace-no-wrap'>
              {resolvedBy.slice(0, 5)}
            </p>
          </td>
        </>
      )}

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-center text-sm'>
        <button
          onClick={() => makeDescriptionModal(description)}
          href='#'
          className='text-indigo-600 hover:text-indigo-900'
        >
          {(description && <ReadIcon />) || '--'}
        </button>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-center text-sm'>
        <button
          onClick={() => showImage(imageUrl)}
          href='#'
          className='text-indigo-600 hover:text-indigo-900'
        >
          <PhotoIcon />
        </button>
      </td>
    </tr>
  );
};

export default Record;
