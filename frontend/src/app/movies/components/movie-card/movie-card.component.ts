import { Component, Input } from '@angular/core';
import { Movie } from '../../interfaces/movie.interfaces';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';


@Component({
  selector: 'movie-card',
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    MatIconModule,

  ],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css'
})
export class MovieCardComponent {


  @Input()
  public movie!: Movie;

  ngOnInit(): void {
    if(!this.movie){
      throw new Error('Attribute movie is required');
    }
  }

  get coverImageUrl(): string {
    return this.movie.posters.find(img => img.isCover)?.url || 'assets/default-cover.jpg'; // Imagen por defecto si no hay portada
  }
  
}
