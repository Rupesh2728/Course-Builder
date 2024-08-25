import {createSlice} from '@reduxjs/toolkit';

const initialState = {click : false}
const IconChange= createSlice({
    name : 'Icon-Change',
    initialState,
    reducers:{
        setclick(state,action){ 
            state.click = action.payload;
        },
    }
});

export const IconChangeactions = IconChange.actions;
export default IconChange.reducer;

