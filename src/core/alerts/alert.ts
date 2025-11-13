import * as bootstrap from 'bootstrap';

 //  msg - Mensagem a ser exibida
 // type - Tipo do toast ('success' ou 'error')

export function showToast(msg: string, type: 'success' | 'error' = 'success'): void {
  const toastEl = document.querySelector('.toast') as HTMLElement | null;

  if (!toastEl) {
    console.warn('Toast element not found in DOM');
    return;
  }

  // Define a mensagem
  const toastBody = toastEl.querySelector('.toast-body');
  if (toastBody) toastBody.textContent = msg;

  // define o tipo e sai da antigas
  toastEl.classList.remove('text-bg-success', 'text-bg-danger');
  toastEl.classList.add(type === 'success' ? 'text-bg-success' : 'text-bg-danger');

  const toast = new bootstrap.Toast(toastEl);
  toast.show();
}
