import { createSlice } from '@reduxjs/toolkit';
import Data from './Data';

const initialState =Data;

const Slice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    createnewmodule(state, action) {
      let flag = false;
      for (let i = 0; i < state.length; i++) {
        if (state[i] === action.payload) {
          flag = true;
        }
      }
      if (!flag) {
        state.push({
          modulename: action.payload,
          submodules: [],
        });
      }
    },

    createnewlink(state, action) {
      let flag = false;
      for (let i = 0; i < state.length; i++) {
        if (state[i] === action.payload) {
          flag = true;
        }
      }
      if (!flag) {
        state.push({
          ...action.payload,
        });
      }
    },

    addFile: (state, action) => {
        state.push({
          filename: action.payload.fileName,
          path: action.payload.filePath,
          format : action.payload.format,
        });
      },

    editmodule(state, action) {
      const obj = action.payload;
      state[obj.sindex].modulename = obj.modulename;
    },

    editlink(state, action) {
      const obj = action.payload;
      if (obj.pindex === null) {
        state[obj.sindex].url = obj.url;
        state[obj.sindex].displayname = obj.displayname;
      } else {
        state[obj.pindex].submodules[obj.sindex].url = obj.url;
        state[obj.pindex].submodules[obj.sindex].displayname = obj.displayname;
      }
    },

    editfile(state, action) {
      const obj = action.payload;
      if (obj.pindex === null) {
        state[obj.sindex].filename = obj.filename;
      } else {
        state[obj.pindex].submodules[obj.sindex].filename = obj.filename;
      }
    },

    deleteItem(state, action) {
      const { pindex, sindex } = action.payload;
      if (pindex !== null) {
        if (sindex >= 0 && sindex < state[pindex].submodules.length) {
          state[pindex].submodules.splice(sindex, 1);
        }
      } else {
        if (sindex >= 0 && sindex < state.length) {
          state.splice(sindex, 1);
        }
      }
    },

    setItems(state, action) {
      return action.payload;
    },

    setSubItems(state, action) {
      const { subitems, index } = action.payload;
      state[index].submodules = subitems;
    },

    moveItemToSub(state, action) {
      const { index, item, subIndex } = action.payload;
      state.splice(index, 1);
      state[subIndex].submodules.push(item);
    },

    moveSubItemToMain(state, action) {
      const { items, index, subItems } = action.payload;
      state.items = items;
      state[index].submodules = subItems;
    },
  }
});

export const Sliceactions = Slice.actions;
export default Slice.reducer;
