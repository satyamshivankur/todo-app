import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  list: [],
};

export const list = createSlice({
  name: "list",
  initialState,
  reducers: {
    createItem: (state, action) => {
      const { payload } = action;
      state.list = [...state.list, payload];
    },
    deleteItem: (state, action) => {
      const { payload } = action;
      const newList = state.list.filter((item) => item.id !== payload);
      state.list = [...newList];
    },
    toggleImportant: (state, action) => {
      const { payload } = action;
      const itemIndex = state.list.findIndex((item) => item.id === payload);
      state.list[itemIndex].isChecked = !state.list[itemIndex].isChecked;
    },
    editTitle: (state, action) => {
      const { payload } = action;
      const itemIndex = state.list.findIndex((item) => item.id === payload.id);
      state.list[itemIndex].title = payload.newTitle;
    },
    updateListOrderOnDrag: (state, action) => {
      const { payload } = action;
      state.list = [...payload];
    },
  },
});

export const {
  createItem,
  deleteItem,
  toggleImportant,
  editTitle,
  updateListOrderOnDrag,
} = list.actions;

export default list.reducer;
