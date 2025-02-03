import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from "../../components/movie-card/movie-card.component";
import { MoviesApiService } from '../../services/movies-api.service';
import { MovieApi } from '../../interfaces/movieApi.interfaces';
import { MovieFilterComponent } from "../../components/movie-filter/movie-filter.component";
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SortMoviesComponent } from '../../components/sort-movies/sort-movies.component';
import { UserApiService } from '../../../users/services/userApi.service';


@Component({
  selector: 'movies-list-page',
  imports: [CommonModule, MovieCardComponent, MovieFilterComponent, RouterModule, MatIconModule, SortMoviesComponent],
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

  public sortBy: string = 'genre'; // Por defecto, ordenar por género
  public order: string = 'asc'; // Por defecto, en orden ascendente
  public isAdmin: boolean = false;



  constructor(private moviesService: MoviesApiService) { }

  ngOnInit(): void {
    this.loadMovies();  // Cargar películas al inicio
    // Obtener el usuario autenticado y verificar si es administrador
    const user = UserApiService.getUser();
    this.isAdmin = user?.isAdmin || false;
  }

  // Método para cargar películas basadas en el filtro y orden
  loadMovies(): void {
    const offset = (this.currentPage - 1) * this.limit;

    const filterParams = {
      genre: this.selectedFilter === 'genre' ? this.selectedValue || undefined : undefined,
      releaseYear: this.selectedFilter === 'year' ? this.selectedValue || undefined : undefined,
      clasification: this.selectedFilter === 'rating' ? this.selectedValue || undefined : undefined,
      sortBy: this.sortBy,
      order: this.order,
      limit: this.limit,
      offset: offset
    };

    this.moviesService.getMovies(filterParams).subscribe({
      next: (value) => {
        this.movies = value.data;
        this.totalMovies = value.total;
      },
      error(err) {
        console.error('Error al cargar las películas en el componente movies-list-page', err);
      },
    });

    // Si no se ha seleccionado ningún filtro, cargamos todas las películas
    /*if (!this.selectedFilter || !this.selectedValue) {
      this.moviesService.getMoviesPage(this.limit, offset).subscribe(response => {
        const sortedMovies = this.sortMovies(response.data, this.sortBy, this.order);
        this.movies = sortedMovies;
        this.totalMovies = response.total;
      });
    } else {
      // Cargar películas con filtro
      if (this.selectedFilter === 'genre') {
        this.moviesService.getFilteredMovies(this.selectedValue, '', '', this.limit, offset)
          .subscribe(response => {
            const sortedMovies = this.sortMovies(response.data, this.sortBy, this.order);
            this.movies = sortedMovies;
            this.totalMovies = response.total;
          });
      } else if (this.selectedFilter === 'year') {
        this.moviesService.getFilteredMovies('', this.selectedValue, '', this.limit, offset)
          .subscribe(response => {
            const sortedMovies = this.sortMovies(response.data, this.sortBy, this.order);
            this.movies = sortedMovies;
            this.totalMovies = response.total;
          });
      } else if (this.selectedFilter === 'rating') {
        this.moviesService.getFilteredMovies('', '', this.selectedValue, this.limit, offset)
          .subscribe(response => {
            const sortedMovies = this.sortMovies(response.data, this.sortBy, this.order);
            this.movies = sortedMovies;
            this.totalMovies = response.total;
          });
      }
    }*/
  }

  onFilterChange(event: { filter: string, value: string | null }): void {
    // Resetear filtros previos
    this.selectedFilter = event.filter || '';
    this.selectedValue = event.value || '';

    // Validación adicional para números (año)
    if (this.selectedFilter === 'year' && this.selectedValue) {
      if (isNaN(Number(this.selectedValue))) {
        this.selectedValue = '';
      }
    }

    this.currentPage = 1;
    this.loadMovies();
  }

  onSortChange(event: { sortBy: string, order: string }): void {
    this.sortBy = event.sortBy;
    this.order = event.order;
    this.loadMovies();
  }


  sortMovies(movies: MovieApi[], sortBy: string, order: string): MovieApi[] {
    return movies.sort((a, b) => {
      if (sortBy === 'genre') {
        return order === 'asc' ? a.genre.localeCompare(b.genre) : b.genre.localeCompare(a.genre);
      }

      if (sortBy === 'releaseYear') {
        return order === 'asc' ? a.releaseYear - b.releaseYear : b.releaseYear - a.releaseYear;
      }

      if (sortBy === 'clasification') {
        const clasificationOrder = ['G', 'PG', 'PG-13', 'PG-15', 'R', 'NC-17']; // Orden de clasificaciones

        // Obtener el índice de la clasificación
        const indexA = clasificationOrder.indexOf(a.clasification || '');
        const indexB = clasificationOrder.indexOf(b.clasification || '');

        // Si alguna clasificación no existe en el arreglo, asignamos un índice más alto
        if (indexA === -1) return order === 'asc' ? 1 : -1;
        if (indexB === -1) return order === 'asc' ? -1 : 1;

        // Ordenar dependiendo del tipo de orden (ascendente o descendente)
        if (order === 'asc') {
          return indexA - indexB;
        } else {
          return indexB - indexA;
        }
      }

      return 0; // En caso de que no coincida con ninguno de los campos
    });
  }

  nextPage(): void {
    if ((this.currentPage * this.limit) < this.totalMovies) {
      this.currentPage++;
      this.loadMovies();
      window.scrollTo(0, 0);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadMovies();
      window.scrollTo(0, 0);
    }
  }
}