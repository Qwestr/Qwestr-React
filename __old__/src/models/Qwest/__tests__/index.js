import firebase from 'firebase'
import Qwest, {
  REPEAT_TYPE, UserQwest, AssignedUserQwest, AssigningUserQwest
}  from '../'

afterEach(() => {
  firebase.__resetAuthUserId()
  firebase.__clearMockDatabase()
})

describe('Qwest', () => {
  it('successfully creates a Qwest', () => {
    // Get authorized User ID
    const currentAuthUserId = firebase.__getAuthUserId()

    // Create Qwest object and save
    const newQwest = new Qwest({
      title: 'New Qwest',
      description: 'A description of the Qwest',
      repeats: REPEAT_TYPE.Daily
    })
    newQwest.create()

    // Get resulting database
    const database = firebase.__getMockDatabase()

    // Expect that the approriate Qwests have been created/ updated
    expect(Object.keys(database['qwests'])).toHaveLength(1)
    expect(database['qwests']['mockId1'].title).toBe(newQwest.title)
    expect(database['qwests']['mockId1'].description).toBe(newQwest.description)
    expect(database['qwests']['mockId1'].repeats).toBe(newQwest.repeats)
    expect(database['qwests']['mockId1'].createdBy).toBe(currentAuthUserId)
    expect(database['qwests']['mockId1'].createdOn).toBe(Date.today().setTimeToNow().toString())
    expect(database['qwests']['mockId1'].updatedOn).toBe(Date.today().setTimeToNow().toString())

    // Expect that the approriate User Qwests have been created/ updated
    expect(Object.keys(database['user-qwests'])).toHaveLength(1)
    expect(Object.keys(database['user-qwests'][currentAuthUserId])).toHaveLength(1)
    expect(Object.keys(database['user-qwests'][currentAuthUserId]['active'])).toHaveLength(1)
    expect(database['user-qwests'][currentAuthUserId]['active']['mockId1'].title).toBe(newQwest.title)
  })

  it('successfully updates a Qwest', () => {
    // Create Qwest object
    const newQwest = new Qwest({
      title: 'New Qwest',
      description: 'A description of the Qwest',
      repeats: REPEAT_TYPE.Daily
    })

    // Update the Qwest object
    const updatedQwestData = {
      title: 'Updated Qwest Title',
      description: 'An updated description of the Qwest',
      repeats: REPEAT_TYPE.Weekly
    }
    newQwest.update(updatedQwestData)

    // Expect that the Qwest has been successfully created/ updated
    expect(newQwest.title).toBe(updatedQwestData.title)
    expect(newQwest.description).toBe(updatedQwestData.description)
    expect(newQwest.repeats).toBe(updatedQwestData.repeats)
    expect(newQwest.updatedOn).toBe(Date.today().setTimeToNow().toString())
  })

  it('successfully completes a Qwest', () => {
    // Create Qwest object
    const newQwest = new Qwest({
      title: 'New Qwest',
      description: 'A description of the Qwest'
    })

    // Complete the Qwest
    newQwest.complete()

    // Expect that the Qwest has been successfully completed
    expect(newQwest.completed).toBe(true)
    expect(newQwest.completedOn).toBe(Date.today().setTimeToNow().toString())
    expect(newQwest.updatedOn).toBe(Date.today().setTimeToNow().toString())
  })
})

describe('UserQwest', () => {
  it('successfully updates a UserQwest', () => {
    // Create UserQwest object
    const newUserQwest = new UserQwest({
      title: 'New Qwest'
    })

    // Update the UserQwest object
    const updatedUserQwestData = {
      title: 'Updated Qwest Title'
    }
    newUserQwest.update(updatedUserQwestData)

    // Expect that the UserQwest has been successfully created/ updated
    expect(newUserQwest.title).toBe(updatedUserQwestData.title)
  })
})

describe('AssignedUserQwest', () => {
  it('successfully updates a AssignedUserQwest', () => {
    // Create AssignedUserQwest object
    const newAssignedUserQwest = new AssignedUserQwest({
      title: 'New Qwest'
    })

    // Update the AssignedUserQwest object
    const updatedAssignedUserQwestData = {
      title: 'Updated Qwest Title'
    }
    newAssignedUserQwest.update(updatedAssignedUserQwestData)

    // Expect that the AssignedUserQwest has been successfully created/ updated
    expect(newAssignedUserQwest.title).toBe(updatedAssignedUserQwestData.title)
  })
})

describe('AssigningUserQwest', () => {
  it('successfully updates a AssigningUserQwest', () => {
    // Create AssigningUserQwest object
    const newAssigningUserQwest = new AssigningUserQwest({
      title: 'New Qwest'
    })

    // Update the AssigningUserQwest object
    const updatedAssigningUserQwestData = {
      title: 'Updated Qwest Title'
    }
    newAssigningUserQwest.update(updatedAssigningUserQwestData)

    // Expect that the AssigningUserQwest has been successfully created/ updated
    expect(newAssigningUserQwest.title).toBe(updatedAssigningUserQwestData.title)
  })
})