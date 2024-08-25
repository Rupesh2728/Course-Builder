import { configureStore } from "@reduxjs/toolkit";
import SliceReducer from "./Slice";
import IconChangeReducer from './ClickSlice';


const store = configureStore({
  reducer: { items: SliceReducer, click:IconChangeReducer},
});

export default store;
