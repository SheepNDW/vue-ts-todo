<script setup lang="ts"></script>

<template>
  <div
    class="todo-item flex items-center p-4 text-[#626262] rounded-lg bg-white"
    :class="{ done: false }"
  >
    <label class="relative flex items-center mr-auto">
      <input class="todo-item__checkbox" type="checkbox" :checked="false" />
      <span class="todo-item__check-button"></span>
      <span>{{ 'hello' }}</span>
    </label>

    <i class="i-ic-baseline-mode-edit-outline todo-item__icon mr-2"></i>
    <i class="i-ic-baseline-delete-outline todo-item__icon"></i>
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
