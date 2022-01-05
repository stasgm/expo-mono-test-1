import { apiProvider } from './api.provider';
import { Todo } from '../../store/todos';

const todoProvider = apiProvider<Todo>('tasks');

export const todosApi = {
  getAll() {
    return todoProvider.getAll();
  },
  get(id: string) {
    return todoProvider.get(id);
  },
  post(item: Todo) {
    return todoProvider.get(item);
  },
  patch(item: Todo) {
    return todoProvider.patch(item);
  },
  delete(id: string) {
    return todoProvider.remove(id);
  },
};
