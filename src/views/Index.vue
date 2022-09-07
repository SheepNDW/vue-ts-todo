<script setup lang="ts">
import TodoHeader from '@/components/TodoHeader.vue';
import TodoAdd from '@/components/TodoAdd.vue';
import TodoFilter from '@/components/TodoFilter.vue';
import TodoList from '@/components/TodoList.vue';
import useTodos from '@/composable/useTodo';
import { provide } from 'vue';
import { DeleteTodo, UpdateTodo } from '@/symbols';
import useFilteredTodos from '@/composable/useFilteredTodo';
import useCheckAuth from '@/composable/useCheckAuth';

const { todos, addTodo, deleteTodo, updateTodo } = useTodos();
const { filter, filteredTodos } = useFilteredTodos(todos);
const { checkLogin, checkSuccess } = useCheckAuth();

provide(DeleteTodo, deleteTodo);
provide(UpdateTodo, updateTodo);

checkLogin();
</script>

<template>
  <main
    v-if="checkSuccess"
    class="w-[100vw] min-h-[100vh] flex justify-center items-center bg-violet-100"
  >
    <div class="wrapper">
      <TodoHeader />
      <TodoAdd @add-todo="addTodo" />
      <TodoFilter :selected="filter" @change-filter="filter = $event" />
      <TodoList :todos="filteredTodos" />
    </div>
  </main>
</template>

<style>
* {
  font-family: 'Microsoft JhengHei', 'PingFang TC', 'Arial', 'Helvetica', sans-serif;
}
</style>
