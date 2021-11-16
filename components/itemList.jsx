import { useState } from "react";
import Delete from "./Delete";
import Edit from "./Edit";
import Add from "./Add";
import Input from "./Input";

const ItemList = () => {
  const [items, setItems] = useState([
    [true,"Go to the Swimming Pool 🏊"], 
    [false, "Watch a movie 🎬"], 
    [false, "Check your agenda 📅"]
  ]);
  const [inputOpen, setInputOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null); 

  function deleteItem(i) {
    setItems( items => {
      const newItems = [...items];
      newItems.splice(i, 1);
      return newItems;
    });
  }
  function addItem(item) {
    setItems(items => {
      const newItems = [...items];
      newItems.push([false, item]);
      return newItems;
    });
  }
  function editItem(i, item) {
    setItems(items => {
      const newItems = [...items];
      newItems[i][1] = item;
      return newItems;
    });
  }

  const handleCheck = (i) => () => {
    setItems(items => {
      const newItems = [...items];
      newItems[i][0] = !items[i][0];
      return newItems;
    })
  }

  return (
    <div className="flex flex-col gap-y-2 w-full sm:w-2/3 md:w-1/2 max-w-sm rounded-lg p-2 shadow-md bg-gray-100 text-left">
      {items.map((item, i) => (
        i == itemToEdit ?
        <Input addReminder={(reminder) => {setItemToEdit(null); editItem(i, reminder)}} defaultAction="Edit" initialValue={item[1]} />
        :
        <div
          key={i}
          className="border bg-gray-200 rounded flex flex-row items-center p-1 justify-between "
        >
          <label className="flex items-center justify-start space-x-3 flex-auto overflow-auto">
            <input
              type="checkbox"
              name="checked-demo"
              onChange={handleCheck(i)}
              checked={item[0]}
              className="form-tick appearance-none flex-initial bg-white bg-check h-6 w-24px min-w-6 border border-gray-300 rounded-md checked:bg-blue-500 checked:border-transparent focus:outline-none"
            />
            <span className="font-light truncate max-h-16">{item[1]}</span>
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
