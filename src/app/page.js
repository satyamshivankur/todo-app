"use client";

import styles from "./page.module.css";
import Input from "./components/Input";
import ListCard from "./components/ListCard";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { createItem, updateListOrderOnDrag } from "@/redux/slices/listSlice";
import Lottie from "react-lottie-player";
import emptyListLottie from "@/assets/lottie/empty-list-lottie.json";
import EmptyList from "./components/EmptyList";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default function Home() {
  const list = useSelector((state) => state.list.list);
  const dispatch = useDispatch();

  const handleSubmit = (value) => {
    if (!value) return;

    const id = Date.now();
    const payload = {
      id,
      title: value,
      isChecked: false,
    };

    dispatch(createItem(payload));
  };

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(list, result.source.index, result.destination.index);

    console.log(items);
    dispatch(updateListOrderOnDrag(items));
  };

  return (
    <div className={styles.listLayout}>
      <Input handleSubmit={handleSubmit} btnTitle="Create" />

      {list.length ? (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                className={
                  !snapshot.isDraggingOver
                    ? styles.todoList
                    : styles.todoListDrag
                }
                ref={provided.innerRef}
                {...provided.draggableProps}
              >
                {list.map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={`${item.id}`}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <ListCard
                        key={item.id}
                        title={item.title}
                        id={item.id}
                        isChecked={item.isChecked}
                        provided={provided}
                        snapshot={snapshot}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <EmptyList />
      )}
    </div>
  );
}
