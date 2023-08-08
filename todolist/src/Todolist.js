import {useState} from "react";
import TodoTable from './TodoTable';

function Todolist() {
    const [todo, setTodo] = useState({description:'', date:""});
    const [todos, setTodos] = useState([]);

    const descChanged = (event) => {
        setTodo({...todo, description: event.target.value});
    }
    const dateChanged = (event) => {
        setTodo({...todo, date: event.target.value});
    }
    const addTodo = () => {
        setTodos([...todos, todo]);
    }
    const deleteTodo = (event) => {
        setTodos(todos.filter((todo, index) => index.toString() !== event.target.value));
    }

    return (
        <div className="App">
            <div id="add_todo">
                <label htmlFor="desc">Description: </label>
                <input id="desc" type="text" onChange={descChanged} value={todo.description}/>
                <label htmlFor="date">Date: </label>
                <input id="date" type="date" onChange={dateChanged} value={todo.date}/>
                <button onClick={addTodo}>Add</button>
            </div>

            <TodoTable todos={todos} deleteTodo={deleteTodo} />
        </div>
    );
}

export {Todolist}
