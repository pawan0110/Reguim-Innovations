import {createSlice} from "@reduxjs/toolkit"

const productSlice = createSlice({
    name: "product",
    initialState: {
        productData: [],
        userproductData: []
    },
    reducers: {
        setProductData: (state, action) => {
            state.productData = action.payload;
        },
        setuserProductData: (state, action) => {
            state.userproductData = action.payload;
        },
    },

})

export const {setProductData, setuserProductData} = productSlice.actions;
export default productSlice.reducer;