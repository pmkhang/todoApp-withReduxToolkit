import React, { useEffect } from 'react';
import { clearAllTodoCompleted, setFilter } from 'redux/Slice/Todo.slice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';

const StatusTodo = () => {
   const dispatch = useDispatch();
   const todoList = useSelector((state: RootState) => state.Todo.todoList);
   const filter = useSelector((state: RootState) => state.Todo.filter);

   const handleClear = () => {
      dispatch(clearAllTodoCompleted());
   };

   const activeTodoCount = todoList.filter((todo) => !todo.completed).length;

   useEffect(() => {
      dispatch(setFilter('all'));
   }, [dispatch]);

   const handleFilterChange = (newFilter: 'all' | 'active' | 'completed') => {
      dispatch(setFilter(newFilter));
   };

   return (
      <footer className="footer">
         <span className="todo-count">
            <strong>{activeTodoCount}</strong> item{activeTodoCount !== 1 ? 's' : ''} left
         </span>
         <ul className="filters">
            <li>
               <button className={filter === 'all' ? 'selected' : ''} onClick={() => handleFilterChange('all')}>
                  All
               </button>
            </li>
            <li>
               <button className={filter === 'active' ? 'selected' : ''} onClick={() => handleFilterChange('active')}>
                  Active
               </button>
            </li>
            <li>
               <button
                  className={filter === 'completed' ? 'selected' : ''}
                  onClick={() => handleFilterChange('completed')}
               >
                  Completed
               </button>
            </li>
         </ul>
         {todoList.some((todo) => todo.completed) && (
            <button className="clear-completed" onClick={handleClear}>
               Clear completed
            </button>
         )}
      </footer>
   );
};

export default StatusTodo;
