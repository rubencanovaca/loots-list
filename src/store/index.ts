import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import lootsReducer from './lootsSlice'

export const store = configureStore({
  reducer: {
    loots: lootsReducer
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
