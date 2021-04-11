import lootsReducer, {
  LootsState,
  remove
} from './lootsSlice'

describe('loots reducer', () => {
  const initialState: LootsState = {
    items: [],
    status: 'idle'
  }
  it('should handle initial state', () => {
    expect(lootsReducer(undefined, {type: 'unknown'})).toEqual(initialState)
  })

  it('should handle remove', () => {
    const actual = lootsReducer(initialState, remove('id'))
    expect(actual.items).toEqual(4)
  })
})
