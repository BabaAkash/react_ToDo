import { ReactNode,createContext, useContext, useState } from "react";

export type TodosProviderProps ={
    children : ReactNode // react node means (kuch b type ho sakta hai)
}
export type Todo ={
    id:string;
    task:string;
    completed:boolean;
    createdAt:Date;
}
export type TodosContext ={ //step 2 
    todos:Todo[];
    handleAddToDo:(task:string)=>void;
    toggleTodoCompleted:(id:string)=>void;
    handleDeleteTodo:(id:string)=> void;
}
export const todosContext =createContext<TodosContext | null>(null) // todosContext iska type  step1

export const TodosProvider=({children}:TodosProviderProps)=>{
    const [todos, setTodos]= useState<Todo[]>(()=>{
        try {
            const newTodos = localStorage.getItem("todos") || "[]";
            return JSON.parse(newTodos) as Todo[];
        } catch (error) {
          return []  
        }
    })

    const handleAddToDo =(task:string)=>{
          setTodos((prev)=>{
             const newTodos :Todo[] =[{
                id:Math.random().toString(),
                task:task,
                completed:false,
                createdAt: new Date()
             },
             ...prev
            ]
            console.log(newTodos)
            localStorage.setItem("todos", JSON.stringify(newTodos))
            return newTodos;
          })
    }

    // mark completed
    const toggleTodoCompleted =(id:string)=>{
       setTodos((prev)=>{
        const newTodos = prev.map((todo)=>{
                if(todo.id==id){
                    return {...todo , completed:!todo.completed}
                }
                return todo
        })
        localStorage.setItem("todos", JSON.stringify(newTodos))
        return newTodos
       })
       
    }
/// delete todo
const handleDeleteTodo =(id:string)=>{
   setTodos((prev)=>{
    const newTodos = prev.filter((filterTodo)=>filterTodo.id != id)
    localStorage.setItem("todos", JSON.stringify(newTodos))
    return newTodos;
   })
}
   return <todosContext.Provider value={{todos, handleAddToDo,toggleTodoCompleted,handleDeleteTodo}}>
    {children}
   </todosContext.Provider>
}

// consumers

export const  useTodos =()=>{
const todoConsumer = useContext(todosContext);
  if(!todoConsumer){
    throw new Error("useTodos used outside providers")
  }
  return todoConsumer
}