# 🚀 Angular Evolution: Modern Standards (v21+)

A professional showcase of building high-performance, scalable applications using Modern Angular patterns.

[English Version](#english) | [Versión en Español](#español)

---

<a name="english"></a>
## 🇺🇸 English

### Project Overview
This repository serves as a professional showcase of my journey and experience with **Angular**, focusing on the latest architectural patterns introduced in **version 21** and beyond. The goal is to demonstrate how to build scalable, high-performance applications using a minimalist, signals-driven approach.

### 🛠 Tech Stack
* **Framework:** Angular 21 (Standalone Components)
* **State Management:** Angular Signals & SignalStore
* **Styling:** Tailwind CSS (Utility-first)
* **Package Manager:** PNPM
* **Architecture:** Domain-Driven Design (DDD)

### 🏗 Key Features & Learnings
* **Functional Patterns:** Implementation of Functional Guards and Interceptors instead of class-based boilerplate.
* **Signals Everywhere:** Complete removal of heavy RxJS management where Signals provide a more reactive and performant alternative.
* **SFC (Single File Components):** Embracing a minimalist file structure where Logic, Templates, and Tailwind styles coexist in a single `.ts` file.
* **Advanced Validation:** Reusable Cross-Field Reactive Form validators (Factory Pattern).
* **Modern Routing:** Nested lazy-loading using `loadChildren` and `loadComponent` for optimized bundle sizes.

---

<a name="español"></a>
## 🇪🇸 Español

### Descripción del Proyecto
Este repositorio es una vitrina profesional de mi experiencia con **Angular**, enfocándose en los patrones arquitectónicos más recientes introducidos en la **versión 21**. El objetivo es demostrar cómo construir aplicaciones escalables y de alto rendimiento utilizando un enfoque minimalista basado en Signals.

### 🛠 Stack Tecnológico
* **Framework:** Angular 21 (Componentes Standalone)
* **Estado:** Angular Signals & SignalStore
* **Estilos:** Tailwind CSS
* **Gestor de Paquetes:** PNPM
* **Arquitectura:** Diseño Orientado al Dominio (DDD)

### 🏗 Características Clave y Aprendizajes
* **Patrones Funcionales:** Implementación de Guards e Interceptors funcionales, eliminando el "boilerplate" de las clases tradicionales.
* **Signals por doquier:** Sustitución de flujos complejos de RxJS por Signals para una reactividad más ligera y eficiente.
* **SFC (Single File Components):** Adopción de una estructura de archivos minimalista donde la lógica, el template y los estilos de Tailwind coexisten en un único archivo `.ts`.
* **Validación Avanzada:** Validadores de formularios reactivos reutilizables mediante Factory Functions para comparaciones entre campos.
* **Routing Moderno:** Carga perezosa (Lazy Loading) anidada mediante `loadChildren` y `loadComponent` para optimizar el peso del bundle.

---

## 📂 Folder Structure / Estructura de Carpetas

The project follows a Domain-Driven Design (DDD) approach to ensure modularity and ease of maintenance:

```text
src/app/
├── core/         # Global infrastructure: guards, interceptors, and singleton services
├── features/     # Domain-specific modules (Auth, Dashboard, Items)
├── shared/       # Reusable UI components, interfaces, and custom validators
├── app.config.ts # Global providers (HTTP, Routing)
└── app.ts        # Main Shell component