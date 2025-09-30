# Formulario CRUD 3 en 1

Este proyecto es una aplicación completa que implementa un sistema CRUD (Crear, Leer, Actualizar y Eliminar) de personas, utilizando una arquitectura **fullstack** con backend en Node.js/Express y frontend en **React** y **Vue**. Es ideal para aprender cómo conectar un frontend moderno con una API y una base de datos real.

## Características principales

- **Backend con Node.js + Express**: expone una API RESTful para gestionar personas en una base de datos SQLite.
- **Frontend con React y con Vue**: dos versiones del formulario, usando los frameworks más populares de JavaScript.
- **Base de datos SQLite**: almacenamiento ligero y fácil de usar.
- **Validaciones de formulario** en ambos frontends.
- **Diseño moderno y responsivo**.

## Estructura del proyecto

```
formulario-crud-3-in-1/
│
├── backend/       # Servidor Express + SQLite
│   └── server.js
│
├── react-app/     # Aplicación frontend en React
│   └── src/
│       └── App.jsx
│
├── vue-app/       # Aplicación frontend en Vue
│   └── src/
│       └── App.vue
│
└── README.md      # Este archivo
```

---

## Instalación y ejecución

### 1. Backend

1. Instala dependencias:
   ```sh
   cd backend
   npm install
   ```
2. Arranca el servidor:
   ```sh
   node server.js
   ```
3. El backend quedará disponible en `http://localhost:3000/api/personas`

### 2. Frontend (React)

1. Instala dependencias:
   ```sh
   cd react-app
   npm install
   ```
2. Arranca la app:
   ```sh
   npm run dev
   ```
3. Accede desde tu navegador a la URL que indique la terminal (usualmente `http://localhost:5173`).

### 3. Frontend (Vue)

1. Instala dependencias:
   ```sh
   cd vue-app
   npm install
   ```
2. Arranca la app:
   ```sh
   npm run dev
   ```
3. Accede desde tu navegador a la URL que indique la terminal.

---

## Uso

- **Crear persona:** Llena el formulario y haz clic en "Crear".
- **Editar persona:** Haz clic en "Editar" en la fila correspondiente, modifica los campos y haz clic en "Actualizar".
- **Eliminar persona:** Haz clic en "Eliminar" y confirma la acción.
- **Limpiar formulario:** Haz clic en "Cancelar" durante la edición.

Los formularios validan los campos requeridos (DNI, nombres, apellidos, fecha de nacimiento, género, ciudad).

---

## Endpoints del backend

- `GET /api/personas` — Lista todas las personas
- `GET /api/personas/:id` — Obtiene una persona por ID
- `POST /api/personas` — Crea una nueva persona
- `PUT /api/personas/:id` — Actualiza una persona existente
- `DELETE /api/personas/:id` — Elimina una persona

La base de datos SQLite se crea automáticamente (`personas.db`).

---

## Personalización

- Puedes agregar más campos al formulario modificando tanto el backend como el frontend.
- Puedes cambiar las ciudades disponibles en el formulario desde los archivos `App.jsx` (React) y `App.vue` (Vue).

---

## Requisitos

- Node.js v14+
- npm

---

## Créditos

Desarrollado por [kevinazuero](https://github.com/kevinazuero)

---
