import { nanoid, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialTodoList } from 'constants/Todo';
import { Todo } from 'types/Todo.type';

interface TodoState {
   todoList: Todo[];
   editingTodo: Todo | null;
}

const initialState: TodoState = {
   todoList: initialTodoList,
   editingTodo: null,
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
   },
});

export const { addTodo } = todoSlice.actions;
export default todoSlice.reducer;
