import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';


@Component({
  selector: 'layout-page',
  imports: [
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    CommonModule
],
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.css'
})
export class LayoutPageComponent {
  public sidebarItems = [
    { label: 'Películas', icon: 'movie', url: './list' },
    { label: 'Actores', icon: 'groups', url: './actors-list' },
    { label: 'Reparto', icon: 'badge', url: './list' },//TODO: EL list SE CAMBIA LUEGO 
  ]
}
