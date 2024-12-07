# Foreign Reader Synchronization Server

This is Synchronization Server for [Foreign Reader](https://github.com/andrew2020wit/foreign-reader)

You can synchronize position for the book on different devices.

# UserKey

UserKey is a string which is used to separate data of different users and to prevent an unauthorized access.

You can use 'test-user-key', 'test-user-key-2' (3-5).
Or better to open SQLite database
(with [DB Browser for SQLite](https://sqlitebrowser.org/)),
and create your keys ("user" table).

## Position

Position is for a certain book and a certain user. The bigger position win, regardless of time.

## Mixed content issue

If you run it as http-server (not https) then you have "Mixed content" issue.
You have to allow "Mixed content" in your browser or use valid SSL certificate with https.
See for details:
[Enabling mixed content in your browser](https://experienceleague.adobe.com/en/docs/target/using/experiences/vec/troubleshoot-composer/mixed-content)

## ToDo

1. upload/download bookmarks
2. upload/download books

## Used Technologies

Nest.js, SQLite, MicroOrm, Supertest

## Deploy

It isn't deployd, because I don't want to pay for hosting. At the moment it's like a concept. 

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# e2e tests
$ npm run test:e2e
```

## License

Synchronization Server is under MIT licensed.
