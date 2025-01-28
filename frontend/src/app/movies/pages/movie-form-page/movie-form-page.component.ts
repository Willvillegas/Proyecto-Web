import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../interfaces/movie.interfaces';
import { MatCheckboxModule } from '@angular/material/checkbox';



@Component({
  selector: 'movie-form-page',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    FormsModule,
    MatCheckboxModule,
  ],
  templateUrl: './movie-form-page.component.html',
  styleUrls: ['./movie-form-page.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class MovieFormPageComponent implements OnInit {
  public formMode: 'new' | 'edit' = 'new';
  public movieForm: FormGroup;
  public posters: { url: string; isCover: boolean }[] = [];  // Lista de posters

  constructor(
    private moviesService: MoviesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.movieForm = new FormGroup({
      id: new FormControl<string>(''),
      title: new FormControl<string>('', { validators: [Validators.required], nonNullable: true }),
      description: new FormControl<string>('', [Validators.required]),
      genre: new FormControl<string>('', [Validators.required]),
      director: new FormControl<string>('', [Validators.required]),
      cast: new FormControl<string>('', [Validators.required]),
      releaseYear: new FormControl<number | null>(null, [Validators.required, Validators.min(1800)]),
      rating: new FormControl<number | null>(null, [Validators.required, Validators.min(0), Validators.max(10)]),
    });
  }

  ngOnInit(): void {
    this.movieForm = new FormGroup({
      id: new FormControl<string>(''),
      title: new FormControl<string>('', { validators: [Validators.required], nonNullable: true }),
      description: new FormControl<string>('', [Validators.required]),
      genre: new FormControl<string>('', [Validators.required]),
      director: new FormControl<string>('', [Validators.required]),
      cast: new FormControl<string>('', [Validators.required]),
      releaseYear: new FormControl<number | null>(null, [Validators.required, Validators.min(1800)]),
      rating: new FormControl<number | null>(null, [Validators.required, Validators.min(0), Validators.max(10)]),
    });
  
    if (this.router.url.includes('edit')) {
      this.formMode = 'edit';
      this.activatedRoute.params.subscribe(({ id }) => {
        this.moviesService.getMovieById(id).subscribe((movie) => {
          if (!movie) {
            this.router.navigateByUrl('/movies/list');
            return; // Termina aquí si no hay película
          }
  
          // Inicializa los datos del formulario
          this.movieForm.setValue({
            id: movie.id,
            title: movie.title,
            description: movie.description,
            genre: movie.genre,
            director: movie.director,
            cast: movie.cast.join(', '), // Convertir array a string
            releaseYear: movie.releaseYear,
            rating: movie.rating,
          });
  
          // Inicializar los posters en el formulario
          this.posters = movie.posters.map((poster, i) => {
            this.movieForm.addControl('poster' + i, new FormControl(poster.url)); // Añadir dinámicamente los controles para los posters
            return {
              url: poster.url,
              isCover: poster.isCover || false,
            };
          });
        });
      });
    }
  }
  
  addPoster(): void {
    const index = this.posters.length;
    this.posters.push({ url: '', isCover: false });
  
    // Agregar un control dinámico para el nuevo poster
    this.movieForm.addControl('poster' + index, new FormControl('')); // Crear el control para el nuevo poster
  }
  
  
  

  // Eliminar un poster de la lista
  removePoster(index: number): void {
    // Elimina el poster en el índice especificado
    this.posters.splice(index, 1);
  }
  

  // Marca un solo poster como portada
  toggleCover(index: number): void {
    // Desmarcar todos los demás posters
    this.posters.forEach((poster, i) => {
      if (i !== index) {
        poster.isCover = false;
      }
    });
  
    // Cambiar el estado del poster actual
    this.posters[index].isCover = !this.posters[index].isCover;
  }
  

  onSubmit(): void {
    if (this.movieForm.invalid || this.posters.length === 0) {
      this.snackBar.open('Formulario inválido o sin posters', 'Cerrar', { duration: 3000 });
      return;
    }
  
    const movie: Movie = {
      ...this.movieForm.value,
      // Convertir el campo cast a array de actores (strings) y asegurar que actor es de tipo string
      cast: (this.movieForm.value.cast || '')
        .split(',')
        .map((actor: string) => actor.trim()), // Especificar que actor es de tipo string
      posters: this.posters, // Agregar posters al objeto movie
    } as Movie;
  
    if (this.formMode === 'edit') {
      this.moviesService.updateMovie(movie).subscribe(() => {
        this.snackBar.open('Película actualizada correctamente', 'Cerrar', { duration: 3000 });
        this.router.navigateByUrl('/movies/list');
      });
    } else {
      this.moviesService.addMovie(movie).subscribe(() => {
        this.snackBar.open('Película creada correctamente', 'Cerrar', { duration: 3000 });
        this.router.navigateByUrl('/movies/list');
      });
    }
  }
  
  onDeleteMovie(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title: this.movieForm.value.title },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result || !this.movieForm.value.id) return;

      this.moviesService.deleteMovie(this.movieForm.value.id).subscribe(() => {
        this.snackBar.open('Película eliminada correctamente', 'Cerrar', { duration: 3000 });
        this.router.navigateByUrl('/movies/list');
      });
    });
  }
}
