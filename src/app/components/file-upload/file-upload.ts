import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import Papa from 'papaparse';
import { DataService } from '../../services/data';

@Component({
  selector: 'app-file-upload',
  standalone: true, // standalone-компонент (без NgModule)
  imports: [CommonModule], // подключаем CommonModule (для ngIf, ngFor и т.д.)
  templateUrl: './file-upload.html',
  styleUrl: './file-upload.scss',
})
export class FileUpload {
  @Output() fileParsed = new EventEmitter<void>(); // событие, которое оповещает родителя, что файл распарсен

  constructor(private dataService: DataService) {} // инжектим сервис для передачи данных

  onFileSelected(event: any) {
    const file = event.target.files[0]; // получаем первый выбранный файл

    Papa.parse(file, {
      // парсим CSV с помощью библиотеки PapaParse
      header: true, // первая строка — заголовки
      skipEmptyLines: true, // пропускаем пустые строки
      complete: (result: any) => {
        // по завершении парсинга вызывается callback
        this.dataService.setRawData(result.data); // передаём распарсенные данные в сервис
        this.fileParsed.emit(); // уведомляем родительский компонент
      },
    });
  }
}
