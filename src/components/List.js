import React, { useState, useEffect } from "react";

function List() {
  const [listItems, setListItems] = useState([
    "Lemons",
    "Oranges",
    "Limes",
    "Tangerines",
  ]);
  const [key, setKey] = useState(-1); //signifies which point we are at in the snapshot

  useEffect(() => {
    //for append or remove
    if (JSON.stringify(listItems) !== JSON.stringify(snapshot[key - 1])) {
      console.log("list items updated");
      setSnapshot([...snapshot, listItems]);
      setKey(key + 1); //initial render sets it to 0
    } else if (
      JSON.stringify(listItems) === JSON.stringify(snapshot[key - 1])
    ) {
      console.log("rollback");
      setKey(key - 1);
    }
  }, [listItems]);

  const [snapshot, setSnapshot] = useState([]);
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
    if (listItems.length)
      setListItems(listItems.slice(0, listItems.length - 1));
  }

  function undoAction() {
    if (key > 0) {
      console.log("undoAction");
      setListItems(snapshot[key - 1]);
      // go back and access snapshot[snapshot.length-2]
    }
  }

  function redoAction() {
    console.log("redoAction");
    console.log(listItems);
    console.log(key, "key");
    console.log(snapshot);
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
