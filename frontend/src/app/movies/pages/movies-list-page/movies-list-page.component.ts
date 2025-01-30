import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from "../../components/movie-card/movie-card.component";
import { MoviesApiService } from '../../services/movies-api.service';
import { MovieApi } from '../../interfaces/movieApi.interfaces';
import { MovieFilterComponent } from "../../components/movie-filter/movie-filter.component";

@Component({
  selector: 'movies-list-page',
  imports: [CommonModule, MovieCardComponent, MovieFilterComponent],
  templateUrl: './movies-list-page.component.html',
  styleUrl: './movies-list-page.component.css'
})
export class MoviesListPageComponent {
  public movies: MovieApi[] = [];
  public totalMovies: number = 0;  
  public currentPage: number = 1;
  public limit: number = 10;
  public selectedFilter: string = ''; 
  public selectedValue: string | null = null; 
  constructor(private moviesService: MoviesApiService) {}

  ngOnInit(): void {
    this.loadMovies();  // Cargar películas al inicio
  }

  // Método para cargar películas basadas en el filtro
  loadMovies(): void {
    const offset = (this.currentPage - 1) * this.limit;

    // Si no se ha seleccionado ningún filtro, cargamos todas las películas
    if (!this.selectedFilter || !this.selectedValue) {
      this.moviesService.getMoviesPage(this.limit, offset).subscribe(response => {
        this.movies = response.data;
        this.totalMovies = response.total;
      });
    } else {
      // Cargar películas con filtro
      if (this.selectedFilter === 'genre') {
        this.moviesService.getFilteredMovies(this.selectedValue, '', '', this.limit, offset)
          .subscribe(response => {
            this.movies = response.data;
            this.totalMovies = response.total;
          });
      } else if (this.selectedFilter === 'year') {
        this.moviesService.getFilteredMovies('', this.selectedValue, '', this.limit, offset)
          .subscribe(response => {
            this.movies = response.data;
            this.totalMovies = response.total;
          });
      } else if (this.selectedFilter === 'rating') {
        this.moviesService.getFilteredMovies('', '', this.selectedValue, this.limit, offset)
          .subscribe(response => {
            this.movies = response.data;
            this.totalMovies = response.total;
          });
      }
    }
  }

  onFilterChange(event: { filter: string, value: string | null }): void {
  this.selectedFilter = event.filter;
  this.selectedValue = event.value;
  this.currentPage = 1; // Reiniciar a la primera página al aplicar un filtro
  this.loadMovies();
}


  nextPage(): void {
    if ((this.currentPage * this.limit) < this.totalMovies) {
      this.currentPage++;
      this.loadMovies();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadMovies();
    }
  }
}