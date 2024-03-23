'use client'

import { configureStore } from "@reduxjs/toolkit"
import counterRedux from "./features/counter/dataSlice"
import checkDataRedux from "./features/counter/dataCheckSlice"

export const store = configureStore({
    reducer: {
        counter: counterRedux,
        check: checkDataRedux
    }
})