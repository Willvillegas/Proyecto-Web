import { Component } from '@angular/core';
import { Actor } from '../../interfaces/actor.interfaces';
import { ActorsService } from '../../services/actors.service';
import { CommonModule } from '@angular/common';
import { ActorCardComponent } from "../../components/actor-card/actor-card.component";


@Component({
  selector: 'actors-list-page',
  imports: [CommonModule, ActorCardComponent],
  templateUrl: './actors-list-page.component.html',
  styleUrls: ['./actors-list-page.component.css']
})
export class ActorsListPageComponent {
  public actors: Actor[] = [];

  constructor(
    private actorsService: ActorsService
  ) {}

  ngOnInit(): void {
    this.actorsService.getActors()
      .subscribe(actors => this.actors = actors);
  }
}
