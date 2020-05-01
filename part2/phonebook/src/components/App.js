import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Phonebook from './Phonebook'
import PersonForm from './AddNewContact'
import Filter from './Filter'


const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')

    const hook = () => {
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                setPersons(response.data)
            })
    }

    useEffect(hook, [])

    const handleNameChange = (event) => setNewName(event.target.value)
    const handleNumberChange = (event) => setNewNumber(event.target.value)
    const handleFilterChange = (event) => setFilter(event.target.value)

    const addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName,
            number: newNumber
        }

        const regexp = `^${newName}$`
        const filteredContacts = persons.filter(person => new RegExp(regexp, "i").test(person.name));
        if (filteredContacts.length > 0) {
            window.alert(`${newName} is already added to phonebook`);
        } else {
            setPersons(persons.concat(personObject))
        }
        setNewName('')
        setNewNumber('')
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter
                filter={filter}
                onFilterChange={handleFilterChange}
            />
            <h3>Add a new person</h3>
            <PersonForm
                onFormSubmit={addPerson}
                name={newName}
                onNameChange={handleNameChange}
                number={newNumber}
                onNumberChange={handleNumberChange}
            />
            <h3>Numbers</h3>
            <Phonebook persons={persons} filter={filter} />
        </div>
    )
}

export default App