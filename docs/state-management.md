# 🗃️ State Management

There are different needs for different types of state that can be split into several types:

## Application State

This application does not store application state in a centralized state management system like `Redux`. This is due to the only state in the application coming from the API Layer. Therefore, adding a library like `Redux` will only add complexity without additional benefits.

## Server Cache State

This application uses Tanstack Query to handle Server Cache State. This is the state that comes from the server which is being cached on the client for further usage. It is possible to store remote data inside a state management store such as redux, but there are better solutions for that.

Tanstack Query is configured in `src/lib/react-query.ts`.

[Tanstack Query Documentation](https://react-query.tanstack.com/)

[Tanstack Query Example](../src/features/astronaut/api/getAstronauts.ts)

## Form State - React Hook Form & Zod

The Application uses React Hook Form and Zod to handle Form State and Validation. This is the state that tracks users inputs in a form.

[React Hook Form documentation](https://react-hook-form.com/)

[Zod documentation](https://zod.dev/)

[Example Code](../src/features/auth/components/login-form.tsx)
