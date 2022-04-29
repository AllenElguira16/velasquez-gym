import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment, { Moment } from "moment";
import React, { FC, useReducer, useState } from "react";
import { Button, Modal, ModalBody, ModalHeader, Table } from "reactstrap";
import { IAttendance, IUser } from "~/types";
import Calendar from "./calendar";
import EditUser from "./edit-user";

interface Props {
  users: IUser[];
}

const UserList: FC<Props> = ({ users }) => {
  const [isCalendarActive, setIsCalendarActive] = useState(false);
  const [isEditUserActive, setIsEditUserActive] = useState(false);

  const openEditUser = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setIsEditUserActive(!isEditUserActive);
  };

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Contact Number</th>
            <th>Address</th>
            <th>Current Membership</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 &&
            users.map((user) => (
              <>
                <tr
                  onClick={() => setIsCalendarActive(!isCalendarActive)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{user.username}</td>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.contactNumber}</td>
                  <td>{user.address}</td>
                  <td>
                    {user.memberships !== undefined &&
                    user.memberships.length !== 0
                      ? "Paid"
                      : "Not Paid"}
                  </td>
                  <td>{user.status}</td>
                  <td>
                    <Button onClick={openEditUser}>Edit</Button>
                  </td>
                </tr>
                <Calendar
                  attendances={user.attendances}
                  active={isCalendarActive}
                  toggle={() => setIsCalendarActive(!isCalendarActive)}
                />
                <EditUser
                  user={user}
                  active={isEditUserActive}
                  toggle={() => setIsEditUserActive(!isEditUserActive)}
                />
              </>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default UserList;
