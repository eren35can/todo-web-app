import 'bootstrap/dist/css/bootstrap.min.css';

import React, {useCallback, useEffect, useState} from 'react';
import './App.css';

import TodoList from '../src/components/TodoList';
import TodoForm from '../src/components/TodoForm';

const App = () => {

    const [todos, setTodos] = useState([]);

    const addTodo = (input) => {
        let reqOpt = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ value: input })
        };
        fetch('http://localhost:8080/api/todos', reqOpt)
            .then(async response => {
                const newTodo = await response.json();
                setTodos([newTodo, ...todos]);});
    };

    const checkTodo = (todoId) => {
        let reqOpt = {
            method: 'PUT',
        };
        fetch('http://localhost:8080/api/todos/'+todoId.toString(), reqOpt).then(()=>{
            setTodos(
                todos.map(todo => {
                    if (todo.id === todoId) {
                        return {
                            ...todo,
                            completed: !todo.completed
                        };
                    }
                    return todo;
                })
            );
        })
    };

    const removeTodo = (todoId) => {
        let reqOpt = {
            method: 'DELETE',
        };
        fetch('http://localhost:8080/api/todos/'+todoId.toString(), reqOpt).then(()=>{
            setTodos(todos.filter((todo)=> todo._id !== todoId))
        })
    };

    const renderTodoList = useCallback( () => {
          if(todos.length <= 0){
              return <div> No Todos </div>
          }
            return <TodoList data={todos} checkTodo={checkTodo} removeTodo={removeTodo}/>
    }, [todos]);

    useEffect(()=>{
        fetch('http://localhost:8080/api/todos')
            .then(response=> response.json())
            .then(res => {
                console.log(res.body);
                res && setTodos(res);
            });
    },[]);


    return (
    <div className="App">
        <TodoForm addTodo={addTodo}/>
        {renderTodoList()}
    </div>
    );
}

export default App;