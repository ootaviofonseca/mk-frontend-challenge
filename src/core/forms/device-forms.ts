import { FormControl, FormGroup, Validators } from '@angular/forms';

export function criaFormDispositivo() {
  return new FormGroup({
    name: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    status: new FormControl<'active' | 'inactive'>('active', [Validators.required])
  });
}


