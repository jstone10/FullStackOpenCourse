import { useState } from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const getRandom = (max) => Math.floor(Math.random() * max)

const Display = ({text}) => <div>{text}</div>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const Header = ({text}) => <h1>{text}</h1>

  const [selected, setSelected] = useState(0)
  const [maxIndex, setMaxIndex] = useState([0, 0])
  const [votes, setVotes] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
  })
  

  const updateSelected = () => {
    const newSelected = getRandom(anecdotes.length)
    setSelected(newSelected)
  }

  const updateVotes = (key) => () => {
    const newVote = votes[key] + 1
    const newVotes ={...votes, [key]: newVote}
    if(newVote > maxIndex[1]) {
      setMaxIndex([key, newVote])
    }
    setVotes(newVotes)
  }

  
  return (
    <div>
      <Header text="Anecdote of the day"/>
      <Display text={anecdotes[selected]}/>
      <Display text={`has ${votes[selected]} votes`}/>
      <div>
        <Button onClick={updateVotes(selected)} text="vote"/>
        <Button onClick={updateSelected} text="next anecdote"/>
      </div>
      <Header text="Anecdote with most votes"/>
      <Display text={anecdotes[maxIndex[0]]}/>
      <Display text={`has ${maxIndex[1]} votes`}/>
    </div>
  )
}

export default App