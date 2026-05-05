# 🎵 LumiMusic – Plataforma de Aprendizaje Musical

## 📌 Descripción

LumiMusic es una aplicación web fullstack orientada al aprendizaje musical. Permite a los usuarios seleccionar instrumentos, inscribirse en cursos, completar lecciones y hacer seguimiento de su progreso.

El sistema incluye un panel de administración para gestionar instrumentos, cursos y lecciones.

---

## 🛠️ Tecnologías utilizadas

* Backend: Laravel (PHP)
* Frontend: React + Vite
* Base de datos: MySQL
* Contenedores: Docker

---

## 🚀 Ejecución del proyecto

### ✅ Requisitos

* Tener Docker instalado

---

### ▶️ Pasos

Ejecutar el siguiente comando en la raíz del proyecto:

```bash
docker compose up --build
```

---

## 🌐 Acceso a la aplicación

* Frontend: http://localhost:5173
* Backend: http://localhost:8000

---

## 🔐 Usuarios de prueba

(ajusta esto a tus seeders)

* Usuario:

  * Email: [test@test.com]
  * Password: abc123.

* Admin:

  * Email: [admin@admin.com]
  * Password: abc123.

---

## ⚙️ Funcionalidades principales

### 👤 Usuario

* Registro y login
* Selección de instrumentos
* Inscripción en cursos
* Visualización de lecciones
* Seguimiento de progreso

### 🛠️ Administrador

* CRUD de instrumentos
* CRUD de cursos
* CRUD de lecciones

---

## 📦 Notas técnicas

* El sistema utiliza autenticación con Laravel Sanctum
* El estado en frontend es backend-driven
* El progreso se almacena por lección
* Arquitectura modular (model/view/controller)

---

## 📈 Estado del proyecto

El proyecto se encuentra en una fase funcional completa:

* Backend operativo con API REST
* Frontend funcional
* Sistema de progreso implementado
* Panel de administración básico completo

Pendiente:

* Mejora de UX/UI
* Sistema de tablaturas
* Búsqueda y filtros avanzados

---

## 👨‍💻 Autor

Proyecto desarrollado como Trabajo de Fin de Grado (DAW)
