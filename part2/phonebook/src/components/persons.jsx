const Person  = ({person, onClick}) => 
<div>
  {person.name} {person.number}
  <button onClick={onClick}>delete</button>
</div>



const Persons = ({persons, removePerson}) => {
  return (
    <div>
    {persons.map(person => 
      <Person key={person.id} person={person} onClick={() => removePerson(person)}/>
    )}
  </div>
  )
}
  

export default Persons