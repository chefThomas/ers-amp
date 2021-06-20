import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { UserContext } from '../../context/UserContext';
import { ReimbursementContext } from '../../context/ReimbursementContext';

import { Transition } from '@headlessui/react';
import Page from '../Page';
import Card from '../Card';
import EmployeeRequestForm from '../EmployeeRequestForm';
import ReimbursementTableEmployee from '../ReimbursementTableEmployee';

import bank from '../../svg-icons/bank';
import fatStacks from '../../svg-icons/fatStacks';
import time from '../../svg-icons/time';

const views = { pending: 'pending', request: 'request', resolved: 'resolved' };
const { pending, request, resolved } = views;

const EmployeePage = (props) => {
  const [view, setView] = useState(pending);
  const history = useHistory();
  const { user } = useContext(UserContext);
  const { submitRequest, getAnEmployeesRequests, requests } =
    useContext(ReimbursementContext);

  useEffect(() => {
    if (!user.username || user.type !== 'EMPLOYEE') {
      history.push('/');
    }
  }, [user]);

  return (
    <Page className='bg-gray-200'>
      <h1 className='text-gray-700' style={{ fontSize: 'calc(1.3rem + .6vw)' }}>
        Reimbursements
      </h1>
      <h2
        style={{ fontSize: 'calc(1rem + .3vw)' }}
        className='text-xl uppercase text-gray-500'
      >
        Employee
      </h2>
      <h3 style={{ fontSize: 'calc(1rem + .3vw)' }} className='mb-10'>
        {user.username}
      </h3>
      <div
        name='card-container'
        className='flex flex-wrap gap-x-5 gap-y-3 justify-center mb-9 divide-y-2'
      >
        <Card
          action={() => setView(request)}
          icon={fatStacks}
          title={'Request'}
          desc={'Submit a new request for reimbursement'}
        />
        <Card
          action={() => setView(pending)}
          icon={time}
          title='Pending'
          desc='View all pending reimbursement requests'
        />
        <Card
          action={() => setView(resolved)}
          icon={bank}
          title='Resolved'
          desc='View all approved/rejected reimbursement requests'
        />
      </div>
      <div
        className='main-content flex justify-center relative'
        name='main-content'
      >
        {view === request ? (
          <Transition
            appear={true}
            show={view === request}
            enter='transition ease-in-out duration-700 transform'
            enterTo='translate-y-0'
            enterFrom='translate-y-10'
          >
            <Transition.Child
              enter='transition-opacity duration-900'
              enterTo='opacity-80'
              enterFrom='opacity-0'
            >
              <EmployeeRequestForm addRequest={submitRequest} />
            </Transition.Child>
          </Transition>
        ) : (
          <ReimbursementTableEmployee
            view={view}
            user={user}
            requests={requests}
            reload={getAnEmployeesRequests}
          />
        )}
      </div>
    </Page>
  );
};

export default EmployeePage;
