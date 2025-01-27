# ProyectoWeb Backend

Esta carpeta contiene el backend del proyecto #2 para el curso de desarrollo de páginas web. 

Verano 2024-2025
## Tabla de contenidos

- [Instalación](#instalación)
- [Uso](#uso)
- [Estructura Carpetas](#estructura-carpetas)
- [API Endpoints](#api-endpoints)


## Instalación

1. Clone the repository:
    ```sh
    git clone https://github.com/WillVillegas/ProyectoWeb.git
    cd ProyectoWeb/backend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add your MongoDB URI and other environment variables:
    ```env
    BD_URL=your_mongodb_uri
    PORT=your_port
    ```

## Uso

1. Start the development server:
    ```sh
    npm run start
    ```

2. Build for production:
    ```sh
    npm run build
    ```


## Estructura carpetas
- `controllers/` : Capa que contiene los archivos que controlan las solicitudes HTTP recibidas del cliente, aqui se generan las respuestas HTTP de las solicitudes.
- `models/` : Capa que contiene los archivos de los modelos de mongoose que definen los esquemas de las colecciones en MongoDB
- `repositories/` : Capa encargada de la interacción directa con la base de datos. aqui se generan las consultas y operaciónes CRUD de los modelos creados previamente
- `services/` : Capa que contiene la lógica de negocio de la aplicación, validaciones, entre otros.
- `interfaces/` : Contiene las formas que contiene los objetos que se usan en el backend (importante para typescript)
- `routes/` : Contiene los archivos encargados de definir las rutas de la api y de dirigir las solicitudes HTTP y de gestionar los métodos HTTP
- `utils/` : Contiene funcionalidades externas que puede ser usadas durante todo el proceso de una solicitud (ya sea HTTP o de la base de datos)
- `middlewares/` Contiene las configuraciones que procesan a "medio camino" las solicitudes HTTP, para este proyecto se implementarán para la validación de los usuarios y el procesamento de archivos

## API Endpoints

### Entidad: Película
- `GET /api/movies` - Recuperar todos las peliculas
    - **Query Params:**
        - `offset` (int): Indica desde qué documento empezar a devolver los resultados. En otras palabras, es la cantidad de documentos a omitir antes de empezar a devolver los resultados.
        - `limit` (int): Especifica cuántos documentos queremos obtener en una sola consulta.
        - `genre` (string) : [Opcional] buscar por genero
        - `releaseYear` (string) : [Opcional] buscar por año
        - `clasification` (string) : [Opcional] buscar por clasificación 
    - Nota: si no coloca los params, devuelve los primeros 10...
- `POST /api/movies` - Crea una nueva pelicula
    - **Body Params**
        - `title` (string): Título de la pelicula
        - `description` (string): Breve descripción de la pelicula
        - `genre` (string): Género de la pelicula
        - `director` (string): Nombre del director
        - `rating` (string): Número convertido en string
        - `cast` (string []) : id de los actores o si no tambien puede ser vacío

- `GET /api/movies/:id` - Recupera la pelicula por su id
    - **Path Params**
        - `id` el identificador de la pelicula.
- `PUT /api/movies/` - Actualiza la pelicula por su id
    - **Body Params**
        - `_id` (string): Id de la pelicula
        - `title` (string): Título de la pelicula
        - `description` (string): Breve descripción de la pelicula
        - `genre` (string): Género de la pelicula
        - `director` (string): Nombre del director
        - `rating` (string): Número convertido en string
        - `cast` (string []): Arreglo actores
- `DELETE /api/movies/:id` - Elimina una pelicula especifica
    - **Path Params**
        - `id` El identificador de la pelicula.

- `POST /api/movie/:id/actors` - Agrega un actor a una pelicula y agrega una pelicula a un actor
    - **Path Params**
        - `id` El identificador de la pelicula.
    - **Body Params**
        - `actorId` (string) : El id del actor a enlazar.
- `DELETE /api/movies/:id/actors/:actorId`- Elimina una actor a una pelicula y elimina una pelicula a un actor
    - **Path Params**
        - `id` El identificador de la pelicula.
        - `actorId` El identificador del actor.
- `POST /api/movies/:id/upload` - Guarda las imagenes secundarias de una pelicula por su id
    - **Path Params**
        - `id` Identificador del actor
    - **Body Params**
        - `images` identificador de la imagen con un maximo de 12 imagenes
    - **Headers Content-type**
        - `multipart/form-data`
- `POST /api/movies/:id/set-cover` - Guarda la imagen principal de la pelicula.
    - **Path Params**
        - `id` Identificador del actor
    - **Body Params**
        - `cover` identificador de la imagen (SOLO PERMITE 1 IMAGEN)
    - **Headers Content-type**
        - `multipart/form-data`

### Entidad: Actor
- `GET /api/actors` - Recupera todos los actores
    - **Query Params:**
        - `offset` (int): Indica desde qué documento empezar a devolver los resultados. En otras palabras, es la cantidad de documentos a omitir antes de empezar a devolver los resultados.
        - `limit` (int): Especifica cuántos documentos queremos obtener en una sola consulta.
    - Nota: si no coloca los params, devuelve los primeros 10...
- `POST /api/actors` - Crea un nuevo actor
    - **Body Params**
        - `name` (string): Nombre del actor
        - `birth` (string): Fecha de nacimiento
        - `biography` (string): Biografía del actor
        - `movies` (string[]): id de las peliculas que participa o vacío
        - **TODO:FOTO_Pendiente**

- `GET /api/actors/:id` - Recupera el actor por su id
    - **Path Params**
        - `id` el identificador del actor.
- `PUT /api/actors` - Actualiza la información del actor 
    - **Body Params**
        - `name` (string): Nombre del actor
        - `birthday` (string): Fecha de nacimiento
        - `biography` (string): Biografía del actor
        - `movies` (string[]): id de las peliculas que participa o vacío

- `DELETE /api/actor/:id` - Elimina una actor especifico por su id
    - **Path Params**
        - `id` el identificador del actor.
- `POST /api/actors/:id/upload` - Guarda las imagenes secundarias de un actor por su id
    - **Path Params**
        - `id` Identificador del actor
    - **Body Params**
        - `images` identificador de la imagen con un maximo de 12 imagenes
    - **Headers Content-type**
        - `multipart/form-data`
- `POST /api/actors/:id/set-cover` - Guarda la imagen principal del actor.
    - **Path Params**
        - `id` Identificador del actor
    - **Body Params**
        - `principal` identificador de la imagen (SOLO PERMITE 1 IMAGEN)
    - **Headers Content-type**
        - `multipart/form-data`

### Entidad: Usuario
- `GET /api/user` - Recupera todos los usuarios

- `POST /api/user` - Crea un nuevo usuario
    - **Body Params**
        - `name` (string): Nombre del usuario a registrar
        - `username` (string): Nombre de ingreso al sistema
        - `password` (string): contraseña del usuario a registrar
        - `isadmin` (boolean): dice si es un administrador o no
- `PUT /api/user` - Crea un nuevo usuario
    - **Body Params**
        - `name` (string): Nombre del usuario a registrar
        - `username` (string): Nombre de ingreso al sistema
        - `password` (string): Contraseña del usuario a registrar
        - `isadmin` (boolean): Dice si es un administrador o no
- `POST /api/user/login` - Hace la validación de un login
    - **Body Params**
        - `username` (string): Nombre del usuario registrado
        - `password` (string): Contraseña

- `GET /api/user/:id` - Recupera el usuario por su id
    - **Path Params**
        - `id` el identificador del usuario.