import axios from 'axios';
import moment, { Moment } from 'moment';
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { Button } from 'reactstrap';

const Calendar = () => {
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);
  const [attendances, setAttendances] = useState<IAttendance[]>([]);
  const [currentMoment, setCurrentMoment] = useState(moment());
  
  const checkIn = async () => {
    try {
      await axios.post('/api/user/attendance/check-in');
  
      location.reload();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    }
  }

  const checkOut = async () => {
    try {
      await axios.post('/api/user/attendance/check-out');
  
      location.reload();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.message);
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

  const isCheckedIn = (dateString: string) => {
    const attendance = attendances.filter(attendance => attendance.date === dateString)[0] || undefined;
    
    if (!attendance) 
      return false

    return attendance.date === dateString && attendance.checkIn;
  }

  const isCheckedOut = (dateString: string) => {
    const attendance = attendances.filter(attendance => attendance.date === dateString)[0] || undefined;
    
    if (!attendance) 
      return false

    return attendance.date === dateString && attendance.checkOut;
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
    const isToday = day.format('MMMM') === currentMoment.format('MMMM') && day.format('D') === currentMoment.format('D');
    let css = 'text-muted';

    if (day.format('dddd') === 'Sunday') {
      css = 'text-danger';
    }

    return isToday ? css + ' bg-light bg-opacity-50' : css;
  }

  return (
    <div className="d-flex flex-column gap-2">
      <header className="d-flex justify-content-between">
        <Button color="light" onClick={prevMonth}>Prev</Button>
        <h1>{currentMoment.format('MMMM').toString()} - {currentMoment.format('YYYY').toString()}</h1>
        <Button color="light" onClick={nextMonth}>Next</Button>
      </header>
      <div>
        {calendar.map((week, i) => (
          <div className="d-flex" key={i}>
            {week.days.map((day, i) => (
              <span className={`col border ${dateCssClass(day)} position-relative`} style={{height: '4.25rem'}} key={i}>
                {day.format('D')}
                <div className="text-dark" style={{lineHeight: 1}}>
                  {isCheckedIn(day.format('YYYY-MM-DD')) && (<div>Checked-in</div>)}
                  {isCheckedOut(day.format('YYYY-MM-DD')) && (<div>Checked-out</div>)}
                </div>
              </span>
            ))}
          </div>
        ))}
      </div>
      <footer>
        <div className="d-flex gap-4 align-items-center">
          <Button color="primary" onClick={checkIn}>Check-in</Button>
          <Button color="primary" onClick={checkOut}>Check-out</Button>
        </div>
      </footer>
    </div>
  );
};

export default Calendar;
