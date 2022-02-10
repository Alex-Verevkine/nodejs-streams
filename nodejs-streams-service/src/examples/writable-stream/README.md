## Writable Stream

Here we have an example of Writable ([./writable-stream.js](./writable-stream.js)) stream, where user can send a custom text through a (`POST`) request `http://localhost:3000/write-to-file` and store the text inside the ([./output](./output)) by using the `fs.createWriteStream`.
