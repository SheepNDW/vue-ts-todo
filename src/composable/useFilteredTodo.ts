import type { TodoList, Filter } from '@/types';
import { computed } from 'vue';
import type { Ref } from 'vue';

/**
 * 取得分類後的代辦清單
 * @param todos - 欲分類的代辦列表
 * @param filter - 欲顯示的分類 ('all' | 'todo' | 'done')
 * @returns filteredTodos
 */
export default function useFilteredTodos(todos: Ref<TodoList>, filter: Ref<Filter>) {
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
    filteredTodos,
  };
}
