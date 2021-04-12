import React from 'react'
import GridList from '@material-ui/core/GridList'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import useInfiniteScroll from 'react-infinite-scroll-hook'

import { Loot } from '../../models'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import {
  selectStatus,
  selectError,
  selectHasNextPage,
  selectItemCount,
  fetchItems
} from '../../store/lootsSlice'

import LootsListItem from '../../components/LootsListItem/LootsListItem'

type Props = { loots: Array<Loot> }

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden'
    },
    gridList: {
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)'
    }
  })
)

function LootsList({loots}: Props) {
  const loading = useAppSelector(selectStatus) === 'loading'
  const disabled = !!useAppSelector(selectError)
  const hasNextPage = useAppSelector(selectHasNextPage)
  const itemCount = useAppSelector(selectItemCount)

  const dispatch = useAppDispatch()
  const onLoadMore = () => {
    dispatch(fetchItems({start: itemCount, limit: 20}))
  }

  const [infiniteRef] = useInfiniteScroll({
    loading,
    disabled,
    hasNextPage,
    onLoadMore,
    rootMargin: '0px 0px 400px 0px'
  })

  const classes = useStyles()
  return (
    <div className={classes.root}>
      <GridList cellHeight={0} className={classes.gridList}>
        {loots.map((loot: Loot) => ((
          <LootsListItem key={loot.id} loot={loot} />
        )))}
        {hasNextPage && (
          <div ref={infiniteRef} />
        )}
      </GridList>
    </div>
  )
}

export default LootsList