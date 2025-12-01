import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged, tap, catchError, map } from 'rxjs/operators';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MovieApi } from '../../interfaces/movieApi.interfaces';
import { ActorApi } from '../../interfaces/actorApi.interfaces';
import { MoviesApiService } from '../../services/movies-api.service';
import { ActorsApiService } from '../../services/actors-api.service';

export type SearchOption = {
  id: string;
  title?: string; // Propiedad para películas
  name?: string; // Propiedad para actores
};

@Component({
  selector: 'movie-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  standalone: true,
  imports: [
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule
  ],
})
export class SearchComponent implements OnInit {
  searchInput = new FormControl(''); // Iniciar con una cadena vacía
  searchResults: SearchOption[] = [];
  selectedOption?: SearchOption; // Resultado seleccionado
  formMode: 'movies' | 'actors' = 'movies'; // Modo actual (películas o actores)

  constructor(
    private moviesService: MoviesApiService,
    private actorsService: ActorsApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.detectRouteMode();

    // Detectar cambios en la ruta para actualizar el modo de búsqueda
    this.activatedRoute.url.subscribe(() => {
      this.detectRouteMode();
    });

    // Escuchar cambios en el campo de búsqueda
    this.searchInput.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(value => this.search(value ?? '')),
        tap(() => this.clearSelection()),
        catchError(() => of([]))
      )
      .subscribe(results => {
        this.searchResults = results;
      });
  }

  // Detectar en qué página está el usuario
  private detectRouteMode(): void {
    const url = this.router.url;

    if (url.startsWith('/movies/') || url.includes('/movies')) {
      this.formMode = 'movies';
    } else if (url.startsWith('/actors/') || url.includes('/actors')) {
      this.formMode = 'actors';
    }
  }

  // Método para buscar películas o actores
  search(value: string): Observable<SearchOption[]> {
    if (!value.trim()) {
      return of([]); // Si no hay texto, retornar array vacío
    }

    if (this.formMode === 'movies') {
      return this.moviesService.searchMovies(value, 70).pipe(
        map((movies: MovieApi[]) =>
          movies
            .map(movie => ({ id: movie._id || '', title: movie.title })) // Asegurar que 'id' sea string
            .filter(movie => movie.title.toLowerCase().includes(value.toLowerCase())) // Filtrar resultados
        )
      );
    } else {
      return this.actorsService.searchActors(value, 70).pipe(
        map((actors: ActorApi[]) =>
          actors
            .map(actor => ({ id: actor._id || '', name: actor.name })) // Asegurar que 'id' sea string
            .filter(actor => actor.name.toLowerCase().includes(value.toLowerCase())) // Filtrar resultados
        )
      );
    }
  }


  // Manejar la selección de una opción en el autocompletado
  onSelectedOption(event: MatAutocompleteSelectedEvent): void {
    const selectedValue = event.option.value;
    if (!selectedValue) return;

    this.selectedOption = selectedValue;
    const id = selectedValue.id;
    // Navegar a la página correspondiente y forzar la recarga
    if (this.formMode === 'movies') {
      this.router.navigate([`/movies/${id}`], { replaceUrl: true }).then(() => {
        window.location.reload(); // Recargar la página
      });
    } else {
      this.router.navigate([`/actors/${id}`], { replaceUrl: true }).then(() => {
        window.location.reload(); // Recargar la página
      });
    }
    this.searchInput.setValue('');

    // Redirigir a la página sin recargar completamente
    this.router.navigate([`/${this.formMode}/${id}`], { queryParamsHandling: 'merge' });
  }

  // Limpiar la selección actual
  clearSelection(): void {
    this.selectedOption = undefined;
  }
}
