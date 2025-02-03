import { Component, Input } from '@angular/core';
import { MovieApi } from '../../interfaces/movieApi.interfaces';  // Asegúrate de importar MovieApi
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { UserApiService } from '../../../users/services/userApi.service';

@Component({
  selector: 'movie-card',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
})
export class MovieCardComponent {
  @Input()
  public movie!: MovieApi; 
  public isAdmin: boolean = false;  

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (!this.movie) {
      throw new Error('Attribute movie is required');
    }

    // Obtener el usuario autenticado y verificar si es administrador
    const user = UserApiService.getUser();
    if (user) {
      this.isAdmin = user.isAdmin;
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
  
  moreOptions(movieId: string): void {
    this.router.navigateByUrl(`/movies/${movieId}`);
  }

  get rating(): number {
    return parseFloat(this.movie.rating);  // Convierte el rating a número
  }
  

  // Obtener el texto de clasificación basado en la clasificación almacenada
  getClassificationText(clasification: string): string {
    switch (clasification) {
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

