import lootsReducer, {
  LootsState
} from './lootsSlice'

describe('loots reducer', () => {
  const initialState: LootsState = {
    items: [],
    hasNextPage: true,
    itemsPerPage: 20,
    status: 'idle',
    error: null,
    currentItem: {id: '', imageUrl: '', name: '', count: {total: 0}},
    text: ''
  }
  it('should handle initial state', () => {
    expect(lootsReducer(undefined, {type: 'unknown'})).toEqual(initialState)
  })
})
