import React from 'react'
import SkeletonListItem from '../SkeletonListItem/SkeletonListItem'

const SkeletonList = () => {
  return (
    <div className="skeleton-list" data-test="skeleton-list">
        <SkeletonListItem />
    </div>
  )
}

export default SkeletonList