"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  deleteItem,
  editTitle,
  toggleImportant,
} from "@/redux/slices/listSlice";

import ActionButton from "../ActionButton";
import Input from "../Input";

import styles from "./listCard.module.css";

const ListCard = (props) => {
  const { title = "", id = "", isChecked = false, provided } = props;
  const [isEditable, setIsEditable] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteItem(id));
  };

  const handleEdit = () => {
    setIsEditable(true);
  };

  const handleUpdate = (newTitle) => {
    if (!newTitle) return;

    const payload = {
      id,
      newTitle,
    };

    dispatch(editTitle(payload));
    setIsEditable(false);
  };

  const handleToggleImportant = () => {
    dispatch(toggleImportant(id));
  };

  return (
    <div
      className={styles.listCard}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <div className={styles.todoCheckbox}>
        <input
          id={`todo-checkbox-${id}`}
          type="checkbox"
          checked={isChecked}
          onChange={handleToggleImportant}
        />
        <label htmlFor={`todo-checkbox-${id}`}>
          {isChecked ? "Important" : "Non-important"}
        </label>
      </div>
      {!isEditable ? (
        <>
          <p className={styles.title}>{title}</p>
          <div className={styles.actionBtnContainer}>
            <ActionButton
              title="Edit"
              isPrimary={true}
              icon={faPenToSquare}
              handleClick={handleEdit}
            />
            <ActionButton
              title="Delete"
              isPrimary={false}
              icon={faTrash}
              handleClick={handleDelete}
            />
          </div>
        </>
      ) : (
        <Input
          handleSubmit={handleUpdate}
          btnTitle="Update"
          defaultInputValue={title}
        />
      )}
    </div>
  );
};

export default ListCard;
