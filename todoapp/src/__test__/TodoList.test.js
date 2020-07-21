import {render, screen} from "@testing-library/react";
import ReactDOM from "react-dom";
import React from "react";
import TodoList from "../components/TodoList";

const _todoData = { _id:"test_id", value:'testTodo', completed: true }

it('renders list without crashing', () => {
    const div = document.createElement('div');
    render(<TodoList data={[_todoData]} checkTodo={()=>{}} removeTodo={()=>{}}/>);
    ReactDOM.unmountComponentAtNode(div);
});

it('renders empty list correctly', ()=>{
    const div = document.createElement('div');
    ReactDOM.render(<TodoList data={null} checkTodo={()=>{}} removeTodo={()=>{}}/>, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('renders list correctly', ()=>{
    render(<TodoList data={[_todoData]} checkTodo={()=>{}} removeTodo={()=>{}}/>);
    expect(screen.queryByText(_todoData.value)).toBeInTheDocument();
});
