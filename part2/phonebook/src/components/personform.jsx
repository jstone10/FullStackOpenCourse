import Input from './input'

const PersonForm = ({onSubmit, inputs}) => 
    <form onSubmit={onSubmit}>
      {inputs.map(
        ({id, name, value, onChange}) =>
          <Input key={id} name={name} value={value} onChange={onChange}/>
      )}
      <div><button type="submit">add</button></div>
    </form>

export default PersonForm