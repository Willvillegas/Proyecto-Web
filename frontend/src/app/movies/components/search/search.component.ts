import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MoviesService } from '../../services/movies.service';
import { ActorsService } from '../../services/actors.service';
import { Movie } from '../../interfaces/movie.interfaces';
import { Actor } from '../../interfaces/actor.interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged, tap, catchError, map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

// Definición del tipo unificado para resultados
export type SearchOption = {
  id: string;
  title?: string; // Propiedad para películas
  name?: string; // Propiedad para actores
};

@Component({
  selector: 'movie-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  standalone: true,
  imports: [
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
    MatIconModule,
  ],
})
export class SearchComponent implements OnInit {
  searchInput = new FormControl(); // Control del campo de búsqueda
  movies: Movie[] = []; // Lista de películas
  actors: Actor[] = []; // Lista de actores
  searchResults: SearchOption[] = []; // Resultados unificados
  selectedOption?: SearchOption; // Resultado seleccionado
  formMode: 'movies' | 'actors' = 'movies'; // Modo actual (películas o actores)

  constructor(
    private moviesService: MoviesService,
    private actorsService: ActorsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.url.subscribe(() => {
      const url = this.router.url;
      if (url.includes('movies') && url.includes('actors-list')) {
        this.formMode = 'actors'; // Si la ruta contiene ambas, es búsqueda de actores
      } else if (url.includes('movies')) {
        this.formMode = 'movies'; // Si solo contiene "movies", es búsqueda de películas
      } else {
        this.formMode = 'actors'; // Por defecto, se asume búsqueda de actores
      }
    });
  
    // Escuchar cambios en el campo de búsqueda
    this.searchInput.valueChanges
      .pipe(
        debounceTime(300), // Retraso de 300 ms para evitar búsquedas innecesarias
        distinctUntilChanged(), // Solo procesar valores distintos
        switchMap(value => this.search(value)), // Realizar búsqueda
        tap(() => this.clearSelection()), // Limpiar selección
        catchError(() => of([])) // Manejar errores devolviendo un array vacío
      )
      .subscribe(results => {
        this.searchResults = results; // Actualizar resultados
      });
  }
  

// Método para buscar películas o actores
search(value: string): Observable<SearchOption[]> {
  if (!value.trim()) {
    return of([]); // Si no hay texto, retornar array vacío
  }

  if (this.formMode === 'movies') {
    return this.moviesService.searchMovies(value).pipe(
      map((movies: Movie[]) => 
        movies
          .map(movie => ({ id: movie.id, title: movie.title })) // Mapear películas al formato de SearchOption
          .filter(movie => movie.title.toLowerCase().includes(value.toLowerCase())) // Filtrar resultados
      )
    );
  } else {
    return this.actorsService.searchActors(value).pipe(
      map((actors: Actor[]) =>
        actors
          .map(actor => ({ id: actor.id, name: actor.name })) // Mapear actores al formato de SearchOption
          .filter(actor => actor.name.toLowerCase().includes(value.toLowerCase())) // Filtrar resultados
      )
    );
  }
}


  // Manejar la selección de una opción en el autocompletado
  onSelectedOption(event: MatAutocompleteSelectedEvent): void {
    const selectedValue = event.option.value;
    if (!selectedValue) return;

    this.selectedOption = selectedValue; // Almacenar la opción seleccionada
    const id = selectedValue.id;

    // Navegar a la página correspondiente
    if (this.formMode === 'movies') {
      this.router.navigate([`/movies/${id}`]);
    } else {
      this.router.navigate([`/actors/${id}`]);
    }
  }

  // Limpiar la selección actual
  clearSelection(): void {
    this.selectedOption = undefined;
  }
}
