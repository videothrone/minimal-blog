# Minimal Blog

This is a minimal blog boilerplate done with Next.js which I'll extend in functionality down the line. This was done to prepare for a live coding challenge to learn Next.js + Tailwind. The initial basis for it is [ByteGrad's Next.js course](https://bytegrad.com/courses/professional-react-nextjs), which I will probably alter drastically over time.

## Preview

![Minimal Blog](/public/screenshot.png)

## Tech

- [Next.js](https://nextjs.org/) is bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and uses Typescript and App Router
- CSS is handled with Tailwind at the moment
- Auth is done with [Kinde](https://kinde.com/)
- The ORM for handling the DB is [Prisma](https://www.prisma.io/) which runs SQLite at this time
- This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
- Icons are rendered via [Hero Icons](https://heroicons.com/)

## Features

- The blog has three pages and one dynamic page / route: `Home`, `Posts`, `Create post` and `[id]` which creates a individual page for every blog entry.
- `Create posts` is protected by Kinde Auth and setup the `middleware.ts` file
- Created posts are saved via Prisma in a SQLlite file in the `/prisma` folder

## Getting Started

### Project Setup

```sh
npm install
```
### Init Prisma DB

```sh
npx prisma init --datasource-provider sqlite
npx prisma push db
```

### Create .env file for Auth with Kinde (you need to create an account on Kinde and create a project there)
```DATABASE_URL="file:./dev.db"

KINDE_CLIENT_ID=yourclientid
KINDE_CLIENT_SECRET=yourclientsecret
KINDE_ISSUER_URL=yoururlfromkinde
KINDE_SITE_URL=http://localhost:3000
KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:3000
KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3000/create-post
```

## Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


