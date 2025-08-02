import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartOptions } from 'chart.js';
import { DataService } from '../../services/data';

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './charts.html',
  styleUrl: './charts.scss',
})
export class Charts implements OnChanges {
  @Input() selectedExperiments: string[] = []; // вход: выбранные эксперименты

  chartData: any = {}; // данные для графиков
  metricNames: string[] = []; // названия метрик

  chartOptions: ChartOptions = {
    responsive: false,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'linear',
        ticks: {
          color: '#ffffff', // цвет текста оси X
        },
        grid: {
          color: '#ffffff33', // сетка оси X (прозрачный белый)
        },
        title: {
          display: true,
          text: 'Step',
          color: '#ffffff', // подпись оси X
        },
      },
      y: {
        ticks: {
          color: '#ffffff', // цвет текста оси Y
        },
        grid: {
          color: '#ffffff33', // сетка оси Y
        },
        title: {
          display: true,
          text: 'Value',
          color: '#ffffff', // подпись оси Y
        },
      },
    },
  };

  constructor(private dataService: DataService) {}

  ngOnChanges() {
    const COLORS = [
      '#e6194b', // красный
      '#3cb44b', // зеленый
      '#ffe119', // желтый
      '#4363d8', // синий
      '#f58231', // оранжевый
      '#911eb4', // фиолетовый
      '#46f0f0', // бирюзовый
      '#f032e6', // розово-фиолетовый
      '#bcf60c', // лайм
      '#fabebe', // светло-розовый
    ];
    const grouped = this.dataService.getMetricsByExperiment(
      this.selectedExperiments
    );

    this.metricNames = Object.keys(grouped);

    this.chartData = {};

    for (let metric of this.metricNames) {
      this.chartData[metric] = {
        datasets: Object.keys(grouped[metric]).map((expId, index) => ({
          label: expId,
          data: grouped[metric][expId].filter((_, i) => i % 100 === 0), // downsample
          fill: false,
          borderColor: COLORS[index % COLORS.length],
          backgroundColor: COLORS[index % COLORS.length],
          borderWidth: 2.5,
          pointRadius: 0,
          tension: 0.3,
        })),
      };
    }
  }
}
