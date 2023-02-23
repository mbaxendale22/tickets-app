#Development Environment Set Up

1. Clean the database and redeploy prisma migrations using docker: `yarn db:dev:restart`
2. Serve the DB on localhost using `yarn start:dev`
3. Run prisma studio, you will need to create a user/data from scratch after the db clean: `npx prisma studio`
4. Start the client (from the client directory): `yarn dev`

You're in buisness!
