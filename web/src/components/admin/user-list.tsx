import React, { useCallback, useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import axios from 'axios';
import { useAlert } from 'react-alert';

const UserList = () => {
  const alert = useAlert();
  const [users, setUsers] = useState<IUser[]>([]);
  
  const fetchUsers = useCallback(async () => {
    try {
      const {data} = await axios.get('/api/user');
  
      setUsers(data.users);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert.error(error.response?.data.message);
      }
    }
  }, [alert]);

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
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default UserList;
