import React from 'react'
import { Skeleton } from '@material-ui/lab'

const ListSkeleton = () => {
  return (
    <div className="skeleton-list" data-test="skeleton-list">
      <br />
      <Skeleton />
      <Skeleton animation={false} />
      <Skeleton animation="wave" />
      <br />
      <br />
      <Skeleton />
      <Skeleton animation={false} />
      <Skeleton animation="wave" />
      <br />
      <br />
      <Skeleton />
      <Skeleton animation={false} />
      <Skeleton animation="wave" />
      <br />
      <br />
      <Skeleton />
      <Skeleton animation={false} />
      <Skeleton animation="wave" />
      <br />
      <br />
      <Skeleton />
      <Skeleton animation={false} />
      <Skeleton animation="wave" />
      <br />
      <br />
      <Skeleton />
      <Skeleton animation={false} />
      <Skeleton animation="wave" />
      <br />
      <br />
      <Skeleton />
      <Skeleton animation={false} />
      <Skeleton animation="wave" />
      <br />
      <br />
      <Skeleton />
      <Skeleton animation={false} />
      <Skeleton animation="wave" />
      <br />
      <br />
      <Skeleton />
      <Skeleton animation={false} />
      <Skeleton animation="wave" />
    </div>
  )
}

export default ListSkeleton