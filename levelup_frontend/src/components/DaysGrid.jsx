import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { months, statusStyle } from './MonthsGrid';

export default function DaysGrid() {
    const { year, month } = useParams();
    let calender = [];
    for(let i = 1; i <= 31; i++) {
        calender.push(i);
    }
    return (
        <>
            Progress in the year {year} for the month {month}
            <div className={`grid grid-cols-4 laptop:grid-cols-6 gap-2 p-2 dark:bg-red-300 overflow-y-scroll`}>
                {calender.map((date, id) => <DayCard key={id} date={date} />)}
            </div>
        </>
    );
}

const DayCard = ({date=1}) => {
    const { year, month } = useParams();
    const [status, setStatus] = useState(null);
    const today = new Date();
    const todays_month = today.getMonth() + 1;
    const todays_year = today.getFullYear();
    const todays_date = today.getDate();
    const current_month_idx = months.findIndex(item => item.month === month) + 1;
    useEffect(() => {
        if (year < todays_year) {
            setStatus('read_only');
        } else if ( current_month_idx < todays_month) {
            setStatus('read_only');
        } else {
            if (date > todays_date) {
                // Lock it
                setStatus('lock');
            } else if (date < todays_date) {
                // Read only
                setStatus('read_only');
            } else {
                // Active
                setStatus('active');
            }
        }
    }, [todays_date, todays_month, current_month_idx, todays_year, date, year]);
    return (
        <Link
        to={`/${year}/${month}/${date}`}
        className={`
        select-none h-20 px-2 py-2 flex flex-col items-center justify-center rounded shadow border border-orange-200
        hover:scale-105 hover:transition-all hover:ease-in-out hover:bg-orange-50
        ${statusStyle[status]}
        `}>
            <span className="text-sm font-extralight">Day</span>
            <span className="text-2xl font-light">{date}</span>
        </Link>
    )
}