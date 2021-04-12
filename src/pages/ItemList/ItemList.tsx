import React, { ChangeEvent } from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import Close from '@material-ui/icons/Close'

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { selectStatus, selectAllItems, selectText, setText } from '../../store/lootsSlice'

import SkeletonList from '../../components/SkeletonList/SkeletonList'
import LootsList from '../../components/LootsList/LootsList'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      padding: '2em'
    },
    form: {
      margin: '0 auto 1em',
      '& .MuiFormControl-root': {
        width: 250
      }
    },
    filtered: {
      display: 'none'
    }
  })
)

function ItemList() {
  const text = useAppSelector(selectText)
  const loading = useAppSelector(selectStatus) === 'loading'
  const loots = useAppSelector(selectAllItems).filter(i => i.name.toLowerCase().includes(text.toLowerCase()))

  const dispatch = useAppDispatch()
  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setText(event.target.value))
  }

  const classes = useStyles()
  return (
    <div className={classes.root}>
      <form className={classes.form} noValidate autoComplete="off">
        <FormControl variant="outlined">
          <InputLabel htmlFor="loot-name">Filter by name</InputLabel>
          <OutlinedInput
            id="loot-name"
            value={text}
            label="Filter by name"
            endAdornment={
              <InputAdornment className={!text ? classes.filtered : ''} position="end">
                <IconButton
                  aria-label="clear searched text"
                  onClick={() => { dispatch(setText('')) }}
                  edge="end"
                >
                  <Close />
                </IconButton>
              </InputAdornment>
            }
            onChange={handleTextChange}
          />
        </FormControl>
      </form>
      <LootsList loots={loots} />
      {loading && <SkeletonList />}
    </div>
  )
}

export default ItemList