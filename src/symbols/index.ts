import type { InjectionKey } from 'vue';
import type { DeleteTodoFn, UpdateTodoFn } from '@/types';

export const DeleteTodo = Symbol() as InjectionKey<DeleteTodoFn>;
export const UpdateTodo = Symbol() as InjectionKey<UpdateTodoFn>;
