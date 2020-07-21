import ReactDOM from "react-dom";
import React from "react";
import TodoItem from "../components/TodoItem";

import {render, fireEvent, screen} from "@testing-library/react";
import TodoList from "../components/TodoList";

const _todoData = { _id:"test_id", value:'testTodo', completed: true }

it('renders item component without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TodoItem data={_todoData} checkTodo={()=>{}} removeTodo={()=>{}}/>, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('renders empty item correctly', ()=>{
    const div = document.createElement('div');
    ReactDOM.render(<TodoItem data={null} checkTodo={()=>{}} removeTodo={()=>{}}/>, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('renders item component correctly', ()=>{
    render(<TodoItem data={_todoData} checkTodo={()=>{}} removeTodo={()=>{}}/>);
    expect(screen.queryByText(_todoData.value)).toBeInTheDocument();
});

