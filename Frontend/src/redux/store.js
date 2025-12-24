import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice.js"
import productSlice from "./productSlice.js"
const store = configureStore({
    reducer: {
        user: userSlice,
        product: productSlice
        
    }
})

export default store;
export { store };