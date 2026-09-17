# GraphQL Dashboard

A lightweight single-page web app for viewing a student profile, progress, and transactions from the Zone01 platform using GraphQL and JWT-based authentication.

## Overview

This project is a vanilla JavaScript frontend that:

- logs a user into the Zone01 authentication API
- stores the JWT in localStorage
- fetches profile information, progress, and transaction data through GraphQL
- renders a simple SPA dashboard with navigation pages

It is designed as a client-side dashboard for checking account data without using a framework.

## Features

- User login with Zone01 credentials
- JWT session handling
- Profile page
- Progress page
- Transactions page
- Route-based navigation using hash URLs
- Simple responsive layout

## Tech Stack

- HTML
- CSS
- JavaScript (ES modules)
- Fetch API
- GraphQL endpoint from Zone01

## Project Structure

```bash
.
├── index.html
├── README.md
├── assetes/
│   └── main.css
├── js/
│   ├── app.js
│   ├── auth/
│   │   ├── action.js
│   │   ├── logIn-page.js
│   │   └── logout.js
│   └── pages/
│       ├── renderNavBar.js
│       ├── renderNotFound.js
│       ├── renderProfile.js
│       ├── renderProgress.js
│       ├── renderTransactions.js
│       └── actions/
│           ├── userInfroAction.js
│           ├── userProgressAction.js
│           └── userTransactions.js
├── templates/
│   ├── 404.html
│   ├── banner.html
│   ├── home.html
│   ├── login.html
│   ├── progress.html
│   ├── transactionsInfoSection.html
│   └── userInfo.html
```

## Getting Started

### 1. Clone the repository

```bash
git clone git@github.com:yelhaoua/GraphQL.git
cd GraphQL
```

### 2. Run the app locally

Because this project loads templates and assets via relative paths, it should be served over a local web server instead of opening the HTML file directly.

```bash
python3 -m http.server 8000
```

Then open:

```bash
http://localhost:8000
```

### 3. Log in

Use your Zone01 username and password in the login form to authenticate.

## Authentication Flow

The app performs the following steps:

1. Sends a POST request to the Zone01 signin endpoint with Basic Auth credentials.
2. Receives a JWT token.
3. Saves the token in localStorage.
4. Sends subsequent GraphQL requests with the JWT using the Authorization header.

## Notes

- This is a front-end project only; it does not include a backend.
- The app depends on the external Zone01 API and GraphQL endpoints.
- If the API is unavailable or the credentials are invalid, the app shows an error message.

## Important Warning

This project is intended for educational and personal use and relies on the external authentication and GraphQL APIs of the Zone01 platform. API behavior may change over time.

## License

This project does not currently include a license file. If you plan to publish or share it publicly, consider adding an appropriate open-source license such as MIT.

## Contributing

Pull requests and improvements are welcome. To contribute:

1. Fork the project
2. Create a feature branch
3. Make your changes
4. Open a pull request

## Contact

If you want to improve or extend this project, feel free to open an issue or contribute directly.
