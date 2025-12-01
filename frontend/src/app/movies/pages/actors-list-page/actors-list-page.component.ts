import { Component } from '@angular/core';

import { RouterModule } from '@angular/router';
import { ActorCardComponent } from "../../components/actor-card/actor-card.component";
import { ActorApi } from '../../interfaces/actorApi.interfaces';
import { ActorsApiService } from '../../services/actors-api.service';
import { MatIcon } from '@angular/material/icon';
import { UserApiService } from '../../../users/services/userApi.service';


@Component({
  selector: 'actors-list-page',
  imports: [ActorCardComponent, MatIcon, RouterModule],
  templateUrl: './actors-list-page.component.html',
  styleUrls: ['./actors-list-page.component.css']
})
export class ActorsListPageComponent {
  public actors: ActorApi[] = [];
  public totalActors: number = 0;  // Total de actores disponibles
  public currentPage: number = 1; // Página actual
  public limit: number = 10; // Número de actores por página
  public isAdmin: boolean = false;

  constructor(private actorsService: ActorsApiService) {}

  ngOnInit(): void {
    this.loadActors();
    // Obtener el usuario autenticado y verificar si es administrador
    const user = UserApiService.getUser();
    this.isAdmin = user?.isAdmin || false;
  }

  loadActors(): void {
    const offset = (this.currentPage - 1) * this.limit;
    this.actorsService.getActorsPage(this.limit, offset).subscribe((response) => {
      this.actors = response.data;
      this.totalActors = response.total;
    });
  }

  nextPage(): void {
    if ((this.currentPage * this.limit) < this.totalActors) {
      this.currentPage++;
      this.loadActors();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadActors();
    }
  }
}