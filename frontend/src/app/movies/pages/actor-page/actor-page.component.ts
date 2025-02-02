import { Component } from '@angular/core';
import { ActorApi } from '../../interfaces/actorApi.interfaces';
import { ActivatedRoute } from '@angular/router';
import { ActorsApiService } from '../../services/actors-api.service';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MovieApi } from '../../interfaces/movieApi.interfaces';
import { MoviesApiService } from '../../services/movies-api.service';



@Component({
  selector: 'actor-page',
  imports: [MatIconModule, CommonModule, MatCardModule, MatChipsModule],
  templateUrl: './actor-page.component.html',
  styleUrl: './actor-page.component.css'
})
export class ActorPageComponent {
  public actor: ActorApi | null = null; // Inicializa como null
  public currentSlide: number = 0;
  public movieImages: { [key: string]: string } = {};



  constructor(
    private route: ActivatedRoute,
    private actorsService: ActorsApiService,
    private moviesService: MoviesApiService
  ) {}

  ngOnInit(): void {
    const movieId = this.route.snapshot.paramMap.get('id');
    if (movieId) {
      this.actorsService.getActorById(movieId).subscribe(
        (actor) => {
          this.actor = actor;
          this.loadMoviesImages(); 
        },
        (err) => console.error('Error al obtener la película:', err)
      );
    }
  }

  loadMoviesImages(): void {
    if (this.actor) {
      const movieIds = this.actor.movies
        .map(movie => movie._id)
        .filter((id): id is string => id !== undefined);
  
      movieIds.forEach(id => {
        this.moviesService.getMovieById(id).subscribe(
          (movie) => {
            if (movie._id) {
              const coverImage = movie.posters.find(image => image.isCover);
              if (coverImage) {
                this.movieImages[movie._id] = coverImage.url;
              }
            }
          },
          (err) => console.error('Error al obtener el actor:', err)
        );
      });
    }
  }


  

  // Avanza al siguiente slide
  nextSlide(): void {
    if (this.actor && this.currentSlide < this.actor.images.length - 1) {
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
