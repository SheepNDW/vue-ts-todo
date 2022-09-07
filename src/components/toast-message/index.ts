import ToastMessage from './Index.vue';
import { h, render } from 'vue';

export type StyleType = 'warn' | 'error' | 'success';

interface Props {
  type?: StyleType;
  text?: string;
  time?: number;
}

/**
 * 提示訊息 - Toast messages
 * @param {Props} options
 * @param options.type - warn 警告(預設) | error 錯誤 | success 成功
 * @param options.text - 提示內容
 * @param options.time - 顯示時間 (預設: 2000)
 */
export function Toast({ type = 'warn', text = '', time = 2000 }: Props) {
  const container = document.createDocumentFragment() as ShadowRoot;
  const vnode = h(ToastMessage, {
    type,
    text,
    time,
    onDestroy() {
      render(null, container);
    },
  });

  render(vnode, container);
  document.body.appendChild(container);
}
