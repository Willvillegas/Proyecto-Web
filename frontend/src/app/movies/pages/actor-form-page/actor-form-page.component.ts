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
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

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
    private snackBar: MatSnackBar,
    private dialog: MatDialog
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
    this.movieApiService.getMovies({ limit: 70 }).subscribe({
      next: (value) => {
        this.movies = value.data;
      },
      error(err) {
        console.error('Error al cargar las películas en actor-form-page', err);
      },
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
    } else {
      console.warn("No se puede eliminar el actor. ID no válido.");
    }
  }

  openDeleteDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `¿Estás seguro de eliminar "${this.actorData?.name}"?`,
        message: 'Este proceso no es reversible. Está a punto de eliminar al actor.'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Si el usuario confirma, se llama al método onDelete()
        this.onDelete();
      } else {
        console.log("Eliminación cancelada");
      }
    });
  }

  onAddImage(): void {
    const newUrl = prompt("Introduce la URL de la nueva imagen:");
    if (newUrl) {
      const images = this.actorForm.get('images')?.value || [];
      images.push({ url: newUrl, isCover: images.length === 0 }); // La primera imagen es la portada
      this.actorForm.get('images')?.setValue(images);
    }
  }

  onChangeImage(index: number, event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
  
    const newUrl = prompt("Introduce la nueva URL de la imagen:");
    if (newUrl) {
      const images = [...this.actorForm.get('images')?.value];
      images[index] = { ...images[index], url: newUrl };
  
      this.actorForm.patchValue({ images });
    }
  }
  
  onCoverChange(index: number): void {
    const images = [...this.actorForm.get('images')?.value]; // Clonamos el array
    images.forEach((image, i) => {
      image.isCover = i === index; // Se marca solo la seleccionada
    });
  
    this.actorForm.patchValue({ images });
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


