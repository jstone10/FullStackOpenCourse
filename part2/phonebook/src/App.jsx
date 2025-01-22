import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/persons'
import PersonForm from './components/personform'
import Filter from './components/filter'




const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const fetchPersons = () => {
    console.log('fetch Persons')

    const eventHandler = response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    }

    const promise = axios.get('http://localhost:3001/persons')
    promise.then(eventHandler)
  }

  useEffect(fetchPersons, [])

  const personsToShow = (newFilter === '') 
    ? persons
    : persons.filter(
        person => 
          person.name.toLowerCase().startsWith(newFilter.toLowerCase())
      )

  const addPerson = (event) => {
    event.preventDefault()

    const isEmptyOrSpaces = (str) => {
      return str.trim().length === 0;
    }

    if (
      persons.some(person => person.name === newName || person.number === newNumber)
    ) {
      alert(`${newName} or ${newNumber} is already added to phonebook`)
    } else if (isEmptyOrSpaces(newName) || isEmptyOrSpaces(newNumber)) {
      alert('Name or number cannot be empty or contain only spaces')
    } else {
      const newPerson = {name: newName, number: newNumber}
      setPersons(persons.concat(newPerson))
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNewPerson = (event) => {
    const {name, value} = event.target

    if (name === 'newName') {
      setNewName(value)
    } else if (name === 'newNumber') {
      setNewNumber(value)
    }
  }

  const handleFilter = (event) => {
    setNewFilter(event.target.value)
  }

  const formInputs = [
    {
      id: 1,
      name:'newName', 
      value: newName, 
      onChange: handleNewPerson
    },
    {
      id: 2,
      name: 'newNumber',
      value: newNumber,
      onChange: handleNewPerson
    }
  ]

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} onChange={handleFilter}/>
      <h2>Add a new</h2>
      <PersonForm onSubmit={addPerson} inputs={formInputs}/>
      <h2>Numbers</h2>
      <Persons persons={personsToShow}/>
    </div>
  )
}

export default App
