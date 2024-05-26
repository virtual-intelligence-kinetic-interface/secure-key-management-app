# ![Secure Key Management](https://nodejs.org/static/logos/nodejsDark.svg)


> ### Node js + Express codebase containing a sample project (CRUD, auth, advanced patterns, etc) (https://github.com/virtual-intelligence-kinetic-interface/secure-key-management-app.git) spec and API.

This codebase is under development, but feel free to add and fork. Add your suggestions.

## Getting started

To get app running locally:

- Clone this repo
- `npm install` to install all req'd dependencies
- `npm start` to start the local server (this project uses create-react-app)

Local web server will use port 2501 standard. Swagger open API for API documentation and testing. 
You can add `.env` file in the root folder of project to set environment variables (use PORT to change webserver's port). This file will be ignored by git, so it is suitable for API keys and other sensitive stuff. 

Refer to [dotenv](https://github.com/motdotla/dotenv) 

Local Url : http://localhost:2501/

## Features

- sequelize migration with MYSQL as database
- controllers with exception handling and return types.
- email templates ejs for notifications.
- JWT for authentication.
- routes for managing endpoints.

## Functionality overview

This application is a node js express sample project.

**General functionality:**

- Authenticate users via JWT (token generation)


**API endpoints:**

 POST 'https://app.domain.com/api/v1/template/auth/login'

<br />

[![Author : Ariz F.](https://avatars.githubusercontent.com/u/57425134?v=4)]