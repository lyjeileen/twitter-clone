# Twitter Clone

## Project Description

A twitter clone with basic functions like login, send tweets, comment, view tweets.

<hr>

# Stack Choices:

- NextJS
- React
- Tailwindcss
- Material-UI
- PostgreSQL
- Prisma
- next-auth

<hr>

# Visual Story

- Users can see all the tweets and send/delete a tweet. Delete button only shows for the owner of tweets. The logged in user's avatar is shown on the navbar
  !["Users can see all the tweets and send a new tweet."](/public/images/tweet.gif)

- Users can view or write comments for tweets. For users without avatar like Jason, a default avatar will be shown.

  !["Users can view or write comments for tweets."](/public/images/comment.gif)

- Users can check tweets of one user or a single tweet.

  !["Users can check user page or single tweet page."](/public/images/redirect.gif)

## Getting Started

1. Fork this repository, then clone your fork of this repository.
2. Run `npm install`.
3. Set up Prisma using `npx prisma init`.
4. Migrate tables using `npx prisma migrate dev`.
5. Add .env file and include database and nextauth settings listed below. (Remember to add .env to your .gitignore file to avoid storing it into Git)

- DATABASE_URL
- EMAIL_SERVER
- EMAIL_FROM
- NEXTAUTH_URL=http://localhost:3000
- SECRET

6. Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.
