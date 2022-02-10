# Intro To Node Streams

## description: this project include high level introduction in to a world of node js streams with soe different examples.

[Streams Documentation](./docs/intro-page.md)

## Examples Setup

In order to play around with examples you need to:

- **start mongo** - by running command `docker-compose up -d` inside a root directory of the project.
- **create a large(5gb) dummy file** - by running `./large-file-creation.sh` inside a root directory of the project (it will take a minute or two, so be patient 🙂 ).
- **start data service** - by going to `/node-streams-data-service` directory and running `npm start`.
- **start streams service** - by going to `/nodejs-streams-service` directory and running `npm start`.

## Streams Examples

- [Readable](nodejs-streams-service/src/examples/readable-stream/README.md)
- [Writable](nodejs-streams-service/src/examples/writable-stream/README.md)
- [Duplex](nodejs-streams-service/src/examples/duplex-stream/README.md)
- [Transform](nodejs-streams-service/src/examples/transform-stream/README.md)
- [Database data mutation example](nodejs-streams-service/src/examples/documents-mutation/README.md)
