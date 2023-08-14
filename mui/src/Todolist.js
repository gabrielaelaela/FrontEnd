import {useState} from "react";
import TodoTable from './TodoTable';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import {DatePicker} from "@mui/x-date-pickers";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function Todolist() {
    const [todo, setTodo] = useState({description:'', date:""});
    const [todos, setTodos] = useState([]);

    const inputChanged = (event) => {
        setTodo({...todo, [event.target.name]: event.target.value});
    }
    const dateChanged = (date) => {
        setTodo({...todo, date: date.toString().substring(0, 16)});

    }
    const addTodo = () => {
        setTodos([...todos, todo]);
    }
    const deleteTodo = (event) => {
        setTodos(todos.filter((todo, index) => index.toString() !== event.target.value));
    }

    return (
        <div className="App">
            <Stack id="add_todo" direction="row" spacing={2} justifyContent="center" alignItems="center">
                <TextField
                    label="Description"
                    variant="standard"
                    name="description" value={todo.description}
                    onChange={inputChanged}/>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker onChange={date => dateChanged(date)}  views={['year', 'month', 'day']}/>
                </LocalizationProvider>
                <Button onClick={addTodo} variant="contained">Add</Button>
            </Stack>

            <TodoTable todos={todos} deleteTodo={deleteTodo} />
        </div>
    );
}

export {Todolist}
