import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MovieApi } from '../../interfaces/movieApi.interfaces';
import { MoviesApiService } from '../../services/movies-api.service';

@Component({
  selector: 'movie-page',
  imports: [MatChipsModule,MatCardModule, MatIconModule, CommonModule],
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.css']
})
export class MoviePageComponent implements OnInit {
  public movie: MovieApi | null = null; // Inicializa como null
  public currentSlide: number = 0;

  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesApiService
  ) {}

  ngOnInit(): void {
    const movieId = this.route.snapshot.paramMap.get('id');
    if (movieId) {
      this.moviesService.getMovieById(movieId).subscribe(
        (movie) => (this.movie = movie), // Asigna el valor una vez obtenido
        (err) => console.error('Error al obtener la película:', err)
      );
    }
  }

  // Avanza al siguiente slide
  nextSlide(): void {
    if (this.movie && this.currentSlide < this.movie.posters.length - 1) {
      this.currentSlide++;
    }
  }

  // Retrocede al slide anterior
  previousSlide(): void {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    }
  }
}