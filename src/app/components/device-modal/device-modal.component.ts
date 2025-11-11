import { Component, effect, EventEmitter, Input, Output, signal } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms'
import { Device, DeviceService } from '../../../core/services/device.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-device-modal',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './device-modal.component.html',
  styleUrl: './device-modal.component.scss'
})
export class DeviceModalComponent {
  private _dispositivo = signal<Device | null>(null);

   @Input()
  set dispositivo(value: Device | null) {
    this._dispositivo.set(value);
  }
  dispositivoForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    status: new FormControl<'active' | 'inactive'>('active', [Validators.required])
  });

  constructor(private service: DeviceService) {
    // Sempre que o dispositivoSignal muda, atualiza o formulário
    effect(() => {
      const dispositivo = this._dispositivo();
      if (dispositivo) {
        this.dispositivoForm.patchValue({
          name: dispositivo.name,
          status: dispositivo.status
        });
      } else {

        //Para cadastro (nenhum dispositivo), limpa o formulário
        this.dispositivoForm.reset({
          status: 'active'
        });
      }

    });
  }


  @Output() salvo = new EventEmitter<{ id: string; dispositivo: Partial<Device> }>();

  editarDispositivo(){
    const novoNome = this.dispositivoForm.get('name')?.value;
    const novoStatus = this.dispositivoForm.get('status')?.value;
    if(novoNome != this._dispositivo()?.name || novoStatus != this._dispositivo()?.status){

      const id = this._dispositivo()!.id!;
      const dipositivoEditado: Partial<Device>  = {
        name: novoNome!,
        status: novoStatus!,
        lastUpdate: new Date().toISOString().split('.')[0] + 'Z'
      }
      this.salvo.emit({ id, dispositivo: dipositivoEditado });

      // Fecha  o modal depois de salvar o elemento editado
      const modalEl = document.getElementById('edicaoModal');
      if (modalEl) {
        const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
        modal.hide();
      }
    }
  }
}
