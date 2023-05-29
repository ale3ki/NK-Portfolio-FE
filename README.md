# Nicolaas's Portfolio 

This is a Next.js project bootstrapped with 
```markdown 
create-next-app@latest project-name --use-npm
```

## Naming Conventions

### Pages

All directories and files inside the `app` directory, which represent pages, use camelCase naming.

For example, if you have two pages that display different projects, the directory structure might look like this:

```markdown
app/
└── projects/
    ├── projectOne/
    │   └── page.jsx
    └── projectTwo/
        └── page.jsx
```        

# Components

For components, the directory names follow camel case, while the component file names follow Pascal case.

For example, if you have two components that display different types of project cards, the directory structure might look like this:

```markdown
components/
├── ProjectCardOne/
│   ├── component.jsx
│   └── styles.module.css
└── ProjectCardTwo/
    ├── component.jsx
    └── styles.module.css
```
## Importing Components and Pages

When you want to use these components or pages in your application, you'll need to import them into the file where they'll be used.

### Pages

For pages, you can import them using their path relative to the file where you're importing. For example, if you're in a file at the root of your project and you want to import the `page.jsx` from `projectOne`, you would do:

```jsx
import ProjectOne from './app/projects/projectOne/page';

```

### Components

For components, the process is similar. If you're in a file at the root of your project and you want to import the component.jsx from projectCardOne, you would do:

```jsx
import ProjectCardOne from './components/ProjectCardOne/component';

```

# ApiService (APS) - Custom API DataStore

## Overview

ApiService is a data management class designed to interact with a RESTful .NET backend. It facilitates the retrieval and caching of data, in addition to automating fetch operations. The service has an inherent error-handling mechanism and features a single getter for container data. The class is instantiated once at the top-level, within the `ApiServiceProvider` component that is used in `layout.tsx`, and it starts automatically when a consumer first loads the website.

### Key Characteristics

- **Automated Fetch Operations:** The service is designed to fetch all page data upfront and cache it for quick and easy access. If a consumer requests data before it has been loaded, the service can load it asynchronously.

- **Error Handling:** The service includes mechanisms to handle any errors that occur during the fetch operation. It can identify and log various types of errors, such as network errors or errors related to missing page or container data.

- **Cached Data Store:** All page data fetched by the service is stored in a local cache, allowing components to quickly retrieve the data they need without additional network requests.

- **Single 'Getter' for Container Data:** The service provides a single public method, `getContainerDataByPageID`, which components and pages can use to fetch data for specific containers. A 'container' here represents a 'section' of data that might be used by multiple components.

## ApiServiceContext

The `ApiServiceContext` is a React context created to provide the ApiService instance across the application. It includes the `ApiServiceProvider` component, which initializes and provides the ApiService, and the `useApiService` hook, which can be used by components to access the ApiService.

## Usage

The ApiService class is instantiated once in the ApiServiceProvider component. This component wraps the root component in `_app.tsx`, thereby providing the ApiService to all components in the application through context. To access the ApiService in a component, use the `useApiService` hook.

### Using the `useApiService` hook

Components can use the `useApiService` hook to access the ApiService instance and fetch data as needed. Data fetching is usually done inside a `useEffect` hook to ensure it runs once the component has mounted.

A state variable is used to store the fetched data. Before the data has loaded, this variable is `null`, and a loading indicator can be shown.

Here is an example of how to use `useApiService` to fetch data in a component:

```jsx
import { useState, useEffect } from 'react';
import { useApiService } from 'path/to/ApiServiceContext';

// Define a type for your data
interface MyData {
  // ...
}

const MyComponent = () => {
  // Create a state variable to store your data
  const [data, setData] = useState<MyData | null>(null);

  // Get the ApiService instance
  const apiService = useApiService();

  // Fetch data once the component has mounted
  useEffect(() => {
    const fetchData = async () => {
      const result = await apiService.getContainerDataByPageID(0, 5);
      setData(result);
    };

    fetchData();
  }, [apiService]);

  // Render a loading indicator while the data is being fetched
  if (!data) return <div>Loading...</div>;

  // Render your component using the fetched data
  return <div>{/* ... */}</div>;
};
```
This pattern can be used in any component that needs to fetch data using the ApiService. 

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

```markdown
---
© 2023 ale3ki. All Rights Deprecated.

Engineered with enthusiasm, endurance, and extra-strong espresso. 🚂☕

```