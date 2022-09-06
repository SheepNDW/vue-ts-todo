<script setup lang="ts">
import TodoListItem from './TodoListItem.vue';
</script>

<template>
  <div class="grid gap-y-3.5">
    <!-- <transition-group name="list" appear> -->
    <TodoListItem />
    <!-- </transition-group> -->
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
