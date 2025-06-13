# 🐾 Pet Manager

A frontend project built with **React**, **TypeScript**, focused on clean architecture, strong typing, and excellent developer experience.

![Gravació de pantalla 2025-05-22 a les 17 17 24](https://github.com/user-attachments/assets/6f28aeb5-7aed-40ae-86c0-c9fc9bea6ca7)

---

## 🚀 Getting Started

To run the project locally, follow these steps:

- 📦 Install dependencies: `yarn`
- 🔌 Run server: `yarn server`
- 🧪 Start the dev server: `yarn dev`
- ✅ Run unit tests with Vitest: `yarn test`

> [!WARNING]  
> If you use npm, just run `npm i -g yarn`

## 📁 DX oriented

To see the full potential of the checks just run `yarn precommit`. All checks will pass.

### 📁 Project Structure

Below is an overview of the folder structure and their responsibilities:

```
pet-manager/
├── src/
│   ├── adapters/          # 🧩 Adapt data from services to UI-friendly shapes
│   ├── components/        # 🧱 Reusable, presentational React components
│   ├── context/           # 🌐 Global app state and routing logic
│   ├── controllers/       # 🎮 Coordinates business logic (like useCases)
│   ├── pages/             # 🗺️ Entry points for each route/view
│   ├── services/          # 🔌 API clients and side-effect handlers
│   ├── storage/           # 💾 Storage handlers for fetch persistence
│   └── main.tsx           # 🚀 App entry point
├── tests/                 # 🧪 Playwright integration tests
└── ...
```

This structure promotes clarity, scalability, and testability — each layer has a single responsibility and communicates with others through well-defined boundaries.

✅ Testing Strategy

- Unit tests with Vitest for components, services and logic
- Integration tests with Playwright simulate real user behavior
- Tests are written following a BDD-style to align with the business requirements provided in the original exercise

### 📁 Slides

Run `yarn` in /slides.
And then you can run `yarn slides` to see the presentation for the project.

---

Built with ❤️ clean code, strong architecture, and a touch of feline fun 🐈
