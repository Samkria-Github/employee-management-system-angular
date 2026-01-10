# EmployeeManagement

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.19.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

# EmployeeManagement 🚀

[![Angular](https://img.shields.io/badge/Angular-18%2B-red)](https://angular.dev/)
[![PrimeNG](https://img.shields.io/badge/PrimeNG-17%2B-orange)](https://primeng.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue)](https://www.typescriptlang.org/)

**Full-featured Employee Management System** with **Role-Based Access Control (RBAC)**, **Dark/Light Theme**, **Advanced Table Operations**, and **LocalStorage persistence**. Generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.19.

## ✨ Features Overview

| Feature | Description |
|---------|-------------|
| **🔐 RBAC** | Admin (Full CRUD) vs Subadmin (View Only) |
| **📊 CRUD** | Complete Add/Edit/Delete/View operations |
| **📈 Table** | Pagination, Sorting, Filtering, Search |
| **🌙 Theme** | Light/Dark mode toggle (persists) |
| **📱 Responsive** | Mobile/Tablet/Desktop optimized |
| **💾 Offline** | LocalStorage - No backend required |
| **⚡ Signals** | Angular 18+ reactive state management |

## 🎯 Login Credentials

| **Role** | **Email** | **Password** | **Access Level** |
|----------|-----------|--------------|------------------|
| **👑 Admin** | `admin@yopmail.com` | `Test@123` | ✅ **Full Access** |
| **🧑‍💼 Subadmin** | `subadmin@yopmail.com` | `Test@123` | ✅ **View Only** |

---

## 🚀 Quick Start

```bash
# Clone & Install
git clone <your-repo-url>
cd EmployeeManagement
npm install

# Development Server
ng serve

# Open Browser
http://localhost:4200

 Frontend: Angular 19 (Signals)
🎨 UI: PrimeNG 19 (Aura Theme)
📊 Table: PrimeNG Table (Pagination/Sort/Filter)
🔐 Auth: Custom RBAC + Guards
💾 Storage: LocalStorage
📝 Forms: Reactive Forms + Validation
🌙 Theme: CSS Variables + Service
📱 Routing: Lazy Loading + Nested
