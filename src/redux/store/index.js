import { configureStore } from '@reduxjs/toolkit'
//import counterReducer from '../reducers/counterSlice'
import songListReducer from '../reducers/songListReducer'

export const store = configureStore({
  reducer: {
      songList: songListReducer
  },
})