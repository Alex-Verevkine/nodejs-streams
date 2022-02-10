## Database data mutation

In this example we have `two` implementations of a `GET` endpoint where user is able to migrate a large number of documents inside a mongo db collection and change all of their names to uppercase ones.

**NOTE**: before every migration run the seed creation (`GET`) endpoint `http://localhost:3000/generate-seed`, in order to restore the testing database.

</br>

## Migration endpoints:

- In Memory Migration endpoint ([./in-memory-migration.js](./in-memory-migration.js)) -
  If you will try to make a `GET` request to `http://localhost:3000/manipulate-title-batch` the service will make the migration by following this steps:

  - fetch all the documents from the mongo into a memory.
  - prepare all the documents by changing their names to uppercase ones.
  - split the documents into chunks.
  - iterate over data chunks and send a (`PUT`) `http://localhost:5000/test` request for every entity inside a chunk in `Promise.all`.

  </br>

  ### Problems:

  - Such approach may have a bottle neck when the data inside a db will grow, and by fetching all of it in memory may cause for an errors and delays.
  - Sending many documents to a network may cause to request timeouts if the service who is responsible for a data update will not be able to handle in time all the data.

</br>

- Stream Migration endpoint ([./stream-migration.js](./stream-migration.js)) -
  If you will try to make a `GET` request to `http://localhost:3000/manipulate-title-stream` the service will make the migration by following this steps:

  - Create a `Readable` stream to our mongo database.
  - Connect a `Transform` stream by piping it to a mongo readable stream. This stream will be responsible to change the document name to an uppercase one.
  - Connect a third party `Transform` stream called [through2-concurrent](https://www.npmjs.com/package/through2-concurrent) by piping it to a document name changing transform stream. This stream will process 100 documents in parallel and send a (`PUT`) `http://localhost:5000/test` for every document. For every finished document, the stream will log out the finish status and pick a new document from a stream to fill the buffer to 100 docs until all the docs will be processed.

  </br>

  ### Advantages:

  - Such approach will process only a limited amount of data from the database and prevent unexpected memory overloads and fetching delays.
  - Network and the data processing service will be less overloaded by the update requests.

  </br>

As we can see Streams can be very powerful and useful. and help us to reduce the memory usage and increase the speed of our programs.
