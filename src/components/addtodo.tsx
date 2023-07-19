import { FormEvent, useState } from 'react'
import { useTodos } from '../store/todos';


const AddToDo = () => {
    const [todo, setTodo]= useState('');
    const {handleAddToDo}= useTodos()
    const handleFormSubmit=(e:FormEvent<HTMLFormElement>)=>{
       e.preventDefault(); 
       handleAddToDo(todo)
       setTodo("")
    }
    
  return (
    <form onSubmit={handleFormSubmit}>
        <input type="text" onChange={(e)=>setTodo(e.target.value)} value={todo} />
        <button type='submit'>Add</button>
    </form>
  )
}

export default AddToDo