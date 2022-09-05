<script setup lang="ts">
import TodoHeader from '@/components/TodoHeader.vue';
import TodoAdd from '@/components/TodoAdd.vue';
import TodoFilter from '@/components/TodoFilter.vue';
import TodoList from '@/components/TodoList.vue';
</script>

<template>
  <main class="w-[100vw] min-h-[100vh] flex justify-center items-center bg-violet-100">
    <div class="wrapper">
      <TodoHeader />
      <TodoAdd />
      <TodoFilter />
      <TodoList />
    </div>
  </main>
</template>

<style>
* {
  font-family: 'Microsoft JhengHei', 'PingFang TC', 'Arial', 'Helvetica', sans-serif;
}
</style>
