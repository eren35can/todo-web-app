import React from "react";
import TodoItem from "./TodoItem";
import 'bootstrap/dist/css/bootstrap.css';

const TodoList = ({data, checkTodo, removeTodo}) => {

    return (
        <div className="panel panel-default">
            <div className="panel-heading">Todo List</div>
            <div className="panel-body">
                {data && data.map(item=>
                    <TodoItem
                        key = {item._id}
                        data = {item}
                        checkTodo = {checkTodo}
                        removeTodo = {removeTodo}
                    />
                )}
            </div>
        </div>
    );
}


export default TodoList;