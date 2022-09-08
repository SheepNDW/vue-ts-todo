<script setup lang="ts">
import { ref } from 'vue';
import { Toast } from './toast-message';

const emit = defineEmits(['addTodo']);

const todoContent = ref<string>('');

const emitAddTodo = () => {
  if (!todoContent.value.trim()) {
    return Toast({ type: 'warn', text: '請先輸入代辦內容' });
  }

  const todo = {
    content: todoContent.value,
  };

  emit('addTodo', todo);
  todoContent.value = '';
};
</script>

<template>
  <div class="relative flex items-center">
    <input
      type="text"
      name="todo"
      class="w-full text-base text-[#626262] py-4 pr-13 pl-[1.125rem] pb-[1.125rem] rounded-[3rem] border-none outline-none shadow-light"
      v-model="todoContent"
      @keyup.enter="emitAddTodo"
    />
    <button class="add-btn" @click="emitAddTodo">
      <i class="add-btn__plus"></i>
    </button>
  </div>
</template>

<style scoped>
.add-btn {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: linear-gradient(#c0a5f3, #7f95f7);
  border: none;
  outline: none;
  color: white;
  position: absolute;
  right: 0px;
  cursor: pointer;
}

.add-btn__plus {
  display: block;
  width: 100%;
  height: 100%;
  background: linear-gradient(#fff, #fff), linear-gradient(#fff, #fff);
  background-size: 50% 2px, 2px 50%;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
