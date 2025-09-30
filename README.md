Sistema CRUD de Personas 3 en 1

Este proyecto consiste en una aplicación fullstack para gestionar personas, implementando un sistema CRUD (Crear, Leer, Actualizar y Eliminar). Cuenta con un backend en Node.js/Express y dos frontends, uno en React y otro en Vue, lo que lo hace ideal para aprender a conectar una API con interfaces modernas y bases de datos reales.

Funcionalidades destacadas

Servidor con Node.js y Express: proporciona una API REST para manejar los registros de personas en SQLite.

Interfaces en React y Vue: dos versiones del formulario CRUD usando frameworks populares de JavaScript.

Base de datos SQLite: almacenamiento liviano y sencillo de configurar.

Validación de formularios en ambos frontends.

Diseño responsivo y moderno, adecuado para clínicas o sistemas administrativos.

Organización del proyecto
formulario-crud-3-in-1/
│
├── backend/       # API con Express + SQLite
│   └── server.js
│
├── react-app/     # Frontend en React
│   └── src/
│       └── App.jsx
│
├── vue-app/       # Frontend en Vue
│   └── src/
│       └── App.vue
│
└── README.md      # Información del proyecto

Cómo instalar y ejecutar
1. Backend

Instala dependencias:

cd backend
npm install


Ejecuta el servidor:

node server.js


El backend quedará activo en http://localhost:3000/api/personas

2. Frontend en React

Instala dependencias:

cd react-app
npm install


Inicia la aplicación:

npm run dev


Abre la URL que aparezca en la terminal (normalmente http://localhost:5173).

3. Frontend en Vue

Instala dependencias:

cd vue-app
npm install


Inicia la app:

npm run dev


Accede desde el navegador a la URL indicada en la terminal.

Uso de la aplicación

Agregar persona: Completa los campos del formulario y haz clic en "Agregar Paciente".

Editar persona: Presiona "Editar" en la tabla, modifica la información y luego haz clic en "Actualizar Paciente".

Eliminar persona: Haz clic en "Eliminar" y confirma la acción.

Cancelar edición: Pulsa "Cancelar" para reiniciar el formulario sin guardar cambios.

Todos los campos obligatorios son validados: DNI, nombres, apellidos, fecha de nacimiento, género y ciudad.

Rutas del backend

GET /api/personas — Obtiene la lista de personas

GET /api/personas/:id — Obtiene los datos de una persona específica

POST /api/personas — Crea un nuevo registro

PUT /api/personas/:id — Actualiza un registro existente

DELETE /api/personas/:id — Elimina un registro

SQLite crea automáticamente la base de datos personas.db.

Personalización

Puedes añadir nuevos campos al formulario editando tanto el backend como los archivos App.jsx (React) y App.vue (Vue).

Modifica las ciudades disponibles directamente en los frontends según tus necesidades.

Requisitos del sistema

Node.js v14 o superior

npm
