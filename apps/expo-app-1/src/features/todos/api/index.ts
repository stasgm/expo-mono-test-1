import { apiProvider } from '../../../services/api/api';
import { Todo } from '../types';

const todoProvider = apiProvider<Todo>('tasks');

export const todosApi = {
  getAll() {
    return todoProvider.getAll();
  },
  get(id: string) {
    return todoProvider.get(id);
  },
  post(item: Todo) {
    return todoProvider.post(item);
  },
  patch(id: string, item: Todo) {
    return todoProvider.patch(id, item);
  },
  delete(id: string) {
    return todoProvider.remove(id);
  },
};
