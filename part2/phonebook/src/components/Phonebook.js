import React from 'react';

// const Person = ({ name, number, onButtonClick }) => <div>{name} {number} <button onClick={onButtonClick} >delete</button></div>
const ShowPersonName = (filteredPersons, onButtonClick) => {
    return filteredPersons.map(person => 
        <div key={person.id}>
            <li> {person.name} {person.number} 
                <button onClick={onButtonClick} id={person.id} name={person.name}>delete</button>
            </li>
        </div>
    )
}
const Phonebook = ({ persons, filter, onButtonClick }) => {
    let filteredPersons = persons
    if (filter) {
        filteredPersons = persons.filter(person => new RegExp(filter, "i").test(person.name));
    }
    return ShowPersonName(filteredPersons, onButtonClick)
}

export default Phonebook;