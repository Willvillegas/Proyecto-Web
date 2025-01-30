import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MoviesApiService } from '../../services/movies-api.service';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule, MatAutocompleteTrigger } from '@angular/material/autocomplete';

@Component({
  selector: 'movie-filter',
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatAutocompleteModule ],
  templateUrl: './movie-filter.component.html',
  styleUrl: './movie-filter.component.css'
})
export class MovieFilterComponent implements OnInit {
  @Output() filterChanged = new EventEmitter<any>();
  @ViewChild(MatAutocompleteTrigger) autocompleteTrigger: MatAutocompleteTrigger | null = null;

  selectedFilter: string = 'genre'; 
  selectedValue: string | number | null = null; 

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

  constructor(private moviesService: MoviesApiService) {}

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
    this.filterChanged.emit({ filter: this.selectedFilter, value: this.selectedValue });
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



