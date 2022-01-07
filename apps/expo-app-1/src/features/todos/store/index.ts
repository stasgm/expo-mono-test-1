import { Action, AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { Todo, TodoStatus } from '../types';

import { RootState } from '../../../store';
import { fetchTodos, fetchTodo } from './asyncActions';

type TodosState = {
  status: "loading" | "loaded" | "error" | "idle";
  error: string | null;
  list: Todo[];
};

const initialState = {
  list: [],
  status: 'idle',
  error: null,
} as TodosState;


interface RejectedAction extends Action {
  error: Error
}

type StartedAction = Action;

function isRejectedAction(action: AnyAction): action is RejectedAction {
  return action.type.endsWith('rejected')
}

function isStrtedAction(action: AnyAction): action is StartedAction {
  return action.type.endsWith('pending')
}

// Slice
const slice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    clearStatus(state) {
      state.error = null;
      state.status = 'idle';
    },
    addTodos(state, action: PayloadAction<Todo[]>) {
      state.list = action.payload
    },
    removeTodos(state) {
      state.list = [];
    },
    addTodo: {
      reducer: (state, action: PayloadAction<Todo>) => {
        state.list.unshift(action.payload);
      },
      prepare: (title: string, description?: string) => ({
        payload: {
          id: uuidv4(),
          title,
          description,
          status: TodoStatus.OPEN,
        } as Todo,
      }),
    },
    removeTodo(state, action: PayloadAction<string>) {
      const index = state.list.findIndex((todo) => todo.id === action.payload);
      state.list.splice(index, 1);
    },
    setTodoStatus(state, action: PayloadAction<{ status: TodoStatus; id: string }>) {
      const index = state.list.findIndex((todo) => todo.id === action.payload.id);
      state.list[index].status = action.payload.status;
    },
    editTodo(state, action: PayloadAction<Todo>) {
      const index = state.list.findIndex((todo) => todo.id === action.payload.id);
      state.list[index] = action.payload;
    },
    startLoading(state) {
      state.status = 'loading';
      state.error = null;
    }
  },
  extraReducers: (builder) => {

    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.list = action.payload;
      state.status = 'loaded';
      state.error = null;
    }),
    builder.addCase(fetchTodo.fulfilled, (state, action) => {
      const index = state.list.findIndex((todo) => todo.id === action.payload.id);
      state.list[index] = action.payload
      state.status = 'loaded';
      state.error = null;
    });
    builder.addMatcher(isStrtedAction, (state) => {
      state.status = 'loading';
      state.error = null;
    }),
    builder.addMatcher(isRejectedAction, (state, { error }) => { state.error = error.message; });
  },
});

// selectors
export const selectStatus = (state: RootState) => state.todos.status;
export const selectError = (state: RootState) => state.todos.error;

// Actions
export const { removeTodos, addTodo, removeTodo, editTodo, setTodoStatus, clearStatus } = slice.actions;

// Async Actions
export { fetchTodos, fetchTodo };

// Reducer
export default slice.reducer;
