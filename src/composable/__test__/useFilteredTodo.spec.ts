import { ref } from 'vue';
import type { Filter, TodoList } from '@/types';
import { describe, it, expect } from 'vitest';
import useFilteredTodos from '../useFilteredTodo';

describe('useFilteredTodo', () => {
  const mockTodoList = ref<TodoList>([
    { id: 'aaa', content: 'unit test', completed_at: null },
    { id: 'bbb', content: 'vue is so good', completed_at: true },
  ]);

  const filter = ref<Filter>('all');
  const { filteredTodos } = useFilteredTodos(mockTodoList, filter);

  it('init', () => {
    expect(filteredTodos.value).toEqual(mockTodoList.value);
  });

  it('if filter has changed filteredTodos should be changed too', () => {
    filter.value = 'todo';
    expect(filteredTodos.value).toEqual([{ id: 'aaa', content: 'unit test', completed_at: null }]);

    filter.value = 'done';
    expect(filteredTodos.value).toEqual([
      { id: 'bbb', content: 'vue is so good', completed_at: true },
    ]);
  });
});
