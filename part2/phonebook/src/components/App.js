import React, { useState, useEffect } from 'react'
import Phonebook from './Phonebook'
import PersonForm from './AddNewContact'
import Filter from './Filter'
import phonebookService from './../services/phonebook'
import SuccessNotification from './SuccessNotification'
import ErrorNotification from './ErrorNotification'


const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)

    const hook = () => {
        phonebookService.getAll()
            .then(response => {
                setPersons(response)
            })
    }

    useEffect(hook, [])

    const handleNameChange = (event) => setNewName(event.target.value)
    const handleNumberChange = (event) => setNewNumber(event.target.value)
    const handleFilterChange = (event) => setFilter(event.target.value)

    const deletePerson = (event) => {
        event.preventDefault()
        const id = event.target.attributes.id.value
        const name = event.target.attributes.name.value
        const contact = persons.find(person => person.id === id)
        if (window.confirm(`Delete ${name}?`)) {
            const deleteContact = { ...contact, id: id }
            phonebookService.deleteContact(deleteContact.id)
                .then(response => {
                    setPersons(persons.filter(person => person.name !== name))
                    setSuccessMessage(`Deleted ${name}`)
                    setTimeout(() => {
                        setSuccessMessage(null)
                    }, 5000)
                })
                .catch(error => {
                    setErrorMessage(`Information of '${name}' has already been removed from server`)
                    setTimeout(() => {
                        setSuccessMessage(null)
                    }, 5000)
                    setPersons(persons.filter(person => person.name !== name))
                })
        }
    }

    const addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName,
            number: newNumber
        }

        const regexp = `^${newName}$`
        const filteredContacts = persons.filter(person => new RegExp(regexp, "i").test(person.name));
        if (filteredContacts.length > 0) {
            const confirmation = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
            const changedContact = { ...filteredContacts[0], number: personObject.number }

            if (confirmation) {
                phonebookService.update(filteredContacts[0].id, changedContact)
                    .then(response => {
                        setPersons(persons.map(person => person.id !== response.id ? person : response))
                        setSuccessMessage(`Updated ${personObject.name}`)
                        setTimeout(() => {
                            setSuccessMessage(null)
                        }, 5000)
                    })
                    .catch(error => {
                        setErrorMessage(`Information of '${personObject.name}' could not be updated`)
                        setTimeout(() => {
                            setSuccessMessage(null)
                        }, 5000)
                    })
            }
        } else {
            phonebookService.create(personObject)
                .then((response) => {
                    setPersons(persons.concat(response))
                    setSuccessMessage(`Added ${personObject.name}`)
                    setTimeout(() => {
                        setSuccessMessage(null)
                    }, 5000)
                })
                .catch(error => {
                    setErrorMessage(`Information of '${personObject.name}' could not be added`)
                    setTimeout(() => {
                        setSuccessMessage(null)
                    }, 5000)
                })
        }
        setNewName('')
        setNewNumber('')
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <SuccessNotification message={successMessage} />
            <ErrorNotification message={errorMessage} />
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
            <Phonebook persons={persons} filter={filter} onButtonClick={deletePerson} />
        </div>
    )
}

export default App