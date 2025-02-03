```markdown
# Frontend 

## Instrucciones de Instalación y Ejecución

### 1. Instalar Dependencias

Abre una terminal en el directorio raíz del proyecto y navega a la carpeta del frontend:

```bash
cd frontend
```

Luego, instala las dependencias necesarias con el siguiente comando:

```bash
npm install
```

### 2. Instalar `json-server` (si no está instalado)

Si no tienes `json-server` instalado globalmente, puedes hacerlo ejecutando:

```bash
npm install json-server
```

### 3. Simulación de Backend con `json-server`

Ejecuta el siguiente comando para iniciar el servidor simulado:

```bash
npx json-server data/movies.json
```

Esto arrancará el servidor en el puerto **3000** y creará los siguientes endpoints que simularán el backend:

- **Películas**: [http://localhost:3000/movies](http://localhost:3000/movies)
- **Actores**: [http://localhost:3000/actors](http://localhost:3000/actors)

### 4. Angular Material

Este proyecto está utilizando el tema de **Angular Material** con los colores **Cyan & Orange**.

- El color de fondo es **negro**.
- El color rojo usado en la **toolbar** es: **#980303**.

### 5. Instalación de Herramientas Adicionales

#### Instalar Angular (si no lo tienes instalado)

Si aún no tienes **Angular CLI** instalado, puedes hacerlo con el siguiente comando:

```bash
npm install -g @angular/cli
```

#### Instalar Angular Material

Si aún no has instalado **Angular Material**, puedes agregarlo a tu proyecto con el siguiente comando:

```bash
ng add @angular/material
```

#### Instalar Tailwind CSS

Para instalar **Tailwind CSS**, ejecuta el siguiente comando:

```bash
npm install tailwindcss postcss autoprefixer
```

#### Configurar Tailwind CSS

Una vez que Tailwind CSS esté instalado, ejecuta el siguiente comando para crear el archivo de configuración de Tailwind:

```bash
npx tailwindcss init
```

### 6. Estructura de Archivos

El archivo `movies.json` se encuentra en la carpeta `data` y contiene los datos de las películas y actores que están siendo utilizados en el proyecto.

### 7. Puesta en Marcha del Proyecto

Una vez que hayas configurado todos los pasos anteriores, puedes ejecutar el proyecto Angular con el siguiente comando:

```bash
ng serve -o
```

Accede a la aplicación en tu navegador mediante [http://localhost:4200](http://localhost:4200).

---

¡Listo! Ya deberías poder ejecutar el proyecto y ver la gestión de películas y actores con simulación del backend utilizando **json-server**.
```
