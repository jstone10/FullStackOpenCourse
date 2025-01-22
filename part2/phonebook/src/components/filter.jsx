import Input from './input'

const Filter = ({value, onChange}) => 
    <div>
      filter shown with<Input value={value} onChange={onChange}/>
    </div>

export default Filter