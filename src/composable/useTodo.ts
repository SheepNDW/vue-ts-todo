import { ref } from 'vue';
import type { TodoList, DeleteTodoFn, UpdateTodoFn, TodoItem } from '@/types';
import { Toast } from '@/components/toast-message';
import { http } from '@/utils/request';

export default function useTodos() {
  const todos = ref<TodoList>([]);

  const addTodo = async (todo: { content: string }) => {
    const res = await http<{ id: string; content: string }>('POST', '/todos', todo);
    const newTodo: TodoItem = { ...res.data, completed_at: null };
    todos.value.unshift(newTodo);
    Toast({ type: 'success', text: '添加成功！' });
  };

  const deleteTodo: DeleteTodoFn = async (id) => {
    todos.value = todos.value.filter((todo) => todo.id !== id);
    await http('DELETE', `/todos/${id}`);
    Toast({ type: 'success', text: '已刪除' });
  };

  const updateTodo: UpdateTodoFn = async (id, content) => {
    todos.value.forEach((todo) => {
      if (todo.id === id) todo.content = content;
    });
    await http('PUT', `/todos/${id}`, { todo: { content } });
    Toast({ type: 'success', text: '已更新代辦內容' });
  };

  const toggleTodo = async (id: string) => {
    await http('PATCH', `/todos/${id}/toggle`);
  };

  const getTodoList = async () => {
    const res = await http<{ todos: TodoList }>('GET', '/todos');
    todos.value = res.data.todos;
  };

  return {
    todos,
    addTodo,
    deleteTodo,
    updateTodo,
    toggleTodo,
    getTodoList,
  };
}
