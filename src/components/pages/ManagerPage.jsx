import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { ReimbursementContext } from '../../context/ReimbursementContext';
// component imports
import Page from '../Page';
import Card from '../Card';
import Employees from '../Employees';
import ReimbursementTableManager from '../ReimbursementTableManager';

import usersIcon from '../../svg-icons/usersIcon';
import timeIcon from '../../svg-icons/time';
import bank from '../../svg-icons/bank';

// gql queries
const views = {
  pending: 'pending',
  resolved: 'resolved',
  employees: 'employees',
};

const { pending, resolved, employees } = views;

const ManagerPage = () => {
  const { user } = useContext(UserContext);
  const {
    getAllReimbursementRequests,
    requests,
    handleApproveReq,
    handleDenyReq,
    setRequests,
  } = useContext(ReimbursementContext);
  const [view, setView] = useState(pending);
  // const [requests, setRequests] = useState([]);

  const history = useHistory();

  useEffect(() => {
    if (!user.username || user.type !== 'MANAGER') {
      history.push('/');
    }
  }, [user, history]);

  return (
    <Page className='bg-gray-200'>
      <h1 style={{ fontSize: 'calc(1.3rem + .3vw)' }}>Reimbursements</h1>
      <h2
        style={{ fontSize: 'calc(1rem + .2vw)' }}
        className='text-xl uppercase text-gray-500'
      >
        Manager
      </h2>
      <h3 style={{ fontSize: 'calc(1rem + .2vw)' }} className='mb-10'>
        {user.username}
      </h3>
      <div
        name='card-container'
        className='flex flex-wrap gap-x-5 gap-y-3 justify-center mb-9'
      >
        <Card
          action={() => setView(pending)}
          icon={timeIcon}
          title='Pending'
          desc='View all pending reimbursement requests'
        />
        <Card
          action={() => setView(resolved)}
          icon={bank}
          title='Resolved'
          desc='View all approved/rejected reimbursement requests'
        />
        <Card
          action={() => setView(employees)}
          icon={usersIcon}
          title={'Employees'}
          desc={'View all employees on record'}
        />
      </div>

      <div
        className='main-content flex justify-center relative'
        name='main-content'
      >
        {view === 'employees' ? (
          <Employees view={view} />
        ) : (
          user && (
            <ReimbursementTableManager
              setRequests={setRequests}
              view={view}
              user={user}
              requests={requests}
              reloadRequests={getAllReimbursementRequests}
              handleApproveReq={handleApproveReq}
              handleDenyReq={handleDenyReq}
            />
          )
        )}
      </div>
    </Page>
  );
};

export default ManagerPage;
