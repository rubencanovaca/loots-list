import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { Loot } from '../../models'
import { useAppDispatch } from '../../store/hooks'
import { removeItem } from '../../store/lootsSlice'

import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import IconButton from '@material-ui/core/IconButton'
import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'

type Props = { loot: Loot }

function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  }
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      cursor: 'pointer',
      margin: '1em auto',
      width: 250,
      height: 380,
      position: 'relative',
      '&$focused': {
        cursor: 'default',
        '& $actions': {
          opacity: 1,
          right: 0
        }
      },
      '& img': {
        width: 'calc(100% + 1px)'
      }
    },
    focused: {},
    actions: {
      background: 'rgba(0, 0, 0, 0.7)',
      position: 'absolute',
      right: '-96px',
      top: '0',
      opacity: 0,
      transition: 'all .3s ease'
    },
    bottomTileBar: {
      fontWeight: 'bold',
      height: '40px'
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.7)'
    },
    modal: {
      position: 'absolute',
      textAlign: 'center',
      width: 250,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3)
    },
    modalActions: {
      '& button': {
        margin: theme.spacing(1)
      }
    }
  })
)

function LootsListItem({loot}: Props) {
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [focused, setFocused] = useState<boolean>(false)

  const toggleFocus = () => {
    setFocused(!focused)
  }

  const handleClickAway = () => {
    setFocused(false)
  }

  const confirmDelete = (e: any) => {
    e.stopPropagation()
    setShowModal(true)
  }

  const dispatch = useAppDispatch()
  const handleDelete = () => {
    dispatch(removeItem(loot.id))
    setShowModal(false)
  }

  const classes = useStyles()
  return (
    <ClickAwayListener onClickAway={focused ? handleClickAway : () => {}}>
      <GridListTile className={`${classes.root} ${focused ? classes.focused : ''}`} onClick={toggleFocus}>
        <img src={loot.imageUrl} alt={loot.name} />
        <div className={classes.actions}>
          <Link to={`/loot/${loot.id}`}>
            <IconButton aria-label={`Edit ${loot.name}`} className={classes.icon}>
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton aria-label={`Remove ${loot.name}`} className={classes.icon} onClick={confirmDelete}>
            <DeleteIcon />
          </IconButton>
        </div>
        <GridListTileBar className={classes.bottomTileBar} title={loot.name} />
        <Modal
          open={showModal}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div style={modalStyle} className={classes.modal}>
            <h2 id="simple-modal-title">{loot.name}</h2>
            <p id="simple-modal-description">
              The loot is going to be removed, are you sure?
            </p>
            <div className={classes.modalActions}>
              <Button variant="contained" onClick={() => { setShowModal(false) }}>
                Cancel
              </Button>
              <Button variant="contained" color="primary" onClick={handleDelete}>
                Remove
              </Button>
            </div>
          </div>
        </Modal>
      </GridListTile>
    </ClickAwayListener>
  )
}

export default LootsListItem