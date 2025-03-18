# CRUD App - Person Management

This is a simple CRUD (Create, Read, Update, Delete) application for managing personal data. The app allows users to add, update, and delete personal details, such as name, date of birth, email, and phone number. The app is built with React, ChakraUI and integrates with GraphQL via Apollo Client through NestJS backend.

## Features
- Create: Add a new person with details such as first name, last name, date of birth, email, and phone number.
- Read: View a list of all added people with their details.
- Update: Edit the information of an existing person.
- Delete: Remove a person from the list.
- Validation: All data is validated, so only specific length of a number can be used, email must match a case and be unique.

## Technologies
- React: For building the front-end.
- Apollo Client: For interacting with a GraphQL API.
- Chakra UI: For styling and UI components.
- TypeScript: For type safety across the app.
- Yup: For form validation with react-hook-form.
- NestJS: Backend server integrated with GraphQL.
- Prisma: Communication with database.

## Installation

### Setup

1) Clone repo: `git@github.com:Raam337/CRUD-app.git`

2) Install modules: `pnpm install`

3) From the root folder, initialise database: `pnpm initDb`

### Launch

Launch Frontend and Backend in Dev mode: `pnpm run:dev`

- Access app at `http://localhost:5173/`

- Access server at `http://localhost:3000/graphql`

Seed new test data if required: `pnpm prisma db seed`