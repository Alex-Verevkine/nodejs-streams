# Different Types of Streams:

- **Readable**: a stream you can pipe from, but not pipe into (you can receive data, but not send data to it). When you push data into a readable stream, it is buffered, until a consumer starts to read the data.

  `❌ -> Readable Stream -> ✅`

- **Writable**: a stream you can pipe into, but not pipe from (you can send data, but not receive from it).

  `✅ -> Writable Stream -> ❌`

- **Duplex**: a stream you can both pipe into and pipe from, basically a combination of a Readable and Writable stream.

  `Data on Input ✅ -> Duplex Stream -> ✅ Same Data on Output`

- **Transform**: a Transform stream is similar to a Duplex, but the output is a transform of its input.

  `Data on Input ✅ -> Transform Stream -> ✅ Transformed Data on Output`

[⏮️ **Prev**](./what-it-solves-page.md) **/** [**Next**⏭️](./thanks-page.md)
