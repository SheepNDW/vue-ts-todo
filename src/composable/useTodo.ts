import { ref } from 'vue';
import type { TodoList, AddTodoFn, DeleteTodoFn, UpdateTodoFn } from '@/types';
import { Toast } from '@/components/toast-message';
import { http } from '@/utils/request';

export default function useTodos() {
  const todos = ref<TodoList>([]);

  const addTodo: AddTodoFn = (todo) => {
    todos.value.unshift(todo);
    Toast({ type: 'success', text: '添加成功！' });
  };

  const deleteTodo: DeleteTodoFn = (id) => {
    todos.value = todos.value.filter((todo) => todo.id !== id);
    Toast({ type: 'success', text: '已刪除' });
  };

  const updateTodo: UpdateTodoFn = (id, content) => {
    todos.value.forEach((todo) => {
      if (todo.id === id) todo.content = content;
    });
    Toast({ type: 'success', text: '已更新代辦內容' });
  };

  const getTodoList = async () => {
    const res = await http<TodoList>('GET', '/todos');
    todos.value = res.data;
  };

  return {
    todos,
    addTodo,
    deleteTodo,
    updateTodo,
    getTodoList,
  };
}
