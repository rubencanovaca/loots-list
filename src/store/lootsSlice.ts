import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from './index'
import { fetchLoots } from '../services'
import { Loot } from '../models'

const ITEMS_PER_PAGE = 20

export interface LootsState {
  items: Loot[]
  hasNextPage: boolean
  itemsPerPage: number
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: any
}

const initialState: LootsState = {
  items: [],
  hasNextPage: true,
  itemsPerPage: ITEMS_PER_PAGE,
  status: 'idle',
  error: null
}

interface FetchItemsPayload {
  start?: number
  limit?: number
}
export const fetchItems = createAsyncThunk(
  'loots/fetchItems',
  async ({start = 0, limit = ITEMS_PER_PAGE}: FetchItemsPayload) => {
    return await fetchLoots(start, limit)
  }
)

export const lootsSlice = createSlice({
  name: 'loots',
  initialState,
  reducers: {
    removeItem: (state, action: PayloadAction<string>) => {
      console.log(state.items, action.payload)
    },
    updateItem: (state, action: PayloadAction<Loot>) => {
      console.log(state.items, action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = state.items.concat(action.payload)
        state.hasNextPage = action.payload.length === state.itemsPerPage
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const { removeItem, updateItem } = lootsSlice.actions

export const selectError = (state: RootState) => state.loots.error
export const selectHasNextPage = (state: RootState) => state.loots.hasNextPage
export const selectItemsPerPage = (state: RootState) => state.loots.itemsPerPage
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