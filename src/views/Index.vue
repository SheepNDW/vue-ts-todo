<script setup lang="ts">
import TodoHeader from '@/components/TodoHeader.vue';
import TodoAdd from '@/components/TodoAdd.vue';
import TodoFilter from '@/components/TodoFilter.vue';
import TodoList from '@/components/TodoList.vue';
import useTodos from '@/composable/useTodo';
import useFilteredTodos from '@/composable/useFilteredTodo';
import useCheckAuth from '@/composable/useCheckAuth';
import { provide, ref } from 'vue';
import { DeleteTodo, UpdateTodo } from '@/symbols';
import type { Filter } from '@/types';

const filter = ref<Filter>('all');
const { todos, addTodo, deleteTodo, updateTodo, getTodoList } = useTodos();
const { filteredTodos } = useFilteredTodos(todos, filter);
const { checkLogin, checkSuccess } = useCheckAuth();

provide(DeleteTodo, deleteTodo);
provide(UpdateTodo, updateTodo);

checkLogin();
getTodoList();
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
