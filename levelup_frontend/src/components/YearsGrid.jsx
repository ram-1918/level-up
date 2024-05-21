import { Link } from 'react-router-dom';

export default function YearsGrid() {
    return (
        <div className={`grid grid-cols-3 tablet:grid-cols-4 laptop:grid-cols-5 gap-4 p-2 dark:bg-red-300`}>
            <YearCard year="2019" />
            <YearCard year="2020" />
            <YearCard year="2021" />
            <YearCard year="2022" />
            <YearCard year="2023" />
            <YearCard year="2024" />
        </div>
    );
}

const YearCard = ({year=2024}) => {
    return (
        <Link
        to={`/${year}`}
        className={`
        select-none h-20 flex flex-col items-center justify-center rounded shadow border border-orange-200
        hover:scale-105 hover:transition-all hover:ease-in-out hover:bg-orange-50
        `}>
            <span className="text-lg font-medium">{year}</span>
        </Link>
    )
}