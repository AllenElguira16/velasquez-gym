import moment, { Moment } from 'moment';
import React from 'react';
import { Button } from 'reactstrap';

const Calendar = () => {

  const currentMonth = moment().format('M');
  const startWeek = moment().startOf('month').week();
  const endWeek = moment().endOf('month').week();

  console.log(currentMonth);

  let calendar = []
  for(var week = startWeek; week <= endWeek; week++){
    calendar.push({
      week: week,
      days: Array(7).fill(0).map((n, i) => moment().week(week).startOf('week').clone().add(n + i, 'day'))
    })
  }

  const dateCssClass = (day: Moment) => {
    let css = day.format('D') === currentMonth ? 'text-dark' : 'text-muted';

    if (day.format('dddd') === 'Sunday') {
      css = 'text-primary';
    }

    return css;
  }

  return (
    <div className="d-flex flex-column gap-4">
      <header className="d-flex justify-content-between">
        <h1>{moment().format('MMMM').toString()}</h1>
        <Button color="primary">Check-in Today</Button>
      </header>
      <div>
        {calendar.map(weeks => (
          <div className="d-flex" key={weeks.week}>
            {weeks.days.map((day, i) => (
              <span className={`col border ${dateCssClass(day)}`} style={{height: '5rem'}} key={i}>{day.format('D')}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
