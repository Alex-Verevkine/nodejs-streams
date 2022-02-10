## Duplex Stream

Here we have an example of Duplex ([./duplex-stream.js](./duplex-stream.js)) stream, where user can send a custom text through a (`POST`) request `http://localhost:3000/write-with-throttle` and store the text inside the ([./output](./output)) with a throttle of 10 seconds by using a custom created `Throttle` stream extended from a standard `Duplex` stream.
