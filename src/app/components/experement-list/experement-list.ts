import {
  Component,
  EventEmitter,
  Output,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-experiment-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experement-list.html',
  styleUrl: './experement-list.scss',
})
export class ExperementList implements OnInit, OnDestroy {
  experiments: string[] = [];
  selected: Set<string> = new Set();

  @Output() selectionChanged = new EventEmitter<string[]>();

  private subscription!: Subscription;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadExperiments();

    this.subscription = this.dataService.dataChanged$.subscribe(() => {
      this.loadExperiments();
      this.selected.clear();
      this.selectionChanged.emit([]);
    });
  }

  loadExperiments() {
    this.experiments = this.dataService.getExperiments();
  }

  onToggle(exp: string, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) this.selected.add(exp);
    else this.selected.delete(exp);

    this.selectionChanged.emit(Array.from(this.selected));
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
