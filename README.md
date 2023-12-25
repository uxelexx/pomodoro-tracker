# Pomodoro Tracker

Pomodoro Tracker is a productivity application that utilizes the Pomodoro Technique to help users manage their time effectively.

![pomodoro-app](https://github.com/uxelexx/pomodoro-tracker/assets/101667706/95466b94-c585-4d29-9fca-7710d14ccf4f)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Learned](#learned)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)

## Introduction

The Pomodoro Tracker is a simple and intuitive tool designed to improve your productivity by breaking your work into intervals, traditionally 25 minutes in length, separated by short breaks.

## Features

- **Pomodoro Timer**: Set the timer for your work sessions.
- **Customizable Durations**: Adjust the durations for Pomodoro sessions, short breaks, and long breaks.
- **Color Customization**: Choose your preferred color theme to create a personalized workspace.
- **Pause and Resume**: Pause and resume your Pomodoro sessions.
- **Settings**: Configure and customize your Pomodoro settings.
- **Acessibility**: Fully accessible with keyboard.

## Learned

- **Modal Focus Trapping**: The modal focus trapping feature allows users to easily navigate between modal elements without losing focus.
- **Responsive Design**: App designed to be responsive and accessible across different screen sizes.
- **Accessibility**: Pomodoro is fully accessible with keyboard navigation.

## Technologies Used

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Css Modules](https://www.npmjs.com/package/css-modules)
- [Vite](https://vitejs.dev/)
- [Immer](https://immerjs.github.io/immer/)

## Installation

1. Clone the repository
2. Install dependencies (node -v 20.10.0)

```bash
pnpm install
```

## Usage

1. Start the development server

```bash
pnpm dev
```

2. Open the browser and navigate to http://localhost:{your-port}
3. Customize Pomodoro settings, start the timer, and boost your productivity!

> NOTE: If you want to change durations or colors open `utils\constants.ts` and change values there. (Do not forget to change types too).
