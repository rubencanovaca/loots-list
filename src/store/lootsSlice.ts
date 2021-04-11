import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from './index'
import { fetchLoots } from '../services'
import { Loot } from '../models'

const ARRAY_SIZE = 20

export interface LootsState {
  items: Loot[]
  hasNextPage: boolean
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: any
}

const initialState: LootsState = {
  items: [],
  hasNextPage: true,
  status: 'idle',
  error: null
}

interface FetchLootsPayload {
  start?: number
  limit?: number
}
export const asyncFetchItems = createAsyncThunk(
  'loots/fetchLoots',
  async ({start = 0, limit = ARRAY_SIZE}: FetchLootsPayload) => {
    return await fetchLoots(start, limit)
  }
)

export const lootsSlice = createSlice({
  name: 'loots',
  initialState,
  reducers: {
    fetchMoreItems: (state) => {
      asyncFetchItems({start: state.items.length, limit: ARRAY_SIZE})
    },
    removeItem: (state, action: PayloadAction<string>) => {
      console.log(state.items, action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncFetchItems.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(asyncFetchItems.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = state.items.concat(action.payload)
        state.hasNextPage = action.payload.length === ARRAY_SIZE
      })
      .addCase(asyncFetchItems.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const { fetchMoreItems, removeItem } = lootsSlice.actions

export const selectError = (state: RootState) => state.loots.error
export const selectHasNextPage = (state: RootState) => state.loots.hasNextPage
export const selectStatus = (state: RootState) => state.loots.status
export const selectAllItems = (state: RootState) => state.loots.items
export const selectItemCount = (state: RootState) => state.loots.items.length
export const selectItemById = (state: RootState, id: string) => state.loots.items.find(i => i._id === id)

export const removeItemSecurely = (id: string): AppThunk => (
  dispatch,
  getState
) => {
  const lootsCount = selectItemCount(getState())
  const lootExists = selectItemById(getState(), id)
  if (lootsCount > 0 && lootExists) dispatch(removeItem(id))
}

export default lootsSlice.reducer