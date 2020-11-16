import React, { useState } from "react";

function List() {
  const [listItems, setListItems] = useState([
    "Lemons",
    "Oranges",
    "Limes",
    "Tangerines",
  ]);
  const [inputField, setInputField] = useState("");

  function isBlank(str) {
    return !str || /^\s*$/.test(str);
  } //ty stackoverflow

  function appendToList() {
    if (!isBlank(inputField)) {
      setListItems([...listItems, inputField]);
    }
    setInputField("");
  }

  function handleChange(event) {
    setInputField(event.target.value);
  }

  function removeLast() {
    setListItems(listItems.slice(0, listItems.length - 1));
  }

  function undoAction() {
    console.log("undoAction");
  }

  function redoAction() {
    console.log("redoAction");
  }

  return (
    <>
      <ul>
        {listItems.map((item, key) => {
          return <li key={key}>{item}</li>;
        })}
      </ul>
      <input type="text" value={inputField} onChange={handleChange} />
      <div className="buttons">
        <button onClick={appendToList}>Add</button>
        <button onClick={removeLast}>Remove</button>
      </div>
      <div className="buttons">
        <button onClick={undoAction}>Undo</button>
        <button onClick={redoAction}>Redo</button>
      </div>
    </>
  );
}

export default List;
