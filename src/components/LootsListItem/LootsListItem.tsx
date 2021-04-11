import React from 'react'
import { Loot } from '../../models'

import './LootsListItem.scss'

type Props = { loot: Loot }

function LootsListItem({loot}: Props) {
  return (
    <div className="loots-list-item">
      <img src={loot.imageUrl} alt={loot.name} />
    </div>
  )
}

export default LootsListItem