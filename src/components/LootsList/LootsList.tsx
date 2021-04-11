import React from 'react'
import { List } from '@material-ui/core'
import useInfiniteScroll from 'react-infinite-scroll-hook'

import { Loot } from '../../models'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  selectStatus,
  selectError,
  selectHasNextPage,
  selectItemCount,
  fetchItems
} from '../../store/lootsSlice'

import LootsListItem from '../../components/LootsListItem/LootsListItem'

import './LootsList.scss'

type Props = { loots: Array<Loot> }

function LootsList({loots}: Props) {
  const loading = useAppSelector(selectStatus) === 'loading'
  const disabled = !!useAppSelector(selectError)
  const hasNextPage = useAppSelector(selectHasNextPage)
  const itemCount = useAppSelector(selectItemCount)

  const dispatch = useAppDispatch()
  const onLoadMore = () => {
    dispatch(fetchItems({ start: itemCount, limit: 20 }))
  }

  const [infiniteRef] = useInfiniteScroll({
    loading,
    disabled,
    hasNextPage,
    onLoadMore,
    rootMargin: '0px 0px 400px 0px'
  })

  return (
    <div className="loots-list">
      <List data-test="item-list">
        {loots.map((loot: Loot) => ((
          <LootsListItem key={loot._id} loot={loot} />
        )))}
        {hasNextPage && (
          <div ref={infiniteRef} />
        )}
      </List>
    </div>
  )
}

export default LootsList