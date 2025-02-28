import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'sort-movies',
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './sort-movies.component.html',
  styleUrl: './sort-movies.component.css'
})
export class SortMoviesComponent {
  @Output() sortChange: EventEmitter<{ sortBy: string, order: string }> = new EventEmitter();

  public sortBy: string = 'genre';
  public order: string = 'asc';
  public sortOptions = [
    { value: 'genre', display: 'Género' },
    { value: 'releaseYear', display: 'Año de lanzamiento' },
    { value: 'clasification', display: 'Clasificación' }
  ];

  onSortChange(): void {
    if (this.sortOptions.some(opt => opt.value === this.sortBy) && ['asc', 'desc'].includes(this.order)) {
      this.sortChange.emit({
        sortBy: this.sortBy,
        order: this.order
      });
    }
  }
}