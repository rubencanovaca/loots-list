import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Loot } from '../../models'

import { createStyles, makeStyles } from '@material-ui/core/styles'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'

type Props = { loot: Loot }

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      cursor: 'pointer',
      margin: '1em auto',
      width: 250,
      height: 380,
      '&$focused': {
        cursor: 'default',
        '& $topTileBar, & $bottomTileBar': {
          opacity: 1
        }
      }
    },
    focused: {},
    topTileBar: {
      background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
      opacity: 0,
      transition: 'opacity .3s ease'
    },
    bottomTileBar: {
      opacity: 0,
      transition: 'opacity .3s ease'
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)'
    }
  })
)

function LootsListItem({loot}: Props) {
  const [focused, setFocused] = useState<boolean>(false)

  const toggleFocus = () => {
    setFocused(!focused)
  }

  const handleClickAway = () => {
    setFocused(false)
  }

  const handleDelete = (e: any) => {
    e.stopPropagation()
    console.log('Delete', loot._id)
  }

  const classes = useStyles()
  return (
    <ClickAwayListener onClickAway={focused ? handleClickAway : () => {}}>
      <GridListTile className={`${classes.root} ${focused ? classes.focused : ''}`} onClick={toggleFocus}>
        <img src={loot.imageUrl} alt={loot.name} />
        <GridListTileBar
          className={classes.topTileBar}
          titlePosition="top"
          actionIcon={
            <IconButton aria-label={`Remove ${loot.name}`} className={classes.icon} onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          }
        />
        <GridListTileBar
          className={classes.bottomTileBar}
          title={loot.name}
          actionIcon={
            <Link to={`/loot/${loot._id}`}>
              <IconButton aria-label={`Edit ${loot.name}`} className={classes.icon}>
                <EditIcon />
              </IconButton>
            </Link>
          }
        />
      </GridListTile>
    </ClickAwayListener>
  )
}

export default LootsListItem