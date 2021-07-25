# sTUMatch Backend

This repository contains the source code of the sTUMatch backend.


## Getting Started

### Installing Packages

First of all, ensure that [NodeJS](https://nodejs.org/en/) is installed on your machine.
Then, clone the repository and install the packages:

```sh
git clone https://gitlab.lrz.de/seba-master-2021/team-29/backend.git stumatch-backend

cd stumatch-backend
npm i
```


### Database Connection Setup

In order to run the application locally, you must configure a MongoDB connection string.
You can either use a local MongoDB instance or you can use a (free) online service like
[MongoDB Atlas](https://docs.atlas.mongodb.com/getting-started/) (recommended). <br/>

Once you have your connection string, create a new file called `.env` in the repository's root
folder (`stumatch-backend`). The file should have the following content (replace the
`"your_connection_string_here"` part with your actual connection string):

```env
DB_CONNECTION_STRING=your_connection_string_here
```


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


### Running the Application

At this point, you can run the application.

If you are using [VS Code](https://code.visualstudio.com/) (recommended), you can simply run and
debug the application using `F5`.

Alternatively, you can run the application using the terminal:

```sh
npm run start
```

Either way, you can now access the server's API at `localhost:4040`.
