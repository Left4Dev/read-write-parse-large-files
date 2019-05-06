const fs = require('fs')

module.exports = class ReadStream {
  constructor (fileStream) {
    this.fileStream = fileStream
  }
  async file () {
    this.db = await this._readChunks()
    return this.db
  }

  _import (buffer) {
    return buffer.split(',\r\n').map(str => str * 1)
  }
  _readChunks () {
    return new Promise(resolve => {
      const stream = fs.createReadStream(this.fileStream.fileName, { encoding: 'utf8' })
      const chunkSize = 1000
      let count = 0
      let buffer = ''
      let db = []

      stream.on('data', data => {
        count++

        // clear string buffer when chunk size is reached
        // avoids memory overflow
        if ((count % chunkSize) === 0) {
          console.log('Reading... db item count:', db.length)
          count = 0
          db = db.concat(this._import(buffer))
          buffer = ''
        } else {
          buffer += data
        }
      })

      stream.on('close', () => {
        db = db.concat(this._import(buffer))
        buffer = ''

        db = db.slice(0, -1)
        this.length = db.length

        stream.destroy()
        resolve(db)
      })
    })
  }
}
