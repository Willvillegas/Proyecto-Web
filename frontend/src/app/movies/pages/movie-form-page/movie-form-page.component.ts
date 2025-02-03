import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MovieApi, MovieResponse, Poster } from '../../interfaces/movieApi.interfaces';
import { ActorApi } from '../../interfaces/actorApi.interfaces';
import { MoviesApiService } from '../../services/movies-api.service';
import { ActorsApiService } from '../../services/actors-api.service';
import { MatRadioModule } from '@angular/material/radio';


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
    MatRadioModule,
  ],
  templateUrl: './movie-form-page.component.html',
  styleUrls: ['./movie-form-page.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class MovieFormPageComponent implements OnInit {
  movieForm: FormGroup;
  isEditMode = false;
  movieId: string | null = null;
  actors: ActorApi[] = [];
  movieData: MovieApi | null = null;
  genres: string[] = ['Action', 'Comedy', 'Drama', 'Science Fiction', 'Horror', 'Romance', 'Animation', 'Adventure'];
  isDeleting = false;

  constructor(
    private fb: FormBuilder,
    private movieApiService: MoviesApiService,
    private actorApiService: ActorsApiService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.movieForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      genre: ['', Validators.required],
      director: ['', Validators.required],
      releaseYear: ['', Validators.required],
      rating: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
      cast: [[], Validators.required],
      cover: [null],  // Control para la portada
      clasification: ['G', Validators.required],
      posters: [[] as Poster[], Validators.required],
    });
  }

  ngOnInit(): void {
    this.isEditMode = this.route.snapshot.url[0].path === 'edit';
    // Cargar todos los actores disponibles
    this.loadActors();
    if (this.isEditMode) {
      const movieId = this.route.snapshot.paramMap.get('id');
      if (movieId) {
        this.movieId = movieId;
        this.loadMovieData(movieId);
      }
    }
  }

  loadActors(): void {
    this.actorApiService.getActors(70).subscribe(response => {
      this.actors = response;
    });
  }

  initForm(): void {
    this.movieForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      genre: ['', Validators.required],
      director: ['', Validators.required],
      releaseYear: ['', Validators.required],
      rating: ['', Validators.required],
      cast: [[], Validators.required],
      posters: [[], Validators.required],
      cover: [null],// Control para la portada
    });
  }

  loadMovieData(id: string): void {
    this.movieApiService.getMovieById(id).subscribe(movie => {
      console.log("Movie data received:", movie);
      const genresString = movie.genre ? movie.genre : '';
      const genresArray = genresString.split(',').map(g => g.trim());
      this.movieData = movie;
      this.movieForm.patchValue({
        title: movie.title,
        description: movie.description,
        genre: genresArray.join(', '),
        director: movie.director,
        releaseYear: movie.releaseYear,
        rating: movie.rating,
        cast: movie.cast.map(actor => actor._id),
        posters: movie.posters,
        clasification: movie.clasification ?? 'G',
      });
    });
  }


  onSubmit() {
    if (this.isDeleting) {
      console.warn("Intento de actualizar mientras se está eliminando la película.");
      return; // Evita ejecutar el código si la película está en proceso de eliminación
    }

    const formValue = this.movieForm.value;
    const posters: Poster[] = formValue.posters;

    if (!formValue.cover) {
      formValue.cover = posters.length > 0 ? posters[0]._id : null;
    }

    const movie: MovieApi = {
      ...formValue,
      posters: posters,
    };

    if (this.isEditMode && this.movieId) {
      movie._id = this.movieId;
      this.movieApiService.updateMovie(movie).subscribe(
        response => {
          console.log('Película actualizada con éxito:', response);
          this.showSnackBar('Película actualizada con éxito');
          this.router.navigate(['movies/list']);
        },
        error => {
          console.error('Error al actualizar la película:', error);
          this.showSnackBar('Error al actualizar la película');
        }
      );
    } else {
      this.movieApiService.createMovie(movie).subscribe(
        response => {
          console.log('Película creada con éxito:', response);
          this.showSnackBar('Película creada con éxito');
          this.router.navigate(['/movies/list']);
        },
        error => {
          console.error('Error al crear la película:', error);
          this.showSnackBar('Error al crear la película');
        }
      );
    }
  }


  showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000
    });
  }

  onDelete(): void {
    if (this.movieId) {
      console.log("Intentando eliminar película con ID:", this.movieId);
      this.isDeleting = true;
      this.movieApiService.deleteMovie(this.movieId).subscribe(
        () => {
          this.isDeleting = false;
          this.showSnackBar('Película eliminada con éxito');
          this.router.navigate(['/movies/list']); // Redirigir inmediatamente
        },
        (error) => {
          this.isDeleting = false;
          console.error('Error al eliminar la película', error);
          this.showSnackBar('Error al eliminar la película');
        }
      );
    }
  }


  onAddImage(): void {
    if (this.movieForm.get('posters')?.value.length >= 12) return;

    const newUrl = prompt("Introduce la URL de la nueva imagen:");
    if (newUrl) {
      const posters: Poster[] = this.movieForm.get('posters')?.value || [];
      // Si es la primera imagen, la marcamos como portada
      const newPoster: Poster = { url: newUrl, isCover: posters.length === 0 };
      posters.push(newPoster);
      this.movieForm.get('posters')?.setValue(posters);
    }
  }

  onChangeImage(index: number): void {
    const newUrl = prompt("Introduce la nueva URL de la imagen:");
    if (newUrl) {
      const posters: Poster[] = this.movieForm.get('posters')?.value;
      if (posters && posters[index]) {
        posters[index].url = newUrl;
        posters.forEach((poster, idx) => {
          poster.isCover = idx === index ? true : false;  // Marcar la imagen seleccionada como portada
        });

        this.movieForm.get('posters')?.setValue(posters);
      }
    }
  }

  onCoverChange(event: any): void {
    const selectedCoverId = event.value;
    const posters: Poster[] = this.movieForm.get('posters')?.value;
    posters.forEach((poster: Poster) => {
      poster.isCover = (poster._id === selectedCoverId);
    });

    // Actualiza el valor de los posters en el formulario
    this.movieForm.get('posters')?.setValue(posters);
    this.movieForm.get('cover')?.setValue(selectedCoverId);
  }



  onDeleteImage(index: number): void {
    const posters = this.movieForm.get('posters')?.value;
    if (posters.length > 1) {
      posters.splice(index, 1);
      this.movieForm.get('posters')?.setValue(posters);
    }
  }

  // Validación de rating
  validateRating(event: any): void {
    let value = event.target.value;
    if (value < 0) event.target.value = 0;
    if (value > 10) event.target.value = 10;
  }

}