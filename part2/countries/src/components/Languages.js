import React from 'react'

const Languages = ({ languages }) => {
    return languages.map(language =><div key={language.name}> {language.name} </div>)
}

export default Languages