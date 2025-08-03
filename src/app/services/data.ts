import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LogEntry } from '../models/log-entry';

@Injectable({ providedIn: 'root' })
export class DataService {
  private rawData: LogEntry[] = [];
  private dataChanged = new BehaviorSubject<void>(undefined);
  dataChanged$ = this.dataChanged.asObservable();

  setRawData(data: any[]) {
    this.rawData = data.map((d) => ({
      experiment_id: d.experiment_id,
      metric_name: d.metric_name,
      step: +d.step,
      value: +d.value,
    }));
    this.dataChanged.next();
  }

  getExperiments(): string[] {
    return Array.from(new Set(this.rawData.map((d) => d.experiment_id)));
  }

  getMetricsByExperiment(experimentIds: string[]): {
    [metricName: string]: {
      [experimentId: string]: { x: number; y: number }[];
    };
  } {
    const grouped: {
      [metricName: string]: {
        [experimentId: string]: { x: number; y: number }[];
      };
    } = {};

    this.rawData
      .filter((d) => experimentIds.includes(d.experiment_id))
      .forEach((d) => {
        if (!grouped[d.metric_name]) grouped[d.metric_name] = {};
        if (!grouped[d.metric_name][d.experiment_id])
          grouped[d.metric_name][d.experiment_id] = [];

        grouped[d.metric_name][d.experiment_id].push({ x: d.step, y: d.value });
      });

    return grouped;
  }
}
