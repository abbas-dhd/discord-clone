# Discord Clone

### Built with Next.js, Tailwind CSS, and PostgresSQL and Socket.io.

Click [here](https://discord-clone-q7f5.onrender.com/) to see the live demo.

To Run this project on local first, install dependencies:

```bash
npm i
```

## Setup Environment Variables:

Add api keys and other sensitive information to a .env file in the root directory of the project. The following variables are required:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=


DATABASE_URL=

UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=

LIVEKIT_API_KEY=
LIVEKIT_API_SECRET=
NEXT_PUBLIC_LIVEKIT_URL=
```

(see example.env for an example)

## Setup Prisma

Add Postgres Database I have used Supabase to create a Postgres Database

```bash
npx prisma generate
npx prisma db push
```

## Start the app

then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Credits

Big thanks to [AntonioErdeljac](https://github.com/AntonioErdeljac/next13-discord-clone) for the tutorial!

_note_: I chose not to install some packages that I thought were not needed for the project. e.g `query-string`.
