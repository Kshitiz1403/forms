The project uses postgreSQL and Nodejs with Typescript

## Option - 1

Run 
```
docker compose up
```

## Option - 2

In order to setup postgresSQL on your machine, you can run

```
docker run --name postgres -e POSTGRES_PASSWORD=root -d -p 5432:5432 postgres
```

And to setup the nodejs project, run

```
yarn install
yarn start
```

Note - Make sure to add your own env file using the `env.example` file included in the project.

I will soon be setting up a Docker compose file as well :)
