import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MovieApi } from '../../interfaces/movieApi.interfaces';
import { MoviesApiService } from '../../services/movies-api.service';
import { ActorsApiService } from '../../services/actors-api.service';

@Component({
  selector: 'movie-page',
  imports: [MatChipsModule,MatCardModule, MatIconModule, CommonModule],
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.css']
})
export class MoviePageComponent implements OnInit {
  public movie: MovieApi | null = null;
  public currentSlide: number = 0;
  public currentActorSlide: number = 0;
  public actorsImages: { [key: string]: string } = {};
  public actorsPerPage = 5;


  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesApiService,
    private actorsService: ActorsApiService
  ) {}

  ngOnInit(): void {
    const movieId = this.route.snapshot.paramMap.get('id');
    if (movieId) {
      this.moviesService.getMovieById(movieId).subscribe(
        (movie) => {
          this.movie = movie;
          this.loadActorImages();
        },
        (err) => console.error('Error al obtener la película:', err)
      );
    }
  }

  loadActorImages(): void {
    if (this.movie) {
      const actorIds = this.movie.cast
        .map(actor => actor._id)
        .filter((id): id is string => id !== undefined);
  
      actorIds.forEach(id => {
        this.actorsService.getActorById(id).subscribe(
          (actor) => {
            if (actor._id) {
              const coverImage = actor.images.find(image => image.isCover);
              if (coverImage) {
                this.actorsImages[actor._id] = coverImage.url;
              }
            }
          },
          (err) => console.error('Error al obtener el actor:', err)
        );
      });
    }
  }

  // Métodos para el carrusel de películas
  nextSlide(): void {
    if (this.movie && this.currentSlide < this.movie.posters.length - 1) {
      this.currentSlide++;
    }
  }

  previousSlide(): void {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    }
  }

  // Métodos para el carrusel de actores
  nextActorSlide(): void {
    if (this.movie && this.currentActorSlide < this.movie.cast.length - this.actorsPerPage) {
      this.currentActorSlide++;
    }
  }

  previousActorSlide(): void {
    if (this.currentActorSlide > 0) {
      this.currentActorSlide--;
    }
  }
}

