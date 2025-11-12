import { Component} from '@angular/core';
import {ReactiveFormsModule } from '@angular/forms';
import { criaFormDispositivo } from '../../../core/forms/device-forms';
import { Device, DeviceService } from '../../../core/services/device.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-add-dispositivo',
  standalone: true,
  imports: [ ReactiveFormsModule],
  templateUrl: './add-dispositivo.component.html',
  styleUrl: './add-dispositivo.component.scss'
})
export class AddDispositivoComponent {


  dispositivoForm = criaFormDispositivo()

  constructor(private service: DeviceService) {
  }

  limpaForm(){
     this.dispositivoForm.reset({
      name: '',
      type: '',
      status: 'active'
    });
  }
  fecharModal() {
    const modalEl = document.getElementById('criaDispositivo');
    const modal = bootstrap.Modal.getInstance(modalEl!);
    modal?.hide();

    this.limpaForm();
  }

  criarDispositivo(){

    if (this.dispositivoForm.invalid) {
      return;
    }

    const novoDispositivo: Omit<Device, 'id'> = {
      name: this.dispositivoForm.get('name')!.value!,
      type: this.dispositivoForm.get('type')!.value!,
      status: this.dispositivoForm.get('status')!.value!,
      lastUpdate: new Date().toISOString().split('.')[0] + 'Z'
    }

    this.service.createDevice(novoDispositivo).subscribe({
      next: () => {
        alert('Dispositivo criado com sucesso!');
        this.service.notifyChanges();

      },
      error: () => {
        alert('Erro ao criar dispositivo');
      }
    });

    this.fecharModal();


  }

}


