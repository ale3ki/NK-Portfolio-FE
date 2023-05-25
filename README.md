# Nicolaas's Portfolio 

This is a Next.js project bootstrapped with create-next-app.

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