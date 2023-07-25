# Next BLoC

Boilerplate repo for initial project setup with Next.js, ARIA Components, Tailwind and BLoC state management.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app), and flavored with some other technologies.

## Overview

Tech stack:

- Next.js for SSR
- Adobe Aria React component for accessibility compliance
- BLoC as state management
- Tailwind and Postcss for fast styling
- Material Desin Icons (MDI) for iconography

### Why BLoC?

BLoC stands for Bussines Logic Component and is a common approach used in Flutter for app state management.
While most of the time Redux is used with React, BLoC offers a more OOP style rather than the functional approach taken by Redux, so it might be more comfortable if you have some background in C# or Java.
It uses **RxJs** to build a Pub-Sub model. You will have to model your state, publish it as an observable, and all the components that you need them to consume your state, will subscribe to that instance.

## Running

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load custom Google Fonts.

## Learn More

To learn more about Next.js, take a look at the following resource: [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

You can have a look to BLoC Arhitecture: [On this Documentation Page](https://bloclibrary.dev/#/architecture)

For ARIA-ready components, the API is pretty straightforward and: [documented here](https://react-spectrum.adobe.com/react-aria/why.html)

Tailwind docs: [pages are here](https://tailwindcss.com/docs/utility-first)

Material Design Icons are the most complete and you can search them on: [The official page](https://pictogrammers.com/library/mdi/)
