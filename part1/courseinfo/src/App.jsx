const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  console.log(props)
  return(
    <div>
      {props.parts.map((p, i) => (
        <Part key={i} k={p.name} v={p.exercises}/>
      ))}
    </div>
  )
}

const Part =(props) => {
  return (
    <p>{props.k} {props.v}</p>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.total}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total total={course.parts.reduce((total, e) => total + e.exercises, 0)}/>
    </div>
  )
}


export default App