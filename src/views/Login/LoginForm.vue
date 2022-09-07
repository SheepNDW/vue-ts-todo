<script setup lang="ts">
import { ref, reactive } from 'vue';
import type { UserRes, RegisterUser, LoginUser } from '@/types';
import { Toast } from '@/components/toast-message';
import { http } from '@/utils/request';
import { useRouter } from 'vue-router';

const router = useRouter();

const isLogin = ref<boolean>(true);
const switchMode = () => {
  isLogin.value = !isLogin.value;
};

const loginInfo: LoginUser = reactive({
  email: '',
  password: '',
});

const handleLogin = async () => {
  try {
    const res = await http<UserRes>('POST', '/users/sign_in', { user: loginInfo });
    const token = res.headers.authorization;

    localStorage.setItem('5xcampTodo', token);
    Toast({ type: 'success', text: '歡迎回來!' });
    router.replace('/');

    loginInfo.email = '';
    loginInfo.password = '';
  } catch (err: any) {
    Toast({ text: '帳號或密碼錯誤!' });
  }
};

const signUpInfo: RegisterUser = reactive({
  email: '',
  nickname: '',
  password: '',
});

const handleSignUp = async () => {
  if (signUpInfo.password.length < 6 || signUpInfo.password.indexOf(' ') !== -1) {
    return Toast({ type: 'warn', text: '密碼不得有空格或少於 6 個字元' });
  }

  try {
    const res = await http<UserRes>('POST', '/users', { user: signUpInfo });
    const token = res.headers.authorization;

    localStorage.setItem('5xcampTodo', token);
    Toast({ type: 'success', text: res.data.message });
    router.replace('/');

    signUpInfo.email = '';
    signUpInfo.nickname = '';
    signUpInfo.password = '';
    isLogin.value = true;
  } catch (err: any) {
    Toast({ type: 'error', text: err.response.data.error[0] });
  }
};
</script>

<template>
  <h2 class="font-bold text-3xl text-gray-800" v-if="isLogin">歡迎回來</h2>
  <h2 class="font-bold text-3xl text-gray-800" v-else>註冊帳號</h2>
  <div class="flex items-center justify-center my-5 text-gray-300 space-x-2">
    <span class="h-[1px] w-16 bg-gray-200"></span>
    <span v-if="isLogin">使用者登入</span>
    <span v-else>填寫資料</span>
    <span class="h-[1px] w-16 bg-gray-200"></span>
  </div>
  <template v-if="isLogin">
    <form class="form w-[250px]" @submit.prevent="handleLogin">
      <div class="form__group text-gray-400">
        <input
          type="email"
          class="form__input"
          placeholder="Email address"
          id="email"
          required
          v-model="loginInfo.email"
        />
        <label for="email" class="form__label">Email address</label>
      </div>
      <div class="form__group text-gray-400">
        <input
          type="password"
          class="form__input"
          placeholder="Password"
          id="password"
          required
          v-model="loginInfo.password"
        />
        <label for="password" class="form__label">Password</label>
      </div>
      <div class="form__group flex flex-col justify-center items-center">
        <button class="form__btn">登入</button>
        <span class="cursor-pointer" @click="switchMode">註冊帳號</span>
      </div>
    </form>
  </template>
  <template v-else>
    <form class="form w-[250px]" @submit.prevent="handleSignUp">
      <div class="form__group text-gray-400">
        <input
          type="email"
          class="form__input"
          placeholder="Email address"
          id="email"
          required
          v-model="signUpInfo.email"
        />
        <label for="email" class="form__label">Email address</label>
      </div>
      <div class="form__group text-gray-400">
        <input
          type="text"
          class="form__input"
          placeholder="Nickname"
          id="nickname"
          required
          v-model="signUpInfo.nickname"
        />
        <label for="nickname" class="form__label">Nickname</label>
      </div>
      <div class="form__group text-gray-400">
        <input
          type="password"
          class="form__input"
          placeholder="Password"
          id="password"
          required
          v-model="signUpInfo.password"
        />
        <label for="password" class="form__label">Password</label>
      </div>
      <div class="form__group flex flex-col justify-center items-center">
        <button class="form__btn">註冊帳號</button>
        <span class="cursor-pointer" @click="switchMode">登入</span>
      </div>
    </form>
  </template>
</template>

<style scoped>
.form__group:not(:last-child) {
  margin-bottom: 1rem;
}

.form__input {
  @apply w-full text-lg px-2 py-4 border-none outline-none rounded bg-light-300 placeholder-gray-300 transition-all duration-300 focus:shadow-lg;
  border-bottom: 3px solid transparent;
}
.form__input:focus {
  border-bottom: 3px solid #10b981;
}
.form__input:focus:invalid {
  border-bottom: 3px solid #f97316;
}

.form__label {
  font-size: 1rem;
  font-weight: 700;
  margin-left: 1rem;
  margin-top: 0.7rem;
  display: block;
  transition: all 0.3s;
}

.form__input:placeholder-shown + .form__label {
  opacity: 0;
  visibility: hidden;
  transform: translateY(-3rem);
}

.form__btn {
  @apply px-12 py-3 mb-4 text-light-50 bg-indigo-500 rounded-md cursor-pointer;
  @apply transition-all duration-200 hover:bg-indigo-400 focus:ring-4 focus:ring-indigo-300;
}
</style>
