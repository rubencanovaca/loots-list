import React, { useEffect } from 'react'

import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { selectStatus, selectAllItems, fetchItems } from '../../store/lootsSlice'

import SkeletonList from '../../components/SkeletonList/SkeletonList'
import LootsList from '../../components/LootsList/LootsList'

import './ItemList.scss'

function ItemList() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchItems({}))
  }, [dispatch])
  const loading = useAppSelector(selectStatus) === 'loading'
  const loots = useAppSelector(selectAllItems)
  return (
    <div className="item-list">
      <LootsList loots={loots} />
      {loading && <SkeletonList />}
    </div>
  )
}

export default ItemList