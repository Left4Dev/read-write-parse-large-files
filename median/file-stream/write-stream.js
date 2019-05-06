const fs = require('fs')

module.exports = class WriteStream {
  constructor (fileStream) {
    this.fileStream = fileStream
    this.writeStream = {}
    this.count = 0
  }
  create (fileName) {
    this.writeStream = fs.createWriteStream(fileName || this.fileStream.fileName)
  }
  async file (length, createChunk) {
    this.length = this.counter = length

    this.create()
    this._writeAll(createChunk)
    await this._end()
  }
  async fileChunk (init, isLast, chunk) {
    if (init) {
      this.create()
      this._writeChunk(isLast, chunk)
      await this._end()
    } else {
      this._writeChunk(isLast, chunk)
    }
  }

  _writeAll (createChunk) {
    this.ok = true
    do {
      this.counter--

      this.chunk = createChunk(this.counter, this.length)
      // this._chunkCompleted()
      this._writeChunk(this.counter === 0)
    } while (this.counter > 0 && this.ok)

    if (this.counter > 0) {
      this.writeStream.once('drain', () => this._writeAll(createChunk))
    }
  }

  _writeChunk (isLastChunk, chunk) {
    if (isLastChunk) {
      this.writeStream.end(chunk || this.chunk)
    } else {
      this.ok = this.writeStream.write(chunk || this.chunk)
    }
  }

  async _end () {
    await new Promise(resolve => {
      this.writeStream.on('finish', () => {
        this.writeStream.destroy()
        resolve()
      })
    })
  }

  _chunkCompleted () {
    console.log(`
        ===================================================
          writing chunk progress:${100 - Math.floor((100 * this.counter / (this.length)) * 10000) / 10000} %, value: ${this.chunk}
        ===================================================
            `)
  }
}
