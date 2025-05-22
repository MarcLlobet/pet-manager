# 🐾 Fever Pets

A frontend project built with **React**, **TypeScript**, focused on clean architecture, strong typing, and excellent developer experience.

![Gravació de pantalla 2025-05-21 a les 16 16 11](https://github.com/user-attachments/assets/82369734-018c-403b-8947-a98dc4cb938d)

---

## 🚀 Getting Started

To run the project locally, follow these steps:

- 📦 Install dependencies: `yarn`
- 🧪 Start the dev server: `yarn dev`
- ✅ Run unit tests with Vitest: `yarn test`

### 🧪 Integration Tests with Playwright

Integration tests are run with Playwright. They simulate real user behavior and verify that business requirements are met (BDD-style).

Before running them:

- ⚙️ Install Playwright dependencies: `yarn test:integration:install`
- 🚦 Run integration tests: `yarn test:integration`

## 🧠 Architecture

This project follows principles from Clean Architecture and Hexagonal Architecture, inspired by software design best practices.

📐 Core Design Principles

- Strict typing with TypeScript for safety and clarity
- Pure functions for predictable logic and easy testing
- SOLID principles for maintainable and scalable code
- Separation of concerns across well-defined layers
- Emphasis on testability, decoupling and modularity

### 📁 Project Structure

Below is an overview of the folder structure and their responsibilities:

```
fever_pets/
├── src/
│   ├── adapters/          # 🧩 Adapt data from services to UI-friendly shapes
│   ├── components/        # 🧱 Reusable, presentational React components
│   ├── context/           # 🌐 Global app state and routing logic
│   ├── controllers/       # 🎮 Coordinates business logic (like useCases)
│   ├── pages/             # 🗺️ Entry points for each route/view
│   ├── services/          # 🔌 API clients and side-effect handlers
│   ├── storage/           # 💾 Storage handlers for fetch persistence
│   ├── types.ts           # 🧾 Shared TypeScript types
│   └── main.tsx           # 🚀 App entry point
├── tests/                 # 🧪 Playwright integration tests
├── playwright.config.ts  # ⚙️ Playwright configuration
└── ...
```

This structure promotes clarity, scalability, and testability — each layer has a single responsibility and communicates with others through well-defined boundaries.

✅ Testing Strategy

- Unit tests with Vitest for components, services and logic
- Integration tests with Playwright simulate real user behavior
- Tests are written following a BDD-style to align with the business requirements provided in the original exercise

---

Built with ❤️ clean code, strong architecture, and a touch of feline fun 🐈
