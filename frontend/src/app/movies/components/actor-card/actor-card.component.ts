import { Component, Input } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { Router } from '@angular/router';
import { ActorApi } from '../../interfaces/actorApi.interfaces';
import { UserApiService } from '../../../users/services/userApi.service';

@Component({
  selector: 'actor-card',
  imports: [
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    MatIconModule
],
  templateUrl: './actor-card.component.html',
  styleUrl: './actor-card.component.css',
})
export class ActorCardComponent {
  @Input()
  public actor!: ActorApi;
  public isAdmin: boolean = false; 


  constructor(private router: Router) {}

  ngOnInit(): void {
    if (!this.actor) {
      throw new Error('Attribute actor is required');
    }

    // Obtener el usuario autenticado y verificar si es administrador
    const user = UserApiService.getUser();
    this.isAdmin = user?.isAdmin || false;
     console.log('Actor recibido:', this.actor);
  }

  editActor(actorId: string): void {
    this.router.navigateByUrl(`/actors/edit/${actorId}`);
  }

  moreOptions(movieId: string): void {
    this.router.navigateByUrl(`/actors/${movieId}`);
  }
  

  get coverImageUrl(): string {
    return this.actor.images.find((img) => img.isCover)?.url || 'assets/default-cover.jpg'; // Imagen por defecto si no hay portada
  }
}
