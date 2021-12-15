import React, { ChangeEvent, MouseEventHandler, useCallback, useEffect, useState } from 'react';
import { Button, Table } from 'reactstrap';
import axios from 'axios';
import VirtualAssistance from './virtual-assistant';
import Preview from './preview';

const UserList = () => {
  const [isVirtualOpen, setVirtualOpen] = useState(false);
  const [isPreviewOpen, setPreviewOpen] = useState(false);
  const [users, setUsers] = useState<IUser[]>([]);
  
  const fetchUsers = useCallback(async () => {
    try {
      const {data: {users}} = await axios.get('/api/user');
  
      setUsers(users);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    }
  }, []);

  const toggleVirtual = () => setVirtualOpen(!isVirtualOpen);
  const togglePreview = () => setPreviewOpen(!isPreviewOpen);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  
  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Paid</th>
            <th>Current Membership</th>
            {/* <th>Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {users.length > 0 && users.map(user => (
            <tr key={user.id}>
              <td className="w-25">{user.username}</td>
              <td className="w-50">
                {user.membership !== null ? 'Yes' : 'No'}
              </td>
              <td>
                {user.fitness !== null && user.fitness.type}
              </td>
              {/* <td className="w-25"> */}
                {/* <VirtualAssistance toggleModal={toggleVirtual} isOpen={isVirtualOpen} fitness={fitnessType} /> */}
              {/* </td> */}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default UserList;
