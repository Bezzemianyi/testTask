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
  @Input() selectedExperiments: string[] = []; 

  chartData: any = {}; 
  metricNames: string[] = []; 

  chartOptions: ChartOptions = {
    responsive: false,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'linear',
        ticks: {
          color: '#ffffff', 
        },
        grid: {
          color: '#ffffff33', 
        },
        title: {
          display: true,
          text: 'Step',
          color: '#ffffff', 
        },
      },
      y: {
        ticks: {
          color: '#ffffff', 
        },
        grid: {
          color: '#ffffff33', 
        },
        title: {
          display: true,
          text: 'Value',
          color: '#ffffff', 
        },
      },
    },
  };

  constructor(private dataService: DataService) {}

  ngOnChanges() {
    const COLORS = [
      '#e6194b', 
      '#3cb44b', 
      '#ffe119', 
      '#4363d8',
      '#f58231', 
      '#911eb4',
      '#46f0f0', 
      '#f032e6',
      '#bcf60c',
      '#fabebe', 
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
