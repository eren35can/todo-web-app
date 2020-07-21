import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';

const TodoItem = ({data, checkTodo, removeTodo}) => {

    const [completed, setCompleted] = useState((data || {}).completed ? data.completed : false);

    const _toggleCompleted = (event) => {
        event.preventDefault();
        checkTodo(data._id);
        setCompleted(!completed);
    }

    const item = <button type="button" className="btn btn-lg" onClick={_toggleCompleted} >{
        completed ? <del>{(data ||{}).value}</del> : (data ||{}).value
    }</button>


    return (<div>
            {item}
            <button type='button' onClick={()=>{removeTodo(data._id)}}> Delete </button>
        </div>
    );
};

export default TodoItem;