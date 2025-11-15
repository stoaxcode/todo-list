# TODO-LIST

A simple, modular, and scalable task management application built using
JavaScript and Webpack.

## Badges

![license](https://img.shields.io/github/license/stoaxcode/todo-list?style=for-the-badge&logo=opensourceinitiative&logoColor=white&color=00ADD8)
![last-commit](https://img.shields.io/github/last-commit/stoaxcode/todo-list?style=for-the-badge&logo=git&logoColor=white&color=00ADD8)
![repo-top-language](https://img.shields.io/github/languages/top/stoaxcode/todo-list?style=for-the-badge&color=00ADD8)
![repo-language-count](https://img.shields.io/github/languages/count/stoaxcode/todo-list?style=for-the-badge&color=00ADD8)

## Built With

- Express
- JSON
- npm
- Webpack
- JavaScript
- Ajv
- CSS
- date-fns

---

## Overview

A modular Todo List app that allows users to create projects, add tasks,
manage due dates, track completion status, and persist data using local
storage. This project emphasizes clean architecture, reusable modules,
and Webpack bundling.

---

## Features

- Create, edit, and delete tasks
- Organize tasks into projects
- Assign due dates using date-fns
- Persistent storage using localStorage
- Dynamic DOM rendering
- Modular ES6 structure
- Webpack dev/prod builds

---

## Project Structure

    └── todo-list/
        ├── LICENSE
        ├── README.md
        ├── package-lock.json
        ├── package.backup.json
        ├── package.json
        ├── src
        │   ├── Inter-VariableFont_opsz,wght.woff
        │   ├── index.js
        │   ├── modules
        │   ├── styles
        │   └── template.html
        ├── webpack.common.js
        ├── webpack.dev.js
        └── webpack.prod.js

---

## Getting Started

### Prerequisites

- JavaScript
- npm

### Installation

```sh
git clone https://github.com/stoaxcode/todo-list
cd todo-list
npm install
```

### Usage

```sh
npm start
```

### Testing

```sh
npm test
```

---

## Roadmap

- [x] Initial UI and project structure
- [ ] Add task filtering
- [ ] Add project color coding
- [ ] Implement drag-and-drop sorting

---

## Contributing

See guidelines in the repo. Standard Git workflow applies.

---

## License

This project is licensed under the LICENSE file included in the
repository.

---

## Acknowledgments

Thanks to contributors, inspiration sources, and open‑source tools.
