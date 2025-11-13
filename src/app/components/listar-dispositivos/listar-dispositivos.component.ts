import { Component, signal } from '@angular/core';
import { Device, DeviceService } from '../../../core/services/device.service';
import { DeviceModalComponent } from '../device-modal/device-modal.component';
import { showToast } from '../../../core/alerts/alert';

@Component({
  selector: 'app-listar-dispotivos',
  standalone: true,
  imports: [DeviceModalComponent],
  templateUrl: './listar-dispositivos.component.html',
  styleUrl: './listar-dispositivos.component.scss'
})
export class ListarDispositivosComponent {

  showModal = false;

  dispositivos: Device[] = [];
  dispositivoSelecionado: any;
  contActive =  signal(0);
  contInactive =  signal(0);

  //Atualiza os contadores existentes
  atualizarContadores() {
    this.contActive.set(0);
    this.contInactive.set(0);

    this.dispositivos.forEach(dispositivo => {
      if (dispositivo.status === 'active') {
        this.contActive.update(prev => prev + 1);
      } else {
        this.contInactive.update(prev => prev + 1);
      }
    });
  }


  //Usado paraq carregar todos dispositivos
  carregarDispositivos() {
    this.service.getDevices().subscribe({
      next: (data) => { this.dispositivos = data,
      this.atualizarContadores();
      },
      error: (error) => console.error(error),
      complete: () => console.log('Todos itens foram carregados')
    });
  }

  constructor(private service: DeviceService) {
    this.carregarDispositivos();

    this.service.devicesChanged$.subscribe(() => {
      this.carregarDispositivos();
    });
  }

  removerDispositivo(id: string) {
    if (confirm('Tem certeza que deseja remover este dispositivo?')) {
      this.service.deleteDevice(id).subscribe({
        next: () => {
          showToast(`Dispositivo  removido `, 'success');;
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
    if (confirm('Tem certeza que deseja  este dispositivo?')) {
        this.service.updateDevice(id,dispositivo).subscribe({
        next: () => {
          showToast(`Dispositivo ${dispositivo.name} editado com sucesso`, 'success');
          this.dispositivos = this.dispositivos.filter(d => d.id !== id);
          },
        error: (error) => {
          showToast("Erro ao editar dispositivo", 'error')
          console.error('Erro ao editar dispositivo:', error);
        }
      });
    }
  }


}

