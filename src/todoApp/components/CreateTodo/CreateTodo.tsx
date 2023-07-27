import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from 'redux/Slice/Todo.slice';
import { Todo } from 'types/Todo.type';

const initialSate: Todo = {
   id: '',
   title: '',
   completed: false,
};

const CreateTodo = () => {
   const [todoData, setTodoData] = useState<Todo>(initialSate);
   const dispatch = useDispatch();
   const handleAddTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
         if (todoData.title.trim() !== '') {
            const todoDataWithID = { ...todoData };
            dispatch(addTodo(todoDataWithID));
         }
         setTodoData({ ...todoData, title: '' });
      }
   };

   return (
      <header className="header">
         <h1>todos</h1>
         <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            value={todoData.title}
            onKeyDown={handleAddTodo}
            onChange={(e) => setTodoData({ ...todoData, title: e.target.value })}
         />
      </header>
   );
};

export default CreateTodo;
