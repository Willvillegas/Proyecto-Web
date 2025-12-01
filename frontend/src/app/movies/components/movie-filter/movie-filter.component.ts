
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MoviesApiService } from '../../services/movies-api.service';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule, MatAutocompleteTrigger } from '@angular/material/autocomplete';

@Component({
  selector: 'movie-filter',
  imports: [FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatAutocompleteModule],
  templateUrl: './movie-filter.component.html',
  styleUrl: './movie-filter.component.css'
})
export class MovieFilterComponent implements OnInit {
  @Output() filterChanged = new EventEmitter<{
    filter: string | null;
    value: string | null;
  }>();
  @ViewChild(MatAutocompleteTrigger) autocompleteTrigger: MatAutocompleteTrigger | null = null;

  selectedFilter: string | null = null;
  selectedValue: string | null = null;

  genres: string[] = ['Action', 'Adventure', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Romance'];
  //ratings: string[] = []; 
  ratings: string[] = [
    "G",
    "PG",
    "PG-13",
    "PG-15",
    "R",
    "NC-17"
  ];

  years: number[] = [];
  private previousFilter: string | null = null;

  constructor(private moviesService: MoviesApiService) { }

  ngOnInit(): void {
    this.loadFilterOptions();
  }

  loadFilterOptions(): void {
    // Obtenemos las clasificaciones dinámicas
    this.moviesService.getUniqueFilterOptions().subscribe(data => {
      this.ratings = data.ratings;
    });
  }

  onFilterChange() {
    // Emitimos el filtro cuando el valor cambie
    // Si se selecciona "Sin filtro"
    if (this.selectedFilter === '') {
      this.selectedFilter = null;
      this.selectedValue = null;
    }

    this.filterChanged.emit({
      filter: this.selectedFilter,
      value: this.selectedValue?.toString() || null
    });// Si cambió el tipo de filtro, resetear el valor
    if (this.selectedFilter !== this.previousFilter) {
      this.selectedValue = null;
      this.previousFilter = this.selectedFilter;
    }

    // Solo emitir si hay un valor válido o se removió el filtro
    if (this.selectedValue || this.selectedFilter === null) {
      this.filterChanged.emit({
        filter: this.selectedFilter,
        value: this.selectedValue?.toString() || null
      });
    }
  }

  onEnterPress() {
    // Emitimos el filtro cuando el usuario presiona Enter
    this.filterChanged.emit({ filter: this.selectedFilter, value: this.selectedValue });

    // Cerrar el panel del autocomplete manualmente
    if (this.autocompleteTrigger) {
      this.autocompleteTrigger.closePanel();
    }
  }

  get filterOptions() {
    switch (this.selectedFilter) {
      case 'genre':
        return this.genres;
      case 'rating':
        return this.ratings;
      default:
        return [];
    }
  }
}



