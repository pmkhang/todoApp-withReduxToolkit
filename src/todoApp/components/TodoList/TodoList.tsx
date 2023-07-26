import React from 'react';
import TodoItem from '../TodoItem';
import { RootState } from 'redux/store';
import { useSelector } from 'react-redux';

export default function TodoList() {
   const todoList = useSelector((state: RootState) => state.Todo.todoList);

   return (
      <ul className="todo-list">
         {todoList.map((todo) => (
            <TodoItem todo={todo} key={todo.id} />
         ))}
      </ul>
   );
}
