import {useRef, useState} from "react";
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
            <div id="add_todo">
                <input name="description" placeholder="Description" type="text" onChange={inputChanged} value={todo.description}/>
                <input name="date" placeholder="Date" type="date" onChange={inputChanged} value={todo.date}/>
                <input name="priority" placeholder="Priority" type="text" onChange={inputChanged} value={todo.priority}/>
                <button onClick={addTodo}>Add</button>
                <button onClick={deleteTodo}>Delete</button>
            </div>

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
