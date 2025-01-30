import { Component } from '@angular/core';
import { ActorApi } from '../../interfaces/actorApi.interfaces';
import { ActivatedRoute } from '@angular/router';
import { ActorsApiService } from '../../services/actors-api.service';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'actor-page',
  imports: [MatIconModule, CommonModule, MatCardModule, MatChipsModule],
  templateUrl: './actor-page.component.html',
  styleUrl: './actor-page.component.css'
})
export class ActorPageComponent {
  public actor: ActorApi | null = null; // Inicializa como null
  public currentSlide: number = 0;


  constructor(
    private route: ActivatedRoute,
    private actorsService: ActorsApiService
  ) {}

  ngOnInit(): void {
    const movieId = this.route.snapshot.paramMap.get('id');
    if (movieId) {
      this.actorsService.getActorById(movieId).subscribe(
        (actor) => (this.actor = actor), // Asigna el valor una vez obtenido
        (err) => console.error('Error al obtener la película:', err)
      );
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
