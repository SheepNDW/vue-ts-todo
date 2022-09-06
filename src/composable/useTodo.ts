import { ref } from 'vue';
import type { TodoList, AddTodoFn, DeleteTodoFn, UpdateTodoFn } from '@/types';

export default function useTodos() {
  const todos = ref<TodoList>([]);

  const addTodo: AddTodoFn = (todo) => {
    todos.value.unshift(todo);
  };

  const deleteTodo: DeleteTodoFn = (id) => {
    todos.value = todos.value.filter((todo) => todo.id !== id);
  };

  const updateTodo: UpdateTodoFn = (id, content) => {
    todos.value.forEach((todo) => {
      if (todo.id === id) todo.content = content;
    });
  };

  return {
    todos,
    addTodo,
    deleteTodo,
    updateTodo,
  };
}
