import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SearchComponent } from "../../components/search/search.component";
import { UserApiService } from '../../../users/services/userApi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'layout-page',
  imports: [
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    SearchComponent
],
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.css'
})
export class LayoutPageComponent {
  public sidebarItems = [
    { label: 'Películas', icon: 'movie', url: '/movies/list' }, // RUTA ABSOLUTA
    { label: 'Actores', icon: 'groups', url: '/actors/list' },   // RUTA ABSOLUTA
    { label: 'Reparto', icon: 'badge', url: '/movies/list' },     // RUTA ABSOLUTA
  ]

  constructor(private userApiService: UserApiService, private router: Router) {}

  logout() {
    this.userApiService.logout();
  }
}

