import React, { useState } from 'react'
import Aux from 'react-aux'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}))

const QwestCreate = () => {
  const [name, setName] = useState('')

  const classes = useStyles()

  const onSubmitForm = event => {
    event.preventDefault()
  }

  return (
    <Aux>
      <Typography variant="h5" gutterBottom>
        Create Qwest
      </Typography>
      <form onSubmit={onSubmitForm}>
        <TextField
          id="name"
          label="Name"
          className={classes.textField}
          value={name}
          onChange={event => setName(event.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.button}
          disabled={!name}
        >
          SUBMIT
        </Button>
      </form>
    </Aux>
  )
}

export default QwestCreate
