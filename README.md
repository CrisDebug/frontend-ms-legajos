# 📦 Sistema de Gestión de Legajos — Microservicios + Angular + Oracle

## 📌 Descripción
Sistema distribuido de gestión de legajos y casilleros basado en arquitectura de microservicios con Spring Boot, frontend en Angular 19 y base de datos Oracle XE, orquestado con Docker Compose. Incluye autenticación JWT y control de acceso por roles.

---

## 🧱 Arquitectura

### 🔹 Backend (Microservicios)
- **Usuarios Service (Auth)** → `:8084`
  - Registro y login
  - Generación de JWT
- **Legajos Service** → `:8083`
  - Gestión de legajos
- **Casilleros Service** → `:8082`
  - Gestión de casilleros

### 🐳 Infraestructura
- Oracle XE (`1521`)
- Docker Compose
- Microservicios independientes

---

## 🎨 Frontend (Angular 19)

- Standalone Components
- Tailwind CSS
- Reactive Forms
- HTTP Interceptor JWT
- Route Guards
- Arquitectura modular

src/app/
├── core/auth (services, guards, interceptors)
├── features/
│ ├── auth
│ ├── legajos
│ ├── casilleros
├── layout/main-layout



---

## 🔐 Autenticación JWT

### Flujo:
1. Login usuario
2. Backend genera JWT
3. Token guardado en `localStorage`
4. Interceptor agrega:

Authorization: Bearer <token>

5. Guards protegen rutas

---

## 👤 Funcionalidades

### 🔑 Auth
- Login con validaciones
- Registro de usuario
- Logout
- Auto-login
- Decodificación JWT (email + rol)

### 🧭 UI
- Topbar con usuario autenticado
- Login responsive (mobile-first)
- Validaciones visuales
- Loading en login

### 🔒 Seguridad
- Route Guards
- HTTP Interceptor
- JWT stateless

---

## 📊 Base de Datos (Oracle)

- USUARIO (APP_ADMIN)
- LEGAJOS (USUARIO_LEG)
- CASILLEROS (USUARIO_CAS)

---

## 🚀 Ejecución

### Backend
```bash
docker-compose up --build

Frontend

npm install
ng serve

http://localhost:4200

🔗 Endpoints

Auth

POST /api/auth/login
POST /api/auth/register

Legajos

GET /legajos

Casilleros

GET /casilleros 