import axios from 'axios';
import moment, { Moment } from 'moment';
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { Button } from 'reactstrap';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactDOM from 'react-dom';
import { useAlert } from 'react-alert';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const Calendar = () => {
  const alert = useAlert();
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);
  const [attendances, setAttendances] = useState<IAttendance[]>([]);
  const [currentMoment, setCurrentMoment] = useState(moment());
  const bodyElement = typeof document !== 'undefined' && document.querySelector('body');
  
  const checkIn = async () => {
    try {
      await axios.post('/api/user/attendance/check-in');
  
      location.reload();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert.error(error.response?.data.message);
      }
    }
  }

  const checkOut = async () => {
    try {
      await axios.post('/api/user/attendance/check-out');
  
      location.reload();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert.error(error.response?.data.message);
      }
    }
  }

  const calendar = [];
  const startDay = currentMoment.clone().startOf('month').startOf('week');
  const endDay = currentMoment.clone().endOf('month').endOf('week');

  let date = startDay.clone().subtract(1, 'day');

  while (date.isBefore(endDay, 'day')) {
    calendar.push({
      days: Array(7).fill(0).map(() => date.add(1, 'day').clone())
    });
  }

  const loadAttendance = useCallback(async () => {
    const {data} = await axios.get('/api/user/attendance');

    setAttendances(data.attendance);
  }, []);

  const attendanceInfo = (dateString: string, type: IAttendance['type']) => {
    return !attendances ?undefined : attendances.find((attendance) => type === attendance.type && moment(dateString).isSame(attendance.createdAt, 'day'));
  }

  useEffect(() => {
    loadAttendance();
  }, [loadAttendance, currentMoment, _]);

  const prevMonth = () => {
    setCurrentMoment(currentMoment.subtract(1, 'month'));
    forceUpdate();
  }

  const nextMonth = () => {
    setCurrentMoment(currentMoment.add(1, 'month'));
    forceUpdate();
  }
  
  const dateCssClass = (day: Moment) => {
    
    const isToday = day.format('MMMM') === moment().format('MMMM') && day.format('D') === moment().format('D');
    let css = 'text-muted';

    if (day.format('dddd') === 'Sunday') {
      css = 'text-danger';
    }

    return isToday ? css + ' bg-light bg-opacity-50' : css;
  }

  return (
    <div className="d-flex flex-column gap-2">
      <header className="d-flex  justify-content-between">        
        <Button className="d-none d-sm-block btn-sm" color="primary" onClick={checkIn}>Check-in</Button>
        <div className="d-flex justify-content-between align-items-center mx-auto">
          <FontAwesomeIcon style={{cursor: 'pointer'}} onClick={prevMonth} icon={faAngleLeft as IconProp} size="2x" />
          <div className="text-center lh-1">
            <h2 className="m-0 mx-sm-4 mx-1">{currentMoment.format('MMMM').toString()}</h2>
            <small>{currentMoment.format('YYYY').toString()}</small>
          </div>
          <FontAwesomeIcon style={{cursor: 'pointer'}} onClick={nextMonth} icon={faAngleRight} size="2x" />
        </div>
        <Button className="d-none d-sm-block btn-sm" color="primary" onClick={checkOut}>Check-out</Button>
      </header>
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
      { (typeof window !== 'undefined' && bodyElement) && ReactDOM.createPortal(
        <>
          <div className="position-absolute" style={{bottom: '0.75rem', left: '0.75rem', right: '0.75rem'}}>
            <div className="d-flex justify-content-between">
              <Button 
                className="d-sm-none btn-sm rounded-circle" 
                style={{height: 90, width: 90}} 
                color="primary"
                onClick={checkIn}
              >
                  Check-in
              </Button>
              <Button 
                className="d-sm-none btn-sm rounded-circle" 
                style={{height: 90, width: 90}} 
                color="primary"
                onClick={checkOut}
              >
                Check-out
              </Button>
            </div>
          </div>
        </>
      , bodyElement) }
      {/* <footer>
        <div className="d-flex gap-4 align-items-center">
        </div>
      </footer> */}
    </div>
  );
};

export default Calendar;
