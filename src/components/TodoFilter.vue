<script setup lang="ts">
defineProps<{
  selected: 'all' | 'done' | 'todo';
}>();

type FilterItem = {
  label: '全部' | '已完成' | '未完成';
  value: 'all' | 'done' | 'todo';
};

const filters: FilterItem[] = [
  { label: '全部', value: 'all' },
  { label: '已完成', value: 'done' },
  { label: '未完成', value: 'todo' },
];
</script>

<template>
  <div class="filters">
    <span
      class="filter"
      :class="{ active: selected === filter.value }"
      v-for="filter in filters"
      :key="filter.value"
      @click="$emit('change-filter', filter.value)"
    >
      {{ filter.label }}
    </span>
  </div>
</template>

<style scoped>
.filters {
  display: flex;
  margin: 24px 2px;
  color: #c0c2ce;
  font-size: 14px;
}

.filter {
  margin-right: 14px;
  transition: 0.5s;
  cursor: pointer;
}

.filter.active {
  color: #6b729c;
  transform: scale(1.2);
}
</style>
