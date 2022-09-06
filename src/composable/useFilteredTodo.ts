import type { TodoList } from '@/types';
import { ref, computed } from 'vue';
import type { Ref } from 'vue';

export default function useFilteredTodos(todos: Ref<TodoList>) {
  const filter = ref<'all' | 'done' | 'todo'>('all');
  const filteredTodos: Ref<TodoList> = computed(() => {
    switch (filter.value) {
      case 'done':
        return todos.value.filter((todo) => todo.completed_at);
      case 'todo':
        return todos.value.filter((todo) => !todo.completed_at);
      default:
        return todos.value;
    }
  });

  return {
    filter,
    filteredTodos,
  };
}
