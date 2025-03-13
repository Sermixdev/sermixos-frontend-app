# Railway Node.js App

Aplicación Node.js lista para ser desplegada en Railway.

## Requisitos

- Node.js 16.x o superior
- npm o yarn

## Configuración Local

1. Clona el repositorio:
   ```bash
   git clone <tu-repositorio>
   cd <tu-repositorio>
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Copia el archivo de variables de entorno:
   ```bash
   cp .env.example .env
   ```

4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

## Despliegue en Railway

1. Crea una cuenta en Railway (https://railway.app)

2. Conecta tu repositorio de GitHub

3. Crea un nuevo proyecto en Railway y selecciona tu repositorio

4. Railway detectará automáticamente que es un proyecto Node.js y:
   - Instalará las dependencias (`npm install`)
   - Usará el comando `npm start` para iniciar la aplicación

5. (Opcional) Configura las variables de entorno en la sección "Variables" de Railway

## Scripts Disponibles

- `npm start`: Inicia la aplicación en producción
- `npm run dev`: Inicia la aplicación en modo desarrollo con recarga automática
- `npm test`: Ejecuta los tests

## Estructura del Proyecto

```
.
├── .env.example    # Ejemplo de variables de entorno
├── .gitignore      # Archivos y carpetas ignorados por git
├── README.md       # Este archivo
├── index.js        # Punto de entrada de la aplicación
└── package.json    # Configuración del proyecto y dependencias
```

## Variables de Entorno

- `PORT`: Puerto en el que se ejecutará el servidor (por defecto: 3000)