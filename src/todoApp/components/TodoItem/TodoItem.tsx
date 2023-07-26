import { Todo } from 'types/Todo.type';

interface TodoItemType {
   todo: Todo;
}

export default function TodoItem({ todo }: TodoItemType) {
   return (
      <li className={todo.completed ? 'completed' : ''}>
         <div className="view">
            <input className="toggle" type="checkbox" defaultChecked={todo.completed} />
            <label>{todo.title}</label>
            <button className="destroy" />
         </div>
         <input className="edit" defaultValue={todo.title} />
      </li>
   );
}
