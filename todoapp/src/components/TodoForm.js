import React, {useState} from "react";

const TodoForm = ({addTodo}) => {

    const [todoText, setTodoText] = useState("");

    const _addTodo = (e) =>{
        e.preventDefault();
        if(todoText !== ""){
            addTodo(todoText);
            setTodoText("");
        }
    };

    return(
        <form onSubmit={_addTodo}>
            Add Todo:
            <input type='text'
                   value={todoText}
                   onChange={(e)=>{setTodoText(e.target.value)}}
                   placeholder="Enter Todo" />
            <input type='submit' value='Add' />
        </form>
    );

}

export default TodoForm;