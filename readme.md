# A simple user search app

This project uses node server for backend and React for frontend.

### Prerequisite

    1. nodejs
    2. redis
    3. yarn

## Tech Stack

**Client:** React, Vite, TailwindCSS

**Server:** Node, Express, redis

**Database:** Mongodb

## Installation

Clone the repo

```
  git clone https://github.com/ahsanjamee/mern-redis.git
```

## Run Locally

Go to the project directory

```bash
  cd mern-redis
```

Install dependencies

Go to the server directory

```bash
  cd server
```

Create a .env file and copy all the things from sample.env and paste into .env file

```bash
  cp sample.env .env
```

Start the server

```bash
  yarn
  yarn dev
  redis-server
```

Start frontend

```bash
  cd client
  yarn
  yarn dev
```

View the project

```
  http://127.0.0.1:5173/
```

## Authors

- [@ahsan](https://github.com/ahsanjamee)
