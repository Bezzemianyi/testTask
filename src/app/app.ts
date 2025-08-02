import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUpload } from './components/file-upload/file-upload';
import { ExperementList } from './components/experement-list/experement-list';
import { Charts } from './components/charts/charts';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FileUpload, ExperementList, Charts, RouterOutlet],
  templateUrl: './app.html',
})
export class App {
  selectedExperiments: string[] = [];

  onSelectionChanged(selected: string[]) {
    this.selectedExperiments = selected; // обновляем выбранные эксперименты
  }

  onFileParsed() {
    this.selectedExperiments = []; // сбрасываем выбор после загрузки нового файла
  }
}
