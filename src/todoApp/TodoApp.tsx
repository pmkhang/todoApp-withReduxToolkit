import { useSelector } from 'react-redux';
import CreateTodo from './components/CreateTodo';
import StatusTodo from './components/StatusTodo';
import { RootState } from 'redux/store';
import TodoList from './components/TodoList';

const TodoApp: React.FC = () => {
   const todoList = useSelector((state: RootState) => state.Todo.todoList);

   return (
      <section className="todoapp">
         <CreateTodo />
         {todoList.length > 0 && <TodoList />}
         {todoList.length > 0 && <StatusTodo />}
      </section>
   );
};

export default TodoApp;
