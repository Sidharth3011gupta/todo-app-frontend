const TODO_URL="https://todo-backend-1-56wa.onrender.com";
// const TODO_URL ="http://localhost:5000"
import React, { useState, useEffect } from 'react';

const Todos = () => {
    const [todos, setTodos] = useState([]);  
    const [newTodo, setNewTodo] = useState(''); 

    
    const getTodos = async() => {
        
        const response = await fetch(`${TODO_URL}/api/todos`)
        const data = await response.json()
        setTodos(data)
           
    };
    const addTodo = () => {
        
        fetch(`${TODO_URL}/api/todos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({description: newTodo, completed: false }),
        })
            .then(response => response.json())
            .then(() => {
                setNewTodo(''); 
                getTodos(); 
            })
            .catch(err => console.error(err));
    };

  
    const deleteTodo = (id) => {
        fetch(`${TODO_URL}/api/todos/${id}`, 
            { method: 'DELETE' })
            .then(() => getTodos())  
            .catch(err => console.error(err));
    };

    const updateTodo = (id, newTitle) => {
        fetch(`${TODO_URL}/api/todos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ description: newTitle }),
        })
            .then(() => getTodos()) 
            .catch(err => console.error(err));
    };

    const toggleTodoStatus = (id) => {
        fetch(`${TODO_URL}/api/todos/${id}/toggle`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed: true }),
        })
            .then(() => getTodos())  
            .catch(err => console.error(err));
    };

    useEffect(() => {
        getTodos();  
    }, []);

    return (
        <div className='w-full h-36 border-black bg-transparent'>
        

           
            <input 
            className='ml-64  border rounded-md m-12 w-96 h-12 border-black '
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new todo"
            />
            <button onClick={addTodo} className='border-black h-12 bg-blue-600 w-24 rounded-lg text-stone-200' >Add Todo</button>

          
            <ul className='flex flex-wrap m-16 gap-12 '> 
                {todos.map((todo) => (
                    <li key={todo._id}  className='border border-black bg-slate-100  '>
                        <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                            {todo.title}
                        </span>
                        <h4 className='border border-b-4-black bg-white ml-2' > 
                           TODO_TITLE: {todo.description} </h4>
                        <button  className='ml-6 mt-4 mb-4 p-3   border rounded-lg bg-yellow-400 text-white-200' onClick={() => deleteTodo(todo._id)}>Delete</button>
                        <button  className='mt-4 mb-4 p-3 ml-4 border rounded-lg bg-green-500 text-white-200' onClick={() => updateTodo(todo._id, prompt('New description:', todo.description))}>
                            Update
                        </button> 
                        <button  className='mt-4 mb-4 mr-6 p-3 ml-4 border rounded-lg bg-blue-600 text-white-200' onClick={() => toggleTodoStatus(todo._id, todo.completed)}>
                            {todo.completed ? 'completed' : 'pending'}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Todos;
