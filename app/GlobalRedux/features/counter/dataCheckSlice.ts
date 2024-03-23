'use client'

import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    value: false
}

export const counterSlice = createSlice({
    name: 'checkData',
    initialState,
    reducers:{
        checkData: (state) => {state.value = true}
    }
})

export const { 
    checkData
} = counterSlice.actions;

export default counterSlice.reducer;