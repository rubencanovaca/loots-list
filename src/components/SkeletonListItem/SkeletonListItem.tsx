import React from 'react'
import { Skeleton } from '@material-ui/lab'

const SkeletonListItem = () => {
  return (
    <div className="skeleton-list-item" data-test="skeleton-list-item">
      <Skeleton />
      <Skeleton animation={false} />
      <Skeleton animation="wave" />
    </div>
  )
}

export default SkeletonListItem