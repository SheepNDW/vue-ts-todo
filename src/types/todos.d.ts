export interface TodoItem {
  id: string;
  content: string;
  completed_at: Date | boolean | null;
  isEdit?: boolean;
}

export type TodoList = TodoItem[];

export type DeleteTodoFn = (id: string) => void;
export type UpdateTodoFn = (id: string, content: string) => void;
