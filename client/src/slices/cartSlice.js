import { createSlice } from "@reduxjs/toolkit";
// import toast from 'react-hot-toast';
const initialState = {
    totalItems: localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")):0
}

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        setTotalItems(state, value) {
            state.totalItems = value.payload
        },
        add(state, value) {
            state.push(value.payload)
        },
        remove(state, value) {
            return state.filter((item) => item.id !== value.payload)
        },
        resetCart(state, value) {
            state.totalItems = {}
        }
    }
})
export const { setToken,add , remove ,resetCart} = cartSlice.actions
export default cartSlice.reducer