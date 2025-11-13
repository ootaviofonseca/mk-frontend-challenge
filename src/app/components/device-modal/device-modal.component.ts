import { Component, effect, EventEmitter, Input, Output, signal } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { Device } from '../../../core/services/device.service';
import * as bootstrap from 'bootstrap';
import { criaFormDispositivo } from '../../../core/forms/device-forms';
import { showAlert } from '../../../core/alerts/alert';

@Component({
  selector: 'app-device-modal',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './device-modal.component.html',
  styleUrl: './device-modal.component.scss'
})
export class DeviceModalComponent {

  private _dispositivo = signal<Device | null>(null);

  //Pega o dispositivo
  @Input()
  set dispositivo(value: Device | null) {
    this._dispositivo.set(value);
  }

  dispositivoForm = criaFormDispositivo()


  constructor() {
    // Sempre que o dispositivoSignal muda, atualiza o formulário
    effect(() => {
      const dispositivo = this._dispositivo();
      if (dispositivo) {
        this.dispositivoForm.patchValue({
          name: dispositivo.name,
          status: dispositivo.status,
          type: dispositivo.type
        });

      } else {
        this.dispositivoForm.reset({
          status: 'active'
        });
      }



    });
  }


  fechaModal(){
    const modalEl = document.getElementById('edicaoModal');
      if (modalEl) {
        const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
        modal.hide();
      }

  }


  //Para quando sair do modal sem salvar, voltar ao item corretamente
  voltaAoNormal(){
    const dispositivo = this._dispositivo();
    if (dispositivo) {
      this.dispositivoForm.patchValue({
        name: dispositivo.name,
        status: dispositivo.status,
        type: dispositivo.type
    });}
  }

  //Emite o dispositivo editado
  @Output() salvo = new EventEmitter<{ id: string; dispositivo: Partial<Device> }>();

  //Função para editar o dispositivo
  editarDispositivo(){
    const novoNome = this.dispositivoForm.get('name')?.value;
    const novoStatus = this.dispositivoForm.get('status')?.value;
    const novoTipo = this.dispositivoForm.get('type')?.value;

    if (!novoNome || !novoStatus || !novoTipo) {
      showAlert('Preencha todos os campos antes de salvar.', 'warning');
      this.dispositivoForm.markAllAsTouched();
      this.fechaModal()

      return;
    }

    if(novoNome != this._dispositivo()?.name || novoStatus != this._dispositivo()?.status|| novoTipo != this._dispositivo()?.type){

      const id = this._dispositivo()!.id!;
      const dipositivoEditado: Partial<Device>  = {
        name: novoNome!,
        status: novoStatus!,
        type: novoTipo!,
        lastUpdate: new Date().toISOString().split('.')[0] + 'Z'
      }
      this.salvo.emit({ id, dispositivo: dipositivoEditado });

    }
    this.fechaModal();
  }

}
