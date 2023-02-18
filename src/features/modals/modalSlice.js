import { createSlice } from '@reduxjs/toolkit'

export const modalSlice = createSlice({
    name: 'modal',
    initialState: {
      status: false,
    },
    
    reducers: {
      openAccountModal: state => {
        state.status = "user-account";
      },
      // openEditSettings: state => {
      //   state.status = "edit-settings";
      // },
      closeModal: state => {
        state.status = false
      }
    }
  })


// Action creators are generated for each case reducer function
export const { openAccountModal, closeModal } = modalSlice.actions
export default modalSlice.reducer