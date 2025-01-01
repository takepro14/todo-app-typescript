# TODO App

This is a simple TODO app using TypeScript.

## Getting Started

```sh
docker compose build
docker compose up
```

## DB console

```sh
docker ps
docker exec -it <container_id> sh
psql -U postgres -d todoapp -h localhost
```
