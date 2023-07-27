// TodoList.tsx

import TodoItem from '../TodoItem';
import { RootState } from 'redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodo, toggleCompleteTodo, toggleAllCompleteTodo, editTodo } from 'redux/Slice/Todo.slice';

export default function TodoList() {
   const todoList = useSelector((state: RootState) => state.Todo.todoList);
   const filter = useSelector((state: RootState) => state.Todo.filter);

   const dispatch = useDispatch();

   const handleDelete = (todoID: string) => {
      dispatch(deleteTodo(todoID));
   };

   const handleToggleCompleteTodo = (todoID: string) => {
      dispatch(toggleCompleteTodo(todoID));
   };

   const handleCompletedAll = () => {
      dispatch(toggleAllCompleteTodo());
   };

   const handleEditTodo = (todoID: string, newTitle: string) => {
      dispatch(editTodo({ id: todoID, title: newTitle }));
   };

   const isAllCompleted = todoList.every((todo) => todo.completed);

   return (
      <section className="main">
         <input
            id="toggle-all"
            className="toggle-all"
            type="checkbox"
            onChange={handleCompletedAll}
            checked={isAllCompleted}
         />
         <label htmlFor="toggle-all">Mark all as complete</label>
         <ul className="todo-list">
            {todoList.map((todo) => (
               <TodoItem
                  todo={todo}
                  key={todo.id}
                  handleDelete={handleDelete}
                  handleToggleCompleteTodo={handleToggleCompleteTodo}
                  handleEditTodo={handleEditTodo}
                  filter={filter}
               />
            ))}
         </ul>
      </section>
   );
}
