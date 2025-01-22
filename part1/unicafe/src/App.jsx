import { useState } from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Header = ({text}) => <h1>{text}</h1>

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td> 
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, bad, neutral}) => {
  const all = good + bad + neutral
  const average = (good - bad) / all
  const positive = good / all
  if (all === 0) {
    return <p>No Feedback Given</p>
  }
  return (
    <table>
      <tbody>
      <StatisticLine text="good" value={good}/>
      <StatisticLine text="neutral" value={neutral}/>
      <StatisticLine text="bad" value={bad}/>
      <StatisticLine text="all" value={all}/>
      <StatisticLine text="average" value={average}/>
      <StatisticLine text="positive" value={positive}/>
      </tbody>
    </table>   
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  

  const addOneTo = (setValue, value) => () => {
    const newValue = value + 1
    setValue(newValue)
  }
  
  return (
    <div>
      <Header text={"give feedback"}/>
      <Button onClick={addOneTo(setGood, good)} text={"good"}/>
      <Button onClick={addOneTo(setNeutral, neutral)} text={"neutral"}/>
      <Button onClick={addOneTo(setBad, bad)} text={"bad"}/>
      <Header text={"statistics"}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}


export default App
