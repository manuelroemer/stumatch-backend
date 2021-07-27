# sTUMatch Backend

This repository contains the source code of the sTUMatch backend.

**Context about the project:**<br/>
sTUMatch is a social platform where students of a specific university can connect to others via
comments on university news, a dedicated matching system and a chat. sTUMatch allows university
employees to post about interesting events and advertisers to create and host advertisements
target specifically at students of the respective university.

The prototype was written as part of the SEBA Master course in a team of 4 students (Nhu, Manu, Khang, Jonas).
Prior experience with the technologies at hand was close to zero for most team members and the given time
frame for completion was about ~2 months only.
The code reflects this situation in parts, so **don't expect best practices accross the board** -
nontheless, the final prototype overall works well and can certainly be looked at!


## Getting Started

### Installing Packages

Ensure that [NodeJS](https://nodejs.org/en/) is installed on your machine.
Clone the repository and install the packages:

```sh
git clone https://gitlab.lrz.de/seba-master-2021/team-29/backend.git stumatch-backend

cd stumatch-backend
npm i
```


### Database Connection Setup

In order to run the application locally, you must configure a **MongoDB connection string**.
We were using [MongoDB Atlas](https://docs.atlas.mongodb.com/getting-started/) (recommended), 
but you should be able to use any DB which allows connecting via a connection sring. <br/>

Once you have your connection string, create a new file called `.env` in the repository's root
folder (`stumatch-backend`). The file should have the following content (replace the
`"your_connection_string_here"` part with your actual connection string):

```env
DB_CONNECTION_STRING=your_connection_string_here
```

You can have a look at the [.env.example](./.env.example) file to see what it should look like.


### Database Seeding

> **⚠️ Warning:**<br/>
> Seeding the database clears/resets all existing collections that the application typically uses.
> Be careful when seeding non-local/shared databases.

With the database connection being setup, you can already run the application.
Before doing so, it usually makes sense to seed the database with dummy data that aids
during development.
You can do this by running the following command:

```sh
npm run seed
```

If you have done everything correctly, you should see an output similar to the following:

```
info: Using development configuration values from the .env file.
info: Successfully established the database connection.
info: Clearing existing data...
info: Existing data cleared.
info: Creating seed data...
info: Seed data created.
```

If you are seeing an error, you should re-check the connection string configuration.

> **⚠️ Important:**<br/>
> It can happen that the seeding process doesn't terminate. In that case you can do so manually
> via `CTRL+C` once the `Seed data created.` message appeared.


### Running the Application

At this point, you can run the application using the terminal:

```sh
npm run start
```

You can now access the server's API at `localhost:4040`.
