import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-file-drag-drop';
  @ViewChild('fileInput') fileInput!: ElementRef;
  fileOver = false;
  file: any;

  dropHandler(event: any): void {
    event.preventDefault();
    this.fileOver = false;
    for (const file of event.dataTransfer.files) {
      this.addFile(file);
    }
  }

  dragOverHandler(event: any): void {
    this.fileOver = true;
    if (this.hasFiles(event)) {
      event.preventDefault();
    }
  }

  dragLeaveHandler(): void {
    this.fileOver = false;
  }

  // only react to actual files being dragged
  dragEnterHandler(event: any): any {
    event.preventDefault();
    if (!this.hasFiles(event)) {
      return;
    }
  }

  addFile(file: any): void {
    this.file = file;
    this.fileInput.nativeElement.value = '';
  }

  fileChange(event: any): void {
    for (const file of event.target.files) {
      this.addFile(file);
    }
  }

  // use to check if a file is being dragged
  hasFiles(event: any): any {
    const dt = event.dataTransfer;
    return dt.types && (dt.types.indexOf ? dt.types.indexOf('Files') !== -1 : dt.types.contains('Files'));
  }

}
