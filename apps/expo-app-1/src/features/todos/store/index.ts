import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
  list:
    [
      {
        id: uuidv4(),
        title: 'Add api request',
        description: 'for all endpoints',
        status: TodoStatus.OPEN,
      },
      {
        id: uuidv4(),
        title: 'Create add\\edit component',
        description: 'Join edit and add screens in one',
        status: TodoStatus.OPEN,
      },
      {
        id: uuidv4(),
        title: 'Add todo',
        description: 'todo list',
        status: TodoStatus.DONE,
      },
      {
        id: uuidv4(),
        title: 'Create a new project',
        description: 'for testing',
        status: TodoStatus.IN_PROGRESS,
      },
    ] as Todo[],
  status: 'idle',
  error: null,
} as TodosState;

// Slice
const slice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
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
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending || fetchTodo.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    }),
    builder.addCase(fetchTodos.rejected || fetchTodo.rejected, (state, { payload }) => {
      if (payload) {
        state.error = payload.error;
      };
      state.status = 'error';
    }),
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
  },
});

// selectors
export const selectStatus = (state: RootState) => state.todos.status;
export const selectError = (state: RootState) => state.todos.error;

// Actions
export const { removeTodos, addTodo, removeTodo, editTodo, setTodoStatus } = slice.actions;

// Async Actions
export { fetchTodos, fetchTodo };

// Reducer
export default slice.reducer;
