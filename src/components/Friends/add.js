import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import TextField from '@material-ui/core/TextField'

const FriendAdd = props => {
  // Deconstruct properties
  const { authUser, firebase } = props
  // Load state
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  // Define methods
  const clearForm = () => {
    setEmail('')
    setError('')
  }

  const onSubmit = async event => {
    // Prevent default form submission
    // DONT REMOVE!
    event.preventDefault()
    // Set email to lowercase
    const invitedEmail = email.toLowerCase()
    // Make sure the user is not trying to invite themselves
    if (invitedEmail === authUser.email) {
      // Set error and return
      setError('You cannot invite yourself!')
      return
    }
    // Find the user by email address
    let snapshot = await firebase.findUserByEmail(invitedEmail).get()
    // Check if the user does not exist
    if (snapshot.empty) {
      // Set error and return
      setError('No user with the provided email address was found.')
      return
    }
    // Get user from snapshot
    const user = snapshot.docs[0]
    // Make sure the user is not already a friend
    snapshot = await firebase.findUserFriend(user, authUser).get()
    // Check if the user exists
    if (!snapshot.empty) {
      // Set error and return
      setError('This user is already a friend.')
      return
    }
    // Find sent invites for user
    snapshot = await firebase.findSentInvitesForUser(user, authUser).get()
    // Check if the sent invite exists
    if (!snapshot.empty) {
      // Set error and return
      setError('An invite has already been sent to this user.')
      return
    }
    // Find received invites for user
    snapshot = await firebase.findReceivedInvitesForUser(user, authUser).get()
    // Check if the received invite exists
    if (!snapshot.empty) {
      // Set error and return
      setError('An invite has already been received from this user.')
      return
    }
    // Create new invite object
    const newInvite = {
      requesterId: authUser.uid,
      requesterUsername: authUser.username,
      requesterEmail: authUser.email,
      requestedId: user.id,
      requestedUsername: user.data().username,
      requestedEmail: user.data().email,
      requestedGameId: null,
      requestedGameName: null,
      createdAt: firebase.FieldValue.serverTimestamp(),
    }
    // Add new invite
    props.firebase.invites().add(newInvite)
    // Clear the form
    clearForm()
  }
  // Return component
  return (
    <Card>
      <CardHeader title="Add Friend" />
      <form onSubmit={onSubmit}>
        <CardContent>
          <TextField
            id="email"
            label="Email"
            fullWidth
            error={!!error}
            helperText={error}
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={!email}
          >
            Submit
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}

export default FriendAdd
