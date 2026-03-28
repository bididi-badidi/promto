# Promto: Prompt Library Extension

Promto is a cross-browser extension for Chrome and Firefox designed to help you manage and organize your prompt library efficiently.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development](#development)
  - [Build](#build)
- [Technical Documentation](#technical-documentation)
  - [Architecture](#architecture)
  - [Technologies](#technologies)
- [Contributing](#contributing)
- [License](#license)

---

## Introduction

Promto is built to streamline the way users interact with AI models by providing a centralized, easily accessible library for prompts. Whether you are using ChatGPT, Claude, or any other AI interface, Promto ensures your best prompts are always just a click away.

## Features

- **Cross-Browser Support**: Fully compatible with Google Chrome and Mozilla Firefox.
- **Prompt Management**: Create, edit, and organize your prompts into categories.
- **Quick Access**: Access your library directly from the browser's extension popup.
- **Modern UI**: Built with React and TypeScript for a fast, responsive experience.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (v9 or higher)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/bididi-badidi/promto.git
   cd promto
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

To start the development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

### Build

To build the project for production:

```bash
npm run build
```

The build output will be in the `dist` directory, ready to be loaded as an extension in your browser.

## Technical Documentation

### Architecture

Promto follows a modern frontend architecture:

- **UI Layer**: React with TypeScript for type-safe component development.
- **Build System**: Vite for rapid development and optimized production builds.
- **Extension Manifest**: Configured to support both Manifest V3 (Chrome) and standard extension APIs for Firefox.

### Technologies

- **React 19**: Frontend UI library.
- **TypeScript**: For static typing and enhanced developer experience.
- **Vite**: Next-generation frontend tooling.
- **Tailwind CSS 4**: Styling tool.
- **ESLint**: Linting and code quality.

## Contributing

Contributions are welcomed! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b fea/your-feature`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin fea/your-feature`).
6. Open a Pull Request.

Please ensure your code adheres to the project's coding style (2-space indentation, JSDoc comments for all new functions/classes).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
