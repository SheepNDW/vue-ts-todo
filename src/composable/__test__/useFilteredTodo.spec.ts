import { ref } from 'vue';
import type { TodoList } from '@/types';
import { describe, it, expect } from 'vitest';
import useFilteredTodos from '../useFilteredTodo';

describe('useFilteredTodo', () => {
  const mockTodoList = ref<TodoList>([
    { id: 'aaa', content: 'unit test', completed_at: null },
    { id: 'bbb', content: 'vue is so good', completed_at: true },
  ]);

  it('init should return filter and filteredTodos', () => {
    const { filter, filteredTodos } = useFilteredTodos(mockTodoList);
    expect(filter.value).toBe('all');
    expect(filteredTodos.value).toEqual(mockTodoList.value);
  });

  it('if filter has changed filteredTodos should be changed too', () => {
    const { filter, filteredTodos } = useFilteredTodos(mockTodoList);
    filter.value = 'done';
    expect(filteredTodos.value).toEqual([
      { id: 'bbb', content: 'vue is so good', completed_at: true },
    ]);

    filter.value = 'todo';
    expect(filteredTodos.value).toEqual([{ id: 'aaa', content: 'unit test', completed_at: null }]);
  });
});
