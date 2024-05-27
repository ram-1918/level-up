import { useNavigate, useParams } from "react-router";

export default function PathTrace({ track }) {
  const pathlist = track.split(".");
  const n = pathlist.length;
  const { year, month, day } = useParams();
  const navigate = useNavigate();

  const pathmap = {
    years: `./`,
    months: `./${year}`,
    days: `./${year}/${month}`,
    timeline: `./${year}/${month}/${day}`,
  };

  const pathItemStyle = `
    px-2 flex flex-row justify-between items-center capitalize
    after:absolute after:-right-2 after:border-[rgb(255,165,0)] after:border-0 after:border-t-2 after:border-r-2 after:w-[1.05rem] after:h-[1.05rem] after:rotate-45 after:z-10
    before:absolute before:-left-2 before:border-[rgb(255,165,0)] before:border-0 before:border-t-2 before:border-r-2 before:w-[1.05rem] before:h-[1.05rem] before:bg-white before:rotate-45 before:z-0
    `;
  const res = (
    <div className="w-full flex flex-row justify-start items-center space-x-0 p-2">
      {track !== "" &&
        pathlist.map((path, idx) => {
          const isActive = pathlist[n - 1] === path;
          return (
            <div
              key={idx}
              style={{ backgroundColor: isActive && "rgb(255,165,0" }}
              className="w-fit h-[1.5rem] px-3 relative bg-orange-100 border-t-2 border-b-2 border-[rgb(255,165,0)] hover:opacity-70 text-sm font-light"
            >
              <span
                onClick={() => navigate(pathmap[path])}
                className={`${pathItemStyle} ${
                  isActive
                    ? "after:bg-[rgb(255,165,0)] text-white font-semibold"
                    : "after:bg-orange-100"
                }`}
              >
                {" "}
                {path}{" "}
              </span>
            </div>
          );
        })}
    </div>
  );

  return res;
}
