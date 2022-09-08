<script setup lang="ts">
import { useRouter } from 'vue-router';
import { http } from '@/utils/request';

const router = useRouter();

const handleSignOut = async () => {
  await http('DELETE', '/users/sign_out');
  localStorage.removeItem('5xcampTodo');
  router.push('/login');
};
</script>

<template>
  <div class="flex items-center">
    <h1 class="mr-auto my-6 text-[28px] text-[#414873]">我的代辦事項</h1>
    <button
      class="px-3 py-1 text-sm text-light-50 bg-purple-300 rounded-full cursor-pointer transition-all duration-300 hover:bg-purple-400 focus:ring-3 focus:ring-purple-200"
      @click="handleSignOut"
    >
      登出
    </button>
  </div>
</template>
