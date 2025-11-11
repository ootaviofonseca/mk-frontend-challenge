import { Component } from '@angular/core';
import { Device, DeviceService } from '../../../core/services/device.service';
import { DeviceModalComponent } from '../device-modal/device-modal.component';

@Component({
  selector: 'app-listar-dispotivos',
  standalone: true,
  imports: [DeviceModalComponent],
  templateUrl: './listar-dispositivos.component.html',
  styleUrl: './listar-dispositivos.component.scss'
})
export class ListarDispositivosComponent {

  dispositivos: Device[] = [];
  dispositivoSelecionado: any;

  //Usado paraq carregar todos dispositivos existentes
  carregarDispositivos() {
    this.service.getDevices().subscribe({
      next: (data) => this.dispositivos = data,
      error: (error) => console.error(error),
      complete: () => console.log('Todos itens foram carregados')
    });
  }


  constructor(private service: DeviceService) {
    this.carregarDispositivos();
  }

  removerDispositivo(id: string) {
    if (confirm('Tem certeza que deseja remover este dispositivo?')) {
      this.service.deleteDevice(id).subscribe({
        next: () => {
          console.log(`Dispositivo ${id} removido com sucesso`);
          // Atualiza a lista de dispositivos
          this.carregarDispositivos()

        },
        error: (error) => {
          console.error('Erro ao remover dispositivo:', error);
        }
      });
    }
  }

  editarDispositivo(id: string, dispositivo: Partial<Device>){
    if (confirm('Tem certeza que deseja remover este dispositivo?')) {
        this.service.updateDevice(id,dispositivo).subscribe({
        next: () => {
          alert(`Dispositivo ${id} editado com sucesso`);
          this.carregarDispositivos()
          },
        error: (error) => {
          alert("Erro ao editar dispositivo")
          console.error('Erro ao editar dispositivo:', error);
        }
      });
    }


  }






}

