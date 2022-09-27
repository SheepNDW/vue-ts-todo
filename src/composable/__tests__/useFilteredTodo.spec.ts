import { ref } from 'vue';
import type { Filter, TodoList } from '@/types';
import { describe, it, expect } from 'vitest';
import useFilteredTodos from '../useFilteredTodo';

describe('useFilteredTodo()', () => {
  const mockTodoList = ref<TodoList>([
    { id: 'aaa', content: 'unit test', completed_at: null },
    { id: 'bbb', content: 'vue is so good', completed_at: true },
  ]);

  it('如果 filter 為 "all" 應該回傳初始的列表', () => {
    const testFilter = ref<Filter>('all');
    const { filteredTodos } = useFilteredTodos(mockTodoList, testFilter);

    expect(filteredTodos.value).toEqual([
      { id: 'aaa', content: 'unit test', completed_at: null },
      { id: 'bbb', content: 'vue is so good', completed_at: true },
    ]);
  });

  it('如果 filter 為 "todo" 應該回傳尚未完成的列表', () => {
    const testFilter = ref<Filter>('todo');
    const { filteredTodos } = useFilteredTodos(mockTodoList, testFilter);

    expect(filteredTodos.value).toEqual([{ id: 'aaa', content: 'unit test', completed_at: null }]);
  });

  it('如果 filter 為 "done" 應該回傳已完成的列表', () => {
    const testFilter = ref<Filter>('done');
    const { filteredTodos } = useFilteredTodos(mockTodoList, testFilter);

    expect(filteredTodos.value).toEqual([
      { id: 'bbb', content: 'vue is so good', completed_at: true },
    ]);
  });
});
