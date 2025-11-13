import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { Grafico, GraficoService } from '../../../core/services/grafico.service';

Chart.register(...registerables);

@Component({
  selector: 'app-grafico',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.scss']
})
export class GraficoComponent {
  graficos: Grafico[] = [];
  graficoSelecionado?: Grafico;
  chart?: Chart;
  indiceAtual = 0;

  constructor(private service: GraficoService) {
    this.carregarGraficos()
  }

  carregarGraficos() {
    this.service.getGraficos().subscribe({
      next: (data) => {
        this.graficos = data;
        if (data.length > 0) {
          this.indiceAtual = 0;
          this.graficoSelecionado = this.graficos[this.indiceAtual];
          this.renderizarGrafico(this.graficoSelecionado!)

          // Espera o modal abrir para gerar mostrar o grafico 0
          const modal = document.getElementById('graficoModal');
          if (modal) {
            modal.addEventListener('shown.bs.modal', () => {
              this.renderizarGrafico(this.graficoSelecionado!);
            }, { once: true }); //so executa no primeiro grafico
          }
        }
      },
      error: (error) => console.error('Erro ao carregar gráficos:', error),
    });
  }

  renderizarGrafico(grafico: Grafico) {
    if (!grafico) return;
    if (this.chart) this.chart.destroy();

    const ctx = document.getElementById('chartCanvas') as HTMLCanvasElement;
    if (!ctx) return;

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: grafico.readings.map(r => new Date(r.timestamp).toLocaleTimeString()),
        datasets: [{
          label: `${grafico.metric} (${grafico.unit})`.toUpperCase(),
          data: grafico.readings.map(r => r.value),
          borderColor: '#1890abff',
          borderWidth: 2,
          tension: 0.2,
          fill: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            labels: {
              color: '#333',
              font: { size: 14, weight: 'bold' }
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: '#222',
              font: { size: 12 }
            },
            grid: {
              color: '#ccc'
            },
            title: {
              display: true,
              text: 'Tempo (horas)',
              color: '#333',
              font: { size: 14, weight: 'bold' }
            }
          },
          y: {
            ticks: {
              color: '#222',
              font: { size: 12 }
            },
            grid: {
              color: '#ddd'
            },

          }
        }
      }
    });
  }

  anterior() {
    if (this.graficos.length === 0) return;
    this.indiceAtual = (this.indiceAtual - 1 + this.graficos.length) % this.graficos.length;
    this.graficoSelecionado = this.graficos[this.indiceAtual];
    this.renderizarGrafico(this.graficoSelecionado);
  }

  proximo() {
    if (this.graficos.length === 0) return;
    this.indiceAtual = (this.indiceAtual + 1) % this.graficos.length;
    this.graficoSelecionado = this.graficos[this.indiceAtual];
    this.renderizarGrafico(this.graficoSelecionado);
  }
}
