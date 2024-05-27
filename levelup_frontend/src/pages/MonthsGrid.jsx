import { useEffect, useState } from 'react';
import { Link, useOutletContext, useParams } from 'react-router-dom';

export const months = [
    { id: 1, month: "January", days:31 },
    { id: 2, month: "February", days:29 },
    { id: 3, month: "March", days:31 },
    { id: 4, month: "April", days:30 },
    { id: 5, month: "May", days:31 },
    { id: 6, month: "June", days:30 },
    { id: 7, month: "July", days:31 },
    { id: 8, month: "August", days:31 },
    { id: 9, month: "September", days:30 },
    { id: 10, month: "October", days:31 },
    { id: 11, month: "November", days:30 },
    { id: 12, month: "December", days:31 },
]

export default function MonthsGrid() {
    const {year} = useParams();
    const {setTrack, setCurrentPath} = useOutletContext();
    useEffect(() => {setTrack(`years.months`);}, [setTrack]);
    useEffect(() => {setCurrentPath(`${year}`);}, [setCurrentPath]);

    return (
        <div className={`grid grid-cols-1 gap-2 p-2 overflow-y-scroll`}>
            {months.map(({id, month}) => <MonthCard key={id} idx={id} month={month} activedays={20} />)}
        </div>
    );
}

export const statusStyle = {
    lock: 'opacity-40 pointer-events-none',
    read_only: 'opacity-90',
    active: 'bg-green-200'
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
        to={`./${month}`}
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