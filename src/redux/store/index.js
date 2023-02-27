import { configureStore } from '@reduxjs/toolkit'
import songListReducer from '../reducers/songListReducer'


export const store = configureStore({
  reducer: {
      songList: songListReducer
  },
})