<script setup lang="ts">
import { inject, nextTick, ref } from 'vue';
import { DeleteTodo, UpdateTodo } from '@/symbols';
import type { DeleteTodoFn, TodoItem, UpdateTodoFn } from '@/types';

defineProps<{
  todoItem: TodoItem;
}>();

const deleteTodo = inject(DeleteTodo) as DeleteTodoFn;
const updateTodo = inject(UpdateTodo) as UpdateTodoFn;

const inputRef = ref<HTMLInputElement | null>(null);
const handleEdit = (todoItem: TodoItem) => {
  todoItem.isEdit = true;
  nextTick(() => inputRef.value?.focus());
};

const handleBlur = (todoItem: TodoItem, e: Event) => {
  console.log('updated');

  todoItem.isEdit = false;
  const inputValue = (e.target as HTMLInputElement).value;

  if (!inputValue.trim()) {
    return;
  }

  if (todoItem.content === inputValue) return;
  updateTodo(todoItem.id, inputValue);
};
</script>

<template>
  <div
    class="todo-item flex items-center p-4 text-[#626262] rounded-lg bg-white"
    :class="{ done: todoItem.completed_at }"
  >
    <label class="relative flex items-center mr-auto">
      <input
        class="todo-item__checkbox"
        type="checkbox"
        :checked="!todoItem.completed_at === null || !todoItem.completed_at === false"
        @click="$emit('change-state', $event)"
      />
      <span class="todo-item__check-button"></span>
      <span v-show="!todoItem.isEdit">{{ todoItem.content }}</span>
      <input
        v-show="todoItem.isEdit"
        type="text"
        ref="inputRef"
        :value="todoItem.content"
        @blur="handleBlur(todoItem, $event)"
        @keyup.enter="($event.target as HTMLInputElement).blur()"
      />
    </label>

    <i
      class="i-ic-baseline-mode-edit-outline todo-item__icon mr-2"
      @click="handleEdit(todoItem)"
    ></i>
    <i class="i-ic-baseline-delete-outline todo-item__icon" @click="deleteTodo(todoItem.id)"></i>
  </div>
</template>

<style scoped>
.todo-item__checkbox {
  margin-right: 1rem;
  opacity: 0;
}

.todo-item__check-button {
  position: absolute;
  margin: auto 0;
  width: 18px;
  height: 18px;
}

.todo-item__check-button::before,
.todo-item__check-button::after {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 18px;
  height: 18px;
  border-radius: 50%;
}

.todo-item__check-button::before {
  border: 1px solid #b382f9;
}

.todo-item__check-button::after {
  transition: 0.4s;
  background: #b382f9;
  transform: scale(0.8);
  opacity: 0;
}

.todo-item__checkbox:checked + .todo-item__check-button::after {
  opacity: 1;
}
.todo-item__icon {
  font-size: 1rem;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.4s;
}
.todo-item:hover .todo-item__icon {
  opacity: 1;
}

.done label {
  text-decoration: line-through;
  font-style: italic;
}
</style>
