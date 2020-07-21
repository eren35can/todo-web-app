import React from 'react';
import ReactDOM from 'react-dom';
import TodoForm from '../components/TodoForm';

import {render, screen, fireEvent} from '@testing-library/react';

it('renders form without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TodoForm />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('renders input label correctly', () =>{
    render(<TodoForm addTodo={()=>{}} />);
    expect(screen.queryByPlaceholderText("Enter Todo")).toBeInTheDocument();
});

it('form input refreshed after submiting', ()=>{
    render(<TodoForm addTodo={()=>{}} />);
    fireEvent.change(screen.queryByPlaceholderText("Enter Todo"),{
        target: {value: 'testTodo'},
    });
    expect(screen.getByPlaceholderText("Enter Todo")).toHaveTextContent("");
});