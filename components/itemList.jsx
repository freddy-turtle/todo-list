import { useRef, useState } from "react";

const Delete = ({ onClick }) => (
  <button
    type="button"
    className="flex justify-center items-center focus:ring-gray-400 focus:ring-offset-gray-200 text-white transition ease-in duration-200 text-center text-base font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2  w-6 h-6 rounded-xl "
    onClick={() =>
      setTimeout(() => {
        onClick();
        document.activeElement.blur();
      }, 300)
    }
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

const Edit = ({ onClick }) => (
  <button
    type="button"
    className="flex justify-center items-center focus:ring-gray-400 focus:ring-offset-gray-200 text-white transition ease-in duration-200 text-center text-base font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2  w-6 h-6 rounded-xl "
    onClick={() =>
      setTimeout(() => {
        onClick();
        document.activeElement.blur();
      }, 300)
    }
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width="32" height="32" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#999" fill="none" strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
  <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
  <line x1="16" y1="5" x2="19" y2="8" />
</svg>
  </button>
);

const Add = ({ onClick }) => (
  <button
    type="button"
    className="flex justify-center items-center focus:ring-gray-400 focus:ring-offset-gray-200 text-white transition ease-in duration-200 text-center text-base font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2  w-6 h-6 rounded-xl bg-yellow-400 ml-1"
    onClick={() =>
      setTimeout(() => {
        onClick();
        document.activeElement.blur();
      }, 300)
    }
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-plus"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="#ffffff"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  </button>
);

const Input = ({addReminder, initialValue="", defaultAction="Add"}) => {
  const myInput = useRef(initialValue)
  function handleSubmit(event) {
    addReminder(myInput.current.value)
    event.preventDefault()
  }
  return (
  <form className="flex flex-row w-full justify-center gap-x-1" onSubmit={handleSubmit}>
      <input
        ref={myInput}
        type="text"
        id="rounded-email"
        className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-1 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        placeholder="Your reminder"
        defaultValue={myInput.current}
      />
      <button className="px-2 py-1 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200" type="submit">
            {defaultAction}
      </button>
  </form>
);
}

const ItemList = () => {
  const [items, setItems] = useState([
    "Go to the Swimming Pool 🏊", 
    "Watch a movie 🎬", 
    "Check your agenda 📅"
  ]);
  const [inputOpen, setInputOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null); 

  function deleteItem(i) {
    const newItems = [...items];
    newItems.splice(i, 1);
    setItems(newItems);
  }
  function addItem(item) {
    const newItems = [...items];
    newItems.push(item);
    setItems(newItems);
  }
  function editItem(i, item) {
    const newItems = [...items];
    newItems[i] = item;
    setItems(newItems);
  }
  return (
    <div className="flex flex-col gap-y-2 w-full sm:w-2/3 md:w-1/2 max-w-sm rounded-lg p-2 shadow-md bg-gray-100 text-left">
      {items.map((item, i) => (
        i == itemToEdit ?
        <Input addReminder={(reminder) => {setItemToEdit(null); editItem(i, reminder)}} defaultAction="Edit" initialValue={item} />
        :
        <div
          key={i}
          className="border bg-gray-200 rounded flex flex-row items-center p-1 justify-between "
        >
          <label className="flex items-center justify-start space-x-3 flex-auto overflow-auto">
            <input
              type="checkbox"
              name="checked-demo"
              className="form-tick appearance-none flex-initial bg-white bg-check h-6 w-24px min-w-6 border border-gray-300 rounded-md checked:bg-blue-500 checked:border-transparent focus:outline-none"
            />
            <span className="font-light truncate max-h-16">{item}</span>
          </label>
          <span className="flex flex-row">
            <Edit onClick={() => setItemToEdit(i)} />
            <Delete onClick={() => deleteItem(i)} />
          </span>
        </div>
      ))}
      {inputOpen ? 
        <Input addReminder={(reminder) => {setInputOpen(false); addItem(reminder)}} /> : 
        <Add onClick={() => setInputOpen(true)} />}
    </div>
  );
};

export { ItemList };
