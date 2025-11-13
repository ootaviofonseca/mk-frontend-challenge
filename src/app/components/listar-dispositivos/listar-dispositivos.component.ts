import { Component, computed, effect, signal } from '@angular/core';
import { Device, DeviceService } from '../../../core/services/device.service';
import { DeviceModalComponent } from '../device-modal/device-modal.component';
import { showAlert } from '../../../core/alerts/alert';
import Swal from 'sweetalert2';
import 'sweetalert2/themes/bootstrap-5.css'
import { criaFormStatus } from '../../../core/forms/device-forms';
import { FormControl,ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-listar-dispotivos',
  standalone: true,
  imports: [DeviceModalComponent, ReactiveFormsModule],
  templateUrl: './listar-dispositivos.component.html',
  styleUrl: './listar-dispositivos.component.scss'
})
export class ListarDispositivosComponent {

  showModal = false;

  dispositivos = signal<Device[]>([]);
  dispositivoSelecionado = signal <Device | null>(null);
  contActive =  signal(0);
  contInactive =  signal(0);

  //Cria o filtro e o form
  filtro = signal<'todos' | 'active' | 'inactive'>('todos');
  filtroForm = criaFormStatus();

  //Pega os dispositivos pelo filtro
  dispositivosFiltrados = computed(() => {
    const lista = this.dispositivos();
    const filtroAtual = this.filtro();

    if (filtroAtual === 'todos') return lista;
    return lista.filter(d => d.status === filtroAtual);
  });



  //Atualiza os contadores de acordo com cada modificacao
  atualizarContadores() {
    this.contActive.set(0);
    this.contInactive.set(0);

    this.dispositivos().forEach(dispositivo => {
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
      next: (data) => { this.dispositivos.set(data);
      this.atualizarContadores();
      },
      error: (error) => console.error(error),
      complete: () => console.log('Todos itens foram carregados')
    });

  }

  constructor(private service: DeviceService) {
    this.carregarDispositivos();

    this.filtroForm.valueChanges.subscribe(value => {
      this.filtro.set(value);
    });
    this.service.devicesChanged$.subscribe(() => {
      this.carregarDispositivos();
    });
  }

  //Funcao para remover dispositivo
  removerDispositivo(id: string) {
    Swal.fire({
      theme: 'bootstrap-5-light',
      title: 'Tem certeza?',
      text: 'Esta ação não pode ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#dc3545'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteDevice(id).subscribe({
          next: () => {
            showAlert(`Dispositivo  removido `, 'success');;
            // Atualiza a lista de dispositivos
            this.carregarDispositivos()
          },
          error: (error) => {
            console.error('Erro ao remover dispositivo:', error);
          }
          });
      }
    });

  }

  //Funcao para revocer dispositivo
  editarDispositivo(id: string, dispositivo: Partial<Device>){
    Swal.fire({
      theme: 'bootstrap-5-light',
      title: 'Tem certeza que deseja editar este dispositivo?',
      text: 'Esta ação não pode ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar',

    }).then((result) => {
      if (result.isConfirmed) {
        this.service.updateDevice(id,dispositivo).subscribe({
          next: () => {
            showAlert(`Dispositivo "${dispositivo.name}" editado com sucesso`, 'success');
            this.carregarDispositivos();
            },
          error: () => {
            showAlert("Erro ao editar dispositivo", 'error')

          }
        });
      }
    });

  }


}

