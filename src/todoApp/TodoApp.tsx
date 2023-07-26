import CompleteTodoToggle from './components/CompleteTodoToggle';
import CreateTodo from './components/CreateTodo';
import StatusTodo from './components/StatusTodo/StatusTodo';

const TodoApp: React.FC = () => {
   return (
      <section className="todoapp">
         <CreateTodo />
         <CompleteTodoToggle />
         <StatusTodo />
      </section>
   );
};

export default TodoApp;
