import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActorApi, Image } from '../../interfaces/actorApi.interfaces';
import { MovieApi } from '../../interfaces/movieApi.interfaces';
import { ActorsApiService } from '../../services/actors-api.service';
import { MoviesApiService } from '../../services/movies-api.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'actor-form-page',
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
    MatCheckboxModule,
    MatRadioModule,
  ],
  templateUrl: './actor-form-page.component.html',
  styleUrls: ['./actor-form-page.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ActorFormPageComponent implements OnInit {
  actorForm: FormGroup;
  isEditMode = false;
  actorId: string | null = null;
  movies: MovieApi[] = [];
  actorData: ActorApi | null = null;
  isDeleting = false;

  constructor(
    private fb: FormBuilder,
    private actorApiService: ActorsApiService,
    private movieApiService: MoviesApiService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.actorForm = this.fb.group({
      name: ['', Validators.required],
      birthday: [''],
      biography: [''],
      movies: [[]],
      images: [[]],
    });
  }

  ngOnInit(): void {
    this.isEditMode = this.route.snapshot.url[0]?.path === 'edit';
    if (this.isEditMode) {
      this.actorId = this.route.snapshot.paramMap.get('id');
      if (this.actorId) this.loadActorData(this.actorId);
    }

    this.loadMovies();
  }

  loadMovies(): void {
    this.movieApiService.getMovies(70).subscribe(response => {
      this.movies = response;
    });
  }

  loadActorData(id: string): void {
    this.actorApiService.getActorById(id).subscribe(actor => {
      this.actorData = actor;
      this.actorForm.patchValue({
        name: actor.name,
        birthday: actor.birthday,
        biography: actor.biography,
        movies: actor.movies.map(movie => movie._id),
        images: actor.images || [],
      });
    });
  }

  onSubmit(): void {
    const formValue = this.actorForm.value;

    const actor: ActorApi = {
      ...formValue,
      images: formValue.images,
    };

    if (this.isEditMode && this.actorId) {
      actor._id = this.actorId;
      this.actorApiService.updateActor(actor).subscribe(
        () => {
          this.showSnackBar('Actor actualizado con éxito');
          this.router.navigate(['/actors/list']);
        },
        () => this.showSnackBar('Error al actualizar el actor')
      );
    } else {
      this.actorApiService.createActor(actor).subscribe(
        () => {
          this.showSnackBar('Actor creado con éxito');
          this.router.navigate(['/actors/list']);
        },
        () => this.showSnackBar('Error al crear el actor')
      );
    }
  }

  showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', { duration: 3000 });
  }

  onDelete(): void {
    if (this.actorId) {
      this.isDeleting = true;
      this.actorApiService.deleteActor(this.actorId).subscribe(
        () => {
          this.isDeleting = false;
          this.showSnackBar('Actor eliminado con éxito');
          this.router.navigate(['/actors/list']);
        },
        () => {
          this.isDeleting = false;
          this.showSnackBar('Error al eliminar el actor');
        }
      );
    }
  }

  onAddImage(): void {
    const newUrl = prompt("Introduce la URL de la nueva imagen:");
    if (newUrl) {
      const images = this.actorForm.get('images')?.value || [];
      images.push({ url: newUrl, isCover: images.length === 0 }); // La primera imagen es la portada
      this.actorForm.get('images')?.setValue(images);
    }
  }

  onChangeImage(index: number): void {
    const newUrl = prompt("Introduce la nueva URL de la imagen:");
    if (newUrl) {
      const images = this.actorForm.get('images')?.value;
      if (images && images[index]) {
        images[index].url = newUrl;
        this.actorForm.get('images')?.setValue(images);
      }
    }
  }

  onCoverChange(event: any): void {
    const selectedCoverId = event.value;
    const images: Image[] = this.actorForm.get('images')?.value || [];

    images.forEach((image: Image) => {
      image.isCover = image._id === selectedCoverId;
    });

    this.actorForm.get('images')?.setValue(images);
  }

  onDeleteImage(index: number): void {
    const images: Image[] = this.actorForm.get('images')?.value;
    if (images.length > 1) {
      const wasCover = images[index].isCover;
      images.splice(index, 1);

      // Si se eliminó la portada, asignar `isCover: true` a otra imagen
      if (wasCover && images.length > 0) {
        images[0].isCover = true;
      }

      this.actorForm.get('images')?.setValue(images);
    }
  }
}


