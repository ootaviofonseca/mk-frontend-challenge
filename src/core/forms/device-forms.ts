import { FormControl, FormGroup, Validators } from '@angular/forms';

/*Form padrao usado para cadastro e edit*/
export function criaFormDispositivo() {
  return new FormGroup({
    name: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    status: new FormControl<'active' | 'inactive'>('active', [Validators.required])
  });
}

export function criaFormStatus() {
  return new FormControl<'todos' | 'active' | 'inactive'>('todos', { nonNullable: true })
}






