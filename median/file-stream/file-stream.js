const WriteStream = require('./write-stream')
const ReadStream = require('./read-stream')

module.exports = class FileStream {
  constructor (fileName) {
    this.fileName = fileName
    this.writer = new WriteStream(this)
    this.reader = new ReadStream(this)
  }
}
