import { configureStore } from '@reduxjs/toolkit';
import TodoSlice from './Slice/Todo.slice';

const store = configureStore({
   reducer: { Todo: TodoSlice },
   // preloadedState: loadStateFromLocalStorage(),
});

store.subscribe(() => {
   saveStateToLocalStorage(store.getState());
});

function saveStateToLocalStorage(state: any) {
   try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('reduxState', serializedState);
   } catch (error) {
      console.log('Error saving state to localStorage:', error);
   }
}

function loadStateFromLocalStorage() {
   try {
      const serializedState = localStorage.getItem('reduxState');
      return serializedState ? JSON.parse(serializedState) : undefined;
   } catch (error) {
      console.log('Error loading state from localStorage:', error);
      return undefined;
   }
}

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
