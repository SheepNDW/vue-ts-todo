<script setup lang="ts">
import { onMounted, ref, type PropType } from 'vue';
import type { StyleType } from './index';

const props = defineProps({
  type: {
    type: String as PropType<StyleType>,
    default: 'warn', // warn 警告 error 錯誤 success 成功
  },
  text: {
    type: String,
    default: '',
  },
  time: {
    type: Number,
  },
  onDestroy: {
    type: Function,
  },
});

const style = {
  warn: {
    icon: 'i-ic-round-error',
    color: '#E6A23C',
    borderLeft: '8px solid #E6A23C',
  },
  error: {
    icon: 'i-ic-round-cancel',
    color: '#F56C6C',
    borderLeft: '8px solid #F56C6C',
  },
  success: {
    icon: 'i-ic-round-check-circle',
    color: '#67C23A',
    borderLeft: '8px solid #67C23A',
  },
};

const isVisible = ref(false);
onMounted(() => (isVisible.value = true));
setTimeout(() => (isVisible.value = false), props.time);
</script>

<template>
  <transition name="down" @after-leave="onDestroy">
    <div class="toast-message" :style="style[type]" v-show="isVisible">
      <i class="toast-message__icon" :class="[style[type].icon]"></i>
      <span class="toast-message__text">{{ text }}</span>
    </div>
  </transition>
</template>

<style scoped>
.toast-message {
  position: fixed;
  top: 35px;
  left: 50%;
  display: flex;
  align-items: center;
  width: 300px;
  height: 60px;
  padding: 0 16px;
  margin-left: -150px;
  background-color: #fff;
  border: 1px solid #e4e4e4;
  border-radius: 7px;
  font-size: 1rem;
}
.toast-message__icon {
  color: inherit;
  font-size: 1.5rem;
}
.toast-message__text {
  color: #414873;
  font-size: inherit;
  margin-left: 0.5rem;
}

.down-enter-from,
.down-leave-to {
  transform: translateY(-95px);
  opacity: 0;
}
.down-enter-active {
  transition: all 0.5s;
}
.down-enter-to {
  transform: none;
  opacity: 1;
}
</style>
