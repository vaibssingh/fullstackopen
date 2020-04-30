import React from 'react';

const Header = ({ props }) => <h1>{props}</h1>;

const Part = ({ part, exercises }) => {
    return (
        <div>
            <p>
                {part} has {exercises} exercises.
		</p>
        </div>
    )
}

const Content = ({ parts }) => (
    <div>
        {parts.map(part => (
            <Part key={part.id} part={part.name} exercises={part.exercises} />
        ))}
    </div>
);

const Total = (props) => {
    const sum = () => props.parts.reduce((accumulator, currValue) => ({ exercises: accumulator.exercises + currValue.exercises }));
    return (
        <div>
            <b>total of {sum().exercises} exercises</b>
        </div>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header props={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course;