import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
        {text}
    </button>
)

const Statistic = (props) => {
    return (
        <tr>
            <td>
                {props.text}
            </td>
            <td>
                {props.score} {props.sign}
            </td>
        </tr>
    )
}

const Statistics = (props) => {
    if (props.total === 0) {
        return (
            <div>
                No feedback given
            </div>
        )
    }
    return (
        <div>
            <table>
                <tbody>
                    <Statistic text='Good' score={props.good} />
                    <Statistic text='Neutral' score={props.neutral} />
                    <Statistic text='Bad' score={props.bad} />
                    <Statistic text='Total' score={props.total} />
                    <Statistic text='Average' score={props.average} />
                    <Statistic text='Positive' score={props.positivePercent} sign='%' />
                </tbody>
            </table>
        </div>
    )
}

const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [total, setTotal] = useState(0)
    const [points, setPoints] = useState(0)

    const handleGoodFeeback = () => {
        setGood(good + 1)
        setTotal(total + 1)
        setPoints(points + 1)
    }

    const handleBadFeeback = () => {
        setBad(bad + 1)
        setTotal(total + 1)
        setPoints(points - 1)
    }

    const handleNeutralFeedback = () => {
        setNeutral(neutral + 1)
        setTotal(total + 1)
    }

    return (
        <div>
            <div>
                <h1>Give feedback</h1>
                <Button onClick={handleGoodFeeback} text='Good' />
                <Button onClick={handleNeutralFeedback} text='Neutral' />
                <Button onClick={handleBadFeeback} text='Bad' />
            </div>

            <div>
                <h2>Statistics</h2>
                <Statistics good={good} neutral={neutral} bad={bad} total={total} average={points / total} positivePercent={(good / total) * 100} />
            </div>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
