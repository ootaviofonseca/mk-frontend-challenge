import { Component, Input } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms'
@Component({
  selector: 'app-device-modal',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './device-modal.component.html',
  styleUrl: './device-modal.component.scss'
})
export class DeviceModalComponent {
  @Input() dispositivo: any;

  dispositivoForm = new FormGroup({
    nome: new FormControl('', [Validators.required])
  });

  enviarFormulario(){
    console.log('Fomulario: ' + this.dispositivoForm)
  }

}
