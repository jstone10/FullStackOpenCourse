import { useState, useEffect } from 'react'
import Persons from './components/persons'
import PersonForm from './components/personform'
import Filter from './components/filter'
import Notification from './components/notification'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personsService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const personsToShow = newFilter === ''
    ? persons
    : persons.filter(person =>
        person.name.toLowerCase().startsWith(newFilter.toLowerCase())
      )

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = { name: newName, number: newNumber }
    const existingPerson = persons.find(person => person.name === newName)

    if (existingPerson && existingPerson.number !== newNumber) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with the new one?`)) {
        personsService.update(existingPerson.id, personObject)
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id === existingPerson.id ? updatedPerson : person))
            setNotification({ message: `Updated ${updatedPerson.name}`, type: 'success' })
            setTimeout(() => setNotification(null), 5000)
          })
          .catch(error => {
            setNotification({ message: `Information of ${newName} has already been removed from the server`, type: 'error' })
            setPersons(persons.filter(p => p.id !== existingPerson.id))
            setTimeout(() => setNotification(null), 5000)
          })
      }
    } else if (existingPerson && existingPerson.number === newNumber) {
      alert(`${existingPerson.name}'s number is already ${newNumber}`)
    } else if (newName.trim().length === 0 || newNumber.trim().length === 0) {
      alert('Name or number cannot be empty or contain only spaces')
    } else {
      personsService.create(personObject).then(newPerson => {
        setPersons(persons.concat(newPerson))
        setNotification({ message: `Added ${newPerson.name}`, type: 'success' })
        setTimeout(() => setNotification(null), 5000)
      })
    }
    setNewName('')
    setNewNumber('')
  }

  const removePerson = (person) => {
    if (window.confirm(`Are you sure you want to delete ${person.name}?`)) {
      personsService.remove(person.id).then(() => {
        setPersons(persons.filter(p => p.id !== person.id))
      })
    }
  }

  const handleNewPerson = (event) => {
    const { name, value } = event.target
    if (name === 'newName') {
      setNewName(value)
    } else if (name === 'newNumber') {
      setNewNumber(value)
    }
  }

  const handleFilter = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter value={newFilter} onChange={handleFilter} />
      <h2>Add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        inputs={[
          { id: 1, name: 'newName', value: newName, onChange: handleNewPerson, placeholder: 'Enter name' },
          { id: 2, name: 'newNumber', value: newNumber, onChange: handleNewPerson, placeholder: 'Enter number' }
        ]}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} removePerson={removePerson} />
    </div>
  )
}

export default App