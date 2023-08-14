import {useRef, useState} from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import {DatePicker} from "@mui/x-date-pickers";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {AgGridReact} from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

function Todolist() {
    const [todo, setTodo] = useState({description:'', date:"", priority:""});
    const [todos, setTodos] = useState([]);
    const gridRef = useRef("");

    const columns = [
        { field: "description", sortable: true, filter: true },
        { field: "date", sortable: true, filter: true },
        { field: "priority", sortable: true, filter: true,
            cellStyle: param => param.value === "High" ? {color: 'red'} : {color: 'black'}}
    ];

    const inputChanged = (event) => {
        setTodo({...todo, [event.target.name]: event.target.value});
    }
    const dateChanged = (date) => {
        setTodo({...todo, date: date.toString().substring(0, 16)});

    }
    const addTodo = () => {
        setTodos([...todos, todo]);
    }
    const deleteTodo = () => {
        if (gridRef.current.getSelectedNodes().length > 0) {
            setTodos(todos.filter((todo, index) => index !== gridRef.current.getSelectedNodes()[0].id))
        }
        else {
            alert('First select a row');
        }
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
                <TextField
                    label="Priority"
                    variant="standard"
                    name="priority" value={todo.priority}
                    onChange={inputChanged}/>
                <Button onClick={addTodo} variant="contained">Add</Button>
                <Button onClick={deleteTodo} variant="contained">Delete</Button>
            </Stack>

            <div>
                <div className="ag-theme-material" style={{height: '700px', width: '40%', margin: 'auto'}}>
                    <AgGridReact
                        ref={gridRef}
                        onGridReady={params => gridRef.current = params.api}
                        rowSelection="single"
                        columnDefs={columns}
                        rowData={todos}>
                    </AgGridReact>
                </div>
            </div>
        </div>
    );
}

export {Todolist}
