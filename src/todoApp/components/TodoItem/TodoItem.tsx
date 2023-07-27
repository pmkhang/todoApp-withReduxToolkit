import { Todo } from 'types/Todo.type';
import { useState, useRef, useEffect } from 'react';

interface TodoItemType {
   todo: Todo;
   handleDelete: (todoID: string) => void;
   handleToggleCompleteTodo: (todoID: string) => void;
   filter: 'all' | 'active' | 'completed';
   handleEditTodo: (todoID: string, newTitle: string) => void;
}

export default function TodoItem({
   todo,
   handleDelete,
   handleToggleCompleteTodo,
   filter,
   handleEditTodo,
}: TodoItemType) {
   const [isEditing, setIsEditing] = useState<boolean>(false);
   const [newTitle, setNewTitle] = useState<string>(todo.title);
   const [tempTitle, setTempTitle] = useState<string>(todo.title);
   const editInputRef = useRef<HTMLInputElement>(null);

   const handleStartEdit = () => {
      if (!todo.completed) {
         setTempTitle(todo.title);
         setIsEditing(true);
      }
   };

   useEffect(() => {
      if (isEditing && editInputRef.current) {
         editInputRef.current.focus();
      }
   }, [isEditing]);

   const handleEndEdit = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
         if (newTitle.trim() !== '') {
            handleEditTodo(todo.id, newTitle);
            setIsEditing(false);
         } else if (newTitle.trim() === '') {
            handleDelete(todo.id);
         }
      }
   };

   const handleCancelEdit = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Escape') {
         setNewTitle(tempTitle);
         setIsEditing(false);
      }
   };

   const isTodoVisible =
      filter === 'all' || (filter === 'active' && !todo.completed) || (filter === 'completed' && todo.completed);
   if (!isTodoVisible) {
      return null;
   }

   return (
      <li className={todo.completed ? 'completed' : isEditing ? 'editing' : ''}>
         <div className="view">
            <input
               className="toggle"
               type="checkbox"
               checked={todo.completed}
               onChange={() => handleToggleCompleteTodo(todo.id)}
            />
            <label onDoubleClick={handleStartEdit}>{todo.title}</label>
            <button className="destroy" onClick={() => handleDelete(todo.id)} />
         </div>
         {isEditing ? (
            <input
               ref={editInputRef}
               className="edit"
               value={newTitle}
               onChange={(e) => setNewTitle(e.target.value)}
               onKeyPress={handleEndEdit}
               onBlur={() => {
                  setIsEditing(false);
                  setNewTitle(tempTitle);
               }}
               onKeyDown={handleCancelEdit}
            />
         ) : null}
      </li>
   );
}
