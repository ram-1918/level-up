import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export const months = [
    { id: 1, month: "January" },
    { id: 2, month: "February" },
    { id: 3, month: "March" },
    { id: 4, month: "April" },
    { id: 5, month: "May" },
    { id: 6, month: "June" },
    { id: 7, month: "July" },
    { id: 8, month: "August" },
    { id: 9, month: "September" },
    { id: 10, month: "October" },
    { id: 11, month: "November" },
    { id: 12, month: "December" },
]

export default function MonthsGrid() {
    const { year } = useParams();
    return (
        <div className={`grid grid-cols-1 gap-2 p-2 dark:bg-red-300 overflow-y-scroll`}>
            Progress in the year {year}
            {months.map(({id, month}) => <MonthCard key={id} idx={id} month={month} activedays={20} />)}
        </div>
    );
}

export const statusStyle = {
    lock: 'opacity-40 pointer-events-none',
    read_only: 'opacity-90',
    active: 'bg-green-400'
}

const MonthCard = ({month="January", activedays=20}) => {
    const { year } = useParams();
    const [status, setStatus] = useState(null);
    const today = new Date();
    const todays_month = today.getMonth() + 1;
    const todays_year = today.getFullYear();
    const current_month_idx = months.findIndex(item => item.month === month) + 1;
    useEffect(() => {
        if (year < todays_year) {
            setStatus('read_only');
        } else {
            if (current_month_idx > todays_month) {
                // Lock it
                setStatus('lock');
            } else if (current_month_idx < todays_month) {
                // Read only
                setStatus('read_only');
            } else {
                // Active
                setStatus('active');
            }
        }
    }, [todays_month, current_month_idx, todays_year, year]);

    return (
        <Link
        to={`/${year}/${month}`}
        className={`
        select-none h-fit px-2 py-2 flex flex-col items-start justify-center rounded shadow border border-orange-200
        hover:scale-105 hover:transition-all hover:ease-in-out hover:bg-orange-50
        ${statusStyle[status]}
        `}>
            <span className="text-lg font-medium">{month}</span> {todays_year}
            <span className="text-sm font-light">Total active days: {activedays}</span>
        </Link>
    )
}