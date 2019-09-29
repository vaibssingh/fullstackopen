import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const VoteButton = ({ onClick, text, quote, arrayOfQuotes }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(6).fill(0))

  const getRandomQuote = () => {
    setSelected(Math.floor(Math.random() * props.anecdotes.length))
  }

  const handleUpvote = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  }

  const getMaxUpvotes = () => {
    return votes.indexOf(Math.max(...votes));
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>
        {props.anecdotes[selected]}
      </p>
      <p>has {votes[selected]} votes</p>
      <p>
        <VoteButton onClick={handleUpvote} text='Vote' arrayOfQuotes={props.anecdotes} selectedQuote={selected} />
        <Button onClick={getRandomQuote} text='Get random quote' />
      </p>
      <h1>Anecdote with most votes</h1>
      {props.anecdotes[getMaxUpvotes()]}
      <p>has {votes[getMaxUpvotes()]} votes</p>
    </div>

  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)