# Weather App

A simple weather application built with React, utilizing Tanstack Query for data fetching and Tailwind CSS for styling.

## Table of Contents
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation and running](#installation-and-running)
- [Design Decisions](#design-decisions)
- [Technical Debt](#technical-debt)

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Tanstack Query**: A powerful library for managing server state in React applications.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **OpenWeatherMap API**: For fetching weather data.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v20 was used)
- npm (Node package manager)

### Installation and running

1. Clone the repository:
   ```bash
   git clone https://github.com/FloValdes/weather-app.git
   cd weather-app
   ```

2. Install the dependecies:
    ```bash
    npm install
    ```

3. To run the aplication:
    ```bash
    npm start
    ```

    This will start the application on http://localhost:3000. Open it in your browser to view the app.

4. To run the tests:
    ```bash
    npm test
    ```

## Design Decisions

- Component Structure: The application is divided into components for better organization and maintainability. The App component manages the overall state and routing, while WeatherInfo handles displaying weather details.

- Data Fetching: Tanstack Query is used to handle data fetching, caching, and synchronization with the server, providing a seamless user experience.

- Responsive Design: The application is designed to be responsive, with a layout that adapts to both desktop and mobile views.

## Technical Debt
Due to time constrains, I had to leave some technical debt:

- Environment Variables: The API token should be stored in an environment variable for security reasons. Currently, it's hardcoded and needs to be refactored to use process.env.

- Error Handling: The error handling in the application could be improved to provide more user-friendly messages or fallback content when the API fails to respond.

- Unit Tests: While there are tests for the App component, tests for the WeatherInfo component are missing.
