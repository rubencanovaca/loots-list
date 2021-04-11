import React from 'react'
import { List } from '@material-ui/core'
import useInfiniteScroll from 'react-infinite-scroll-hook'

import { Loot } from '../../models'
import { useAppSelector } from '../../store/hooks'
import { fetchMoreItems, selectError, selectHasNextPage, selectStatus } from '../../store/lootsSlice'

import LootsListItem from '../../components/LootsListItem/LootsListItem'

import './LootsList.scss'

type Props = { loots: Array<Loot> }

function LootsList({loots}: Props) {
  const hasNextPage = useAppSelector(selectHasNextPage)
  const [infiniteRef] = useInfiniteScroll({
    loading: useAppSelector(selectStatus) === 'loading',
    disabled: !!useAppSelector(selectError),
    hasNextPage,
    onLoadMore: fetchMoreItems,
    rootMargin: '0px 0px 400px 0px'
  })

  return (
    <div className="loots-list">
      <List data-test="item-list">
        {loots.map((loot: Loot) => ((
          <LootsListItem key={loot._id} loot={loot} />
        )))}
        {hasNextPage && (
          <div ref={infiniteRef}>Loading</div>
        )}
      </List>
    </div>
  )
}

export default LootsList