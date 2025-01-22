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
    MONGODB_URI=your_mongodb_uri
    PORT=your_port
    ```

## Uso

1. Start the development server:
    ```sh
    npm run dev
    ```

2. Build for production:
    ```sh
    npm run build
    ```

3. Start the production server:
    ```sh
    npm start
    ```

## Estructura carpetas
- `controllers/` : Capa que contiene los archivos que controlan las solicitudes HTTP recibidas del cliente, aqui se generan las respuestas HTTP de las solicitudes.
- `models/` : Capa que contiene los archivos de los modelos de mongoose que definen los esquemas de las colecciones en MongoDB
- `repositories/` : Capa encargada de la interacción directa con la base de datos. aqui se generan las consultas y operaciónes CRUD de los modelos creados previamente
- `services/` : Capa que contiene la lógica de negocio de la aplicación, validaciones, entre otros.
- `interfaces/` : Contiene las formas que contiene los objetos que se usan en el backend (importante para typescript)
- `routes/` : Contiene los archivos encargados de definir las rutas de la api y de dirigir las solicitudes HTTP y de gestionar los métodos HTTP
- `utils/` : Contiene funcionalidades externas que puede ser usadas durante todo el proceso de una solitud (ya sea HTTP o de la base de datos)

## API Endpoints

### Entidad: Película
- `GET /api/movie` - Recuperar todos las peliculas
    - **Query Params:**
        - `offset` (int): Indica desde qué documento empezar a devolver los resultados. En otras palabras, es la cantidad de documentos a omitir antes de empezar a devolver los resultados.
        - `limit` (int): Especifica cuántos documentos queremos obtener en una sola consulta.
    - Nota: si no coloca los params, devuelve los primeros 10...
- `POST /api/movie` - Crea una nueva pelicula
    - **Body Params**
        - `title` (string): Título de la pelicula
        - `description` (string): Breve descripción de la pelicula
        - `genre` (string): Género de la pelicula
        - `director` (string): Nombre del director
        - `rating` (string): Número del 0 al 5 flotante convertido en string

- `GET /api/movie/:id` - Recupera la pelicula por su id
    - **Path Params**
        - `id` el identificador de la pelicula.
- `PUT /api/movie/:id` - Actualiza la pelicula por su id
    - **Path Params**
        - `id` el identificador de la pelicula.
    - **Body Params**
        - `title` (string): Título de la pelicula
        - `description` (string): Breve descripción de la pelicula
        - `genre` (string): Género de la pelicula
        - `director` (string): Nombre del director
        - `rating` (string): Número del 0 al 5 flotante convertido en string
- `DELETE /api/movie/:id` - Elimina una pelicula especifica
    - **Path Params**
        - `id` el identificador de la pelicula.

### Entidad: Actor
- `GET /api/actor` - Recupera todos los actores
    - **Query Params:**
        - `offset` (int): Indica desde qué documento empezar a devolver los resultados. En otras palabras, es la cantidad de documentos a omitir antes de empezar a devolver los resultados.
        - `limit` (int): Especifica cuántos documentos queremos obtener en una sola consulta.
    - Nota: si no coloca los params, devuelve los primeros 10...
- `POST /api/actor` - Crea un nuevo actor
    - **Body Params**
        - `name` (string): Nombre del actor
        - `birth` (string): Fecha de nacimiento
        - `biography` (string): Biografía del actor
        - **TODO:FOTO_Pendiente**

- `GET /api/actor/:id` - Recupera el actor por su id
    - **Path Params**
        - `id` el identificador de la pelicula.
- `PUT /api/actor/:id` - Actualiza la información del actor por su id
    - **Path Params**
        - `id` el identificador del actor
    - **Body Params**
        - `name` (string): Nombre del actor
        - `birth` (string): Fecha de nacimiento
        - `biography` (string): Biografía del actor
        - **TODO:FOTO_Pendiente**
- `DELETE /api/actor/:id` - Elimina una actor especifico
    - **Path Params**
        - `id` el identificador del actor.

### Entidad: Usuario
- `GET /api/user` - Recupera todos los usuarios
    - **Query Params:**
        - `offset` (int): Indica desde qué documento empezar a devolver los resultados. En otras palabras, es la cantidad de documentos a omitir antes de empezar a devolver los resultados.
        - `limit` (int): Especifica cuántos documentos queremos obtener en una sola consulta.
    - Nota: si no coloca los params, devuelve los primeros 10...
- `POST /api/user` - Crea un nuevo usuario
    - **Body Params**
        - `name` (string): Nombre del actor
        - `username` (string): Nombre del usuario a registrar
        - `password` (string): contraseña del usuario a registrar
        - `isadmin` (boolean): dice si es un administrador o no
- `POST /api/user/login` - Hace la validación de un login
    - **Body Params**
        - `username` (string): Nombre del usuario registrado
        - `password` (string): Contraseña

- `GET /api/user/:id` - Recupera el usuario por su id
    - **Path Params**
        - `id` el identificador del usuario.