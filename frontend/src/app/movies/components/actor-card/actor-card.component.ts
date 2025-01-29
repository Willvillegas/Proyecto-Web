import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { ActorApi } from '../../interfaces/actorApi.interfaces';

@Component({
  selector: 'actor-card',
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    MatIconModule,
  ],
  templateUrl: './actor-card.component.html',
  styleUrl: './actor-card.component.css',
})
export class ActorCardComponent {
  @Input()
  public actor!: ActorApi;

  ngOnInit(): void {
    if (!this.actor) {
      throw new Error('Attribute actor is required');
    }
    console.log('Actor recibido:', this.actor);
  }
  

  get coverImageUrl(): string {
    return this.actor.images.find((img) => img.isCover)?.url || 'assets/default-cover.jpg'; // Imagen por defecto si no hay portada
  }
}
