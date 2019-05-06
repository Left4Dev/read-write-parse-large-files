const FileStream = require('./file-stream/file-stream')

module.exports = class Median extends FileStream {
  constructor (fileName, debug) {
    super(fileName)

    this.debug = debug

    this.median = 0
    this.db = []
  }
  async create (count, callback, filename) {
    this.fileName = filename || this.fileName

    if (!this.debug) { await this.write(count, callback) }

    await this.read()
    await this.calculate()
  }
  async write (itemCount, callback) {
    await this.writer.file(itemCount, callback)

    this._writeCompleted()
  }

  async read () {
    this.db = await this.reader.file()
    this._readCompleted()
  }

  calculate () {
    this.db.sort((a, b) => a - b)

    const half = Math.floor((this.db.length) * 0.5)

    if (this.db.length % 2) {
      this.median = this.db[half]
    } else {
      this.median = (this.db[half - 1] + this.db[half]) * 0.5
    }

    this._calculationCompleted()
  }

  _calculationCompleted () {
    console.log(`
    ============================================
            median  of ${this.fileName} 
            with random numbers = ${this.median} 
    ============================================

      cli-usage:

      median <filename> <count> <debug-mode>

      filename - name for the db to be created
      count - number of random numbers to be generated
      debug - enables tests and disables writing of <filename> (db)
      `)
  }
  _writeCompleted () {
    console.log(`     ==========================================
        ${this.fileName} has been written (${this.writer.length})
     ==========================================`)
  }
  _readCompleted () {
    console.log(`     ==========================================
        ${this.fileName} has been read (${this.reader.length})
     ==========================================`)
  }
}
