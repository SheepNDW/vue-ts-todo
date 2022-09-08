<script setup lang="ts">
import useTodos from '@/composable/useTodo';
import type { TodoItem, TodoList } from '@/types';
import TodoListItem from './TodoListItem.vue';

defineProps<{
  todos: TodoList;
}>();

const { toggleTodo } = useTodos();

const changeState = (todo: TodoItem, e: Event) => {
  todo.completed_at = (e.target as HTMLInputElement).checked;
  toggleTodo(todo.id);
};
</script>

<template>
  <div class="grid gap-y-3.5">
    <transition-group name="list" appear>
      <TodoListItem
        v-for="todo in todos"
        :key="todo.id"
        :todo-item="todo"
        @change-state="changeState(todo, $event)"
      />
    </transition-group>
  </div>
</template>

<style scoped>
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: scale(0.6);
}
.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}
.list-leave-active {
  position: absolute;
}
.list-move {
  transition: all 0.3s ease;
}
</style>
