import { Component, Input } from '@angular/core';
import { Movie } from '../../interfaces/movie.interfaces';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'movie-card',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule
  ],
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
})
export class MovieCardComponent {
  @Input()
  public movie!: Movie;

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (!this.movie) {
      throw new Error('Attribute movie is required');
    }
  }

  get coverImageUrl(): string {
    return (
      this.movie.posters.find((img) => img.isCover)?.url || 'assets/default-cover.jpg'
    );
  }

  // Navegar a la página de edición de la película
  editMovie(movieId: string): void {
    this.router.navigateByUrl(`/movies/edit/${movieId}`);
  }

  // Mostrar más información de la película
  moreOptions(movieId: string): void {
    this.router.navigateByUrl(`/movies/${movieId}`);
    console.log('Más opciones para la película', movieId);
  }

  // Obtener el texto de clasificación basado en la clasificación almacenada
  getClassificationText(classification: string): string {
    switch (classification) {
      case 'G':
        return 'Todo público';
      case 'PG':
        return 'Supervisión de padres';
      case 'PG-13':
        return 'Mayores de 13 años';
      case 'R':
        return 'Mayores de 17 años (con adulto)';
      case 'NC-17':
        return 'Solo adultos';
      default:
        return 'Clasificación desconocida';
    }
  }
}
