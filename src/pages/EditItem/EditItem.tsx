import React, { useEffect, useState, ChangeEvent } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import { Skeleton } from '@material-ui/lab'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import Button from '@material-ui/core/Button'

import { useAppSelector, useAppDispatch } from '../../store/hooks'
import {
  selectStatus,
  selectAllItems,
  selectCurrentItem,
  setCurrentItem,
  fetchItemById,
  updateItem
} from '../../store/lootsSlice'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '1em 1em'
    },
    item: {
      '& .MuiSkeleton-root': {
        margin: '.25em auto 1em'
      }
    },
    preview: {
      height: 310,
      '& h2': {
        margin: '0 0 .5em',
        minHeight: 20
      },
      '& img': {
        height: 250,
        marginBottom: theme.spacing(2)
      }
    },
    form: {
      '& > *': {
        display: 'flex',
        marginBottom: theme.spacing(3),
        '& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)': {
          transform: 'translate(14px, 14px) scale(1)'
        },
        '& .MuiOutlinedInput-input': {
          padding: '12px'
        }
      }
    }
  })
)

function EditItem() {
  const {id} = useParams()
  const loading = useAppSelector(selectStatus) === 'loading'
  const loots = useAppSelector(selectAllItems)
  const loot = useAppSelector(selectCurrentItem)

  const dispatch = useAppDispatch()
  useEffect(() => {
    const item = loots.find(i => i.id === id)
    if (item) {
      dispatch(setCurrentItem(item))
      setName(item.name)
      setImageUrl(item.imageUrl)
    } else dispatch(fetchItemById(id))
  }, [dispatch, loots, id])

  const [name, setName] = useState<string>(loot.name)
  const [imageUrl, setImageUrl] = useState<string>(loot.imageUrl)

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }
  const handleImageURLChange = (event: ChangeEvent<HTMLInputElement>) => {
    setImageUrl(event.target.value)
  }

  const history = useHistory()
  const handleSave = () => {
    dispatch(updateItem({...loot, name, imageUrl}))
    history.push('/')
  }

  const classes = useStyles()
  return (
    <div className={classes.root}>
      {!loading ? (
        <div className={classes.item}>
          <div className={classes.preview}>
            {name ? (<h2>{name}</h2>) : (<Skeleton variant="rect" width={140} height={20} animation={false} />)}
            {imageUrl ? (<img src={imageUrl} alt="" />) : (<Skeleton variant="rect" width={164} height={250} animation={false} />)}
          </div>
          <form className={classes.form} noValidate autoComplete="off">
            <FormControl variant="outlined">
              <InputLabel htmlFor="loot-name">Name</InputLabel>
              <OutlinedInput
                id="loot-name"
                value={name}
                label="Name"
                error={!name}
                onChange={handleNameChange}
              />
            </FormControl>
            <FormControl variant="outlined">
              <InputLabel htmlFor="loot-image-url">Image URL</InputLabel>
              <OutlinedInput
                id="loot-image-url"
                value={imageUrl}
                label="Image URL"
                error={!imageUrl}
                onChange={handleImageURLChange}
              />
            </FormControl>
          </form>
          <Button variant="contained" color="primary" disabled={!name || !imageUrl} onClick={handleSave}>
            Save
          </Button>
        </div>
      ) : (
        <div className={classes.item}>
          <Skeleton variant="rect" width={140} height={20} />
          <Skeleton variant="rect" width={164} height={250} />
          <Skeleton variant="rect" height={43} />
          <Skeleton variant="rect" height={43} />
          <Skeleton variant="rect" width={70} height={36} />
        </div>
      )}
    </div>
  )
}

export default EditItem