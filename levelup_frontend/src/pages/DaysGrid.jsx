import { useEffect, useState } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import { months, statusStyle } from "../pages/MonthsGrid";

export default function DaysGrid() {
    const { year, month } = useParams();
  const { setTrack, setCurrentPath } = useOutletContext();
  useEffect(() => {
    setTrack(`years.months.days`);
  }, [setTrack]);
  useEffect(() => {setCurrentPath(`${year} / ${month}`);}, [setCurrentPath]);

  const current_month_idx = months.findIndex(item => item.month === month);

  let calender = [];
  for (let i = 1; i <= months[current_month_idx].days; i++) {
    calender.push(i);
  }
  return (
    <>
      <div
        className={`grid grid-cols-3 tablet:grid-cols-5 laptop:grid-cols-8 gap-4 p-2 overflow-y-scroll`}
      >
        {calender.map((date, id) => (
          <DayCard key={id} date={date} />
        ))}
      </div>
    </>
  );
}

const DayCard = ({ date = 1 }) => {
  const { postsCount } = useOutletContext();
  const { year, month } = useParams();
  const today = new Date();
  const [status, setStatus] = useState(null);
  const [completedStatus, setCompletedStatus] = useState("");
  const todays_month = today.getMonth() + 1;
  const todays_year = today.getFullYear();
  const todays_date = today.getDate();

  const current_month_idx =
    months.findIndex((item) => item.month === month) + 1;

  const isSatisfied = postsCount.filter(
    (item) =>
      item.year === parseInt(year) &&
      item.month === current_month_idx &&
      item.day === parseInt(date)
  )?.[0];

  useEffect(() => {
    if (isSatisfied !== undefined) {
      setCompletedStatus(
        isSatisfied.post_count_on_the_day === 4 ? "completed" : "incomplete"
      );
    }
  }, [isSatisfied, setCompletedStatus]);

  useEffect(() => {
    if (year < todays_year) {
      setStatus("read_only");
    } else if (current_month_idx < todays_month) {
      setStatus("read_only");
    } else {
      if (date > todays_date) {
        // Lock it
        setStatus("lock");
      } else if (date < todays_date) {
        // Read only
        setStatus("read_only");
      } else {
        // Active
        setStatus("active");
      }
    }
  }, [todays_date, todays_month, current_month_idx, todays_year, date, year]);

  const posts_count_per_day =
    isSatisfied !== undefined ? isSatisfied.post_count_on_the_day : 0;

  const splotch_or_fish = () => {
    const style =
      "absolute top-3 -right-5 px-5 text-[0.65rem]  -z-10 rotate-45 font-bold font-mono";
    return completedStatus === "completed" ? (
      //   <SplotchIcon className={`${style} text-green-700`} />
      <span className={`${style} bg-green-700 text-white`}>Perfect</span>
    ) : (
      <span className={`${style} bg-red-600 text-white`}>Fished</span>
    );
  };

  return (
    <Link
      to={`./${date}`}
      className={`
        relative select-none h-24 px-2  flex flex-col items-center justify-center rounded shadow border border-orange-200
        hover:scale-105 hover:transition-all hover:ease-in-out hover:bg-orange-50 z-10 overflow-hidden
        ${statusStyle[status]}
        `}
    >
      {status !== "lock" && splotch_or_fish()}
      {status !== "lock" && (
        <span className="absolute bottom-0 text-center text-[0.7rem] rounded bg-gray-0 bg-red-0 -z-10 text-md font-extralight">
          Total proofs {"  "}
          <span className="text-lg font-light">{posts_count_per_day}</span>
        </span>
      )}
      <span className="text-sm font-extralight">Day</span>
      <span className="text-2xl font-light">{date}</span>
    </Link>
  );
};
