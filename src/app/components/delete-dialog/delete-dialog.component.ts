import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent {
  @Input() visible = false;
  @Input() message :string|null= null;
  @Output() closeModal = new EventEmitter<void>();
  @Output() cofirmDelete = new EventEmitter<void>();
  close() {
    this.visible = false;
    this.closeModal.emit();
  }
  confirm() {
    this.cofirmDelete.emit();
    this.close();
  }
}
