import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { listUsers as ListUsers } from '../graphql/queries';
import EmployeeCard from './EmployeeCard';

const Employees = () => {
  useEffect(() => {
    callLoadEmps();
  }, []);

  const [emps, setEmps] = useState([]);

  async function callLoadEmps() {
    const result = await API.graphql({ query: ListUsers });
    if (result) {
      setEmps(result.data.listUsers.items);
    }
  }

  return (
    <div className='flex flex-wrap justify-center gap-5'>
      {emps
        .sort((a, b) => a.lastName - b.lastName)
        .map((props, i) => (
          <EmployeeCard key={i} {...props} />
        ))}
    </div>
  );
};

export default Employees;
