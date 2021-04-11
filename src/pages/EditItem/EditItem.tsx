import React from 'react'

import './EditItem.scss'

type Props = { id: string }

function EditItem({id}: Props) {
  return (
    <div className="edit-item">
      {id}
    </div>
  )
}

export default EditItem