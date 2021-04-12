import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './index'

import { fetchLoots, fetchLootById } from '../services'
import { Loot } from '../models'

const ITEMS_PER_PAGE = 20

export interface LootsState {
  items: Loot[]
  hasNextPage: boolean
  itemsPerPage: number
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: any,
  currentItem: Loot,
  text: string
}

const initialState: LootsState = {
  items: [],
  hasNextPage: true,
  itemsPerPage: ITEMS_PER_PAGE,
  status: 'idle',
  error: null,
  currentItem: {id: '', imageUrl: '', name: '', count: {total: 0}},
  text: ''
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

export const fetchItemById = createAsyncThunk(
  'loots/fetchItemById',
  async (id: string, dispatch) => {
    return await fetchLootById(id)
  },{
    condition: (id: string, { getState }) => {
      const state = getState() as RootState
      if (state.loots.items.find(i => i.id === id)) return false
    }
  }
)

export const lootsSlice = createSlice({
  name: 'loots',
  initialState,
  reducers: {
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload
    },
    setCurrentItem: (state, action: PayloadAction<Loot>) => {
      state.currentItem = action.payload
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(i => i.id !== action.payload)
    },
    updateItem: (state, action: PayloadAction<Loot>) => {
      const index = state.items.findIndex(i => i.id === action.payload.id)
      if (state.items[index]) state.items[index] = action.payload
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
      .addCase(fetchItemById.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchItemById.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.currentItem = action.payload
      })
      .addCase(fetchItemById.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const {setText, setCurrentItem, removeItem, updateItem} = lootsSlice.actions

export const selectError = (state: RootState) => state.loots.error
export const selectHasNextPage = (state: RootState) => state.loots.hasNextPage
export const selectStatus = (state: RootState) => state.loots.status
export const selectAllItems = (state: RootState) => state.loots.items
export const selectItemCount = (state: RootState) => state.loots.items.length
export const selectCurrentItem = (state: RootState) => state.loots.currentItem
export const selectText = (state: RootState) => state.loots.text

export default lootsSlice.reducer