import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment, { Moment } from 'moment';
import React, { FC, useReducer, useState } from 'react';
import { Button, Modal, ModalBody, ModalHeader, Table } from 'reactstrap';
import { checkIn, checkOut } from '~/services/attendance-service';
import { IAttendance, IUser } from '~/types';

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
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Contact Number</th>
            <th>Address</th>
            <th>Current Membership</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 && users.map(user => <Calendar key={user.id} user={user} />)}
        </tbody>
      </Table>
    </>
  );
};

const Calendar: FC<{user: IUser}> = (props) => {

  const calendar = [];

  const [_, forceUpdate] = useReducer((x) => x + 1, 0);
  const [toggle, setToggle] = useState(false);
  const [currentMoment, setCurrentMoment] = useState(moment());
  const startDay = currentMoment.clone().startOf('month').startOf('week');
  const endDay = currentMoment.clone().endOf('month').endOf('week');

  let date = startDay.clone().subtract(1, 'day');

  while (date.isBefore(endDay, 'day')) {
    calendar.push({
      days: Array(7).fill(0).map(() => date.add(1, 'day').clone())
    });
  }

  const dateCssClass = (day: Moment) => {
    
    const isToday = day.format('MMMM') === moment().format('MMMM') && day.format('D') === moment().format('D');
    let css = 'text-muted';

    if (day.format('dddd') === 'Sunday') {
      css = 'text-danger';
    }

    return isToday ? css + ' bg-light bg-opacity-50' : css;
  }

  const [attendances] = useState<IAttendance[]>(props.user.attendances || []);

  const attendanceInfo = (dateString: string, type: IAttendance['type']) => {
    return !attendances ?undefined : attendances.find((attendance) => type === attendance.type && moment(dateString).isSame(attendance.createdAt, 'day'));
  }

  const prevMonth = () => {
    setCurrentMoment(currentMoment.subtract(1, 'month'));
    forceUpdate();
  }

  const nextMonth = () => {
    setCurrentMoment(currentMoment.add(1, 'month'));
    forceUpdate();
  }

  return (
    <>
      <tr onClick={() => setToggle(!toggle)}>
        <td>{props.user.username}</td>
        <td>{props.user.firstname}</td>
        <td>{props.user.lastname}</td>
        <td>{props.user.contactNumber}</td>
        <td>{props.user.address}</td>
        <td>{(props.user.memberships !== undefined && props.user.memberships.length !== 0) ? 'Paid' : 'Not Paid'}</td>
        <td>{props.user.status}</td>
      </tr>
      <Modal isOpen={toggle} toggle={() => setToggle(!toggle)} size="xl">
        <ModalHeader className="d-flex  justify-content-between flex-column">
          {/* <header className="d-flex  justify-content-between">     */}
            {/* <Button className="d-none d-sm-block btn-sm" color="primary" onClick={checkIn}>Check-in</Button> */}
            <div className="d-flex justify-content-between align-items-center mx-auto">
              <FontAwesomeIcon style={{cursor: 'pointer'}} onClick={prevMonth} icon={faAngleLeft as IconProp} size="2x" />
              <div className="text-center lh-1">
                <h2 className="m-0 mx-sm-4 mx-1">{currentMoment.format('MMMM').toString()}</h2>
                <small>{currentMoment.format('YYYY').toString()}</small>
              </div>
              <FontAwesomeIcon style={{cursor: 'pointer'}} onClick={nextMonth} icon={faAngleRight as IconProp} size="2x" />
            </div>
            {/* <Button className="d-none d-sm-block btn-sm" color="primary" onClick={checkOut}>Check-out</Button> */}
          {/* </header> */}
        </ModalHeader>
        <ModalBody>
          <div>
            {calendar.map((week, i) => (
              <div className="d-flex" key={i}>
                {week.days.map((day, j) => (
                  <span 
                    className={`position-relative col weekdays border ${dateCssClass(day)} `} 
                    key={j}
                  >
                    <div>{day.format('D')}</div>
                    <div className="text-dark" style={{lineHeight: 1}}>
                      {attendanceInfo(day.format('YYYY-MM-DD'), 'check-in') && (
                        <div>{moment(attendanceInfo(day.format('YYYY-MM-DD'), 'check-in')?.createdAt).format('hh:mm a')}</div>
                      )}
                      {attendanceInfo(day.format('YYYY-MM-DD'), 'check-out') && (
                        <div>{moment(attendanceInfo(day.format('YYYY-MM-DD'), 'check-out')?.createdAt).format('hh:mm a')}</div>
                      )}
                    </div>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}

export default UserList;
