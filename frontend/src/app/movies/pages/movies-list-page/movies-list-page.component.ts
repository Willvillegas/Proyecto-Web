import { Component } from '@angular/core';
import { Movie } from '../../interfaces/movie.interfaces';
import { MoviesService } from '../../services/movies.service';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from "../../components/movie-card/movie-card.component";

@Component({
  selector: 'movies-list-page',
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './movies-list-page.component.html',
  styleUrl: './movies-list-page.component.css'
})
export class MoviesListPageComponent {
  public movies: Movie[] = [];

  constructor(
    private moviesService: MoviesService

  ){}


  ngOnInit(): void {
    this.moviesService.getMovies()
    .subscribe(movies => this.movies = movies);
  }

}

