import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import Papa from 'papaparse';
import { DataService } from '../../services/data';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-upload.html',
  styleUrl: './file-upload.scss',
})
export class FileUpload {
  @Output() fileParsed = new EventEmitter<void>();

  constructor(private dataService: DataService) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result: any) => {
        this.dataService.setRawData(result.data);
        this.fileParsed.emit();
      },
    });
  }
}
