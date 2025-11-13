import { Component} from '@angular/core';
import {ReactiveFormsModule } from '@angular/forms';
import { criaFormDispositivo } from '../../../core/forms/device-forms';
import { Device, DeviceService } from '../../../core/services/device.service';
import * as bootstrap from 'bootstrap';
import { showAlert } from '../../../core/alerts/alert';

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

  // Função para limpar o formulário
  limpaForm(){
     this.dispositivoForm.reset({
      name: '',
      type: '',
      status: 'active'
    });
  }

  // Função para fechar o modal
  fecharModal() {
    const modalEl = document.getElementById('criaDispositivo');
    const modal = bootstrap.Modal.getInstance(modalEl!);
    modal?.hide();


  }

  // Função para criar um novo dispositivo
  criarDispositivo(){

    if (this.dispositivoForm.invalid) {
      this.dispositivoForm.markAllAsTouched()
      showAlert('Por favor, preencha todos os campos corretamente.', 'error');
      this.fecharModal();
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
        showAlert('Dispositivo criado com sucesso!', 'success');
        this.service.notifyChanges();
        //this.limpaForm();

      },
      error: () => {
        showAlert('Erro ao criar Dispositivo', 'error');
      }
    });

    this.fecharModal();
  }

}


