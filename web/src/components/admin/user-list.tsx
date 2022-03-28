import React, { FC } from 'react';
import { Table } from 'reactstrap';

interface Props {
  users: IUser[];
}

const UserList: FC<Props> = ({users}) => {
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
                {(user.memberships !== undefined && user.memberships.length !== 0) ? 'Yes' : 'No'}
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
