import { useState } from "react";

const Delete = () => (
  <button
    type="button"
    className="flex justify-center items-center focus:ring-gray-400 focus:ring-offset-gray-200 text-white transition ease-in duration-200 text-center text-base font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2  w-6 h-6 rounded-xl "
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-square-x"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="#999"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M10 10l4 4m0 -4l-4 4" />
    </svg>
  </button>
);

const ItemList = () => {
  const [items, setItems] = useState(["Courses", "Ménage", "Cuisine"]);
  return (
    <div className="flex flex-col gap-y-2 w-2/3 sm:w-1/2 max-w-sm h-full rounded-lg overflow-scroll p-2 shadow-md bg-gray-100">
      {items.map((item, i) => (
        <div
          key={i}
          className="border bg-gray-200 rounded flex flex-row items-center p-1 justify-between"
        >
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="checked-demo"
              className="form-tick appearance-none bg-white bg-check h-6 w-6 border border-gray-300 rounded-md checked:bg-blue-500 checked:border-transparent focus:outline-none"
            />
            <span className="font-light">{item}</span>
          </label>
          <Delete />
        </div>
      ))}
    </div>
  );
};

export { ItemList };
