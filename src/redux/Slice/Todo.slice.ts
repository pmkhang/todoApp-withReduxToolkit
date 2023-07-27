import { nanoid, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialTodoList } from 'constants/Todo';
import { Todo } from 'types/Todo.type';

interface TodoState {
   todoList: Todo[];
   editingTodo: Todo | null;
   filter: 'all' | 'active' | 'completed';
   filteredTodoList: Todo[];
}

const initialState: TodoState = {
   todoList: initialTodoList,
   editingTodo: null,
   filter: 'all',
   filteredTodoList: initialTodoList,
};

const todoSlice = createSlice({
   name: 'todo',
   initialState,
   reducers: {
      addTodo: {
         reducer: (state, action: PayloadAction<Todo>) => {
            state.todoList.push(action.payload);
         },
         prepare: (todo: Omit<Todo, 'id'>) => ({
            payload: {
               ...todo,
               id: nanoid(),
            },
         }),
      },
      deleteTodo: (state, action: PayloadAction<string>) => {
         const todoID = action.payload;
         state.todoList = state.todoList.filter((todo) => todo.id !== todoID);
      },
      editTodo: (state, action: PayloadAction<{ id: string; title: string }>) => {
         const { id, title } = action.payload;
         const todoToEdit = state.todoList.find((todo) => todo.id === id);
         if (todoToEdit) {
            todoToEdit.title = title;
         }
      },
      toggleCompleteTodo: (state, action: PayloadAction<string>) => {
         const todoID = action.payload;
         const todoStatus = state.todoList.find((todo) => todo.id === todoID);
         if (todoStatus) {
            todoStatus.completed = !todoStatus.completed;
         }
      },
      toggleAllCompleteTodo: (state) => {
         const allCompleted = state.todoList.every((todo) => todo.completed);
         state.todoList.forEach((todo) => {
            todo.completed = !allCompleted;
         });
      },
      clearAllTodoCompleted: (state) => {
         state.todoList = state.todoList.filter((todo) => !todo.completed);
      },
      setFilter: (state, action: PayloadAction<'all' | 'active' | 'completed'>) => {
         state.filter = action.payload;
         if (action.payload === 'all') {
            state.filteredTodoList = state.todoList;
         } else if (action.payload === 'active') {
            state.filteredTodoList = state.todoList.filter((todo) => !todo.completed);
         } else if (action.payload === 'completed') {
            state.filteredTodoList = state.todoList.filter((todo) => todo.completed);
         }
      },
   },
});

export const {
   addTodo,
   deleteTodo,
   editTodo,
   toggleCompleteTodo,
   clearAllTodoCompleted,
   toggleAllCompleteTodo,
   setFilter,
} = todoSlice.actions;
export default todoSlice.reducer;
