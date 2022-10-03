import { describe, it, expect, vi, beforeEach } from 'vitest';
import useTodos from '../useTodo';
import { http } from '@/utils/request';
import { Toast } from '@/components/toast-message';

let testResponseData: any = {};

vi.mock('@/utils/request', () => ({
  http: vi.fn(() => {
    return {
      data: testResponseData,
    };
  }),
}));

vi.mock('@/components/toast-message', () => ({
  Toast: vi.fn(),
}));

describe('useTodo()', () => {
  beforeEach(() => {
    testResponseData = {};
    vi.clearAllMocks();
  });

  it('新增一項代辦', async () => {
    const todo = { content: 'test' };
    testResponseData = { id: 'testId', content: 'test' };
    const { todos, addTodo } = useTodos();

    await addTodo(todo);

    expect(http).toHaveBeenCalledOnce();
    expect(http).toHaveBeenCalledWith('POST', '/todos', todo);
    expect(Toast).toHaveBeenCalledOnce();
    expect(todos.value).toEqual([{ id: 'testId', content: 'test', completed_at: null }]);
  });

  it('刪除一項代辦', async () => {
    const { todos, deleteTodo } = useTodos();
    todos.value = [
      { id: 'testId', content: 'test', completed_at: null },
      { id: 'testId2', content: 'test2', completed_at: null },
    ];

    await deleteTodo('testId');

    expect(http).toHaveBeenCalledOnce();
    expect(http).toHaveBeenCalledWith('DELETE', '/todos/testId');
    expect(Toast).toHaveBeenCalledOnce();
    expect(todos.value).toEqual([{ id: 'testId2', content: 'test2', completed_at: null }]);
  });

  it('更新一項代辦', async () => {
    const { todos, updateTodo } = useTodos();
    todos.value = [{ id: 'testId', content: 'test', completed_at: null }];

    await updateTodo('testId', 'update!');

    expect(http).toHaveBeenCalledOnce();
    expect(http).toHaveBeenCalledWith('PUT', `/todos/testId`, { todo: { content: 'update!' } });
    expect(Toast).toHaveBeenCalledOnce();
    expect(todos.value).toEqual([{ id: 'testId', content: 'update!', completed_at: null }]);
  });

  it('改變代辦事項狀態', async () => {
    const { todos, toggleTodo } = useTodos();
    todos.value = [{ id: 'testId', content: 'test', completed_at: null }];

    await toggleTodo('testId');

    expect(http).toHaveBeenCalledOnce();
    expect(http).toHaveBeenCalledWith('PATCH', '/todos/testId/toggle');
  });

  it('取得代辦列表', async () => {
    const { todos, getTodoList } = useTodos();
    testResponseData = {
      todos: [
        { id: 'testId', content: 'test', completed_at: null },
        { id: 'testId2', content: 'test2', completed_at: null },
      ],
    };

    await getTodoList();

    expect(http).toHaveBeenCalledOnce();
    expect(http).toHaveBeenCalledWith('GET', '/todos');
    expect(todos.value).toEqual(testResponseData.todos);
  });
});
