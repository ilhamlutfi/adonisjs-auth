# AdonisJS Auth Project

Welcome to the AdonisJS Auth Project! This project is a boilerplate to help you get started with AdonisJS, a Node.js MVC framework.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)

## Installation

To get started, clone the repository and install the dependencies:

```bash
git clone https://github.com/yourusername/adonis-auth.git
cd adonis-auth
npm install
```

## Usage

### Run Database Migrations:
Before using the application, you need to run the **create a database** and run migrations to set up the required tables:

```bash
node ace migration:run
```

### Seed the Database (Optional):
If you want to seed some initial data into the database (e.g., for testing), you can run:

```bash
node ace db:seed
```
This step is optional but helpful for testing purposes. Running this command will generate a default user account with the following credentials:

    - Email: user@example.com
    - Password: password (hashed)

This account can be used for logging into the application during development or testing.

### Start the development server:
To start the development server, run:

```bash
npm run dev
```

The server will start on `http://localhost:3333`.

## Features

- Ready-to-use authentication @adonisjs/auth, like :
  - login
  - register
  - reset password
  - forgot password
  - logout
- security rate limiting @adonisjs/limiter 

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## Show Your Support

If you like this project, please give it a ⭐️ on GitHub!

