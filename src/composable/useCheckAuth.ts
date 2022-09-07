import { http } from '@/utils/request';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default function useCheckAuth() {
  const router = useRouter();
  const checkSuccess = ref(false);

  const checkLogin = async () => {
    try {
      await http('GET', '/check');
      checkSuccess.value = true;
    } catch (err) {
      alert('請先登入!');
      localStorage.removeItem('5xcampTodo');
      router.push('/login');
    }
  };

  return {
    checkSuccess,
    checkLogin,
  };
}
