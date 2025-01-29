import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from "../../components/movie-card/movie-card.component";
import { MoviesApiService } from '../../services/movies-api.service';
import { MovieApi } from '../../interfaces/movieApi.interfaces';

@Component({
  selector: 'movies-list-page',
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './movies-list-page.component.html',
  styleUrl: './movies-list-page.component.css'
})
export class MoviesListPageComponent {
  public movies: MovieApi[] = [];
  public totalMovies: number = 0;  // Total de películas disponibles
  public currentPage: number = 1;
  public limit: number = 10;

  constructor(
    private moviesService: MoviesApiService
  ) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    const offset = (this.currentPage - 1) * this.limit;
    this.moviesService.getMoviesPage(this.limit, offset)
      .subscribe(response => {
        this.movies = response.data;
        this.totalMovies = response.total;
      });
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


