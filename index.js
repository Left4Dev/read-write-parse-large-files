const Median = require('./median/median')

const run = async () => {
  const fileName = process.argv[2] ? process.argv[2] : 'src.db'
  const count = process.argv[3] ? process.argv[3] * 1 : 5 * 1000 * 1000
  const debug = process.argv[4] ? process.argv[4] : false
  const median = new Median(fileName, debug)

  try {
    // result: random
    await median.create(count, (index, length) => Math.floor(Math.random() * 1000000) + ',\r\n')

    if (!debug) { return }
    // result: 250.5
    await median.create(count, index => index + ',\r\n', 'test1.db')

    // result: 5
    let test = [
      1, 1, 2, 5, 6, 6, 9
    ]

    await median.create(test.length, index => test[index] + ',\r\n', 'test2.db')

    // result: 4
    test = [
      1, 1, 2, 6, 6, 9
    ]
    await median.create(test.length, index => test[index] + ',\r\n', 'test3.db')
  } catch (err) {
    console.log(err)
  }
}

run()
