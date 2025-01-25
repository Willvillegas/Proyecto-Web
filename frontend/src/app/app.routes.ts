import { PackageIdentifier } from './../../node_modules/@angular/cli/src/utilities/package-metadata.d';
import { Routes } from '@angular/router';
import { LayoutPageComponent } from './movies/pages/layout-page/layout-page.component';
import { ActorsListPageComponent } from './movies/pages/actors-list-page/actors-list-page.component';
import { MoviePageComponent } from './movies/pages/movie-page/movie-page.component';
import { MovieFormPageComponent } from './movies/pages/movie-form-page/movie-form-page.component';
import { MoviesListPageComponent } from './movies/pages/movies-list-page/movies-list-page.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    {
        path: '',
        component:  LoginComponent,
    },
    {path: 'movies',
        component: LayoutPageComponent,
        children:[
            {path: 'list', component: MoviesListPageComponent},
            {path: 'actors-list', component: ActorsListPageComponent},
            {path: 'new-movie', component: MovieFormPageComponent},
            {path: 'edit/:id', component: MovieFormPageComponent},
            {path: ':id', component: MoviePageComponent},
            {path: '**', redirectTo: 'list'}
        ]
    }

];
