import React, { useState, useRef, useEffect } from "react";
import { nanoid } from "nanoid";
import Style from "./Card.module.css";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import Overview from "../Overview/overview";
import { Dialog } from "@mui/material";
import {useNavigate} from 'react-router-dom'

import { useRecoilState } from 'recoil';
 import { ChaptureState } from "../../../store";
export default function Card1() {

  const navigate = useNavigate()


  const [chapture, setChapture] = useRecoilState(ChaptureState);; // represents the input value for the List title.
  const [show, setShow] = useState(false);
  const [list, setList] = useState(JSON.parse(localStorage.getItem("list")) || []);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showOptions, setShowOptions] = useState(null);
  const editInputRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState(null);
  const [taskName, setTaskName] = useState("");

  //storing data
  useEffect(() => {
    // Retrieve data from localStorage on component mount
    const storedList = localStorage.getItem("list");
    if (storedList) {
      setList(JSON.parse(storedList));
    }
  }, []);

  useEffect(() => {
    // Save data to localStorage whenever 'list' changes
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

 

  // TO ADD CARDS
  function handleAdd() {
    if (chapture.trim() === "") {
      return; // Exit the function if input is empty
    }
    const inputData = {
      id: nanoid(),
      title: chapture,
      childChapture: "",
      childrenData: [],
      date: Date.now(), // Track the movement using Date.now()
    };
    setList([...list, inputData]);
    setChapture("");
  }  
  // TO ADD ITEMS IN THE CARD
 

  function handleClick(id) {
    const updatedList = list.map((item) => {
      if (item.id === id) {
        const newItem = { ...item };
        if (newItem.childChapture.trim() !== "") {
          newItem.childrenData.push(newItem.childChapture);
          newItem.childChapture = "";
        }
        return newItem;
      }
      return item;
    });
    setList(updatedList);
  }
  //pushing new items in the list
  function handleChildChapture(id, e) {
    const updatedList = list.map((item) => {
      if (item.id === id) {
        const newItem = { ...item };
        newItem.childChapture = e.target.value;
        return newItem;
      }
      return item;
    });
    setList(updatedList);
  }

  function handleDragStart(e, parentId, childIndex) {
    e.dataTransfer.setData("parentId", parentId);
    e.dataTransfer.setData("childIndex", childIndex);
    e.target.classList.add("dragging"); //triggering drag event
  }

  function handleDragEnd(e) {
    e.target.classList.remove("dragging");
  }

  function handleDragEnter(e) {
    e.target.classList.add("over"); //show droppable area
  }

  function handleDragLeave(e) {
    e.target.classList.remove("over");
  }

  function handleDrop(e, targetId) {
    const draggedParentId = e.dataTransfer.getData("parentId");
    const draggedChildIndex = e.dataTransfer.getData("childIndex");

    const updatedList = [...list];
    const draggedParentIndex = updatedList.findIndex(
      (item) => item.id === draggedParentId
    );
    const targetParentIndex = updatedList.findIndex(
      (item) => item.id === targetId
    );


    // extract the parent element and the dragged item itself from the updatedList array based on their respective indices. This allows us to manipulate and update the relevant data during the drag and drop operation.
    const draggedParent = updatedList[draggedParentIndex];
    const draggedItem = draggedParent.childrenData[draggedChildIndex];

    // Remove the dragged item from the previous list
    draggedParent.childrenData.splice(draggedChildIndex, 1);

    // Add the dragged item to the new list
    const targetParent = updatedList[targetParentIndex];
    targetParent.childrenData.push(draggedItem);

    setList(updatedList);
  }

 
  function handleDragOver(e) {
    e.preventDefault();
  }

  //dlt cards
  function handleDeleteList(id) {
    const updatedList = list.filter((item) => item.id !== id);
    setList(updatedList);
  }
 
  //dlt items
  function handleDeleteChild(parentId, childIndex) {
    const updatedList = list.map((item) => {
      if (item.id === parentId) {
        const newItem = { ...item };
        newItem.childrenData.splice(childIndex, 1);
        return newItem;
      }
      return item;
    });
    setList(updatedList);
  }

  function handleEditItem(id) {
    setSelectedItem(id);
  }

  function handleEditItem1(taskId, taskName) {
    navigate(`${taskName}`)
    setSelectedTodoId(taskId);
    setTaskName(taskName);
    setOpen(true);
  }
   function handleCloseDialog(){
    setOpen(false)
    navigate('/managetasks')
   } 
  
  
  function handleSaveEdit(id, value) {
    const updatedList = list.map((item) => {
      if (item.id === id) {
        const newItem = { ...item };
        newItem.title = value;
        return newItem;
      }
      return item;
    });
    setList(updatedList);
    setSelectedItem(null);
  }

  function handleOptions(id) {
    setShowOptions((prevState) => (prevState === id ? null : id));
  }

 
// to upadate title onClicking outside the input
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (editInputRef.current && !editInputRef.current.contains(e.target)) {
        handleSaveEdit(selectedItem, editInputRef.current.value);
      }
    };

    if (selectedItem !== null) {                                 //RUNNING ABOVE FNC ON MOUSEDOWN
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedItem]);

  return (
    <div className={Style.container}>
      {list.map((item) => (
        <div
          key={item.id}
          className={Style.item}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, item.id)}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
        >

          {/* for editing title */}
          <div className={Style.cardHeader}> 
            {selectedItem === item.id ? (
              <input
                type="text"
                className="editInput"
                ref={editInputRef}
                defaultValue={item.title}
                autoFocus
              />
            ) : (
              <h1>{item.title}</h1>
            )}
            <div className="iconContainer">
              <BsThreeDots
                className="deleteIcon"
                onClick={() => handleOptions(item.id)}
              />
              {showOptions === item.id && (
                <div className="popover">
                  <div className="popoverContent">
                    <FaEdit
                      className="popoverOption"
                      onClick={() => handleEditItem(item.id)}
                    />
                    <FaTrashAlt
                      className="popoverOption"
                      onClick={() => handleDeleteList(item.id)}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="todos">
            {item.childrenData.map((child, index) => (
              <div
                className={Style.todoitemContainer}
                key={index}
                draggable
                onDragStart={(e) => handleDragStart(e, item.id, index)}
                onDragEnd={handleDragEnd}
              >
                {child}
                <div className="iconContainer">
                <FaEdit
                    className={Style.editIcon}
                    onClick={() => handleEditItem1(item.id, child)}
                  />
                  <FaTrashAlt
                    className="deleteIcon"
                    onClick={() => handleDeleteChild(item.id, index)}
                  />
                  
                </div>
              </div>
            ))}
               {open && selectedTodoId !== null && selectedTodoId === item.id && (
              <Dialog open={open} onClose={handleCloseDialog}>
                {/* <Overview cardTitle={item.title} taskName={taskName} /> */}
                <Overview cardTitle={item.title} taskName={taskName} addedTime={item.date} />
              </Dialog>
            )}

          </div>
          <input
            className={Style.inputTodoAdder}
            value={item.childChapture}
            onChange={(e) => handleChildChapture(item.id, e)}
          />
          <button className={Style.btn} onClick={() => handleClick(item.id)}>
            Add Item
          </button>
        </div>
      ))}
      <div className={Style.itemCard}> 
      {/* toggling add list tO add card  */}
        {show ? (
          <div className={Style.todoAdder}>
            
            <input
              className={Style.inputodo}
              value={chapture}
              onChange={(e) => setChapture(e.target.value)}
            />
            
            <div className={Style.addCardFooter}>
            <button className={Style.btn} onClick={handleAdd}>
              Add Card
            </button>
            <button className={Style.cross} onClick={()=>setShow(false)}><b>x</b></button>
            </div>
          </div>
        ) : (
   
            
          <button className={Style.ToAdd} onClick={() => setShow(true)}>
            <span className={Style.addIcon}>+</span> Add List
          </button>
          
        )}
      </div>
    </div>
  );
}

