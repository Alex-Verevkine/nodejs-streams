## Readable Stream

In this example we have `two` implementations of a `GET` endpoint where user able to download a large dummy file.

- In Memory endpoint ([./in-memory-read.js](./in-memory-read.js)):
  If you will try to make a `GET` request to `http://localhost:3000/read-without-stream` endpoint, you will receive a following error:

  ```
  RangeError [ERR_FS_FILE_TOO_LARGE]: File size (5368709120) is greater than possible Buffer: 2147483647 bytes
  ```

  This issue happens because the `fs.readFileSync`, who is trying to load an entire file in to a memory before sending it to a user.

- Stream Read endpoint ([./stream-read.js](./stream-read.js)):
  If you will try to make a `GET` request to `http://localhost:3000/read-with-stream` endpoint, you will see that your browser will start to download a dummy text file.

  So as we see we are solved the large file issue, bu using a Readable Stream (`fs.createReadStream`) and sending a file to a User in chunks without storing the entire file in memory.
