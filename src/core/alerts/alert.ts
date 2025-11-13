import * as bootstrap from 'bootstrap';
import Swal from 'sweetalert2';

 //  msg - Mensagem a ser exibida
 // type -  ('success' ou 'error')

export function showAlert(msg: string, type: 'success' | 'error' = 'success'): void {

  if(type == 'success' ){
    Swal.fire({
      theme: 'bootstrap-5-light',
      icon:'success',
      title: msg
    })
  } else{
    Swal.fire({
      theme: 'bootstrap-5-light',
      icon:'error',
      title: msg
    })

  }
}
