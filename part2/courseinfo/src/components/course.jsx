const Course = ({course}) => (
  <div>
    <Header name={course.name}/>
    <Content parts={course.parts}/>
    <Total parts={course.parts}/>
  </div>
)

const Header = ({ name }) => <h3>{name}</h3>

const Total = ({ parts }) => 
  <strong>
    total of {
    parts.reduce((sum, part) => sum + part.exercises, 0)
    } exercises
  </strong>
  
  

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => (
  <div>
    {parts.map((part) => 
      <Part key={part.id} part={part}/>
    )}
  </div>
)
  
export default Course