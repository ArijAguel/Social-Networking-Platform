// editable.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EditableService {
  private readonly STORAGE_KEY = 'isEditable';

  setIsEditable(value: boolean) {
    sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(value));
  }

  getIsEditable(): boolean {
    const storedValue = sessionStorage.getItem(this.STORAGE_KEY);
    return storedValue ? JSON.parse(storedValue) : false; // Default to false if value is not found
  }
}
